import { supabase } from '@/api/supabaseClient';

/**
 * Uploads a file to Supabase storage
 * @param file The file to upload
 * @param bucket The storage bucket name
 * @param path The path within the bucket
 * @returns Promise with the public URL of the uploaded file
 */
export const uploadFileToStorage = async (file: File, bucket: string, path: string): Promise<string> => {
  try {
    const fileExt = file.name.split('.').pop();
    // Use UUID + timestamp for truly unique filenames
    const uniqueId = `${crypto.randomUUID()}-${Date.now()}`;
    const fileName = `${path}/${uniqueId}.${fileExt}`;
    
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(fileName, file, {
        // Add this option to avoid conflicts
        upsert: false
      });
      
    if (error) {
      throw new Error(`Error uploading file: ${error.message}`);
    }
    
    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from(bucket)
      .getPublicUrl(fileName);
      
    return publicUrl;
  } catch (error) {
    console.error('Error in uploadFileToStorage:', error);
    throw error;
  }
};

/**
 * Deletes a file from Supabase storage
 * @param url The public URL of the file to delete
 * @param bucket The storage bucket name
 * @returns Promise indicating success or failure
 */
export const deleteFileFromStorage = async (url: string, bucket: string): Promise<boolean> => {
  try {
    // Extract the path from the URL
    const urlObj = new URL(url);
    const pathParts = urlObj.pathname.split('/');
    const filePath = pathParts.slice(pathParts.indexOf(bucket) + 1).join('/');
    
    const { error } = await supabase.storage
      .from(bucket)
      .remove([filePath]);
      
    if (error) {
      throw new Error(`Error deleting file: ${error.message}`);
    }
    
    return true;
  } catch (error) {
    console.error('Error in deleteFileFromStorage:', error);
    return false;
  }
};

/**
 * Gets a list of files from a specific path in storage
 * @param bucket The storage bucket name
 * @param path The path within the bucket
 * @returns Promise with the list of files
 */
export const listFilesInStorage = async (bucket: string, path: string) => {
  try {
    const { data, error } = await supabase.storage
      .from(bucket)
      .list(path);
      
    if (error) {
      throw new Error(`Error listing files: ${error.message}`);
    }
    
    return data;
  } catch (error) {
    console.error('Error in listFilesInStorage:', error);
    throw error;
  }
};

/**
 * Creates a signed URL for temporary access to a file
 * @param bucket The storage bucket name
 * @param path The path to the file within the bucket
 * @param expiresIn Expiration time in seconds (default: 60)
 * @returns Promise with the signed URL
 */
export const getSignedUrl = async (bucket: string, path: string, expiresIn = 60) => {
  try {
    const { data, error } = await supabase.storage
      .from(bucket)
      .createSignedUrl(path, expiresIn);
      
    if (error) {
      throw new Error(`Error creating signed URL: ${error.message}`);
    }
    
    return data.signedUrl;
  } catch (error) {
    console.error('Error in getSignedUrl:', error);
    throw error;
  }
};

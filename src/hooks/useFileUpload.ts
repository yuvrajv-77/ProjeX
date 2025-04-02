import { useState } from 'react';
import { uploadFileToStorage as uploadFile, deleteFileFromStorage } from '@/utils/storage-utils';

/**
 * React hook for managing file uploads with state tracking
 * @returns Object with upload functions and state
 */
export const useFileUpload = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  
  /**
   * Upload a file to Supabase storage with state tracking
   */
  const uploadFileToStorage = async (file: File, bucket: string, path: string): Promise<string> => {
    setIsUploading(true);
    setUploadError(null);
    setUploadProgress(0);
    
    try {
      // Use the utility function for the actual upload
      const publicUrl = await uploadFile(file, bucket, path);
      setUploadProgress(100);
      return publicUrl;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error during file upload';
      setUploadError(errorMessage);
      throw error;
    } finally {
      setIsUploading(false);
    }
  };
  
  /**
   * Delete a file from Supabase storage
   */
  const deleteFile = async (url: string, bucket: string): Promise<boolean> => {
    try {
      return await deleteFileFromStorage(url, bucket);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error deleting file';
      setUploadError(errorMessage);
      return false;
    }
  };
  
  return {
    uploadFileToStorage,
    deleteFile,
    isUploading,
    uploadError,
    uploadProgress
  };
};

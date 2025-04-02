import { supabase } from '@/api/supabaseClient';
import { useAuth } from '@/context/authContext';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export const useProjectLike = (projectId: string) => {
  const queryClient = useQueryClient();
  const { user } = useAuth(); // Get current user
  
  // Query to get current like status and count
  const { data, isLoading } = useQuery({
    queryKey: ['projectLike', projectId],
    queryFn: async () => {
      if (!projectId || !user) {
        console.log('Missing project ID or user');
        return { isLiked: false, likeCount: 0 };
      }
      
      console.log('Checking like status for project:', projectId, 'user:', user.id);
      
      // Get the project to check likes array
      const { data: project, error } = await supabase
        .from('projects')
        .select('likes')
        .eq('id', projectId)
        .single();
        
      if (error) {
        console.error('Error fetching project likes:', error);
        return { isLiked: false, likeCount: 0 };
      }
      
      // Ensure likes is an array, even if null/undefined in the database
      const likes = project.likes || [];
      console.log('Current likes array:', likes);
      
      // Check if user ID is in the likes array
      const isLiked = likes.some(likeId => likeId === user.id);
      const likeCount = likes.length;
      
      console.log("Current like status:", { isLiked, likeCount });
      return { isLiked, likeCount };
    },
    enabled: !!projectId && !!user,
  });
  
  // Mutation to toggle like status
  const { mutate: toggleLike, isPending: isLikeLoading } = useMutation({
    mutationFn: async () => {
      if (!projectId || !user) {
        console.error('Missing project ID or user');
        throw new Error('Missing project ID or user');
      }
      
      console.log('Toggling like for project:', projectId, 'by user:', user.id);
      
      // First get current likes
      const { data: project, error: fetchError } = await supabase
        .from('projects')
        .select('likes')
        .eq('id', projectId)
        .single();
        
      if (fetchError) {
        console.error('Error fetching project:', fetchError);
        throw fetchError;
      }
      
      // Ensure likes is an array, even if null/undefined in the database
      const currentLikes = project.likes || [];
      console.log('Current likes array before update:', currentLikes);
      
      let newLikes;
      
      // Toggle like status - ensure we're comparing UUIDs correctly
      const userIdExists = currentLikes.some(likeId => likeId === user.id);
      
      if (userIdExists) {
        // Unlike: remove user ID from likes array
        newLikes = currentLikes.filter(likeId => likeId !== user.id);
        console.log('Removing like, new likes array:', newLikes);
      } else {
        // Like: add user ID to likes array
        newLikes = [...currentLikes, user.id];
        console.log('Adding like, new likes array:', newLikes);
      }
      
      // Update the project with new likes array
      const { data: updateData, error: updateError } = await supabase
        .from('projects')
        .update({ likes: newLikes })
        .eq('id', projectId)
        .select();
        
      if (updateError) {
        console.error('Error updating project likes:', updateError);
        throw updateError;
      }
      
      console.log('Successfully updated likes for project:', projectId);
      console.log('Updated project data:', updateData);
      
      // Check if the update was actually applied
      const updatedLikes = updateData?.[0]?.likes || newLikes;
      const isLiked = updatedLikes.some(likeId => likeId === user.id);
      
      return { 
        isLiked, 
        likeCount: updatedLikes.length 
      };
    },
    onSuccess: (data) => {
      // Invalidate queries to refetch data
      console.log('Like mutation successful:', data);
      queryClient.invalidateQueries({ queryKey: ['projectLike', projectId] });
      queryClient.invalidateQueries({ queryKey: ['project', projectId] });
    },
    onError: (error) => {
      console.error('Like mutation error:', error);
    }
  });
  
  return {
    isLiked: data?.isLiked || false,
    likeCount: data?.likeCount || 0,
    isLoading,
    toggleLike,
    isLikeLoading,
  };
};

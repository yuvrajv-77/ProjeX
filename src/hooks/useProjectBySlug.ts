import { fetchProjectBySlug } from "@/api/projectBySlug";
import { useQuery } from "@tanstack/react-query";

export const useProjectBySlug = (slug: string | undefined) => {
    return useQuery({
      queryKey: ['project', slug],
      queryFn: () => slug ? fetchProjectBySlug(slug) : Promise.reject('No slug provided'),
      enabled: !!slug, // Only run the query if slug exists
      staleTime: 5 * 60 * 1000, // Consider data fresh for 5 minutes
      retry: 1, // Only retry once if the query fails
    });
  };
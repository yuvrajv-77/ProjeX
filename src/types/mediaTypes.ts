export type MediaType = "image" | "video";

export type ProjectMedia = {
  id: string;
  projectId: string;
  media_url: string;
  mediaType: MediaType;
};


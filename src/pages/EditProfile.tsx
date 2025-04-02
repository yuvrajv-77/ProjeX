import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/authContext";
import { supabase } from "@/api/supabaseClient";
import { Loader2, Save, Upload, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

interface ProfileFormData {
  name: string;
  username: string;
  bio: string;
  avatar_url: string;
  linkedin_url: string;
  github_url: string;
  behance_url: string;
  dribbble_url: string;
  email: string;
}

const fetchUserProfile = async (userId: string) => {
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("id", userId)
    .single();

  if (error) {
    throw error;
  }

  return data;
};

const updateUserProfile = async ({
  userId,
  profileData,
}: {
  userId: string;
  profileData: Partial<ProfileFormData>;
}) => {
  const { error } = await supabase
    .from("users")
    .update(profileData)
    .eq("id", userId);

  if (error) {
    throw error;
  }

  return true;
};

const uploadAvatarToStorage = async (file: File, userId: string) => {
  const fileExt = file.name.split(".").pop();
  const fileName = `${userId}-${Date.now()}.${fileExt}`;
  const filePath = `avatars/${fileName}`;

  const { error: uploadError } = await supabase.storage
    .from("profile-images")
    .upload(filePath, file);

  if (uploadError) {
    throw uploadError;
  }

  const { data } = supabase.storage
    .from("profile-images")
    .getPublicUrl(filePath);

  return data.publicUrl;
};

const EditProfile = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

  const [formData, setFormData] = useState<ProfileFormData>({
    name: "",
    username: "",
    bio: "",
    avatar_url: "",
    linkedin_url: "",
    github_url: "",
    behance_url: "",
    dribbble_url: "",
    email: "",
  });

  // Redirect if not logged in
  if (!user) {
    navigate("/login");
    return null;
  }

  // Fetch user profile data
  const { isLoading } = useQuery({
    queryKey: ["userProfile", user.id],
    queryFn: () => fetchUserProfile(user.id),
    onSuccess: (data) => {
      setFormData({
        name: data.name || "",
        username: data.username || "",
        bio: data.bio || "",
        avatar_url: data.avatar_url || "",
        linkedin_url: data.linkedin_url || "",
        github_url: data.github_url || "",
        behance_url: data.behance_url || "",
        dribbble_url: data.dribbble_url || "",
        email: data.email || "",
      });
    },
    onError: (error) => {
      console.error("Error fetching user data:", error);
      toast.error("Failed to load profile data. Please try again.")
    },
  });

  // Avatar upload mutation
  const avatarMutation = useMutation({
    mutationFn: (file: File) => uploadAvatarToStorage(file, user.id),
  });

  // Profile update mutation
  const updateProfileMutation = useMutation({
    mutationFn: (profileData: Partial<ProfileFormData>) =>
      updateUserProfile({ userId: user.id, profileData }),
    onSuccess: () => {
      // Invalidate and refetch user profile data
      queryClient.invalidateQueries({ queryKey: ["userProfile", user.id] });
      
      toast.success("Your profile has been updated successfully.")
      
      navigate(`/profile/${user.id}`);
    },
    onError: (error) => {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile. Please try again.")
    },
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setAvatarFile(file);
      
      // Create preview URL
      const previewUrl = URL.createObjectURL(file);
      setAvatarPreview(previewUrl);
    }
  };

  const clearAvatarSelection = () => {
    setAvatarFile(null);
    setAvatarPreview(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Upload avatar if a new one was selected
      let avatarUrl = formData.avatar_url;
      if (avatarFile) {
        avatarUrl = await avatarMutation.mutateAsync(avatarFile);
      }
      
      // Update user profile with all form data and new avatar URL if applicable
      await updateProfileMutation.mutateAsync({
        ...formData,
        avatar_url: avatarUrl,
      });
    } catch (error) {
      console.error("Error in form submission:", error);
    }
  };

  const isSaving = updateProfileMutation.isPending || avatarMutation.isPending;

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="ml-2">Loading profile data...</p>
      </div>
    );
  }

  return (
    <main className="mx-auto max-w-3xl px-5 py-10 bg-background">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Edit Profile</h1>
        <Button variant="outline" onClick={() => navigate(`/profile/${user?.id}`)}>
          Cancel
        </Button>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="space-y-6">
          <div className="flex flex-col items-center sm:flex-row sm:items-start gap-6">
            <div className="relative">
              <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-border">
                <img 
                  src={avatarPreview || formData.avatar_url || "https://via.placeholder.com/150"} 
                  alt="Profile avatar" 
                  className="w-full h-full object-cover"
                />
              </div>
              {avatarPreview && (
                <Button 
                  type="button"
                  size="icon" 
                  variant="destructive" 
                  className="absolute -top-2 -right-2 rounded-full w-8 h-8"
                  onClick={clearAvatarSelection}
                >
                  <X className="w-4 h-4" />
                </Button>
              )}
            </div>
            
            <div className="flex flex-col gap-4 flex-1">
              <Label htmlFor="avatar">Profile Picture</Label>
              <div className="flex items-center gap-4">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => document.getElementById('avatar-upload')?.click()}
                >
                  <Upload className="mr-2 h-4 w-4" />
                  Upload new image
                </Button>
                <Input 
                  id="avatar-upload" 
                  type="file" 
                  accept="image/*" 
                  className="hidden" 
                  onChange={handleAvatarChange}
                />
              </div>
              <p className="text-sm text-muted-foreground">
                Recommended: Square JPG or PNG, at least 500x500 pixels
              </p>
            </div>
          </div>
          
          <Separator />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Your full name"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                placeholder="Your username"
              />
            </div>
            
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                name="bio"
                value={formData.bio}
                onChange={handleInputChange}
                placeholder="Tell us about yourself"
                rows={4}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Your email address"
              />
            </div>
          </div>
          
          <Separator />
          
          <h2 className="text-xl font-semibold">Social Links</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="linkedin_url">LinkedIn URL</Label>
              <Input
                id="linkedin_url"
                name="linkedin_url"
                value={formData.linkedin_url}
                onChange={handleInputChange}
                placeholder="https://linkedin.com/in/username"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="github_url">GitHub URL</Label>
              <Input
                id="github_url"
                name="github_url"
                value={formData.github_url}
                onChange={handleInputChange}
                placeholder="https://github.com/username"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="behance_url">Behance URL</Label>
              <Input
                id="behance_url"
                name="behance_url"
                value={formData.behance_url}
                onChange={handleInputChange}
                placeholder="https://behance.net/username"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="dribbble_url">Dribbble URL</Label>
              <Input
                id="dribbble_url"
                name="dribbble_url"
                value={formData.dribbble_url}
                onChange={handleInputChange}
                placeholder="https://dribbble.com/username"
              />
            </div>
          </div>
        </div>
        
        <div className="flex justify-end gap-4">
          <Button 
            type="button" 
            variant="outline" 
            onClick={() => navigate(`/profile/${user?.id}`)}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isSaving}>
            {isSaving ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </>
            )}
          </Button>
        </div>
      </form>
    </main>
  );
};

export default EditProfile;

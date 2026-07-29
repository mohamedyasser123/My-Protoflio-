import { supabase } from '@/lib/supabase';
import { v4 as uuidv4 } from 'uuid';

export const uploadImage = async (file: File, bucket = 'project-images'): Promise<string> => {
  const fileExt = file.name.split('.').pop();
  const fileName = `${uuidv4()}.${fileExt}`;
  const filePath = `${fileName}`;

  const { error } = await supabase.storage
    .from(bucket)
    .upload(filePath, file, {
      cacheControl: '3600',
      upsert: false,
    });

  if (error) {
    throw new Error(error.message);
  }

  const { data } = supabase.storage.from(bucket).getPublicUrl(filePath);
  return data.publicUrl;
};

export const deleteImage = async (url: string, bucket = 'project-images'): Promise<void> => {
  if (!url) return;
  
  // Extract path from public URL
  // Format: https://[...].supabase.co/storage/v1/object/public/[bucket]/[path]
  const pathRegex = new RegExp(`${bucket}/(.+)$`);
  const match = url.match(pathRegex);
  
  if (!match || match.length < 2) {
    console.warn('Could not extract file path from URL:', url);
    return;
  }
  
  const filePath = match[1];

  const { error } = await supabase.storage.from(bucket).remove([filePath]);

  if (error) {
    throw new Error(error.message);
  }
};

export const uploadMultipleImages = async (files: File[], bucket = 'project-images'): Promise<string[]> => {
  const uploadPromises = files.map((file) => uploadImage(file, bucket));
  return Promise.all(uploadPromises);
};

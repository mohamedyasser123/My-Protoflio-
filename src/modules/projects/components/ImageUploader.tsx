import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { UploadCloud, X, ImageIcon, Loader2 } from 'lucide-react';
import {
  ALLOWED_IMAGE_TYPES,
  MAX_IMAGE_SIZE_MB,
  MAX_IMAGES_COUNT,
} from '../constants/project.constants';
import { validateImageFile } from '../utils/project.utils';
import { uploadImage, deleteImage } from '../services/image.service';
import toast from 'react-hot-toast';

interface ImageUploaderProps {
  value: string[];
  onChange: (urls: string[]) => void;
  maxImages?: number;
  label?: string;
  singleMode?: boolean; // For thumbnail (single image)
  error?: string;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({
  value,
  onChange,
  maxImages = MAX_IMAGES_COUNT,
  label = 'Upload Images',
  singleMode = false,
  error,
}) => {
  const [fileErrors, setFileErrors] = useState<string[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      setFileErrors([]);
      const errors: string[] = [];
      const newUrls: string[] = [];

      const remaining = singleMode ? 1 : maxImages - value.length;
      const filesToProcess = acceptedFiles.slice(0, remaining);

      setIsUploading(true);

      for (const file of filesToProcess) {
        const err = validateImageFile(file, MAX_IMAGE_SIZE_MB, ALLOWED_IMAGE_TYPES);
        if (err) {
          errors.push(`${file.name}: ${err}`);
          continue;
        }
        try {
          // Upload directly to Supabase Storage
          const url = await uploadImage(file);
          newUrls.push(url);
        } catch (uploadErr: any) {
          errors.push(`${file.name}: Failed to upload (${uploadErr.message})`);
        }
      }

      setIsUploading(false);
      setFileErrors(errors);

      if (errors.length > 0) {
        toast.error('Some files failed to upload');
      }

      if (newUrls.length > 0) {
        if (singleMode) {
          onChange([newUrls[0]]);
        } else {
          onChange([...value, ...newUrls]);
        }
      }
    },
    [value, onChange, maxImages, singleMode]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': ['.jpg', '.jpeg', '.png', '.webp', '.gif'] },
    multiple: !singleMode,
    maxFiles: singleMode ? 1 : maxImages,
    disabled: isUploading,
  });

  const handleRemove = async (index: number) => {
    const urlToRemove = value[index];
    try {
      await deleteImage(urlToRemove);
    } catch (e) {
      console.error('Failed to delete image from storage', e);
      // We still remove it from the form state even if storage deletion fails
    }
    const updated = value.filter((_, i) => i !== index);
    onChange(updated);
  };

  const canAddMore = singleMode ? value.length === 0 : value.length < maxImages;

  return (
    <div className="space-y-3">
      {label && (
        <p className="text-sm font-medium text-slate-300">
          {label}
          {!singleMode && (
            <span className="ml-2 text-slate-500 font-normal">
              ({value.length}/{maxImages})
            </span>
          )}
        </p>
      )}

      {/* Drop Zone */}
      {canAddMore && (
        <div
          {...getRootProps()}
          className={`relative flex flex-col items-center justify-center gap-3 p-8 rounded-xl border-2 border-dashed transition-all ${
            isUploading ? 'opacity-50 cursor-not-allowed border-slate-700 bg-slate-800' :
            isDragActive
              ? 'border-sky-500 bg-sky-500/10 cursor-pointer'
              : error
              ? 'border-red-500/50 bg-red-500/5 hover:border-red-400 cursor-pointer'
              : 'border-slate-700 bg-slate-800/50 hover:border-sky-500/60 hover:bg-sky-500/5 cursor-pointer'
          }`}
        >
          <input {...getInputProps()} />
          <div className={`p-3 rounded-xl ${isDragActive ? 'bg-sky-500/20' : 'bg-slate-700/50'}`}>
            {isUploading ? (
              <Loader2 size={24} className="text-sky-400 animate-spin" />
            ) : (
              <UploadCloud
                size={24}
                className={isDragActive ? 'text-sky-400' : 'text-slate-400'}
              />
            )}
          </div>
          <div className="text-center">
            <p className="text-sm font-medium text-slate-300">
              {isUploading ? 'Uploading...' : isDragActive ? 'Drop to upload' : 'Drag & drop or click to browse'}
            </p>
            <p className="text-xs text-slate-500 mt-1">
              JPG, PNG, WebP, GIF · Max {MAX_IMAGE_SIZE_MB}MB each
            </p>
          </div>
        </div>
      )}

      {/* Error messages */}
      {(fileErrors.length > 0 || error) && (
        <div className="space-y-1">
          {error && <p className="text-xs text-red-400">{error}</p>}
          {fileErrors.map((e, i) => (
            <p key={i} className="text-xs text-red-400">{e}</p>
          ))}
        </div>
      )}

      {/* Previews */}
      {value.length > 0 && (
        <div className={`grid gap-3 ${singleMode ? 'grid-cols-1' : 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4'}`}>
          {value.map((url, index) => (
            <div
              key={url}
              className="group relative rounded-xl overflow-hidden border border-slate-700 bg-slate-800 aspect-video"
            >
              {url ? (
                <img
                  src={url}
                  alt={`Preview ${index + 1}`}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <ImageIcon size={24} className="text-slate-600" />
                </div>
              )}
              <button
                type="button"
                onClick={() => handleRemove(index)}
                className="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/70 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 hover:bg-red-600 transition-all"
                aria-label={`Remove image ${index + 1}`}
              >
                <X size={14} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

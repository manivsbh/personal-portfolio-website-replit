import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";

interface PhotoUploadProps {
  currentPhotoUrl?: string;
  onPhotoUploaded: (photoUrl: string) => void;
}

export default function PhotoUpload({ currentPhotoUrl, onPhotoUploaded }: PhotoUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const uploadMutation = useMutation({
    mutationFn: async (file: File) => {
      const formData = new FormData();
      formData.append('photo', file);
      
      const response = await fetch('/api/upload-photo', {
        method: 'POST',
        body: formData,
      });
      
      if (!response.ok) {
        throw new Error('Upload failed');
      }
      
      return response.json();
    },
    onSuccess: (data) => {
      toast({
        title: "Photo uploaded successfully!",
        description: "Your profile photo has been updated.",
      });
      onPhotoUploaded(data.photoUrl);
    },
    onError: (error: any) => {
      toast({
        title: "Upload failed",
        description: error.message || "Please try again.",
        variant: "destructive",
      });
    },
    onSettled: () => {
      setIsUploading(false);
    },
  });

  const handleFileSelect = (file: File) => {
    if (file.type.startsWith('image/')) {
      setIsUploading(true);
      uploadMutation.mutate(file);
    } else {
      toast({
        title: "Invalid file type",
        description: "Please select an image file (JPG, PNG, GIF, WebP).",
        variant: "destructive",
      });
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="relative">
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="w-80 h-80 mx-auto glassmorphism rounded-2xl p-8 relative overflow-hidden"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        {currentPhotoUrl ? (
          <img
            src={currentPhotoUrl}
            alt="Professional headshot of Manish Cheepa"
            className="rounded-xl w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full rounded-xl bg-slate-700 flex items-center justify-center">
            <div className="text-center">
              <svg className="w-16 h-16 text-slate-400 mx-auto mb-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 1H5C3.89 1 3 1.89 3 3V21C3 22.1 3.89 23 5 23H11.81C11.42 22.34 11.17 21.6 11.07 20.84C9.5 20.6 8.13 19.74 7.19 18.5C5.87 16.76 5.87 14.36 7.19 12.62C8.64 10.76 11.36 10.76 12.81 12.62C13.77 13.74 14.16 15.25 13.97 16.72C14.65 16.91 15.25 17.24 15.75 17.68C16.24 15.96 15.81 14.06 14.57 12.62C12.75 10.43 9.68 10.43 7.86 12.62C6.12 14.81 6.12 18.06 7.86 20.25C8.44 20.93 9.16 21.44 9.97 21.76C10.18 21.84 10.4 21.9 10.62 21.95C10.81 21.98 11 22 11.19 22H5C3.89 22 3 21.1 3 20V2H5V9H21M13 14.5V13H11V14.5H9.5V16.5H11V18H13V16.5H14.5V14.5H13Z"/>
              </svg>
              <p className="text-slate-400 text-sm">Upload Profile Photo</p>
            </div>
          </div>
        )}
        
        {/* Upload overlay */}
        <div 
          className={`absolute inset-0 bg-black/50 rounded-xl flex items-center justify-center transition-opacity duration-300 ${
            dragActive || isUploading ? 'opacity-100' : 'opacity-0 hover:opacity-100'
          }`}
        >
          {isUploading ? (
            <div className="text-center text-white">
              <svg className="animate-spin w-8 h-8 mx-auto mb-2" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <p className="text-sm">Uploading...</p>
            </div>
          ) : (
            <div className="text-center text-white">
              <svg className="w-8 h-8 mx-auto mb-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z"/>
              </svg>
              <p className="text-sm">
                {dragActive ? 'Drop photo here' : 'Click to upload photo'}
              </p>
            </div>
          )}
        </div>

        {/* Click handler for the entire area */}
        <div 
          className="absolute inset-0 cursor-pointer"
          onClick={openFileDialog}
        />
      </motion.div>

      {/* Upload Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-4 text-center"
      >
        <Button
          onClick={openFileDialog}
          disabled={isUploading}
          variant="outline"
          className="glassmorphism-dark border-slate-600 hover:bg-slate-700"
        >
          <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
            <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z"/>
          </svg>
          {currentPhotoUrl ? 'Change Photo' : 'Upload Photo'}
        </Button>
      </motion.div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileInput}
        className="hidden"
      />
    </div>
  );
}
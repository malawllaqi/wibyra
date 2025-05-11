'use client';

import type { router } from '@/lib/upload';
import { generateUploadDropzone } from '@repo/storage/client';
import { toast } from 'sonner';

const UploadButtonDrop = generateUploadDropzone<typeof router>();

export const UploadImage = (endpoint: string) => (
  <UploadButtonDrop
    endpoint={endpoint}
    onClientUploadComplete={(res) => {
      console.log('Files: ', res);
      toast.success('Upload Completed');
    }}
    onUploadError={(error: Error) => {
      toast.error(`ERROR! ${error.message}`);
    }}
  />
);

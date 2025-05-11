import { currentUser } from '@repo/auth/server';
import { type FileRouter, UploadError, storage } from '@repo/storage';
import { generateUploadDropzone } from '@repo/storage/client';

async function authenticateUser() {
  const user = await currentUser();

  if (!user) {
    throw new UploadError('Unauthorized');
  }

  return { userId: user.id };
}

export const router: FileRouter = {
  thumbnail: storage({
    image: {
      maxFileSize: '4MB',
      maxFileCount: 1,
    },
  })
    .middleware(authenticateUser)
    .onUploadComplete(() => {}),
  media: storage({
    image: {
      maxFileSize: '4MB',
      maxFileCount: 1,
    },
  })
    .middleware(authenticateUser)
    .onUploadComplete(() => {}),
};

export const UploadDropzone = generateUploadDropzone<typeof router>();

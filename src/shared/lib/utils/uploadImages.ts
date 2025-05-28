import { uploadImageApi } from '@/features/auth/api/auth';

export const uploadImages = async (images: (File | null)[]): Promise<string[]> => {
  const imageUrls = await Promise.all(
    images.filter(Boolean).map(async (file): Promise<string> => {
      if (!file) return '';
      const formData = new FormData();
      formData.append('file', file);
      return uploadImageApi(formData);
    }),
  );

  return imageUrls.filter(Boolean);
};

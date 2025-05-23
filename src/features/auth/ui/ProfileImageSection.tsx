import { useState } from 'react';
import Image from 'next/image';
import { CircleX } from 'lucide-react';
import { UseFormRegister, UseFormSetValue, UseFormTrigger } from 'react-hook-form';
import { SignUpFormValues } from '@/entities/auth/signup.schema';

interface ProfileImageSectionProps {
  setValue: UseFormSetValue<SignUpFormValues>;
  trigger: UseFormTrigger<SignUpFormValues>;
  onImagesChange?: (images: (File | null)[]) => void;
}

export default function ProfileImageSection({
  setValue,
  trigger,
  onImagesChange,
}: ProfileImageSectionProps) {
  const [images, setImages] = useState<(File | null)[]>(Array(6).fill(null));
  const [previews, setPreviews] = useState<(string | null)[]>(Array(6).fill(null));
  const [error, setError] = useState<string | null>(null);

  const updateImages = (updatedImages: (File | null)[]) => {
    const uploadedCount = updatedImages.filter(Boolean).length;
    setError(uploadedCount < 2 ? '최소 2장의 이미지를 등록해야 합니다.' : null);

    setValue(
      'images',
      updatedImages.filter(Boolean).map((_, index) => `image-${index}`),
    );
    trigger('images');
    onImagesChange?.(updatedImages);
  };

  const handleImageChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const updatedImages = [...images];
    const updatedPreviews = [...previews];
    updatedImages[index] = file;
    updatedPreviews[index] = URL.createObjectURL(file);
    setImages(updatedImages);
    setPreviews(updatedPreviews);
    updateImages(updatedImages);
  };

  const handleImageDelete = (index: number) => {
    const updatedImages = [...images];
    const updatedPreviews = [...previews];
    updatedImages[index] = null;
    updatedPreviews[index] = null;
    setImages(updatedImages);
    setPreviews(updatedPreviews);
    updateImages(updatedImages);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-zinc-900">프로필 사진</h2>
      <div className="flex flex-wrap justify-center gap-6 pb-2">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="group relative">
            <input
              type="file"
              id={`photo-${index}`}
              name={`photo-${index}`}
              accept="image/*"
              onChange={(e) => handleImageChange(index, e)}
              className="hidden"
            />
            <label
              htmlFor={`photo-${index}`}
              className="relative flex h-28 w-28 cursor-pointer items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-violet-100 to-rose-100 shadow-sm transition-all duration-300 hover:shadow-md"
            >
              {previews[index] ? (
                <>
                  <Image
                    src={previews[index] as string}
                    alt={`preview-${index}`}
                    className="h-full w-full object-cover"
                    fill
                  />
                  <button
                    type="button"
                    className="absolute right-1 top-1 z-10 m-0.5 flex h-5 w-5 items-center justify-center text-gray-50 transition-colors duration-200 hover:text-rose-500"
                    onClick={(e) => {
                      e.preventDefault();
                      handleImageDelete(index);
                    }}
                    tabIndex={-1}
                    aria-label="사진 삭제"
                  >
                    <CircleX />
                  </button>
                </>
              ) : (
                <span className="text-3xl text-zinc-400 transition-colors duration-300 group-hover:text-zinc-600">
                  +
                </span>
              )}
              {index === 0 && (
                <span className="absolute left-1/2 top-2 -translate-x-1/2 rounded-full bg-gradient-to-r from-violet-500 to-rose-500 px-2 py-0.5 text-xs text-white">
                  대표
                </span>
              )}
              {index === 1 && (
                <span className="absolute left-1/2 top-2 -translate-x-1/2 rounded-full bg-gradient-to-r from-violet-500 to-rose-500 px-2 py-0.5 text-xs text-white">
                  필수
                </span>
              )}
            </label>
          </div>
        ))}
      </div>
      {error && <small className="text-rose-500">{error}</small>}
    </div>
  );
}

'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useForm, FormProvider } from 'react-hook-form';
import { ArrowLeft } from 'lucide-react';
import { zodResolver } from '@hookform/resolvers/zod';
import { SignupFormValues } from '@/entities/auth/signup.types';
import { signupSchema } from '@/entities/auth/signup.schema';
import { SignupRequest } from '@/features/auth/api/api.types';
import { useSignup } from '@/features/auth/api/auth.mutations';
import {
  useGetInterestCategories,
  useGetFeedbackCategories,
  useGetSelfIntroCategories,
} from '@/features/auth/api/auth.queries';
import { useEmailVerification } from '@/features/auth/hooks/useEmailVerification';
import { useSignupFormValidation } from '@/features/auth/hooks/useSignupFormValidation';
import { uploadImages } from '@/shared/lib/utils/uploadImages';
import Input from '@/shared/components/ui/input';
import GenderSelector from './GenderSelector';
import RegionSelector from './RegionSelector';
import MbtiSelector from './MbtiSelector';
import MultiToggleButtonGroup from './MultiToggleButtonGroup';
import ProfileImageSection from './ProfileImageSection';
import { SignupButton, SignupSubmitButton } from './SignupButton';

export default function SignupForm() {
  const methods = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    mode: 'onChange',
    defaultValues: {
      email: '',
      verificationCode: '',
      password: '',
      confirmPassword: '',
      name: '',
      height: '',
      nickname: '',
      job: '',
      gender: '',
      birthday: '',
      region: '',
      phone: '',
      mbti: '',
      interests: [],
      listening: [],
      selfintro: [],
      images: [],
    },
  });

  const {
    register,
    setValue,
    handleSubmit,
    trigger,
    watch,
    formState: { errors, dirtyFields },
  } = methods;

  const selectedGender = watch('gender');
  const email = watch('email');
  const verificationCode = watch('verificationCode');
  const isEmailValid = !errors.email && dirtyFields.email;
  const isVerificationCodeValid = !errors.verificationCode && dirtyFields.verificationCode;

  const [images, setImages] = useState<(File | null)[]>(Array(6).fill(null));

  const { mutate: signup } = useSignup();
  const { data: interestCategories, isLoading: isInterestLoading } = useGetInterestCategories();
  const { data: feedbackCategories, isLoading: isFeedbackLoading } = useGetFeedbackCategories();
  const { data: selfIntroCategories, isLoading: isSelfIntroLoading } = useGetSelfIntroCategories();

  const {
    isEmailVerified,
    isSendingCode,
    isVerifyingCode,
    showVerificationCode,
    error,
    handleSendVerificationCode,
    handleVerifyCode,
  } = useEmailVerification();

  const { isFormValid } = useSignupFormValidation({
    errors,
    dirtyFields,
    watch,
    images,
    isEmailVerified,
  });

  const onSubmit = async (data: SignupFormValues) => {
    try {
      const imageUrls = await uploadImages(images);

      const signupData: SignupRequest = {
        email: data.email,
        password: data.password,
        confirmPassword: data.confirmPassword,
        name: data.name,
        height: Number(data.height),
        nickname: data.nickname,
        birthday: data.birthday,
        gender: data.gender,
        phone: data.phone,
        region: data.region,
        job: data.job,
        mbti: data.mbti,
        selfintro: data.selfintro,
        listening: data.listening,
        interests: data.interests,
        images: imageUrls,
        authProvider: 'email',
      };

      signup(signupData);
    } catch (error) {
      console.error('회원가입 중 오류 발생:', error);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-rose-50 px-4 pb-24">
      <div className="mx-auto max-w-2xl">
        <Link
          href="/auth"
          className="inline-flex items-center pt-2 text-zinc-500 hover:text-zinc-600 active:text-zinc-700"
        >
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <header className="mb-8 text-center">
          <h1 className="text-2xl font-bold text-transparent text-zinc-900">회원가입</h1>
          <p className="mt-2 text-sm text-zinc-600">추가 정보를 입력해주세요</p>
        </header>

        <section className="relative">
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-violet-500/10 to-rose-500/10 blur-xl" />
          <FormProvider {...methods}>
            <form
              noValidate
              onSubmit={handleSubmit(onSubmit)}
              className="relative rounded-2xl border border-zinc-200/50 bg-white/80 p-6 shadow-lg backdrop-blur-sm"
            >
              <div className="space-y-6">
                <div className="space-y-4">
                  <h2 className="text-lg font-semibold text-zinc-900">기본 정보</h2>
                  <div className="flex flex-col gap-4 lg:grid lg:grid-cols-2">
                    {/* 이메일 */}
                    <div className="w-full lg:col-span-2">
                      <div className="flex gap-2">
                        <div className="flex-1">
                          <Input
                            label="이메일"
                            placeholder="이메일을 입력해주세요"
                            register={register('email')}
                            error={errors.email}
                            isDirty={dirtyFields.email}
                            disabled={isEmailVerified}
                            onKeyDown={(e) => {
                              if (
                                e.key === 'Enter' &&
                                !isSendingCode &&
                                !isEmailVerified &&
                                isEmailValid
                              ) {
                                e.preventDefault();
                                handleSendVerificationCode(email);
                              }
                            }}
                          />
                        </div>
                        <SignupButton
                          type="button"
                          onClick={() => handleSendVerificationCode(email)}
                          disabled={isSendingCode || isEmailVerified || !isEmailValid}
                          className="mt-7"
                          size="sm"
                          isLoading={isSendingCode}
                          isCompleted={isEmailVerified}
                          completedText="인증 완료"
                          defaultText="이메일 인증"
                        />
                      </div>
                    </div>
                    {/* 인증 코드 */}
                    {showVerificationCode && !isEmailVerified && (
                      <div className="w-full animate-slide-down lg:col-span-2">
                        <div className="flex gap-2">
                          <div className="flex-1">
                            <Input
                              label="인증 코드"
                              placeholder="인증 코드를 입력해주세요"
                              maxLength={6}
                              type="text"
                              inputMode="numeric"
                              pattern="\d*"
                              register={register('verificationCode')}
                              error={errors.verificationCode}
                              isDirty={dirtyFields.verificationCode}
                              onKeyDown={(e) => {
                                if (
                                  e.key === 'Enter' &&
                                  !isVerifyingCode &&
                                  isVerificationCodeValid &&
                                  verificationCode
                                ) {
                                  e.preventDefault();
                                  handleVerifyCode(verificationCode);
                                }
                              }}
                            />
                          </div>
                          <SignupButton
                            type="button"
                            onClick={() => verificationCode && handleVerifyCode(verificationCode)}
                            disabled={
                              isVerifyingCode || isEmailVerified || !isVerificationCodeValid
                            }
                            className="mt-7"
                            size="sm"
                            isLoading={isVerifyingCode}
                            defaultText="인증 코드 확인"
                          />
                        </div>
                      </div>
                    )}
                    {/* 비밀번호 */}
                    <div className="w-full lg:col-span-2">
                      <Input
                        label="비밀번호"
                        placeholder="비밀번호를 입력해주세요"
                        type="password"
                        register={register('password')}
                        error={errors.password}
                        isDirty={dirtyFields.password}
                      />
                    </div>
                    <div className="w-full lg:col-span-2">
                      <Input
                        label="비밀번호 확인"
                        placeholder="비밀번호를 다시 입력해주세요"
                        type="password"
                        register={register('confirmPassword')}
                        error={errors.confirmPassword}
                        isDirty={dirtyFields.confirmPassword}
                      />
                    </div>
                    {/* 개인 정보 */}
                    <Input
                      label="이름"
                      placeholder="이름을 입력해주세요"
                      register={register('name')}
                      error={errors.name}
                      isDirty={dirtyFields.name}
                    />
                    <Input
                      label="닉네임"
                      placeholder="닉네임을 입력해주세요"
                      register={register('nickname')}
                      error={errors.nickname}
                      isDirty={dirtyFields.nickname}
                    />
                    <Input
                      label="키"
                      placeholder="키를 입력해주세요"
                      maxLength={3}
                      register={register('height')}
                      error={errors.height}
                      isDirty={dirtyFields.height}
                    />
                    <Input
                      label="직업"
                      placeholder="직업을 입력해주세요"
                      register={register('job')}
                      error={errors.job}
                      isDirty={dirtyFields.job}
                    />
                    <Input
                      label="생년월일"
                      placeholder="2000-01-01"
                      register={register('birthday')}
                      error={errors.birthday}
                      isDirty={dirtyFields.birthday}
                      maxLength={10}
                      onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
                        let value = e.target.value.replace(/[^0-9]/g, '').slice(0, 8);
                        if (value.length >= 5)
                          value = value.replace(/(\d{4})(\d{2})(\d{0,2})/, '$1-$2-$3');
                        else if (value.length >= 3)
                          value = value.replace(/(\d{4})(\d{0,2})/, '$1-$2');
                        e.target.value = value.replace(/-$/, '');
                      }}
                    />
                    <Input
                      label="휴대폰 번호"
                      placeholder="010-1234-1234"
                      register={register('phone')}
                      error={errors.phone}
                      isDirty={dirtyFields.phone}
                      maxLength={13}
                      onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
                        let value = e.target.value.replace(/[^0-9]/g, '').slice(0, 11);
                        if (value.length >= 8)
                          value = value.replace(/(\d{3})(\d{4})(\d{0,4})/, '$1-$2-$3');
                        else if (value.length >= 4)
                          value = value.replace(/(\d{3})(\d{0,4})/, '$1-$2');
                        e.target.value = value.replace(/-$/, '');
                      }}
                    />
                    <GenderSelector
                      register={register}
                      selectedGender={selectedGender}
                      error={errors.gender?.message}
                    />
                    <RegionSelector register={register} error={errors.region?.message} />
                    <MbtiSelector register={register} error={errors.mbti?.message} />
                  </div>
                </div>
                <div className="space-y-4">
                  <h2 className="text-lg font-semibold text-zinc-900">자기소개</h2>
                  <div className="space-y-6">
                    <MultiToggleButtonGroup
                      label="관심사"
                      name="interests"
                      options={
                        interestCategories?.map((item) =>
                          typeof item === 'string' ? item : item.name,
                        ) ?? []
                      }
                      requiredCount={3}
                      register={register}
                      setValue={setValue}
                      trigger={trigger}
                      error={errors.interests}
                      isLoading={isInterestLoading}
                    />
                    <MultiToggleButtonGroup
                      label="이런 얘기 많이 들어요"
                      name="listening"
                      options={
                        feedbackCategories?.map((item) =>
                          typeof item === 'string' ? item : item.name,
                        ) ?? []
                      }
                      requiredCount={3}
                      register={register}
                      setValue={setValue}
                      trigger={trigger}
                      error={errors.listening}
                      gridCols="grid-cols-2"
                      isLoading={isFeedbackLoading}
                    />
                    <MultiToggleButtonGroup
                      label="저는 이런 사람이에요"
                      name="selfintro"
                      options={
                        selfIntroCategories?.map((item) =>
                          typeof item === 'string' ? item : item.name,
                        ) ?? []
                      }
                      requiredCount={3}
                      register={register}
                      setValue={setValue}
                      trigger={trigger}
                      error={errors.selfintro}
                      gridCols="grid-cols-2"
                      isLoading={isSelfIntroLoading}
                    />
                  </div>
                </div>
                <ProfileImageSection
                  setValue={setValue}
                  trigger={trigger}
                  onImagesChange={setImages}
                />
              </div>
              <SignupSubmitButton
                isValid={isFormValid()}
                isImageValid={images.filter(Boolean).length >= 2}
                isPending={false}
              />
            </form>
          </FormProvider>
        </section>
      </div>
    </main>
  );
}

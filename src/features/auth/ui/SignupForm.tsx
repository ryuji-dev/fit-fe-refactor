'use client';

import { useState, useCallback, useEffect } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { SignupFormValues } from '@/entities/auth/signup.types';
import { signupSchema } from '@/entities/auth/signup.schema';
import Input from '@/shared/components/ui/input';
import { SignupButton, SignupSubmitButton } from './SignupButton';
import GenderSelector from './GenderSelector';
import RegionSelector from './RegionSelector';
import MbtiSelector from './MbtiSelector';
import MultiToggleButtonGroup from './MultiToggleButtonGroup';
import ProfileImageSection from './ProfileImageSection';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

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
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [isSendingCode, setIsSendingCode] = useState(false);
  const [isVerifyingCode, setIsVerifyingCode] = useState(false);
  const [showVerificationCode, setShowVerificationCode] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSendVerificationCode = async () => {
    if (!email) {
      setError('이메일을 먼저 입력해주세요.');
      return;
    }

    setIsSendingCode(true);
    try {
      // TODO: 이메일 인증 코드 전송 API 호출
      setError(null);
      setShowVerificationCode(true);
    } catch (err) {
      setError('인증 코드 전송에 실패했습니다.');
    } finally {
      setIsSendingCode(false);
    }
  };

  const handleVerifyCode = async () => {
    if (!verificationCode) {
      setError('인증 코드를 입력해주세요.');
      return;
    }

    setIsVerifyingCode(true);
    try {
      // TODO: 인증 코드 확인 API 호출
      setIsEmailVerified(true);
      setError(null);
    } catch (err) {
      setError('인증 코드가 일치하지 않습니다.');
    } finally {
      setIsVerifyingCode(false);
    }
  };

  const onSubmit = (data: SignupFormValues) => {
    console.log(data);
    // TODO: 회원가입 로직 구현
  };

  // 모든 필드가 유효한지 확인하는 함수
  const isFormValid = useCallback(() => {
    const requiredFields = [
      'email',
      'password',
      'confirmPassword',
      'name',
      'nickname',
      'gender',
      'region',
      'mbti',
    ];

    const isAllFieldsValid = requiredFields.every((field) => {
      const fieldError = errors[field as keyof typeof errors];
      const isDirty = dirtyFields[field as keyof typeof dirtyFields];
      return !fieldError && isDirty;
    });

    // 배열 필드 유효성 검사
    const isInterestsValid = !errors.interests && watch('interests')?.length === 3;
    const isListeningValid = !errors.listening && watch('listening')?.length === 3;
    const isSelfintroValid = !errors.selfintro && watch('selfintro')?.length === 3;

    const uploadedImageCount = images.filter(Boolean).length;
    const isImageValid = uploadedImageCount >= 2;

    return (
      isAllFieldsValid &&
      isInterestsValid &&
      isListeningValid &&
      isSelfintroValid &&
      isImageValid &&
      isEmailVerified
    );
  }, [errors, dirtyFields, images, isEmailVerified, watch]);

  useEffect(() => {
    methods.trigger();
  }, []);

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
          <h1 className="bg-gradient-to-r from-violet-600 to-rose-600 bg-clip-text text-2xl font-bold text-transparent">
            회원가입
          </h1>
          <p className="mt-2 text-sm text-zinc-600">추가 정보를 입력해주세요</p>
        </header>

        {/* 회원가입 폼 */}
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
                          />
                        </div>
                        <SignupButton
                          type="button"
                          onClick={handleSendVerificationCode}
                          disabled={isSendingCode || isEmailVerified || !isEmailValid}
                          className="mt-7"
                          size="sm"
                          isLoading={isSendingCode}
                          isCompleted={isEmailVerified}
                          loadingText="전송 중..."
                          completedText="인증 완료"
                          defaultText="이메일 인증"
                        />
                      </div>
                    </div>
                    {/* 인증 코드 */}
                    {showVerificationCode && !isEmailVerified && (
                      <div className="animate-slide-down w-full lg:col-span-2">
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
                            />
                          </div>
                          <SignupButton
                            type="button"
                            onClick={handleVerifyCode}
                            disabled={
                              isVerifyingCode || isEmailVerified || !isVerificationCodeValid
                            }
                            className="mt-7"
                            size="sm"
                            isLoading={isVerifyingCode}
                            loadingText="확인 중..."
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
                  {/* 자기소개 */}
                  <div className="space-y-6">
                    <MultiToggleButtonGroup
                      label="관심사"
                      name="interests"
                      options={['운동', '여행', '음악', '영화', '독서', '게임']}
                      requiredCount={3}
                      register={register}
                      setValue={setValue}
                      trigger={trigger}
                      error={errors.interests}
                    />
                    <MultiToggleButtonGroup
                      label="이런 얘기 많이 들어요"
                      name="listening"
                      options={['공감', '조언', '위로', '격려', '칭찬']}
                      requiredCount={3}
                      register={register}
                      setValue={setValue}
                      trigger={trigger}
                      error={errors.listening}
                      gridCols="grid-cols-2"
                    />
                    <MultiToggleButtonGroup
                      label="저는 이런 사람이에요"
                      name="selfintro"
                      options={['활발한', '차분한', '감성적인', '논리적인', '창의적인']}
                      requiredCount={3}
                      register={register}
                      setValue={setValue}
                      trigger={trigger}
                      error={errors.selfintro}
                      gridCols="grid-cols-2"
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

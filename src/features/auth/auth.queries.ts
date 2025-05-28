import { useQuery } from '@tanstack/react-query';
import {
  getInterestCategoriesApi,
  getFeedbackCategoriesApi,
  getSelfIntroCategoriesApi,
} from './api/auth';

// 관심사 카테고리 조회
export const useGetInterestCategories = () => {
  return useQuery({
    queryKey: ['interestCategories'],
    queryFn: getInterestCategoriesApi,
  });
};

// 이런 얘기 많이 들어요 카테고리 조회
export const useGetFeedbackCategories = () => {
  return useQuery({
    queryKey: ['feedbackCategories'],
    queryFn: getFeedbackCategoriesApi,
  });
};

// 저는 이런 사람이에요 카테고리 조회
export const useGetSelfIntroCategories = () => {
  return useQuery({
    queryKey: ['selfIntroCategories'],
    queryFn: getSelfIntroCategoriesApi,
  });
};

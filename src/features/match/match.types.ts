export interface MatchUserProfile {
  id: string;
  name: string;
  age: number;
  location: string;
  height: number;
  mbti: string;
  imageUrl: string;
}

export interface MatchProfileCardProps {
  user: MatchUserProfile;
  onSelect: () => void;
}

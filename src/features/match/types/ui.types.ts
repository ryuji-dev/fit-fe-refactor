import { UserInterface } from './api.types';

export interface MatchProfileCardProps {
  user: UserInterface;
  onSelect: () => void;
}

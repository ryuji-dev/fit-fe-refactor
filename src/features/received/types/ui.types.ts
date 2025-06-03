export interface ReceivedProfile {
  id: string;
  name: string;
  age: number;
  location: string;
  likes: number;
  imageUrl: string;
  isOnline: boolean;
  isSuccess?: boolean;
}

export interface ReceivedProfileSectionProps {
  title: string;
  profiles: ReceivedProfile[];
  showMore: boolean;
  onToggleShowMore: () => void;
  isActionCard?: boolean;
  onAccept?: (id: string) => void;
  onReject?: (id: string) => void;
}

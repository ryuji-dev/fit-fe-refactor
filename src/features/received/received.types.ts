import { ReceivedProfile } from './ui/ReceivedContainer';

export interface ReceivedProfileSectionProps {
  title: string;
  profiles: ReceivedProfile[];
  showMore: boolean;
  onToggleShowMore: () => void;
  isActionCard?: boolean;
  onAccept?: (id: string) => void;
  onReject?: (id: string) => void;
}

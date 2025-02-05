import { Timer } from "./timer";

export interface TimerModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title: string;
  timer?: Timer;
}

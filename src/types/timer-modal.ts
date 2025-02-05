import { Timer } from "./timer";

export interface TimerModalProps {
  isOpen: boolean;
  onClose: () => void;
  timer?: Timer;
}

export interface ModalButtonProps {
  type: "submit" | "button";
  onClick?: () => void;
  disabled?: boolean;
  className: string;
  children: React.ReactNode;
}

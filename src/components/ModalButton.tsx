import React from "react";
import { ModalButtonProps } from "../types/modal-button";

const ModalButton: React.FC<ModalButtonProps> = ({
  type,
  onClick,
  disabled,
  className,
  children,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${className}`}
    >
      {children}
    </button>
  );
};

export default ModalButton;

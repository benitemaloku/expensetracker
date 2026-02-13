import React from "react";

const Modal = ({ children, isOpen, onClose, title }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center bg-black/40">
      <div className="relative p-4 w-full max-w-2xl">
        <div className="relative bg-white rounded-lg shadow-md">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">{title}</h3>
            <button
              type="button"
              aria-label="Close modal"
              className="text-gray-500 hover:bg-gray-200 rounded-full w-8 h-8 flex items-center justify-center transition"
              onClick={onClose}
            >
              ✕
            </button>
          </div>

          {/* Content */}
          <div className="p-4">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Modal;

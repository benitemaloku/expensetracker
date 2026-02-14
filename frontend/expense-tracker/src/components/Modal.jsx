import React from "react";

const Modal = ({ children, isOpen, onClose, title }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex overflow-y-auto">
      
      <div className="relative w-full min-h-screen flex items-start md:items-center justify-center p-4">
        
        <div className="bg-white w-full max-w-lg rounded-xl shadow-xl animate-fadeIn">

          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <h3 className="text-lg font-semibold">{title}</h3>

            <button
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-200 transition"
            >
              ✕
            </button>
          </div>

          {/* Body */}
          <div className="p-4 max-h-[80vh] overflow-y-auto">
            {children}
          </div>

        </div>
      </div>
    </div>
  );
};

export default Modal;

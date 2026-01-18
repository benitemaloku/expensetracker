import React from "react";

const Modal = ({ children, isOpen, onClose, title }) => {
  
  if (!isOpen) return null
  
  return <div className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-[calc(100%-1rem)] max-h-full overflow-y-auto overflow-x-hidden bg-black/20 bg-opacity-50">
  <div className="relative p-4 w-full max-w-2xl max-h-full">
    <div className="relative bg-white rounded-lg shadow-sm">


      <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-900 border-gray-200">
        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-900">
          {title}
        </h3>

        <button
          type="button"
          className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-300 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center dark:hover:bg-gray-300 dark:hover:text-white cursor-pointer"
          onClick={onClose}
        >
          <span className="text-base font-bold text-white dark:text-gray-700"> X </span>

   
        </button>
      </div>

      <div className="p-3 md:p-4 space-y-3">
        {children}
      </div>
    </div>
  </div>
  </div>
};

export default Modal;
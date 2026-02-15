import React from 'react';

interface ModalProps {
    isOpen: boolean;
    title: string;
    message: React.ReactNode;
    onConfirm: () => void;
    onCancel?: () => void;
    confirmText?: string;
    cancelText?: string;
    isConfirmOnly?: boolean;
}

const Modal: React.FC<ModalProps> = ({
    isOpen,
    title,
    message,
    onConfirm,
    onCancel,
    confirmText = "ตกลง",
    cancelText = "ยกเลิก",
    isConfirmOnly = false,
}) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-fade-in">
            <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full mx-4 transform transition-all scale-100">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">{title}</h3>
                <div className="text-gray-600 mb-8 text-lg leading-relaxed">{message}</div>
                <div className="flex justify-end space-x-4">
                    {!isConfirmOnly && onCancel && (
                        <button
                            onClick={onCancel}
                            className="px-6 py-2.5 rounded-lg text-gray-600 font-semibold hover:bg-gray-100 transition-colors"
                        >
                            {cancelText}
                        </button>
                    )}
                    <button
                        onClick={onConfirm}
                        className="px-6 py-2.5 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 shadow-md transition-transform transform hover:scale-105"
                    >
                        {confirmText}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Modal;

import React, { useState, useEffect } from 'react';

interface ToastProps {
    message: string;
    duration?: number;
    onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ message, duration = 3000, onClose }) => {

    // Estado de visibilidad del Toast
    const [isVisible, setIsVisible] = useState(false);

    // Ciclo de vida del Toast
    useEffect(() => {
        setIsVisible(true);

        const timer = setTimeout(() => {
            setIsVisible(false);
            setTimeout(onClose, 50);
        }, duration);

        return () => {
            clearTimeout(timer);
        };
    }, [duration, onClose]);

    return (
        <div
            onClick={onClose}
            className={`flex align-center justify-center w-auto fixed top-0 left-1/2 transform -translate-x-1/2 mt-4 px-4 py-2 bg-red-400 text-white rounded-lg shadow-lg cursor-pointer transition-transform duration-300 ${isVisible ? 'translate-y-0' : '-translate-y-full'
                }`}
        >
            {message}
        </div>
    );
};

export default Toast;
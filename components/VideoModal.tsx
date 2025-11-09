
import React, { useEffect, useRef } from 'react';

interface VideoModalProps {
    isOpen: boolean;
    videoSrc: string;
    onClose: () => void;
}

const VideoModal: React.FC<VideoModalProps> = ({ isOpen, videoSrc, onClose }) => {
    const modalVideoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        if (isOpen && modalVideoRef.current) {
            modalVideoRef.current.play().catch(error => console.log("Autoplay prevented:", error));
        }

        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && isOpen) {
                onClose();
            }
        };

        if (isOpen) {
            document.body.style.overflow = 'hidden';
            document.addEventListener('keydown', handleEsc);
        } else {
            document.body.style.overflow = 'unset';
        }

        return () => {
            document.body.style.overflow = 'unset';
            document.removeEventListener('keydown', handleEsc);
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div 
            className="fixed inset-0 bg-black/95 z-[9999] flex items-center justify-center p-5 transition-opacity duration-300"
            onClick={onClose}
        >
            <div className="relative max-w-4xl w-full" onClick={(e) => e.stopPropagation()}>
                <button 
                    className="absolute -top-12 right-0 bg-magenta-neon text-white w-10 h-10 rounded-full text-2xl cursor-pointer flex items-center justify-center transition-transform hover:scale-110"
                    onClick={onClose}
                >
                    &times;
                </button>
                <video ref={modalVideoRef} controls loop autoPlay className="w-full h-auto max-h-[90vh] border-2 border-magenta-neon shadow-[0_0_50px_rgba(255,0,255,0.5)]">
                    <source src={videoSrc} type="video/mp4" />
                    Tu navegador no soporta el elemento de video.
                </video>
            </div>
        </div>
    );
};

export default VideoModal;

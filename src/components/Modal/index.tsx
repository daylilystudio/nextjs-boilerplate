'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import {
  MouseEventHandler,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

import { MODAL_PARAM } from '@/utils/const';

const MAX_WIDTH_CLASSES = {
  sm: 'max-w-xl',
  md: 'max-w-2xl',
  lg: 'max-w-3xl',
  xl: 'max-w-4xl',
};
type ModalSize = keyof typeof MAX_WIDTH_CLASSES;
const ANIMATION_DURATION = 500;

export default function Modal({
  children,
  size = 'lg',
}: {
  children: React.ReactNode;
  size?: ModalSize;
}) {
  const router = useRouter();
  const overlay = useRef<HTMLDivElement>(null);

  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [isOpen, setIsOpen] = useState(false);

  // closing the modal
  const onDismiss = useCallback(() => {
    setIsOpen(false);
    // Wait for animation to finish before DOM removal
    setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());
      params.delete(MODAL_PARAM);
      router.push(`${pathname}?${params.toString()}`, { scroll: false });
    }, ANIMATION_DURATION);
  }, [searchParams, pathname, router]);

  useEffect(() => {
    setTimeout(() => setIsOpen(true), 0);

    // Esc key handler
    const handleKeydown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onDismiss();
      }
    };
    document.addEventListener('keydown', handleKeydown);
    return () => {
      document.removeEventListener('keydown', handleKeydown);
    };
  }, [onDismiss]);

  // Handles clicking outside the modal content
  const onClick: MouseEventHandler = useCallback(
    (e) => {
      if (e.target === overlay.current) {
        onDismiss();
      }
    },
    [onDismiss, overlay],
  );

  // animation classes
  const overlayClasses = isOpen ? 'opacity-100' : 'opacity-0';
  const contentClasses = isOpen
    ? 'opacity-100 scale-100'
    : 'opacity-0 scale-75';

  return (
    // Fixed overlay with Tailwind for dark background and centering
    <div
      ref={overlay}
      className={`fixed inset-0 z-50 bg-black/75 flex items-center justify-center transition-opacity duration-${ANIMATION_DURATION} ${overlayClasses}`}
      onClick={onClick}
    >
      {/* Modal content container */}
      <div
        className={`relative bg-white rounded-lg shadow-xl w-full p-6 mx-4 ${MAX_WIDTH_CLASSES[size]} transition-all duration-${ANIMATION_DURATION} ${contentClasses}`}
      >
        <button
          onClick={onDismiss}
          className="absolute cursor-pointer top-0 right-0 px-2.5 text-gray-300 hover:text-gray-500"
        >
          {/* Example Close Icon (using a simple 'X') */}
          <span className="text-3xl">×</span>
        </button>
        {children}
      </div>
    </div>
  );
}

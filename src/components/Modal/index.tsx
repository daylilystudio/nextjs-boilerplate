'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { MouseEventHandler, useCallback, useEffect, useRef } from 'react';

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
  title,
  children,
  size = 'lg',
  className,
  searchParamName,
  isOpen,
  onClose,
}: {
  title?: string;
  children: React.ReactNode;
  size?: ModalSize;
  className?: string;
  searchParamName?: string;
  isOpen: boolean;
  onClose: () => void;
}) {
  const router = useRouter();
  const overlay = useRef<HTMLDivElement>(null);

  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Update URL when modal opens/closes
  useEffect(() => {
    if (!searchParamName) return;
    const params = new URLSearchParams(searchParams.toString());
    const currentParam = params.get(MODAL_PARAM);
    if (isOpen && currentParam !== searchParamName) {
      params.set(MODAL_PARAM, searchParamName);
      router.push(`${pathname}?${params.toString()}`, { scroll: false });
    } else if (!isOpen && currentParam === searchParamName) {
      params.delete(MODAL_PARAM);
      router.push(`${pathname}?${params.toString()}`, { scroll: false });
    }
  }, [isOpen, searchParamName, pathname, router, searchParams]);

  // Esc key handler & body's overflow
  useEffect(() => {
    const handleKeydown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('keydown', handleKeydown);
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleKeydown);
      document.body.style.overflow = '';
    };
  }, [onClose, isOpen]);

  // Handles clicking outside the modal content
  const onClick: MouseEventHandler = useCallback(
    (e) => {
      if (e.target === overlay.current) {
        onClose();
      }
    },
    [onClose, overlay],
  );

  const overlayClasses = isOpen
    ? 'opacity-100'
    : 'opacity-0 pointer-events-none';
  const contentClasses = isOpen
    ? 'opacity-100 scale-100'
    : 'opacity-0 scale-75';

  return (
    <div
      ref={overlay}
      className={`fixed inset-0 z-50 bg-black/75 flex items-center justify-center transition-opacity duration-${ANIMATION_DURATION} ${overlayClasses}`}
      onClick={onClick}
    >
      <div
        className={`${className} relative bg-white rounded-lg shadow-xl mx-4 flex flex-col max-h-[calc(100vh-theme(spacing.8))] w-full ${MAX_WIDTH_CLASSES[size]} transition-all duration-${ANIMATION_DURATION} ${contentClasses}`}
      >
        <button
          onClick={onClose}
          className="absolute cursor-pointer top-1 right-0 px-2.5 text-gray-300 hover:text-gray-400"
        >
          <span className="text-3xl">×</span>
        </button>
        {title && (
          <div className="text-2xl font-semibold m-4 text-gray-600">
            {title}
          </div>
        )}
        <div className="overflow-y-auto">{children}</div>
      </div>
    </div>
  );
}

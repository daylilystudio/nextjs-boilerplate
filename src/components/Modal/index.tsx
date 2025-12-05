'use client';

import { useSearchParams } from 'next/navigation';
import { MouseEventHandler, useCallback, useEffect, useRef } from 'react';

import { useProgressRouter } from '@/hooks/useProgressRouter';
import { usePathname } from '@/i18n/navigation';
import { MODAL_PARAM } from '@/utils/const';

const MAX_WIDTH_CLASSES = {
  sm: 'max-w-xl',
  md: 'max-w-2xl',
  lg: 'max-w-3xl',
  xl: 'max-w-4xl',
};
type ModalSize = keyof typeof MAX_WIDTH_CLASSES;

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
  const router = useProgressRouter();
  const overlay = useRef<HTMLDivElement>(null);

  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Update URL when modal opens/closes
  const hasSetParam = useRef(false);
  const wasOpen = useRef(false);

  useEffect(() => {
    if (!searchParamName) return;

    const params = new URLSearchParams(searchParams.toString());
    const currentParam = params.get(MODAL_PARAM);

    if (isOpen) {
      // Modal is opening - set the param
      wasOpen.current = true;
      if (hasSetParam.current) return;
      if (currentParam !== searchParamName) {
        params.set(MODAL_PARAM, searchParamName);
        router.push(`${pathname}?${params.toString()}`, { scroll: false });
        hasSetParam.current = true;
      }
    } else if (wasOpen.current) {
      // Modal is closing (and was previously open) - remove the param
      hasSetParam.current = false;
      if (currentParam === searchParamName) {
        router.push(pathname, { scroll: false });
      }
      wasOpen.current = false;
    }
  }, [isOpen, searchParamName, pathname, router, searchParams]);

  // Esc key handler & body's overflow & focus management
  useEffect(() => {
    const handleKeydown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('keydown', handleKeydown);
    const originalOverflow = document.body.style.overflow;
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleKeydown);
      document.body.style.overflow = originalOverflow;
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
      tabIndex={-1}
      className={`fixed inset-0 z-50 bg-black/75 flex items-center justify-center transition-opacity duration-300 ${overlayClasses}`}
      onClick={onClick}
    >
      <div
        className={`${className} relative bg-white rounded-lg shadow-xl flex flex-col max-h-[calc(100vh-theme(spacing.8))] w-[calc(100vw-theme(spacing.8))] ${MAX_WIDTH_CLASSES[size]} transition-all duration-300 ${contentClasses}`}
      >
        <button
          onClick={onClose}
          className="absolute z-5 cursor-pointer top-1 right-0 px-2.5 text-gray-300 hover:text-gray-400"
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

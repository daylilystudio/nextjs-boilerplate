import { useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';

import { MODAL_PARAM } from '@/utils/const';

export function useModal(searchParamName?: string) {
  const [isOpen, setIsOpen] = useState(false);
  const searchParams = useSearchParams();

  useEffect(() => {
    if (searchParamName) {
      const modalParam = searchParams.get(MODAL_PARAM);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsOpen(modalParam === searchParamName);
    }
  }, [searchParams, searchParamName]);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);
  const toggle = useCallback(() => setIsOpen((prev) => !prev), []);

  return {
    isOpen,
    open,
    close,
    toggle,
  };
}

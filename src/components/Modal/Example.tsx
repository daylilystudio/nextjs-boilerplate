'use client';
import { useSearchParams } from 'next/navigation';

import Modal from '@/components/Modal';
import { MODAL_PARAM } from '@/utils/const';

export default function Example() {
  const searchParams = useSearchParams();
  const modal = searchParams.get(MODAL_PARAM);

  if (modal !== 'modal-example') return null;

  return (
    <Modal>
      <h2 className="text-2xl font-semibold mb-4 text-gray-600">
        Modal Example
      </h2>
      <p className="text-gray-700">
        This content is shown in a Tailwind CSS modal!
      </p>
    </Modal>
  );
}

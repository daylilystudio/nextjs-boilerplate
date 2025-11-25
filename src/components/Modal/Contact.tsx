'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter, useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import Modal from '@/components/Modal';
import { MODAL_PARAM } from '@/utils/const';

function ContactForm() {
  const t = useTranslations('contact');
  const router = useRouter();

  const [isSubmit, setIsSubmit] = useState(false);
  const [failedMessage, setFailedMessage] = useState('');

  const schema = z.object({
    name: z.string().min(1, { message: t('required') }),
    email: z
      .string()
      .min(1, { message: t('required') })
      .email({ message: t('invalid_email') }),
    message: z.string().min(1, { message: t('required') }),
    honeyPot: z.string().optional(), // 防止機器人
  });

  type FormData = z.infer<typeof schema>;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    if (data.honeyPot) {
      setIsSubmit(true);
      return;
    }
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          message: data.message,
        }),
      });

      if (res.ok) {
        setIsSubmit(true);
        reset();
      } else {
        setFailedMessage(t('failed'));
      }
    } catch (error) {
      setFailedMessage(t('failed'));
      console.error('Error submitting form:', error);
    }
  };

  return (
    <Modal className="text-black font-bold text-lg" size="sm">
      {isSubmit ? (
        <div className="flex flex-col gap-6 p-10">
          <p
            className="text-2xl text-center"
            dangerouslySetInnerHTML={{ __html: t('thanks') }}
          />
          <button
            onClick={() => router.push('/', { scroll: false })}
            className="bg-gray-500 text-white rounded-full hover:opacity-90 transition-opacity cursor-pointer py-3 mt-4"
          >
            {t('close')}
          </button>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-6 p-8"
        >
          {(['name', 'email', 'message'] as const).map((field) => (
            <div className="relative flex flex-col gap-2" key={field}>
              <label htmlFor={field}>{t(field)} *</label>
              {field === 'message' ? (
                <textarea
                  id={field}
                  rows={6}
                  className="bg-gray-200 p-3 rounded-md outline-none focus:ring-2 focus:ring-gray-400 resize-none"
                  {...register(field)}
                />
              ) : (
                <input
                  type="text"
                  id={field}
                  className="bg-gray-200 p-3 rounded-md outline-none focus:ring-2 focus:ring-gray-400"
                  {...register(field)}
                />
              )}
              {errors[field] && (
                <span className="absolute top-2 right-2 text-red-500 text-sm">
                  {errors[field]?.message}
                </span>
              )}
            </div>
          ))}

          <div className="absolute top-0 left-0 z-[-1] opacity-0 w-0 h-0 overflow-hidden">
            <input type="text" tabIndex={-1} {...register('honeyPot')} />
          </div>

          {failedMessage && (
            <p className="text-red-500 text-sm text-center">{failedMessage}</p>
          )}

          <button
            type="submit"
            className="bg-gray-500 text-white rounded-full hover:opacity-90 transition-opacity cursor-pointer py-3 mt-4"
          >
            {t('submit')} <span>&rarr;</span>
          </button>
        </form>
      )}
    </Modal>
  );
}

export default function ContactModalWrapper() {
  const searchParams = useSearchParams();
  const modal = searchParams.get(MODAL_PARAM);

  if (modal !== 'modal-contact') return null;

  return <ContactForm />;
}

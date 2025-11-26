'use client';

import { ProgressProvider } from '@bprogress/next/app';
import { SessionProvider } from 'next-auth/react';
import { AbstractIntlMessages, NextIntlClientProvider } from 'next-intl';

type Props = {
  children: React.ReactNode;
  locale: string;
  messages: AbstractIntlMessages;
  timeZone: string;
};

export function NextIntlProvider({
  children,
  locale,
  messages,
  timeZone,
}: Props) {
  return (
    <SessionProvider basePath="/api/auth">
      <NextIntlClientProvider
        locale={locale}
        messages={messages}
        timeZone={timeZone}
      >
        <ProgressProvider
          height="4px"
          color="#37ccd4"
          options={{ showSpinner: false }}
          shallowRouting
        >
          {children}
        </ProgressProvider>
      </NextIntlClientProvider>
    </SessionProvider>
  );
}

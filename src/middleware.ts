import { NextRequest } from 'next/server';
import createIntlMiddleware from 'next-intl/middleware';

import { routing } from '@/i18n/routing';

export function middleware(request: NextRequest) {
  const handleI18nRouting = createIntlMiddleware(routing);
  const response = handleI18nRouting(request);
  return response;
}

export const config = {
  matcher: ['/', '/((?!api|_next|_vercel|.*\\..*).*)'],
};

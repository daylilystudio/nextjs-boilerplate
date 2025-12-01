import { Zen_Maru_Gothic } from 'next/font/google';

export const SITE_URL = process.env.NEXTAUTH_URL; // not published nextjs runtime env

export const MODAL_PARAM = 'modal';

export const zenMaruGothic = Zen_Maru_Gothic({
  variable: '--font-zen-maru-gothic',
  subsets: ['latin'],
  weight: ['300', '400', '500', '700', '900'],
});

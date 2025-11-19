import { promises as fs } from 'fs';
import { notFound } from 'next/navigation';
import { hasLocale } from 'next-intl';
import { getRequestConfig } from 'next-intl/server';
import path from 'path';

import { routing } from './routing';

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  // 動態讀取語言檔案
  const messages: { [key: string]: { [key: string]: string } } = {};
  const messagesDir = path.join(process.cwd(), 'src', 'messages', locale);
  try {
    const filenames = await fs.readdir(messagesDir);
    for (const filename of filenames) {
      if (filename.endsWith('.json')) {
        const namespace = filename.replace('.json', '');
        const filePath = path.join(messagesDir, filename);
        const fileContents = await fs.readFile(filePath, 'utf8');
        messages[namespace] = JSON.parse(fileContents);
      }
    }
  } catch (error) {
    console.error(`Could not load messages for locale "${locale}"`, error);
    notFound();
  }

  return {
    locale,
    messages,
    timeZone: 'Asia/Taipei',
  };
});

'use client';

import { Link } from '@/i18n/navigation';
import { locales } from '@/i18n/routing';

export default function LangSwitcher() {
  return (
    <div className="flex items-center space-x-2">
      <Link href='/' locale={locales[0]} className="text-gray-400 hover:text-blue-500 transition-colors">
        繁體中文
      </Link>
      <span>|</span>
      <Link href='/' locale={locales[1]} className="text-gray-400 hover:text-blue-500 transition-colors">
        English
      </Link>
    </div>
  );
}
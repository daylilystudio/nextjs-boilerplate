'use client';

import { useEffect, useRef } from 'react';

export default function FacebookShareButton() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const parse = () => {
      // 在 Next.js 中切換路由或語系時，組件會重新掛載 (Remount)。
      // 雖然 window.FB 已經載入，但新的 DOM 元素尚未被 Facebook SDK 解析。
      // 因此需要手動呼叫 FB.XFBML.parse 來重新渲染分享按鈕。
      if (window.FB && ref.current) {
        try {
          window.FB.XFBML?.parse(ref.current);
        } catch (error) {
          console.error('Facebook SDK parse error:', error);
        }
      }
    };

    if (window.fbSdkLoaded) {
      parse();
    } else {
      window.addEventListener('fb-sdk-ready', parse);
      return () => {
        window.removeEventListener('fb-sdk-ready', parse);
      };
    }
  }, []);

  return (
    <div ref={ref}>
      <div
        className="fb-share-button"
        data-size="large"
        data-layout="button_count"
        data-href="https://www.facebook.com/" // TO DO: Replace with your page URL
      />
    </div>
  );
}

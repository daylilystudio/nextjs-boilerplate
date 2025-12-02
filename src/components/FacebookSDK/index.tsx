'use client';

import { useLocale } from 'next-intl';
import { useEffect } from 'react';

import { Locale } from '@/i18n/routing';

const fbLocaleMap = {
  [Locale.ZH_TW]: 'zh_TW',
  [Locale.EN]: 'en_US',
};

declare global {
  interface Window {
    fbSdkLoaded?: boolean;
    FB?: {
      init: (params: {
        appId: string;
        autoLogAppEvents?: boolean;
        xfbml?: boolean;
        version: string;
      }) => void;
      AppEvents: {
        logPageView: () => void;
      };
      XFBML?: {
        parse: (element?: HTMLElement) => void;
      };
    };
  }
}

export default function FacebookSDK() {
  const locale = useLocale() as Locale;

  useEffect(() => {
    // Load the Facebook SDK asynchronously
    window.fbAsyncInit = function () {
      window.FB?.init({
        appId: '', // TO DO: Replace with your Facebook App ID
        autoLogAppEvents: true,
        xfbml: true,
        version: 'v24.0',
      });
      window.fbSdkLoaded = true;
      window.dispatchEvent(new Event('fb-sdk-ready'));
    };

    // Load the SDK script
    (function (d, s, id) {
      const fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      const js = d.createElement(s) as HTMLScriptElement;
      js.id = id;
      js.src = `https://connect.facebook.net/${fbLocaleMap[locale]}/sdk.js`;
      fjs.parentNode?.insertBefore(js, fjs);
    })(document, 'script', 'facebook-jssdk');

    return () => {
      const script = document.getElementById('facebook-jssdk');
      if (script) {
        script.remove();
      }
      delete window.FB;
      window.fbSdkLoaded = false;
    };
  }, [locale]);

  return <div id="fb-root" />;
}

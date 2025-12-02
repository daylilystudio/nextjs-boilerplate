'use client';

import { useEffect } from 'react';

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
      js.src = 'https://connect.facebook.net/en_US/sdk.js';
      fjs.parentNode?.insertBefore(js, fjs);
    })(document, 'script', 'facebook-jssdk');
  }, []);

  return <div id="fb-root" />;
}

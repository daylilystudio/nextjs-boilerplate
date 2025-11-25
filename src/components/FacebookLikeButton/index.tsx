'use client';

import { useEffect, useRef } from 'react';

export default function FacebookLikeButton() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Parse Facebook plugins when SDK is ready
    if (window.FB && containerRef.current) {
      window.FB.XFBML?.parse(containerRef.current);
    }
  }, []);

  return (
    <div ref={containerRef}>
      <div
        className="fb-like"
        data-href="https://www.facebook.com/" // TO DO: Replace with your page URL
        data-width=""
        data-layout="button_count"
        data-action="like"
        data-size="large"
        data-share="true"
        data-show-faces="false"
      />
    </div>
  );
}

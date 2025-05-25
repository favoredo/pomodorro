"use client";

import { useEffect } from 'react';
import Head from 'next/head';
import Script from 'next/script';
import Image from 'next/image';

declare global {
  interface Window {
    ym?: (id: number, action: string, options: Record<string, boolean>) => void;
  }
}

export default function YandexMetrika() {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Initialize Yandex Metrika function
      window.ym = window.ym || function() {(window.ym.a = window.ym.a || []).push(arguments)};
      window.ym.l = new Date().getTime();

      // Check if script already exists
      const existingScript = Array.from(document.scripts).find(
        (script) => script.src === 'https://mc.yandex.ru/metrika/tag.js'
      );
      if (existingScript) return;

      // Inject the script
      const script = document.createElement('script');
      script.async = true;
      script.src = 'https://mc.yandex.ru/metrika/tag.js';
      
      const firstScript = document.getElementsByTagName('script')[0];
      firstScript.parentNode?.insertBefore(script, firstScript);

      // Initialize tracker
      window.ym(102157439, 'init', {
        clickmap: true,
        trackLinks: true,
        accurateTrackBounce: true
      });
    }
  }, []);

  return (
    <>
      <Head>
        {/* Noscript fallback */}
        <noscript>
          <div>
            <Image
              src="https://mc.yandex.ru/watch/102157439"
              style={{ position: 'absolute', left: '-9999px' }}
              alt=""
            />
          </div>
        </noscript>
      </Head>
      
      {/* Alternative using Next.js Script component */}
      <Script
        id="yandex-metrika"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (function(m,e,t,r,i,k,a){
              m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
              m[i].l=1*new Date();
              for (var j = 0; j < document.scripts.length; j++) {
                if (document.scripts[j].src === r) { return; }
              }
              k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
            })
            (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
            
            ym(102157439, "init", {
              clickmap:true,
              trackLinks:true,
              accurateTrackBounce:true
            });
          `
        }}
      />
    </>
  );
}
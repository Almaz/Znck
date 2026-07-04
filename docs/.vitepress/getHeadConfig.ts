import { HeadConfig } from 'vitepress';

const getHeadConfig = ({
  title,
  description,
  socialTitle,
}: {
  title: string;
  description: string;
  socialTitle?: string;
}): HeadConfig[] => [
  [
    'link',
    {
      rel: 'icon',
      type: 'image/svg+xml',
      href: '/favicon.svg',
    },
  ],
// Яндекс.Метрика
  [
    'script',
    {
      type: 'text/javascript',
      innerHTML: `
        (function(m,e,t,r,i,k,a){
          m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
          m[i].l=1*new Date();
          for (var j = 0; j < document.scripts.length; j++) {
            if (document.scripts[j].src === r) { return; }
          }
          k=e.createElement(t),a=e.getElementsByTagName(t)[0],
          k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
        })(window, document,'script','https://mc.yandex.ru/metrika/tag.js','ym');
        ym(110396542, 'init', {
          clickmap: true,
          trackLinks: true,
          accurateTrackBounce: true,
          webvisor: false, // или true, если нужен ВебВизор
          // другие параметры по желанию
        });
      `,
    },
  ],
// Носcript-вариант (для отключённого JS)
  [
    'noscript',
    {},
    `<div><img src="https://mc.yandex.ru/watch/110396542" style="position:absolute; left:-9999px;" alt="metrika" /></div>`,
  ],
  [
    'meta',
    {
      property: 'og:locale',
      content: 'ru_RU',
    },
  ],
  [
    'meta',
    {
      property: 'og:type',
      content: 'website',
    },
  ],
  [
    'meta',
    {
      property: 'og:site_name',
      content: title,
    },
  ],
  [
    'meta',
    {
      property: 'og:title',
      content: socialTitle,
    },
  ],
  [
    'meta',
    {
      property: 'og:description',
      content: description,
    },
  ],
  [
    'meta',
    {
      property: 'og:url',
      content: 'https://znck.ru',
    },
  ],
  [
    'meta',
    {
      property: 'og:image',
      content: 'https://znck.ru/og.png',
    },
  ],
  [
    'meta',
    {
      property: 'og:image:width',
      content: '1200',
    },
  ],
  [
    'meta',
    {
      property: 'og:image:height',
      content: '630',
    },
  ],
  [
    'meta',
    {
      property: 'og:image:type',
      content: 'image/png',
    },
  ],
  [
    'meta',
    {
      property: 'twitter:card',
      content: 'summary_large_image',
    },
  ],
  [
    'meta',
    {
      property: 'twitter:title',
      content: socialTitle,
    },
  ],
  [
    'meta',
    {
      property: 'twitter:description',
      content: description,
    },
  ],
  [
    'meta',
    {
      property: 'twitter:image',
      content: 'https://znck.ru/og.png',
    },
  ],
];

export default getHeadConfig;

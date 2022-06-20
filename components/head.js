import React from 'react';
// eslint-disable-next-line sort-imports
import { Head } from 'next/document';
import theme from '../theme/palette';
// eslint-disable-next-line sort-imports
import brand from '../public/text/brand';

function HeadComponent() {
  return (<Head>
      <meta charSet="utf-8" />

      {/* Use minimum-scale=1 to enable GPU rasterization */}

      <meta
          content={brand.architect.desc}
          name="description"
      />

      {/* Favicon */}

      <link
          href="/favicons/favicon.ico"
          rel="icon"
      />

      <link
          href="/favicons/apple-icon-57x57.png"
          rel="apple-touch-icon"
          sizes="57x57"
      />

      <link
          href="/favicons/apple-icon-60x60.png"
          rel="apple-touch-icon"
          sizes="60x60"
      />

      <link
          href="/favicons/apple-icon-72x72.png"
          rel="apple-touch-icon"
          sizes="72x72"
      />

      <link
          href="/favicons/apple-icon-76x76.png"
          rel="apple-touch-icon"
          sizes="76x76"
      />

      <link
          href="/favicons/apple-icon-114x114.png"
          rel="apple-touch-icon"
          sizes="114x114"
      />

      <link
          href="/favicons/apple-icon-120x120.png"
          rel="apple-touch-icon"
          sizes="120x120"
      />

      <link
          href="/favicons/apple-icon-144x144.png"
          rel="apple-touch-icon"
          sizes="144x144"
      />

      <link
          href="/favicons/apple-icon-152x152.png"
          rel="apple-touch-icon"
          sizes="152x152"
      />

      <link
          href="/favicons/apple-icon-180x180.png"
          rel="apple-touch-icon"
          sizes="180x180"
      />

      <link
          href="/favicons/android-icon-192x192.png"
          rel="icon"
          sizes="192x192"
          type="image/png"
      />

      <link
          href="/favicons/favicon-32x32.png"
          rel="icon"
          sizes="32x32"
          type="image/png"
      />

      <link
          href="/favicons/favicon-96x96.png"
          rel="icon"
          sizes="96x96"
          type="image/png"
      />

      <link
          href="/favicons/favicon-16x16.png"
          rel="icon"
          sizes="16x16"
          type="image/png"
      />

      <link
          href="/favicons/manifest.json"
          rel="manifest"
      />

      <meta
          content="#ffffff"
          name="msapplication-TileColor"
      />

      <meta
          content="/favicons/ms-icon-144x144.png"
          name="msapplication-TileImage"
      />

      {/* PWA primary color */}

      <meta
          content={theme.greenLeaf.palette.primary.main}
          name="theme-color"
      />

      <link
          href="https://fonts.googleapis.com/css?family=Lato:400,700,900&display=swap"
          rel="stylesheet"
      />

      <link
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
          rel="stylesheet"
      />

      <link
          href="https://unpkg.com/ionicons@3.0.0/dist/css/ionicons.min.css"
          rel="stylesheet"
      />

      {/*  Facebook */}

      <meta
          content="luxi"
          property="author"
      />

      <meta
          content="luxi.ux-maestro.com"
          property="og:site_name"
      />

      <meta
          content="en_US"
          property="og:locale"
      />

      <meta
          content="website"
          property="og:type"
      />

      {/*  Twitter */}

      <meta
          content="luxi.ux-maestro.com"
          property="twitter:site"
      />

      <meta
          content="luxi.ux-maestro.com"
          property="twitter:domain"
      />

      <meta
          content="luxi"
          property="twitter:creator"
      />

      <meta
          content="summary"
          property="twitter:card"
      />

      <meta
          content="/images/architect-logo.png"
          property="twitter:image:src"
      />

      <meta
          content={brand.architect.url}
          property="og:url"
      />

      <meta
          content={brand.architect.desc}
          property="og:title"
      />

      <meta
          content={brand.architect.desc}
          property="og:description"
      />

      <meta
          content={brand.architect.url}
          name="twitter:site"
      />

      <meta
          content="summary_large_image"
          name="twitter:card"
      />

      <meta
          content={brand.architect.img}
          name="twitter:image"
      />

      <meta
          content={brand.architect.img}
          property="og:image"
      />

      <meta
          content="1200"
          property="og:image:width"
      />

      <meta
          content="630"
          property="og:image:height"
      />
          </Head>);
}

export default HeadComponent;

import Header from "@/components/Header";
import "../styles/globals.css";
import Prompt from "@/components/Prompt";
import ClientProvider from "@/components/ClientProvider";
import Head from "next/head";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import { Suspense } from 'react';

export const metadata = {
  title: "AI Image Generator",
  description:
    "AI Image Generator by Kelvin Tam, Powered By OpenAI, Azure & Next.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const url = process.env.IMG_GEN_URL;
  const domain = process.env.IMG_GEN_DOMAIN;
  const og_image = process.env.OG_IMAGE;
  const GA_MEASUREMENT_ID = process.env.GA_ID;
  return (
    <html lang="en">
      <Head>
        {/* <!-- HTML Meta Tags --> */}
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        {/* <!-- Facebook Meta Tags --> */}
        <meta property="og:url" content={url} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={metadata.title} />
        <meta property="og:image" content={og_image} />
        <meta property="og:description" content={metadata.description} />

        {/* <!-- Twitter Meta Tags --> */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content={og_image} />
        <meta property="twitter:domain" content={domain} />
        <meta property="twitter:url" content={url} />
        <meta name="twitter:title" content={metadata.title} />
        <meta name="twitter:description" content={metadata.description} />
        {/* <!-- Meta Tags Generated via https://www.opengraph.xyz --> */}
      </Head>
      <Suspense>
        <GoogleAnalytics GA_MEASUREMENT_ID={GA_MEASUREMENT_ID} />
      </Suspense>
      <body className="bg-gradient-to-br from-cyan-600 via-green-300 to-blue-400 bg-fixed">
        <ClientProvider>
          <noscript className="flex justify-center bg-red-600 text-white underline">
            <p className="text-center">
              JavaScript is required to view this site. Please enable JavaScript
              in your browser settings and reload the page.
            </p>
          </noscript>
          <Header />
          <Prompt />
          {children}
        </ClientProvider>
      </body>
    </html>
  );
}

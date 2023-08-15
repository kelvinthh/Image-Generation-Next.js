export const pageview = (
  GA_MEASUREMENT_ID: string | undefined,
  url: string
) => {
  window.gtag("config", GA_MEASUREMENT_ID, {
    page_path: url,
  });
};

// For error Type error: Property 'gtag' does not exist on type 'Window & typeof globalThis'.
// https://stackoverflow.com/questions/56457935/typescript-error-property-x-does-not-exist-on-type-window
declare global {
  interface Window {
    gtag: any;
  }
}

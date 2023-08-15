export const pageview = (GA_MEASUREMENT_ID : string | undefined, url : string) => {
    window.gtag("config", GA_MEASUREMENT_ID, {
        page_path: url,
    });
};
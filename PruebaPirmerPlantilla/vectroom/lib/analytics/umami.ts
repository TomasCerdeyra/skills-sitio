declare global {
  interface Window {
    umami?: {
      track: (
        event: string,
        data?: Record<string, string | number | boolean>
      ) => void;
    };
  }
}

/**
 * Trackea un evento en Umami.
 * Si Umami no está cargado (dev, bloqueador, script no inyectado), lo ignora silenciosamente.
 */
export function trackEvent(
  event: string,
  data?: Record<string, string | number | boolean>
) {
  if (typeof window !== "undefined" && window.umami) {
    window.umami.track(event, data);
  }
}

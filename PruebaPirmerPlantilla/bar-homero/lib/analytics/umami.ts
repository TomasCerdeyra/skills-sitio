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

export function trackEvent(
  event: string,
  data?: Record<string, string | number | boolean>
) {
  if (typeof window !== "undefined" && window.umami) {
    window.umami.track(event, data);
  }
}

declare global {
  interface Window {
    umami?: {
      track: (event: string, data?: Record<string, unknown>) => void;
    };
  }
}

export function trackEvent(event: string, data?: Record<string, unknown>) {
  if (typeof window !== "undefined" && window.umami) {
    window.umami.track(event, data);
  }
}

export const analytics = {
  addToCart: (productName: string, price: number) =>
    trackEvent("add_to_cart", { product: productName, price }),
  beginCheckout: (total: number, itemCount: number) =>
    trackEvent("begin_checkout", { total, item_count: itemCount }),
  purchase: (orderId: string, total: number) =>
    trackEvent("purchase", { order_id: orderId, total }),
  viewProduct: (productName: string) =>
    trackEvent("view_product", { product: productName }),
  whatsappClick: (context: string) =>
    trackEvent("whatsapp_click", { context }),
};

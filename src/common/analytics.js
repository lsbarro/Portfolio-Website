export function trackPageView(path) {
  if (typeof window.gtag === "function") {
    window.gtag("event", "page_view", { page_path: path });
  }
}

export function trackEvent(action, category, label) {
  if (typeof window.gtag === "function") {
    window.gtag("event", action, {
      event_category: category,
      event_label: label,
    });
  }
}

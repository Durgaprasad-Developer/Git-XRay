import posthog from "posthog-js";

const posthogKey = process.env.NEXT_PUBLIC_POSTHOG_KEY;
const posthogHost = process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://app.posthog.com";

let isPosthogInitialized = false;

export const initAnalytics = () => {
  if (typeof window !== "undefined" && posthogKey && !isPosthogInitialized) {
    try {
      posthog.init(posthogKey, {
        api_host: posthogHost,
        loaded: (ph) => {
          console.log("[Analytics] PostHog initialized successfully");
        },
      });
      isPosthogInitialized = true;
    } catch (err) {
      console.warn("[Analytics Warning] PostHog initialization failed:", err);
    }
  }
};

export const trackEvent = (eventName: string, properties?: Record<string, any>) => {
  if (typeof window !== "undefined") {
    if (isPosthogInitialized) {
      posthog.capture(eventName, properties);
    } else {
      console.log(`[Analytics Mock] Event: "${eventName}"`, properties);
    }
  }
};

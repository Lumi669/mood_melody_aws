export {};

declare global {
  interface Window {
    /**
     * Google Analytics gtag function
     * Usage: window.gtag('config', 'G-XXXXXXX', {...})
     */
    gtag: (...args: any[]) => void;
  }
}

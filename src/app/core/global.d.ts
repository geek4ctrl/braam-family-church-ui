// Ambient global types. Loaded via tsconfig "include" (src/**/*).
interface Window {
  BRAAM_CONFIG?: {
    yocoCheckoutEndpoint?: string;
    /** Reserved for the future backend; POST contact form submissions. Empty = not wired. */
    contactEndpoint?: string;
    /** Reserved for the future backend; POST join registrations. Empty = not wired. */
    joinEndpoint?: string;
  };
}

// Add one Yoco hosted payment link per suggested amount after merchant onboarding.
// These are public checkout URLs only; never put Yoco API secrets in browser code.
window.BRAAM_CONFIG = window.BRAAM_CONFIG || {
  // Optional secure server endpoint for variable-amount shop checkouts. It must create a Yoco
  // Checkout session with a secret key server-side and return { redirectUrl: "https://..." }.
  yocoCheckoutEndpoint: '',
  yocoPaymentLinks: {
    50: '',
    100: '',
    200: '',
    500: '',
    1000: ''
  }
};

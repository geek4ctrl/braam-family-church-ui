# Payment setup

Card payments must stay on Yoco-hosted checkout pages. This frontend never stores card details or Yoco API secrets. The donation and shop flows also include clearly labelled one-tap demo payments using sample data; these bypass validation and never contact a payment provider or move money. Do not mistake demo receipts for real donations or orders.

## Online giving (hosted Yoco payment links)

1. Create public hosted payment links in BRAAM Family's Yoco merchant dashboard for R50, R100, R200, R500 and R1,000.
2. Put each link in `public/app-config.js` under the matching `yocoPaymentLinks` amount.
3. Test every link on desktop and mobile before publishing.

Until a link is configured for the selected amount, the giving page clearly directs visitors to the bank-transfer details instead of showing a pretend checkout.

## Shop card checkout (optional secure API)

Set `yocoCheckoutEndpoint` in `public/app-config.js` to a same-origin HTTPS API route implemented by the site's server. The browser sends the displayed cart lines and total; the server **must validate product IDs, prices and quantities against its own trusted catalogue**, create the Yoco Checkout session with the secret API key held only on the server, and return `{ "redirectUrl": "https://…" }`. The browser then redirects to hosted checkout. Do not expose the Yoco secret in `app-config.js` or any frontend bundle.

If this endpoint is not configured, Yoco is disabled for shop checkout and visitors can prepare an EFT order request using their email app. The static frontend does not report a payment or order as complete.

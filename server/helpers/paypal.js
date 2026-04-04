
const paypal = require("@paypal/checkout-server-sdk");

// Use environment variables for security
const clientId = process.env.PAYPAL_CLIENT_ID;
const clientSecret = process.env.PAYPAL_CLIENT_SECRET;

// Sandbox environment
const environment = new paypal.core.SandboxEnvironment(clientId, clientSecret);
const client = new paypal.core.PayPalHttpClient(environment);

module.exports = client;

// const paypal = require("paypal-rest-sdk");

// paypal.configure({
//   mode: "sandbox",
//   client_id: "ASLSOEGgUgH2M-R3C1R6jWCfv0jLTNTQJho2v0TD3tQ1ZI-fh9kA3y6cgECGY7b_sZK-zDaeMsRX2qJf",
//   client_secret: "EPEFYNUP9fm5bQW_25c-DVXrZSBiHMJ1UWbMgRUiGWDYOnBRJWyPdY026oUacLgawOynut5A-BILiYNE",
// });

// module.exports = paypal;
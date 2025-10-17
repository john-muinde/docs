# Kotani Pay API Documentation Gap Analysis

## Executive Summary

**Total Endpoints in OpenAPI Spec:** 119
**Currently Documented Pages:** 67
**Missing/Incomplete Documentation:** 118
**Complete Documentation:** 1

## Critical Issues

1. **Almost all endpoints are undocumented** - Only 1 endpoint has complete documentation
2. **Major endpoint categories missing** - Most API functionality lacks documentation
3. **GlobPay endpoints** - 40 endpoints with undefined summaries (likely internal/redirect endpoints)

---

## Missing Documentation by Category

### 🔴 **RATES** (5 endpoints missing)
- `GET /api/v3/rate/{from}/{to}` - Get exchange rate
- `POST /api/v3/rate/onramp` - Get Onramp Exchange rate
- `POST /api/v3/rate/offramp` - Get Offramp Exchange rate
- `POST /api/v3/rate/fiat` - Get Fiat to Fiat exchange rate
- `GET /api/v3/rate` - Get all exchange rates

**Suggested docs.json entries:**
```json
{
  "group": "Exchange Rates",
  "pages": [
    "v3/api-reference/rates/get-rate",
    "v3/api-reference/rates/get-all-rates",
    "v3/api-reference/rates/onramp-rate",
    "v3/api-reference/rates/offramp-rate",
    "v3/api-reference/rates/fiat-to-fiat"
  ]
}
```

---

### 🔴 **PUBLIC RATES** (2 endpoints missing)
- `GET /api/v3/public/rate/{from}/{to}` - Get public exchange rate (no auth required)
- `GET /api/v3/public/rate` - Get all public exchange rates (no auth required)

**Note:** These are public endpoints that don't require authentication

---

### 🔴 **FIAT WALLET** (5 endpoints missing, 1 documented)
- `POST /api/v3/wallet/fiat` - Create a Fiat Wallet
- `GET /api/v3/wallet/fiat` - Get Integrator Fiat Wallets
- `GET /api/v3/wallet/fiat/{id}` - Get Integrator Fiat Wallet by Wallet ID
- `PATCH /api/v3/wallet/fiat/{id}` - Update Integrator Fiat Wallet by Wallet ID
- `GET /api/v3/wallet/fiat/currency/{currency}` - Get Integrator Fiat Wallet by Currency
- ✅ `POST /api/v3/wallet/transfer/deposit-balance` - Transfer Deposit Balance (DOCUMENTED)

---

### 🔴 **CRYPTO WALLET** (3 endpoints missing)
- `POST /api/v3/wallet/crypto` - Create a Crypto wallet
- `GET /api/v3/wallet/crypto` - Get Integrator Crypto Wallets
- `GET /api/v3/wallet/crypto/{id}` - Get Integrator Crypto Wallet by Wallet ID

---

### 🔴 **INTEGRATOR** (3 endpoints missing)
- `POST /api/v3/integrator` - Create an integrator
- `GET /api/v3/integrator` - Get an Integrator Details
- `PATCH /api/v3/integrator/webhook` - Update webhook configuration

---

### 🔴 **AUTHENTICATION** (4 endpoints missing)
- `POST /api/v3/auth/login` - Authentication Login
- `GET /api/v3/auth/api-key/secure` - Generate API Key
- `POST /api/v3/auth/human-verify` - Human verification for suspicious requests
- `GET /api/v3/auth/refresh-token` - Refresh access token

---

### 🔴 **MOBILE MONEY DEPOSIT** (2 endpoints missing)
- `POST /api/v3/deposit/mobile-money` - Deposit via mobile money
- `GET /api/v3/deposit/mobile-money/status/{reference_id}` - Get Deposit status

**Suggested file names:**
- `v3/api-reference/deposits/mobile-money.mdx`
- `v3/api-reference/deposits/mobile-money-status.mdx`

---

### 🔴 **BANK DEPOSIT (checkout)** (2 endpoints missing)
- `POST /api/v3/deposit/bank/checkout` - Deposit via bank checkout
- `GET /api/v3/deposit/bank/checkout/status/{reference_id}` - Get Deposit status

**Suggested file names:**
- `v3/api-reference/deposits/bank-checkout.mdx`
- `v3/api-reference/deposits/bank-checkout-status.mdx`

---

### 🔴 **CARD DEPOSIT** (2 endpoints missing)
- `POST /api/v3/deposit/card` - Deposit via card
- `GET /api/v3/deposit/card/{reference_id}` - Get Deposit status

**Suggested file names:**
- `v3/api-reference/deposits/card.mdx`
- `v3/api-reference/deposits/card-status.mdx`

---

### 🔴 **CUSTOMER - MOBILE MONEY** (5 endpoints missing)
- `POST /api/v3/customer/mobile-money` - Create a mobile money customer
- `GET /api/v3/customer/mobile-money` - Get all mobile money customers
- `PATCH /api/v3/customer/mobile-money/{customer_key}` - Update a mobile money customer
- `GET /api/v3/customer/mobile-money/{customer_key}` - Get a mobile money customer by key
- `GET /api/v3/customer/mobile-money/phone/{phone_number}` - Get customer by Phone

**Suggested file names:**
- `v3/api-reference/customers/mobile-money/create.mdx`
- `v3/api-reference/customers/mobile-money/list.mdx`
- `v3/api-reference/customers/mobile-money/update.mdx`
- `v3/api-reference/customers/mobile-money/get.mdx`
- `v3/api-reference/customers/mobile-money/get-by-phone.mdx`

---

### 🔴 **CUSTOMER - VALIDATION** (2 endpoints missing)
- `POST /api/v3/customer/validate/mobile-money` - Validate mobile money account
- `POST /api/v3/customer/validate/bank` - Validate bank account

**NEW CATEGORY** - Not currently in docs.json

---

### 🔴 **WITHDRAW (Mobile Money)** (2 endpoints missing)
- `POST /api/v3/withdraw/mobile-money` - Withdraw Fiat to Mobile Money
- `GET /api/v3/withdraw/status/{reference_id}` - Get Withdrawal Status

**Suggested file names:**
- `v3/api-reference/withdrawals/mobile-money.mdx`
- `v3/api-reference/withdrawals/mobile-money-status.mdx`

---

### 🔴 **WITHDRAW V2 (Bank)** (3 endpoints missing)
- `POST /api/v3/withdraw/v2/bank` - BANK WITHDRAWAL
- `GET /api/v3/withdraw/v2/bank/status/{referenceId}` - BANK WITHDRAWAL STATUS
- `GET /api/v3/withdraw/v2/bank/supporting-banks/{currency}` - GET SUPPORTING BANKS

**Suggested file names:**
- `v3/api-reference/withdrawals/bank-v2.mdx`
- `v3/api-reference/withdrawals/bank-status.mdx`
- `v3/api-reference/withdrawals/supporting-banks.mdx`

---

### 🔴 **PAYMENT PROVIDERS** (1 endpoint missing)
- `POST /api/v3/providers` - Get Payment Providers

**NEW CATEGORY** - Not currently in docs.json
**Suggested:** `v3/api-reference/system/providers.mdx`

---

### 🟡 **DEPOSIT** (2 endpoints - need verification)
- `POST /api/v3/deposit` - Deposit (General)
- `GET /api/v3/deposit/status/{reference_id}` - Get Deposit Status

---

### 🟡 **PAYOUT** (2 endpoints - need verification)
- `POST /api/v3/payout` - Initiate Payout
- `GET /api/v3/payout/status/{reference_id}` - Get Payout Status

---

### 🟡 **ONRAMP** (4 endpoints - need verification)
- `POST /api/v3/onramp` - Create Onramp Transaction
- `GET /api/v3/onramp/status/{reference_id}` - Get Onramp Status
- `POST /api/v3/onramp/crypto` - Onramp Crypto
- `GET /api/v3/onramp/crypto/status/{reference_id}` - Get Onramp Crypto Status

---

### 🟡 **OFFRAMP** (3 endpoints - need verification)
- `POST /api/v3/offramp` - Create Offramp Transaction
- `GET /api/v3/offramp/status/{reference_id}` - Get Offramp Status
- `PATCH /api/v3/offramp/cancel/{reference_id}` - Cancel Offramp

---

### 🟡 **CROSS BORDER** (4 endpoints - need verification)
- `POST /api/v3/cross-border/generate-invoice` - Generate Invoice
- `GET /api/v3/cross-border/invoice/{invoice_id}` - Get Invoice
- `POST /api/v3/cross-border/pay-invoice` - Pay Invoice
- `GET /api/v3/cross-border/pay-invoice/status/{reference_id}` - Get Pay Invoice Status

---

### 🟡 **KYC** (5 endpoints - need verification)
- `POST /api/v3/kyc/basic-details` - Create Basic Details
- `POST /api/v3/kyc/address` - Create Address
- `POST /api/v3/kyc/document` - Create Document
- `GET /api/v3/kyc/status/{user_id}` - Get KYC Status
- `GET /api/v3/kyc/integrator-users` - Get Integrator Users

---

### 🟡 **TRANSACTION** (3 endpoints - need verification)
- Transaction-related endpoints

---

### 🟡 **PAYMENT LINK** (Multiple endpoints - need verification)
- Payment link related endpoints

---

### ⚠️ **GlobPay** (40 endpoints - Internal/Redirect)
These appear to be internal redirect endpoints for payment processing:
- `/api/v3/kpglbpay/success` (8 methods)
- `/api/v3/kpglbpay/failed` (8 methods)
- `/api/v3/kpglbpay/customer-redirect/{orderId}` (8 methods)
- `/api/v3/kpglbpay/callback` (8 methods)
- `/api/v3/kpglbpay/{path}` (8 methods - catch-all)

**Note:** These likely don't need individual documentation as they're redirect/callback URLs.

---

## Recommended Actions

### Priority 1 (Core Functionality)
1. **Authentication endpoints** - Users can't use the API without these
2. **Fiat & Crypto Wallets** - Core wallet management
3. **Deposits** - Mobile money, Bank, Card deposits
4. **Withdrawals** - Mobile money and Bank withdrawals
5. **Exchange Rates** - Essential for pricing

### Priority 2 (Important Features)
6. **Customer Management** - Create and manage customers
7. **Onramp/Offramp** - Crypto conversion features
8. **Integrator Management** - Account setup and webhook configuration

### Priority 3 (Advanced Features)
9. **Cross-Border Payments** - Invoice generation and payment
10. **KYC** - Compliance features
11. **Payment Links** - Payment link generation
12. **Customer Validation** - Account validation endpoints

### Can Skip
- **GlobPay redirect endpoints** - Internal use only

---

## Next Steps

1. **Create missing MDX files** for all documented endpoints
2. **Update docs.json** to include all new endpoint references
3. **Add new categories** to docs.json:
   - Customer Validation
   - Payment Providers (or add to System group)
4. **Verify existing documented endpoints** match the OpenAPI spec
5. **Consider grouping** similar endpoints (e.g., all deposit types together)

---

## File Structure Needed

```
v3/api-reference/
├── authentication/
│   ├── login.mdx
│   ├── generate-key.mdx
│   ├── refresh-token.mdx
│   └── human-verify.mdx
├── integrator/
│   ├── create.mdx
│   ├── get.mdx
│   └── update-webhook.mdx
├── rates/
│   ├── get-rate.mdx
│   ├── get-all-rates.mdx
│   ├── onramp-rate.mdx
│   ├── offramp-rate.mdx
│   └── fiat-to-fiat.mdx
├── wallets/
│   ├── fiat/
│   │   ├── create.mdx
│   │   ├── list.mdx
│   │   ├── get.mdx
│   │   ├── get-by-currency.mdx
│   │   ├── update.mdx
│   │   └── transfer-deposit-balance.mdx ✅
│   └── crypto/
│       ├── create.mdx
│       ├── list.mdx
│       └── get.mdx
├── customers/
│   ├── mobile-money/
│   │   ├── create.mdx
│   │   ├── list.mdx
│   │   ├── get.mdx
│   │   ├── get-by-phone.mdx
│   │   └── update.mdx
│   └── validation/
│       ├── mobile-money.mdx
│       └── bank.mdx
├── deposits/
│   ├── mobile-money.mdx
│   ├── mobile-money-status.mdx
│   ├── bank-checkout.mdx
│   ├── bank-checkout-status.mdx
│   ├── card.mdx
│   ├── card-status.mdx
│   ├── initiate.mdx
│   └── status.mdx
├── withdrawals/
│   ├── mobile-money.mdx
│   ├── mobile-money-status.mdx
│   ├── bank-v2.mdx
│   ├── bank-status.mdx
│   └── supporting-banks.mdx
├── payouts/
│   ├── initiate.mdx
│   └── status.mdx
├── onramp/
│   ├── create.mdx
│   ├── status.mdx
│   ├── crypto.mdx
│   └── crypto-status.mdx
├── offramp/
│   ├── create.mdx
│   ├── status.mdx
│   └── cancel.mdx
├── cross-border/
│   ├── generate-invoice.mdx
│   ├── get-invoice.mdx
│   ├── pay-invoice.mdx
│   └── pay-invoice-status.mdx
├── kyc/
│   ├── create-basic-details.mdx
│   ├── create-address.mdx
│   ├── create-document.mdx
│   ├── get-status.mdx
│   └── get-integrator-users.mdx
└── system/
    ├── health.mdx
    └── providers.mdx
```

---

## Generated Files

- `analyze-docs.js` - Analysis script
- `docs-analysis-report.json` - Detailed JSON report
- `missing-docs-summary.md` - This summary document

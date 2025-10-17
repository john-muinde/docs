# Accurate Kotani Pay API Documentation Gap Analysis

## Executive Summary

**Total Relevant Endpoints:** 77 (excluding GlobPay, Public Rates, Payment Links, Transactions)
**Properly Documented:** 44 endpoints ✅
**Missing Documentation:** 33 endpoints ❌
**Coverage:** 57% documented

---

## ✅ What's Already Documented (44 endpoints)

The following are **COMPLETE** and don't need work:

### Authentication (4/4) ✅
- ✅ `POST /api/v3/auth/login` - Authentication Login
- ✅ `GET /api/v3/auth/api-key/secure` - Generate API Key
- ✅ `POST /api/v3/auth/human-verify` - Human verification
- ✅ `GET /api/v3/auth/refresh-token` - Refresh access token

### Integrator (2/3) ✅
- ✅ `POST /api/v3/integrator` - Create an integrator
- ✅ `GET /api/v3/integrator` - Get integrator details

### Exchange Rates (5/5) ✅
- ✅ `GET /api/v3/rate/{from}/{to}` - Get exchange rate
- ✅ `GET /api/v3/rate` - Get all exchange rates
- ✅ `POST /api/v3/rate/onramp` - Get Onramp Exchange rate
- ✅ `POST /api/v3/rate/offramp` - Get Offramp Exchange rate
- ✅ `POST /api/v3/rate/fiat` - Get Fiat to Fiat exchange rate

### Fiat Wallets (6/6) ✅
- ✅ `POST /api/v3/wallet/fiat` - Create a Fiat Wallet
- ✅ `GET /api/v3/wallet/fiat` - Get Integrator Fiat Wallets
- ✅ `GET /api/v3/wallet/fiat/{id}` - Get Fiat Wallet by ID
- ✅ `PATCH /api/v3/wallet/fiat/{id}` - Update Fiat Wallet
- ✅ `GET /api/v3/wallet/fiat/currency/{currency}` - Get Fiat Wallet by Currency
- ✅ `POST /api/v3/wallet/transfer/deposit-balance` - Transfer Deposit Balance

### Crypto Wallets (3/3) ✅
- ✅ `POST /api/v3/wallet/crypto` - Create a Crypto wallet
- ✅ `GET /api/v3/wallet/crypto` - Get Crypto Wallets
- ✅ `GET /api/v3/wallet/crypto/{id}` - Get Crypto Wallet by ID

### Deposits (8/8) ✅
- ✅ `POST /api/v3/deposit/mobile-money` - Deposit via mobile money
- ✅ `GET /api/v3/deposit/mobile-money/status/{reference_id}` - Get deposit status
- ✅ `POST /api/v3/deposit/bank/checkout` - Deposit via bank checkout
- ✅ `GET /api/v3/deposit/bank/checkout/status/{reference_id}` - Get bank deposit status
- ✅ `POST /api/v3/deposit/card` - Deposit via card
- ✅ `GET /api/v3/deposit/card/{reference_id}` - Get card deposit status
- ✅ `POST /api/v3/deposit` - General deposit initiation
- ✅ `GET /api/v3/deposit/status/{reference_id}` - Get general deposit status

### Customers - Mobile Money (5/5) ✅
- ✅ `POST /api/v3/customer/mobile-money` - Create mobile money customer
- ✅ `GET /api/v3/customer/mobile-money` - Get all mobile money customers
- ✅ `GET /api/v3/customer/mobile-money/{customer_key}` - Get customer by key
- ✅ `PATCH /api/v3/customer/mobile-money/{customer_key}` - Update customer
- ✅ `GET /api/v3/customer/mobile-money/phone/{phone_number}` - Get customer by phone

### Withdrawals (5/5) ✅
- ✅ `POST /api/v3/withdraw/mobile-money` - Withdraw to Mobile Money
- ✅ `GET /api/v3/withdraw/status/{reference_id}` - Get withdrawal status
- ✅ `POST /api/v3/withdraw/v2/bank` - Bank withdrawal
- ✅ `GET /api/v3/withdraw/v2/bank/status/{referenceId}` - Get bank withdrawal status
- ✅ `GET /api/v3/withdraw/v2/bank/supporting-banks/{currency}` - Get supporting banks

### Payouts (2/2) ✅
- ✅ `POST /api/v3/payout` - Initiate payout
- ✅ `GET /api/v3/payout/status/{reference_id}` - Get payout status

---

## ❌ Missing Documentation (33 endpoints)

### 🔴 Priority 1: Core Missing Features (13 endpoints)

#### Integrator Management (1 endpoint)
- ❌ `PATCH /api/v3/integrator/webhook` - Update webhook configuration
  - **File needed:** `v3/api-reference/integrator/update-webhook.mdx`
  - **Add to docs.json:** `"v3/api-reference/integrator/update-webhook"`

#### Customer Validation (2 endpoints) - **NEW CATEGORY**
- ❌ `POST /api/v3/customer/validate/mobile-money` - Validate mobile money account
  - **File needed:** `v3/api-reference/customers/validate-mobile-money.mdx`
- ❌ `POST /api/v3/customer/validate/bank` - Validate bank account
  - **File needed:** `v3/api-reference/customers/validate-bank.mdx`

**Suggested docs.json entry:**
```json
{
  "group": "Customer Validation",
  "pages": [
    "v3/api-reference/customers/validate-mobile-money",
    "v3/api-reference/customers/validate-bank"
  ]
}
```

#### Country Support (6 endpoints) - **NEW CATEGORY**
- ❌ `GET /api/v3/customer/support/countries` - Get supported countries
- ❌ `GET /api/v3/customer/support/countries/{countryCode}` - Get country details
- ❌ `GET /api/v3/customer/support/networks/{countryCode}` - Get available networks
- ❌ `GET /api/v3/customer/support/banks` - Get available banks
- ❌ `GET /api/v3/customer/support/services/deposit` - Get deposit service config
- ❌ `GET /api/v3/customer/support/services/withdraw` - Get withdraw service config

**Files needed:**
```
v3/api-reference/country-support/
  ├── countries.mdx
  ├── country-details.mdx
  ├── networks.mdx
  ├── banks.mdx
  ├── deposit-services.mdx
  └── withdraw-services.mdx
```

**Suggested docs.json entry:**
```json
{
  "group": "Country & Service Support",
  "pages": [
    "v3/api-reference/country-support/countries",
    "v3/api-reference/country-support/country-details",
    "v3/api-reference/country-support/networks",
    "v3/api-reference/country-support/banks",
    "v3/api-reference/country-support/deposit-services",
    "v3/api-reference/country-support/withdraw-services"
  ]
}
```

#### Additional Offramp Endpoints (4 endpoints)
- ❌ `GET /api/v3/offramp/transactions` - Get all offramp transactions
  - **File:** `v3/api-reference/offramp/list-transactions.mdx`
- ❌ `GET /api/v3/offramp/{referenceId}` - Get offramp status (alternative endpoint)
  - **File:** `v3/api-reference/offramp/get-status.mdx`
- ❌ `GET /api/v3/offramp/refund-status/{referenceId}` - Get refund status
  - **File:** `v3/api-reference/offramp/refund-status.mdx`
- ❌ `POST /api/v3/offramp/retry-refund/{referenceId}` - Retry failed refund
  - **File:** `v3/api-reference/offramp/retry-refund.mdx`

**Add to docs.json offramp group:**
```json
"v3/api-reference/offramp/list-transactions",
"v3/api-reference/offramp/get-status",
"v3/api-reference/offramp/refund-status",
"v3/api-reference/offramp/retry-refund"
```

---

### 🟡 Priority 2: Important Missing Features (8 endpoints)

#### Additional Onramp Endpoints (2 endpoints)
- ❌ `GET /api/v3/onramp/{referenceId}` - Get onramp status (alternative)
  - **File:** `v3/api-reference/onramp/get-status.mdx`
- ❌ `GET /api/v3/onramp/crypto/{referenceId}` - Get crypto onramp status (alternative)
  - **File:** `v3/api-reference/onramp/get-crypto-status.mdx`

**Note:** These might be duplicates of existing `/status/` endpoints. Verify if needed.

#### KYC Additional Endpoints (2 endpoints)
- ❌ `POST /api/v3/kyc` - Create KYC Basic Details (alternative endpoint)
  - **Verify:** Might be duplicate of `v3/api-reference/kyc/create-basic-details`
- ❌ `GET /api/v3/kyc/integrator/users` - Get Integrator KYC Users
  - **File:** `v3/api-reference/kyc/list-integrator-users.mdx`

#### Cross-Border Alternative Endpoints (4 endpoints)
These appear to be typos in OpenAPI spec (`cross-boarder` vs `cross-border`):
- ❌ `POST /api/v3/cross-boarder/invoice` - Generate Invoice
- ❌ `GET /api/v3/cross-boarder/invoice/{referenceId}` - Get Invoice
- ❌ `POST /api/v3/cross-boarder/invoice/pay` - Pay Invoice
- ❌ `GET /api/v3/cross-boarder/invoice/pay/{referenceId}` - Get payment status

**Action Required:** Verify if these are duplicates of the correctly-spelled `/cross-border/` endpoints or if both exist.

---

### 🟢 Priority 3: Advanced Features (12 endpoints)

#### Bulk Payments (10 endpoints) - **NEW FEATURE**
- ❌ `GET /api/v3/dashboard/bulk-payments/api/transactions/{transactionId}` - Get transaction details
- ❌ `GET /api/v3/dashboard/bulk-payments/api/transactions` - Get paginated transactions
- ❌ `GET /api/v3/dashboard/bulk-payments/api/wallets` - Get available wallets
- ❌ `POST /api/v3/dashboard/bulk-payments/api/validate-csv` - Validate CSV file
- ❌ `POST /api/v3/dashboard/bulk-payments/api/batches/create` - Create batches
- ❌ `POST /api/v3/dashboard/bulk-payments/api/preview` - Preview batches
- ❌ `GET /api/v3/dashboard/bulk-payments/api/batches` - Get batches
- ❌ `GET /api/v3/dashboard/bulk-payments/api/stats` - Get statistics
- ❌ `GET /api/v3/dashboard/bulk-payments/api/batches/{batchId}` - Get batch by ID
- ❌ `POST /api/v3/dashboard/bulk-payments/api/batches/{batchId}/process` - Process batch
- ❌ `GET /api/v3/dashboard/bulk-payments/api/batches/{batchId}/payments` - Get batch payments

**Files needed:**
```
v3/api-reference/bulk-payments/
  ├── overview.mdx
  ├── get-transaction.mdx
  ├── list-transactions.mdx
  ├── get-wallets.mdx
  ├── validate-csv.mdx
  ├── create-batches.mdx
  ├── preview-batches.mdx
  ├── list-batches.mdx
  ├── get-statistics.mdx
  ├── get-batch.mdx
  ├── process-batch.mdx
  └── get-batch-payments.mdx
```

**Note:** This is dashboard-specific functionality. Consider if it should be in API docs or separate dashboard docs.

#### System Health (1 endpoint)
- ❌ `GET /health` - Check application health
  - **File:** `v3/api-reference/system/health.mdx` (might already exist)
  - **Verify:** Check if this is different from existing health endpoint

---

## 📋 Summary of Actions Required

### Immediate Actions (Priority 1)

1. **Create 1 missing file:**
   - `v3/api-reference/integrator/update-webhook.mdx`

2. **Create new "Customer Validation" category:**
   - Create 2 files for validation endpoints
   - Add new group to docs.json

3. **Create new "Country Support" category:**
   - Create 6 files for country support endpoints
   - Add new group to docs.json

4. **Extend Offramp documentation:**
   - Create 4 additional offramp endpoint files
   - Update offramp group in docs.json

### Verification Tasks

1. **Cross-Border endpoints:** Verify if `cross-boarder` is a typo or separate endpoints
2. **Onramp/KYC endpoints:** Check for duplicates with existing docs
3. **Health endpoint:** Verify if `/health` differs from `/api/v3/health`

### Optional (Priority 3)

1. **Bulk Payments:** Decide if this belongs in API docs or dashboard docs
2. If included, create comprehensive bulk payment documentation (12 files)

---

## Files That Should NOT Exist (Were Incorrectly Flagged)

The following were marked as missing but actually **DO NOT NEED** documentation:

1. ❌ **Public Rates endpoints** - These are public/unauthenticated versions, not needed
2. ❌ **GlobPay endpoints (40)** - Internal redirect/callback URLs
3. ❌ **Payment Link endpoints** - Not in current scope
4. ❌ **Transaction endpoints** - Not in current scope

---

## Current Documentation Status in docs.json

### Documentation Pages (7 non-API pages missing files):
These are in docs.json but files don't exist:
- `v3/run-in-postman`
- `v3/overview`
- `v3/quickstart`
- `v3/development`
- `v3/essentials/error-handling`
- `v3/essentials/rate-limits`
- `v3/essentials/webhooks`

**Action:** Create these documentation pages (not API reference).

---

## Recommended File Structure Updates

```
v3/api-reference/
├── integrator/
│   └── update-webhook.mdx ❌ (CREATE THIS)
├── customers/
│   ├── validate-mobile-money.mdx ❌ (CREATE THIS)
│   └── validate-bank.mdx ❌ (CREATE THIS)
├── country-support/ ❌ (NEW FOLDER)
│   ├── countries.mdx
│   ├── country-details.mdx
│   ├── networks.mdx
│   ├── banks.mdx
│   ├── deposit-services.mdx
│   └── withdraw-services.mdx
├── offramp/
│   ├── list-transactions.mdx ❌ (CREATE THIS)
│   ├── get-status.mdx ❌ (CREATE THIS)
│   ├── refund-status.mdx ❌ (CREATE THIS)
│   └── retry-refund.mdx ❌ (CREATE THIS)
└── bulk-payments/ ❌ (OPTIONAL NEW FOLDER)
    └── [12 files if implementing]
```

---

## Updated docs.json Groups Needed

Add these new groups to the API Reference tab:

```json
{
  "group": "Customer Validation",
  "pages": [
    "v3/api-reference/customers/validate-mobile-money",
    "v3/api-reference/customers/validate-bank"
  ]
},
{
  "group": "Country & Service Support",
  "pages": [
    "v3/api-reference/country-support/countries",
    "v3/api-reference/country-support/country-details",
    "v3/api-reference/country-support/networks",
    "v3/api-reference/country-support/banks",
    "v3/api-reference/country-support/deposit-services",
    "v3/api-reference/country-support/withdraw-services"
  ]
}
```

Update the Integrator group to include webhook:
```json
{
  "group": "Integrator Management",
  "pages": [
    "v3/api-reference/integrator/create",
    "v3/api-reference/integrator/get",
    "v3/api-reference/integrator/update-webhook"
  ]
}
```

Expand the Offramp group:
```json
{
  "group": "Offramp (Sell Crypto)",
  "pages": [
    "v3/api-reference/offramp/create",
    "v3/api-reference/offramp/status",
    "v3/api-reference/offramp/cancel",
    "v3/api-reference/offramp/list-transactions",
    "v3/api-reference/offramp/refund-status",
    "v3/api-reference/offramp/retry-refund"
  ]
}
```

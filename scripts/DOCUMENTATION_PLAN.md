# Kotani Pay API Documentation Plan

## Summary
- **Total API endpoints**: 90
- **Currently documented**: 15 (17%)
- **Missing documentation**: 75 (83%)

## Priority Categories for Documentation

### 1. HIGH PRIORITY - Core User-Facing APIs (37 endpoints)

#### Authentication (4 endpoints) - CRITICAL
- `/api/v3/auth/login` - POST - Authentication Login
- `/api/v3/auth/api-key/secure` - GET - Generate API Key
- `/api/v3/auth/refresh-token` - GET - Refresh access token
- `/api/v3/auth/human-verify` - POST - Human verification for suspicious requests

#### Rates (4 endpoints) - CRITICAL
- `/api/v3/rate/{from}/{to}` - GET - Get exchange rate
- `/api/v3/rate/onramp` - POST - Get Onramp Exchange rate
- `/api/v3/rate/offramp` - POST - Get Offramp Exchange rate
- `/api/v3/rate/fiat` - POST - Get Fiat to Fiat exchange rate

#### Wallets (8 endpoints) - HIGH
**Fiat Wallets:**
- `/api/v3/wallet/fiat` - POST - Create a Fiat Wallet
- `/api/v3/wallet/fiat` - GET - Get Integrator Fiat Wallets
- `/api/v3/wallet/fiat/{id}` - GET - Get Integrator Fiat Wallet by ID
- `/api/v3/wallet/fiat/{id}` - PATCH - Update Integrator Fiat Wallet by ID
- `/api/v3/wallet/fiat/currency/{currency}` - GET - Get Fiat Wallet by Currency

**Crypto Wallets:**
- `/api/v3/wallet/crypto` - POST - Create a Crypto wallet
- `/api/v3/wallet/crypto` - GET - Get Integrator Crypto Wallets
- `/api/v3/wallet/crypto/{id}` - GET - Get Integrator Crypto Wallet by ID

#### Deposits (6 endpoints) - HIGH
- `/api/v3/deposit/mobile-money` - POST - Deposit via mobile money
- `/api/v3/deposit/mobile-money/status/{reference_id}` - GET - Get Deposit status
- `/api/v3/deposit/bank/checkout` - POST - Deposit via bank checkout
- `/api/v3/deposit/bank/checkout/status/{reference_id}` - GET - Get Deposit status
- `/api/v3/deposit/card` - POST - Deposit via card
- `/api/v3/deposit/card/{reference_id}` - GET - Get Deposit status

#### Withdrawals (5 endpoints) - HIGH
- `/api/v3/withdraw/mobile-money` - POST - Withdraw Fiat to Mobile Money
- `/api/v3/withdraw/status/{reference_id}` - GET - Get Withdrawal status
- `/api/v3/withdraw/v2/bank` - POST - Bank Withdrawal
- `/api/v3/withdraw/v2/bank/status/{referenceId}` - GET - Bank Withdrawal Status
- `/api/v3/withdraw/v2/bank/supporting-banks/{currency}` - GET - Get Supporting Banks

#### Customer Management (5 endpoints) - HIGH
- `/api/v3/customer/mobile-money` - POST - Create mobile money customer
- `/api/v3/customer/mobile-money` - GET - Get all mobile money customers
- `/api/v3/customer/mobile-money/{customer_key}` - PATCH - Update mobile money customer
- `/api/v3/customer/mobile-money/{customer_key}` - GET - Get mobile money customer by key
- `/api/v3/customer/mobile-money/phone/{phone_number}` - GET - Get customer by phone

#### Onramp/Offramp (2 endpoints) - HIGH
- `/api/v3/onramp/{referenceId}` - GET - Get Onramp Status
- `/api/v3/offramp/{referenceId}` - GET - Get Offramp Status

#### Cross Border (1 endpoint) - HIGH
- `/api/v3/cross-boarder/invoice/pay/{referenceId}` - GET - Get Paid Invoice Status

#### KYC (4 endpoints) - HIGH
- `/api/v3/kyc/address` - POST - Create KYC Address
- `/api/v3/kyc/document` - POST - Create KYC Document
- `/api/v3/kyc/status/{kycId}` - GET - Get KYC Status
- `/api/v3/kyc/integrator/users` - GET - Get Integrator KYC Users

### 2. MEDIUM PRIORITY - Administrative APIs (34 endpoints)

#### Admin Routes (31 endpoints) - Internal tooling
All admin route endpoints for internal platform management

#### Roles & Permissions (3 endpoints) - Platform management
- `/api/v3/authorization/permission` - POST - Create Permission
- `/api/v3/authorization/role` - POST - Create Role
- `/api/v3/authorization/assign` - POST - Assign Role/Permission

### 3. LOW PRIORITY - Webhook/Callback APIs (2 endpoints)

#### ZoyktechCallback (2 endpoints) - Internal callbacks
- `/api/v3/zoyktech/callback` - POST - Handle Callback
- `/api/v3/zoyktech/callback/retry` - POST - Retry Callback

## Documentation Structure Plan

```
v3/api-reference/
├── authentication/
│   ├── login.mdx
│   ├── generate-key.mdx
│   ├── refresh-token.mdx
│   └── human-verify.mdx
├── rates/
│   ├── get-rate.mdx (existing files need to be aligned)
│   ├── onramp-rate.mdx (existing)
│   ├── offramp-rate.mdx (existing)
│   ├── fiat-to-fiat.mdx (existing)
│   └── get-all-rates.mdx (existing)
├── wallets/
│   ├── fiat/
│   │   ├── create.mdx
│   │   ├── list.mdx
│   │   ├── get.mdx
│   │   ├── update.mdx
│   │   ├── get-by-currency.mdx
│   │   └── transfer-deposit-balance.mdx (existing)
│   └── crypto/
│       ├── create.mdx
│       ├── list.mdx
│       └── get.mdx
├── deposits/
│   ├── mobile-money.mdx
│   ├── mobile-money-status.mdx
│   ├── bank-checkout.mdx
│   ├── bank-checkout-status.mdx
│   ├── card.mdx
│   └── card-status.mdx
├── customers/
│   └── mobile-money/
│       ├── create.mdx
│       ├── list.mdx
│       ├── get.mdx
│       ├── update.mdx
│       └── get-by-phone.mdx
├── kyc/
│   ├── create-basic-details.mdx (existing)
│   ├── create-address.mdx
│   ├── create-document.mdx
│   ├── get-status.mdx
│   └── get-integrator-users.mdx
└── admin/ (lower priority)
    └── routes/
        └── [various admin endpoints]
```

## Recommended Implementation Order

1. **Week 1-2**: Authentication APIs (4 endpoints)
2. **Week 3**: Rates APIs (4 endpoints) 
3. **Week 4-5**: Wallet APIs (8 endpoints)
4. **Week 6-7**: Deposits APIs (6 endpoints)
5. **Week 8**: Withdrawals APIs (5 endpoints)
6. **Week 9**: Customer Management APIs (5 endpoints)
7. **Week 10**: KYC APIs (4 endpoints)
8. **Week 11**: Remaining High Priority APIs (2 endpoints)
9. **Future**: Admin and Internal APIs as needed

This prioritization focuses on user-facing APIs that integrators will use most frequently, ensuring the most important documentation is completed first.
const fs = require('fs');
const path = require('path');

// Read the OpenAPI spec
const openApiPath = path.join(__dirname, 'v3', 'api-reference', 'openapi.json');
const openApiSpec = JSON.parse(fs.readFileSync(openApiPath, 'utf8'));

// Read the docs.json
const docsJsonPath = path.join(__dirname, 'docs.json');
const docsJson = JSON.parse(fs.readFileSync(docsJsonPath, 'utf8'));

// Extract all endpoints from OpenAPI spec
const endpoints = [];
for (const [path, methods] of Object.entries(openApiSpec.paths)) {
  for (const [method, details] of Object.entries(methods)) {
    endpoints.push({
      path,
      method: method.toUpperCase(),
      operationId: details.operationId,
      summary: details.summary,
      tags: details.tags || [],
      description: details.description
    });
  }
}

// Extract all documented pages from docs.json
const documentedPages = new Set();
const navigation = docsJson.navigation.versions[0].tabs;

navigation.forEach(tab => {
  if (tab.groups) {
    tab.groups.forEach(group => {
      if (group.pages) {
        group.pages.forEach(page => {
          documentedPages.add(page);
        });
      }
    });
  }
});

// Check which endpoint files exist
const v3ApiRefPath = path.join(__dirname, 'v3', 'api-reference');

function checkFileExists(slug) {
  const filePath = path.join(__dirname, `${slug}.mdx`);
  return fs.existsSync(filePath);
}

// Group endpoints by tag
const endpointsByTag = {};
endpoints.forEach(endpoint => {
  const tag = endpoint.tags[0] || 'UNTAGGED';
  if (!endpointsByTag[tag]) {
    endpointsByTag[tag] = [];
  }
  endpointsByTag[tag].push(endpoint);
});

// Generate report
console.log('='.repeat(80));
console.log('KOTANI PAY API DOCUMENTATION ANALYSIS');
console.log('='.repeat(80));
console.log();

console.log('📊 SUMMARY');
console.log('-'.repeat(80));
console.log(`Total endpoints in OpenAPI spec: ${endpoints.length}`);
console.log(`Total documented pages in docs.json: ${documentedPages.size}`);
console.log(`Total endpoint groups (tags): ${Object.keys(endpointsByTag).length}`);
console.log();

// Analyze each tag group
console.log('📋 ENDPOINTS BY CATEGORY');
console.log('-'.repeat(80));

const missingDocs = [];
const existingDocs = [];

for (const [tag, tagEndpoints] of Object.entries(endpointsByTag)) {
  console.log();
  console.log(`\n🏷️  ${tag} (${tagEndpoints.length} endpoints)`);
  console.log('-'.repeat(80));

  tagEndpoints.forEach(endpoint => {
    const slug = inferDocSlug(endpoint);
    const inDocsJson = documentedPages.has(slug);
    const fileExists = checkFileExists(slug);

    const status = inDocsJson && fileExists ? '✅' :
                   inDocsJson && !fileExists ? '⚠️  (in docs.json but file missing)' :
                   !inDocsJson && fileExists ? '⚠️  (file exists but not in docs.json)' :
                   '❌ (missing)';

    console.log(`  ${status} ${endpoint.method.padEnd(6)} ${endpoint.path}`);
    console.log(`      Summary: ${endpoint.summary}`);
    console.log(`      Inferred slug: ${slug}`);

    if (!inDocsJson || !fileExists) {
      missingDocs.push({
        tag,
        endpoint,
        slug,
        inDocsJson,
        fileExists
      });
    } else {
      existingDocs.push(slug);
    }
  });
}

// Summary of missing documentation
console.log();
console.log();
console.log('❌ MISSING OR INCOMPLETE DOCUMENTATION');
console.log('='.repeat(80));

if (missingDocs.length === 0) {
  console.log('✅ All endpoints are fully documented!');
} else {
  const byTag = {};
  missingDocs.forEach(item => {
    if (!byTag[item.tag]) byTag[item.tag] = [];
    byTag[item.tag].push(item);
  });

  for (const [tag, items] of Object.entries(byTag)) {
    console.log();
    console.log(`\n📌 ${tag}`);
    console.log('-'.repeat(80));
    items.forEach(item => {
      console.log(`\n  Endpoint: ${item.endpoint.method} ${item.endpoint.path}`);
      console.log(`  Summary: ${item.endpoint.summary}`);
      console.log(`  Inferred slug: ${item.slug}`);
      console.log(`  In docs.json: ${item.inDocsJson ? 'Yes' : 'No'}`);
      console.log(`  File exists: ${item.fileExists ? 'Yes' : 'No'}`);
    });
  }
}

// Helper function to infer documentation slug from endpoint
function inferDocSlug(endpoint) {
  const tag = endpoint.tags[0] || 'misc';
  const path = endpoint.path;
  const method = endpoint.method.toLowerCase();

  // Map tags to doc folders
  const tagToFolder = {
    'RATES': 'rates',
    'PUBLIC RATES': 'rates',
    'FIAT WALLET': 'wallets/fiat',
    'CRYPTO WALLET': 'wallets/crypto',
    'INTEGRATOR': 'integrator',
    'AUTHENTICATION': 'authentication',
    'MOBILE MONEY DEPOSIT': 'deposits',
    'BANK DEPOSIT(checkout)': 'deposits',
    'CARD DEPOSIT': 'deposits',
    'DEPOSIT': 'deposits',
    'MOBILE MONEY CUSTOMER': 'customers/mobile-money',
    'BANK CUSTOMER': 'customers/bank',
    'WITHDRAWAL': 'withdrawals',
    'MOBILE MONEY WITHDRAWAL': 'withdrawals',
    'BANK WITHDRAWAL': 'withdrawals',
    'PAYOUT': 'payouts',
    'ONRAMP': 'onramp',
    'OFFRAMP': 'offramp',
    'CROSS BORDER': 'cross-border',
    'KYC': 'kyc',
    'WEBHOOK': 'webhooks',
    'PAYMENT LINK': 'payment-links',
    'TRANSACTIONS': 'transactions',
    'SYSTEM': 'system'
  };

  const folder = tagToFolder[tag] || tag.toLowerCase().replace(/\s+/g, '-');

  // Infer filename from summary and path
  let filename = 'unknown';
  if (endpoint.summary) {
    filename = endpoint.summary
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-]/g, '');
  } else {
    // Fallback to path-based naming
    filename = path.split('/').pop().replace(/[{}]/g, '');
  }

  return `v3/api-reference/${folder}/${filename}`;
}

// Save detailed report to file
const reportPath = path.join(__dirname, 'docs-analysis-report.json');
fs.writeFileSync(reportPath, JSON.stringify({
  summary: {
    totalEndpoints: endpoints.length,
    documentedPages: documentedPages.size,
    totalTags: Object.keys(endpointsByTag).length,
    missingDocsCount: missingDocs.length,
    completeDocsCount: existingDocs.length
  },
  missingDocs,
  existingDocs,
  endpointsByTag: Object.keys(endpointsByTag).map(tag => ({
    tag,
    count: endpointsByTag[tag].length,
    endpoints: endpointsByTag[tag]
  }))
}, null, 2));

console.log();
console.log();
console.log('📄 DETAILED REPORT SAVED');
console.log('='.repeat(80));
console.log(`Report saved to: ${reportPath}`);
console.log();

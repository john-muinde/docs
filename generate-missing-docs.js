const fs = require('fs');
const path = require('path');

// Read the analysis report
const reportPath = path.join(__dirname, 'docs-analysis-report.json');
const report = JSON.parse(fs.readFileSync(reportPath, 'utf8'));

// Read OpenAPI spec for schema details
const openApiPath = path.join(__dirname, 'v3', 'api-reference', 'openapi.json');
const openApiSpec = JSON.parse(fs.readFileSync(openApiPath, 'utf8'));

// Filter out GlobPay and other internal endpoints
const relevantMissingDocs = report.missingDocs.filter(item => {
  return item.tag !== 'GlobPay' &&
         item.endpoint.summary &&
         item.endpoint.summary !== 'undefined';
});

console.log(`\n📝 Generating ${relevantMissingDocs.length} missing documentation files...\n`);

let createdCount = 0;
let errorCount = 0;

// Group by category for better organization
const byCategory = {};
relevantMissingDocs.forEach(item => {
  if (!byCategory[item.tag]) {
    byCategory[item.tag] = [];
  }
  byCategory[item.tag].push(item);
});

// Function to generate MDX content for an endpoint
function generateMDX(endpoint) {
  const method = endpoint.method.toUpperCase();
  const path = endpoint.path;
  const summary = endpoint.summary || 'API Endpoint';
  const description = endpoint.description || summary;

  // Find the endpoint in OpenAPI spec
  const spec = openApiSpec.paths[endpoint.path]?.[endpoint.method.toLowerCase()];

  let content = `---
title: "${summary}"
api: "${method} ${path}"
description: "${description}"
---

`;

  // Add description section
  content += `## Overview\n\n${description}\n\n`;

  // Add authentication info
  if (spec?.security && spec.security.length > 0) {
    content += `## Authentication\n\nThis endpoint requires authentication using an API key.\n\n`;
  }

  // Add path parameters
  if (spec?.parameters && spec.parameters.length > 0) {
    const pathParams = spec.parameters.filter(p => p.in === 'path');
    if (pathParams.length > 0) {
      content += `## Path Parameters\n\n`;
      pathParams.forEach(param => {
        content += `- **${param.name}** (${param.schema?.type || 'string'})`;
        if (param.required) content += ` - *Required*`;
        if (param.description) content += ` - ${param.description}`;
        content += `\n`;
      });
      content += `\n`;
    }

    const queryParams = spec.parameters.filter(p => p.in === 'query');
    if (queryParams.length > 0) {
      content += `## Query Parameters\n\n`;
      queryParams.forEach(param => {
        content += `- **${param.name}** (${param.schema?.type || 'string'})`;
        if (param.required) content += ` - *Required*`;
        if (param.description) content += ` - ${param.description}`;
        content += `\n`;
      });
      content += `\n`;
    }
  }

  // Add request body
  if (spec?.requestBody) {
    content += `## Request Body\n\n`;
    const schema = spec.requestBody.content?.['application/json']?.schema;
    if (schema?.$ref) {
      const schemaName = schema.$ref.split('/').pop();
      content += `See the \`${schemaName}\` schema in the OpenAPI specification for details.\n\n`;
    } else {
      content += `Request body is required in JSON format.\n\n`;
    }
  }

  // Add responses
  if (spec?.responses) {
    content += `## Responses\n\n`;

    // Success response
    if (spec.responses['200'] || spec.responses['201']) {
      const successResponse = spec.responses['200'] || spec.responses['201'];
      const successSchema = successResponse.content?.['application/json']?.schema;

      content += `### Success Response (200)\n\n`;
      if (successSchema?.properties) {
        content += '```json\n{\n';
        Object.entries(successSchema.properties).forEach(([key, value]) => {
          const example = value.example !== undefined ? value.example :
                         value.type === 'boolean' ? true :
                         value.type === 'string' ? `"${key}"` :
                         value.type === 'object' ? '{}' :
                         value.type === 'array' ? '[]' : 'null';
          content += `  "${key}": ${JSON.stringify(example)},\n`;
        });
        content = content.slice(0, -2) + '\n'; // Remove trailing comma
        content += '}\n```\n\n';
      }
    }

    // Error responses
    const errorCodes = ['400', '401', '403', '404', '500'];
    errorCodes.forEach(code => {
      if (spec.responses[code]) {
        const errorResponse = spec.responses[code];
        const errorSchema = errorResponse.content?.['application/json']?.schema;
        const message = errorSchema?.properties?.message?.example ||
                       code === '400' ? 'Bad Request' :
                       code === '401' ? 'Unauthorized' :
                       code === '403' ? 'Forbidden' :
                       code === '404' ? 'Not Found' :
                       'Internal Server Error';

        content += `### ${code} Error\n\n`;
        content += `${errorResponse.description || message}\n\n`;
      }
    });
  }

  // Add example
  content += `## Example\n\n`;
  content += '```bash\n';
  content += `curl -X ${method} \\\n`;
  content += `  https://api.kotanipay.com${path} \\\n`;
  if (spec?.security && spec.security.length > 0) {
    content += `  -H "Authorization: Bearer YOUR_API_KEY" \\\n`;
  }
  content += `  -H "Content-Type: application/json"\n`;
  content += '```\n';

  return content;
}

// Generate files for each category
for (const [category, items] of Object.entries(byCategory)) {
  console.log(`\n📁 ${category} (${items.length} endpoints)`);
  console.log('-'.repeat(60));

  items.forEach(item => {
    const endpoint = item.endpoint;

    // Determine file path
    let filePath;

    // Custom mapping for better file organization
    const categoryMap = {
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
      'CUSTOMER - MOBILE MONEY': 'customers/mobile-money',
      'CUSTOMER - BANK': 'customers/bank',
      'CUSTOMER - VALIDATION': 'customers',
      'WITHDRAW': 'withdrawals',
      'WITHDRAW V2': 'withdrawals',
      'PAYOUT': 'payouts',
      'ONRAMP': 'onramp',
      'OFFRAMP': 'offramp',
      'CROSS BORDER': 'cross-border',
      'KYC': 'kyc',
      'TRANSACTION': 'transactions',
      'PAYMENT LINK': 'payment-links',
      'PAYMENT PROVIDERS': 'system',
      'WEBHOOK': 'webhooks'
    };

    const folder = categoryMap[category] || category.toLowerCase().replace(/\s+/g, '-');

    // Generate filename from summary
    let filename = endpoint.summary
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-]/g, '')
      .replace(/^get-/, '')
      .replace(/^create-/, '')
      .replace(/^update-/, '')
      .replace(/^delete-/, '');

    // Special handling for specific endpoints
    if (endpoint.path.includes('/status/')) {
      filename = filename.replace(/status$/, '') + 'status';
    }

    filePath = path.join(__dirname, 'v3', 'api-reference', folder, `${filename}.mdx`);

    try {
      // Create directory if it doesn't exist
      const dir = path.dirname(filePath);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
        console.log(`  📂 Created directory: ${path.relative(__dirname, dir)}`);
      }

      // Generate content
      const content = generateMDX(endpoint);

      // Write file
      fs.writeFileSync(filePath, content);
      console.log(`  ✅ ${endpoint.method.padEnd(6)} ${endpoint.path}`);
      console.log(`     → ${path.relative(__dirname, filePath)}`);

      createdCount++;
    } catch (error) {
      console.error(`  ❌ Error creating file for ${endpoint.path}: ${error.message}`);
      errorCount++;
    }
  });
}

console.log(`\n${'='.repeat(60)}`);
console.log(`📊 SUMMARY`);
console.log(`${'='.repeat(60)}`);
console.log(`✅ Created: ${createdCount} files`);
console.log(`❌ Errors: ${errorCount} files`);
console.log(`⏭️  Skipped: ${report.missingDocs.length - relevantMissingDocs.length} files (GlobPay/internal)`);

console.log(`\n⚠️  NEXT STEPS:`);
console.log(`1. Review generated MDX files and add more details`);
console.log(`2. Update docs.json to include these new pages`);
console.log(`3. Test the documentation locally`);
console.log(`4. Update schema references where needed\n`);

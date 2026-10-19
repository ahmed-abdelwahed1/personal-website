#!/usr/bin/env node

/**
 * Automatically publish DNS-AID records and enable DNSSEC via Cloudflare API.
 * 
 * Usage:
 *   CLOUDFLARE_API_TOKEN="your-token" node scripts/publish-dns-aid.mjs
 *   or:
 *   node scripts/publish-dns-aid.mjs --token="your-token"
 */

const DOMAIN = process.env.DOMAIN || 'ahmedabdelwahed.me';
const ZONE_ID = process.env.CLOUDFLARE_ZONE_ID || '8761d68f8c25e086d34ab31fe9404c9a';

const tokenArg = process.argv.find(arg => arg.startsWith('--token='));
const API_TOKEN = process.env.CLOUDFLARE_API_TOKEN || (tokenArg ? tokenArg.split('=')[1] : null);

if (!API_TOKEN) {
  console.error(`
❌ Error: Missing Cloudflare API Token.

To publish records automatically, please provide an API Token with 'Zone -> DNS -> Edit' permissions:

PowerShell:
  $env:CLOUDFLARE_API_TOKEN="your_token_here"; node scripts/publish-dns-aid.mjs

Bash:
  CLOUDFLARE_API_TOKEN="your_token_here" node scripts/publish-dns-aid.mjs

Or pass --token="your_token_here"
`);
  process.exit(1);
}

const headers = {
  'Authorization': `Bearer ${API_TOKEN}`,
  'Content-Type': 'application/json'
};

async function api(path, options = {}) {
  const res = await fetch(`https://api.cloudflare.com/client/v4${path}`, {
    ...options,
    headers: { ...headers, ...options.headers }
  });
  return res.json();
}

async function upsertRecord({ type, name, data, content, priority }) {
  console.log(`Publishing ${type} ${name}...`);
  // Check if record exists
  const existingRes = await api(`/zones/${ZONE_ID}/dns_records?type=${type}&name=${name}`);
  const existing = existingRes.result?.[0];

  const payload = {
    type,
    name,
    ttl: 3600,
    proxied: false,
  };

  if (type === 'HTTPS' || type === 'SVCB') {
    payload.data = data;
  } else {
    payload.content = content;
  }

  if (existing) {
    console.log(`  Updating existing record (ID: ${existing.id})...`);
    const updateRes = await api(`/zones/${ZONE_ID}/dns_records/${existing.id}`, {
      method: 'PUT',
      body: JSON.stringify(payload)
    });
    if (updateRes.success) {
      console.log(`  ✅ Successfully updated ${name}`);
    } else {
      console.error(`  ❌ Failed to update ${name}:`, updateRes.errors);
    }
  } else {
    console.log(`  Creating new record...`);
    const createRes = await api(`/zones/${ZONE_ID}/dns_records`, {
      method: 'POST',
      body: JSON.stringify(payload)
    });
    if (createRes.success) {
      console.log(`  ✅ Successfully created ${name}`);
    } else {
      console.error(`  ❌ Failed to create ${name}:`, createRes.errors);
    }
  }
}

async function enableDNSSEC() {
  console.log(`\nEnabling DNSSEC on zone ${ZONE_ID}...`);
  const res = await api(`/zones/${ZONE_ID}/dnssec`, {
    method: 'PATCH',
    body: JSON.stringify({ status: 'active' })
  });

  if (res.success) {
    console.log(`  ✅ DNSSEC activated in Cloudflare!`);
    const ds = res.result;
    console.log(`\nImportant: Add the following DS record at your domain registrar:`);
    console.log(`  Key Tag:     ${ds.key_tag}`);
    console.log(`  Algorithm:   ${ds.algorithm}`);
    console.log(`  Digest Type: ${ds.digest_type}`);
    console.log(`  Digest:      ${ds.digest}`);
    console.log(`  DS Record:   ${ds.ds}`);
  } else {
    console.log(`  ℹ️ DNSSEC Status:`, res.errors?.[0]?.message || 'Already active or check status');
    const statusRes = await api(`/zones/${ZONE_ID}/dnssec`);
    if (statusRes.result?.ds) {
      console.log(`\nCurrent DS Record details:`);
      console.log(`  Key Tag:     ${statusRes.result.key_tag}`);
      console.log(`  Algorithm:   ${statusRes.result.algorithm}`);
      console.log(`  Digest Type: ${statusRes.result.digest_type}`);
      console.log(`  Digest:      ${statusRes.result.digest}`);
      console.log(`  DS Record:   ${statusRes.result.ds}`);
    }
  }
}

async function main() {
  console.log(`🚀 Publishing DNS-AID records for ${DOMAIN} (Zone ID: ${ZONE_ID})...\n`);

  // 1. _index._agents
  await upsertRecord({
    type: 'HTTPS',
    name: `_index._agents.${DOMAIN}`,
    data: {
      priority: 1,
      target: DOMAIN,
      value: 'alpn="h2,h3" port=443'
    }
  });

  // 2. _a2a._agents
  await upsertRecord({
    type: 'HTTPS',
    name: `_a2a._agents.${DOMAIN}`,
    data: {
      priority: 1,
      target: DOMAIN,
      value: 'alpn="a2a" port=443'
    }
  });

  // 3. _mcp._agents
  await upsertRecord({
    type: 'HTTPS',
    name: `_mcp._agents.${DOMAIN}`,
    data: {
      priority: 1,
      target: DOMAIN,
      value: 'alpn="mcp" port=443'
    }
  });

  // 4. _catalog._agents
  await upsertRecord({
    type: 'TXT',
    name: `_catalog._agents.${DOMAIN}`,
    content: `url=https://${DOMAIN}/.well-known/ai-catalog.json`
  });

  // 5. DNSSEC
  await enableDNSSEC();

  console.log(`\n🎉 All done! Now run: npm run verify:dns-aid`);
}

main().catch(console.error);

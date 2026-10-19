#!/usr/bin/env node

/**
 * DNS-AID & DNSSEC Verification Script for ahmedabdelwahed.me
 * Checks Cloudflare DoH, Google DoH, and isitagentready.com live status.
 */

const DOMAIN = process.env.DOMAIN || 'ahmedabdelwahed.me';

async function checkDoH(name, type) {
  const url = `https://cloudflare-dns.com/dns-query?name=${encodeURIComponent(name)}&type=${type}&do=1`;
  try {
    const res = await fetch(url, { headers: { Accept: 'application/dns-json' } });
    if (!res.ok) return { ok: false, error: `HTTP ${res.status}` };
    const data = await res.json();
    return { ok: true, data };
  } catch (err) {
    return { ok: false, error: err.message };
  }
}

async function runAudit() {
  console.log(`\n======================================================`);
  console.log(`🔍 Checking DNS-AID & DNSSEC for: ${DOMAIN}`);
  console.log(`======================================================\n`);

  const checks = [
    { label: 'DNS-AID Index Entrypoint', name: `_index._agents.${DOMAIN}`, type: 'HTTPS' },
    { label: 'Agent-to-Agent (A2A)', name: `_a2a._agents.${DOMAIN}`, type: 'HTTPS' },
    { label: 'Model Context Protocol (MCP)', name: `_mcp._agents.${DOMAIN}`, type: 'HTTPS' },
    { label: 'ARD Capability Catalog', name: `_catalog._agents.${DOMAIN}`, type: 'TXT' },
    { label: 'Apex DNSSEC (DS Record)', name: DOMAIN, type: 'DS' },
  ];

  for (const check of checks) {
    const result = await checkDoH(check.name, check.type);
    if (!result.ok) {
      console.log(`❌ ${check.label} (${check.name} [${check.type}]): Failed (${result.error})`);
      continue;
    }

    const { Status, AD, Answer } = result.data;
    if (Status === 0 && Answer && Answer.length > 0) {
      const records = Answer.filter(a => a.type !== 46).map(a => a.data).join(', ');
      console.log(`✅ ${check.label} [${check.type}]: FOUND (AD=${AD})`);
      console.log(`   └─ Data: ${records}`);
    } else if (Status === 3) {
      console.log(`⚠️  ${check.label} [${check.type}]: NOT FOUND (NXDOMAIN)`);
    } else {
      console.log(`⚠️  ${check.label} [${check.type}]: Status ${Status} (No answer records)`);
    }
  }

  console.log(`\n------------------------------------------------------`);
  console.log(`🌐 Querying isitagentready.com agent discovery check...`);
  console.log(`------------------------------------------------------\n`);

  try {
    const res = await fetch('https://isitagentready.com/api/scan', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url: `https://${DOMAIN}` })
    });
    if (res.ok) {
      const data = await res.json();
      const dnsAid = data?.checks?.discoverability?.dnsAid;
      console.log(`Result: ${dnsAid?.status === 'pass' ? '✅ PASS' : '❌ ' + (dnsAid?.status?.toUpperCase() || 'FAIL')}`);
      console.log(`Message: ${dnsAid?.message}`);
      if (dnsAid?.details) {
        console.log(`DNSSEC Validated: ${dnsAid.details.dnssecValidated}`);
        console.log(`Service Records: ${dnsAid.details.serviceRecordCount}`);
      }
    } else {
      console.log(`Scanner API returned status: ${res.status}`);
    }
  } catch (err) {
    console.log(`Scanner API error: ${err.message}`);
  }

  console.log(`\n======================================================\n`);
}

runAudit();

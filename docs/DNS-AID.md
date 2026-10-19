# DNS for AI Discovery (DNS-AID) & Agent Discovery Configuration

This document provides the exact DNS records to publish under `ahmedabdelwahed.me` to satisfy **DNS-AID (DNS for AI Discovery)** per [IETF draft-mozleywilliams-dnsop-dnsaid](https://datatracker.ietf.org/doc/draft-mozleywilliams-dnsop-dnsaid/) and [RFC 9460](https://www.rfc-editor.org/rfc/rfc9460), as well as **ARD (Agentic Resource Discovery)** DNS-based discovery.

Zone details for `ahmedabdelwahed.me`:
- **Zone ID:** `8761d68f8c25e086d34ab31fe9404c9a`
- **Authoritative Nameservers:** `bob.ns.cloudflare.com`, `demi.ns.cloudflare.com`

---

## Quick Automation via Cloudflare API

If you have a Cloudflare API token with `Zone -> DNS -> Edit` and `Zone -> DNSSEC -> Edit` permissions, you can publish all records and activate DNSSEC with a single command:

```powershell
$env:CLOUDFLARE_API_TOKEN="your_cloudflare_api_token"
npm run publish:dns-aid
```

---

## 1. Cloudflare Dashboard Manual Setup

Log in to your **[Cloudflare Dashboard](https://dash.cloudflare.com/)** → select domain **`ahmedabdelwahed.me`** → navigate to **DNS** → **Records** → click **Add Record**:

### A. Primary DNS-AID Entrypoint Record (HTTPS / SVCB)
*Required: Main DNS-AID discoverability entrypoint.*
- **Type:** `HTTPS` (or `SVCB`)
- **Name:** `_index._agents`
- **Priority:** `1`
- **Target:** `ahmedabdelwahed.me`
- **Value / Parameters:** `alpn="h2,h3" port=443`
- **TTL:** `Auto` (or `3600`)
- **Proxy status:** DNS only

> **Standard BIND Zone Format:**
> ```dns
> _index._agents.ahmedabdelwahed.me. 3600 IN HTTPS 1 ahmedabdelwahed.me. alpn="h2,h3" port=443
> ```

---

### B. Agent-to-Agent (A2A) Discovery Record
*Direct multi-agent coordination protocol entrypoint.*
- **Type:** `HTTPS` (or `SVCB`)
- **Name:** `_a2a._agents`
- **Priority:** `1`
- **Target:** `ahmedabdelwahed.me`
- **Value / Parameters:** `alpn="a2a" port=443`
- **TTL:** `Auto` (or `3600`)
- **Proxy status:** DNS only

> **Standard BIND Zone Format:**
> ```dns
> _a2a._agents.ahmedabdelwahed.me. 3600 IN HTTPS 1 ahmedabdelwahed.me. alpn="a2a" port=443
> ```

---

### C. Model Context Protocol (MCP) Discovery Record
*Direct MCP agent tools entrypoint.*
- **Type:** `HTTPS` (or `SVCB`)
- **Name:** `_mcp._agents`
- **Priority:** `1`
- **Target:** `ahmedabdelwahed.me`
- **Value / Parameters:** `alpn="mcp" port=443`
- **TTL:** `Auto` (or `3600`)
- **Proxy status:** DNS only

> **Standard BIND Zone Format:**
> ```dns
> _mcp._agents.ahmedabdelwahed.me. 3600 IN HTTPS 1 ahmedabdelwahed.me. alpn="mcp" port=443
> ```

---

### D. ARD Capability Catalog Discovery Record (TXT)
*Points agents directly to your ARD catalog.*
- **Type:** `TXT`
- **Name:** `_catalog._agents`
- **Content:** `url=https://ahmedabdelwahed.me/.well-known/ai-catalog.json`
- **TTL:** `Auto` (or `3600`)
- **Proxy status:** DNS only

> **Standard BIND Zone Format:**
> ```dns
> _catalog._agents.ahmedabdelwahed.me. 3600 IN TXT "url=https://ahmedabdelwahed.me/.well-known/ai-catalog.json"
> ```

---

## 2. Cloudflare API cURL Commands (Alternative)

You can also create these records directly using curl:

```bash
# 1. Primary _index._agents HTTPS record
curl -X POST "https://api.cloudflare.com/client/v4/zones/8761d68f8c25e086d34ab31fe9404c9a/dns_records" \
  -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"type":"HTTPS","name":"_index._agents.ahmedabdelwahed.me","ttl":3600,"proxied":false,"data":{"priority":1,"target":"ahmedabdelwahed.me","value":"alpn=\"h2,h3\" port=443"}}'

# 2. _a2a._agents HTTPS record
curl -X POST "https://api.cloudflare.com/client/v4/zones/8761d68f8c25e086d34ab31fe9404c9a/dns_records" \
  -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"type":"HTTPS","name":"_a2a._agents.ahmedabdelwahed.me","ttl":3600,"proxied":false,"data":{"priority":1,"target":"ahmedabdelwahed.me","value":"alpn=\"a2a\" port=443"}}'

# 3. _mcp._agents HTTPS record
curl -X POST "https://api.cloudflare.com/client/v4/zones/8761d68f8c25e086d34ab31fe9404c9a/dns_records" \
  -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"type":"HTTPS","name":"_mcp._agents.ahmedabdelwahed.me","ttl":3600,"proxied":false,"data":{"priority":1,"target":"ahmedabdelwahed.me","value":"alpn=\"mcp\" port=443"}}'

# 4. _catalog._agents TXT record
curl -X POST "https://api.cloudflare.com/client/v4/zones/8761d68f8c25e086d34ab31fe9404c9a/dns_records" \
  -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"type":"TXT","name":"_catalog._agents.ahmedabdelwahed.me","ttl":3600,"proxied":false,"content":"url=https://ahmedabdelwahed.me/.well-known/ai-catalog.json"}'
```

---

## 3. DNSSEC Activation

The DNS-AID specification requires signing the discovery zone with DNSSEC so validating resolvers return authenticated data (`AD=true`):

1. In Cloudflare Dashboard, go to **DNS** → **Settings**.
2. Scroll to the **DNSSEC** card.
3. Click **Enable DNSSEC**.
4. Cloudflare generates DS record parameters:
   - **Key Tag**
   - **Algorithm** (usually `13` - ECDSAP256SHA256)
   - **Digest Type** (usually `2` - SHA-256)
   - **Digest**
5. Log in to the domain registrar where `ahmedabdelwahed.me` was registered (e.g., Namecheap, Porkbun, Dynadot, GoDaddy, etc.).
6. Go to the domain's **DNSSEC** or **DS Records** management section and paste the 4 parameters from Cloudflare.
7. Save changes. It typically propagates to `.me` root resolvers within 10–60 minutes.

---

## 4. Verification

Run the built-in audit script to check your records and DNSSEC authentication:

```bash
npm run verify:dns-aid
```

Or verify manually using DNS-over-HTTPS:

```bash
# Verify DNS-AID HTTPS record
curl -s -H "accept: application/dns-json" "https://cloudflare-dns.com/dns-query?name=_index._agents.ahmedabdelwahed.me&type=HTTPS&do=1"

# Verify ARD catalog TXT record
curl -s -H "accept: application/dns-json" "https://cloudflare-dns.com/dns-query?name=_catalog._agents.ahmedabdelwahed.me&type=TXT"

# Verify DNSSEC validation
curl -s -H "accept: application/dns-json" "https://cloudflare-dns.com/dns-query?name=ahmedabdelwahed.me&type=DS&do=1"
```

Once propagated, re-run the agent readiness scan:
```bash
curl -X POST https://isitagentready.com/api/scan \
  -H "Content-Type: application/json" \
  -d '{"url": "https://ahmedabdelwahed.me"}'
```

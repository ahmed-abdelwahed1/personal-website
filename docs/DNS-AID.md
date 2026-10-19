# DNS for AI Discovery (DNS-AID) & Agent Discovery Configuration

This document provides the exact DNS records to publish under `ahmedabdelwahed.me` to satisfy **DNS-AID (DNS for AI Discovery)** per [IETF draft-mozleywilliams-dnsop-dnsaid](https://datatracker.ietf.org/doc/draft-mozleywilliams-dnsop-dnsaid/) and [RFC 9460](https://www.rfc-editor.org/rfc/rfc9460), as well as **ARD (Agentic Resource Discovery)** DNS-based discovery.

---

## 1. Cloudflare DNS Records to Add

Log in to your **Cloudflare Dashboard** → select domain `ahmedabdelwahed.me` → navigate to **DNS** → **Records** → click **Add Record**:

### A. Primary DNS-AID Entrypoint Record (HTTPS / SVCB)
- **Type:** `HTTPS` (or `SVCB` if preferred)
- **Name:** `_index._agents`
- **Priority:** `1`
- **Target:** `ahmedabdelwahed.me.` (or `.`)
- **Parameters:** `alpn="h2,h3" port="443"`
- **TTL:** Auto (or 3600)
- **Proxy status:** DNS only

> **Standard BIND Zone Format:**
> ```dns
> _index._agents.ahmedabdelwahed.me. 3600 IN HTTPS 1 ahmedabdelwahed.me. alpn="h2,h3" port=443
> ```

---

### B. Agent-to-Agent (A2A) Discovery Record (Optional)
- **Type:** `SVCB` (or `HTTPS`)
- **Name:** `_a2a._agents`
- **Priority:** `1`
- **Target:** `ahmedabdelwahed.me.`
- **Parameters:** `alpn="a2a" port="443" mandatory="alpn,port"`
- **TTL:** Auto (or 3600)
- **Proxy status:** DNS only

> **Standard BIND Zone Format:**
> ```dns
> _a2a._agents.ahmedabdelwahed.me. 3600 IN SVCB 1 ahmedabdelwahed.me. alpn="a2a" port=443 mandatory=alpn,port
> ```

---

### C. ARD Capability Catalog Discovery Record (TXT)
- **Type:** `TXT`
- **Name:** `_catalog._agents`
- **Content:** `url=https://ahmedabdelwahed.me/.well-known/ai-catalog.json`
- **TTL:** Auto (or 3600)
- **Proxy status:** DNS only

> **Standard BIND Zone Format:**
> ```dns
> _catalog._agents.ahmedabdelwahed.me. 3600 IN TXT "url=https://ahmedabdelwahed.me/.well-known/ai-catalog.json"
> ```

---

## 2. DNSSEC Activation

To ensure validating resolvers return authenticated data:
1. In Cloudflare Dashboard, go to **DNS** → **Settings**.
2. Scroll to the **DNSSEC** card.
3. Click **Enable DNSSEC**.
4. Copy the generated DS record parameters (`Key Tag`, `Algorithm`, `Digest Type`, `Digest`) into your domain registrar's DNSSEC management page (e.g. Namecheap, Porkbun, Google Domains/Squarespace).

---

## 3. Cloudflare "Markdown for Agents" Toggle (Edge-Level)

Cloudflare offers an edge-level toggle for Markdown for Agents:
1. In Cloudflare Dashboard, go to **Speed** or **Workers / AI** (or **Rules**).
2. Look for **Markdown for Agents** and switch it to **Enabled**.
*(Note: Application-level markdown negotiation is also handled automatically via `src/middleware.ts` for full dual-coverage).*

---

## 4. Verification

After publishing your DNS records, verify them using DoH (DNS-over-HTTPS) or `dig`:

```bash
# Verify DNS-AID HTTPS record
curl -s -H "accept: application/dns-json" "https://cloudflare-dns.com/dns-query?name=_index._agents.ahmedabdelwahed.me&type=HTTPS"

# Verify ARD catalog TXT record
curl -s -H "accept: application/dns-json" "https://cloudflare-dns.com/dns-query?name=_catalog._agents.ahmedabdelwahed.me&type=TXT"
```

Then re-run the agent readiness scan:
```bash
curl -X POST https://isitagentready.com/api/scan \
  -H "Content-Type: application/json" \
  -d '{"url": "https://ahmedabdelwahed.me"}'
```

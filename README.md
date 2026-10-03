# BlitzThreat EEM

**EEM = Environmental Event Management.** BlitzThreat EEM (BTEEM) is the security monitoring product of the BlitzWare Solutions LLC suite. This repository contains the **demo launcher**: a single-file HTML/JavaScript app that starts with a threat map portal and is the foundation for incident response, vulnerability tracking, telemetry and, eventually, a SIEM.

- Product page: https://blitzwaresolutions.github.io/bws/blitzthreat.html
- Solutions page: https://blitzwaresolutions.github.io/bws/solutions.html

> Status: early demo. Demo mode is a UI preview and provides **no security**. See [Security](#security).

## What the demo does

- Log-on splash screen shown before the landing page
- Landing page for selecting one of the **top 5 public threat maps**, opened in a new tab:
  - Fortinet Threat Map
  - Bitdefender Threat Map
  - Kaspersky Cyber Map
  - Check Point Live Cyber Threat Map
  - Radware Live Threat Map
- Swipe (touch) and arrow-key navigation, Enter to open
- Optional SSO via OpenID Connect (Authorization Code + PKCE)
- Placeholders for upcoming modules: Incident Response, CVE/CVSS, Telemetry, App Logs, BlitzGate

Map data comes from public OSINT sources. Map URLs are controlled by their vendors and may change.

## Run locally

No build step. Open `blitzthreat.html` in a browser, or serve it:

```bash
python3 -m http.server 8080
# then visit http://localhost:8080
```

## Deploy on GitHub Pages

1. Push this folder to a repository, for example `blitzwaresolutions/blitzthreat-eem`.
2. In **Settings > Pages**, set the source to the `main` branch, root folder.
3. The demo is served over HTTPS at `https://blitzwaresolutions.github.io/blitzthreat-eem/`.

Then point the "Launch demo" button in `blitzthreat.html` (in the `bws` repository) at that URL.

## Security

**TLS.** Serve only over HTTPS. GitHub Pages provides this. For self-hosting use Caddy, Nginx or Cloudflare with automatic certificates, and send `Strict-Transport-Security`, `X-Content-Type-Options`, `Referrer-Policy` and `X-Frame-Options` as real HTTP headers. The app disables sign-in on plain HTTP.

**SSO.** Edit the `CFG` block near the top of the script in `index.html`:

| Field | Value |
|---|---|
| `authorizeUrl` | IdP authorization endpoint |
| `tokenUrl` | IdP token endpoint |
| `clientId` | Public client ID registered for this app (never a client secret) |
| `redirectUri` | Defaults to the page URL; register it exactly with the IdP |

Works with OIDC providers such as Entra ID, Okta, Keycloak and Auth0. With `CFG` empty, the app runs in demo mode.

**Important limitation.** A static page cannot enforce authentication, because the client code can be changed by anyone. Production use needs a backend that validates ID tokens (signature, issuer, audience, nonce), issues an HttpOnly session cookie, and serves protected content only to authenticated users.

## Roadmap

1. **Backend:** OIDC callback, token validation, sessions, role-based access.
2. **CVE/CVSS page:** NVD API 2.0, CISA Known Exploited Vulnerabilities, EPSS scores.
3. **Incident Response portal:** incident records, status workflow aligned to NIST SP 800-61 (detect, triage, contain, eradicate, recover, review), timeline and evidence log.
4. **Telemetry and logs:** a common event schema (OCSF or ECS), collectors for connected apps, dashboards.
5. **LLM and agents:** read-only tools first (CVE lookup, incident summaries) behind an allowlist, with every call logged.
6. **SIEM:** correlation rules, alerting, retention and search built on the event schema.

## BlitzGate and BlitzRAG

**BlitzGate** is a planned gateway for the **BlitzRAG** data pipeline. It checks data against governance policy and detects PHI, PII and ePHI and other personal identifying data before it moves through the pipeline. Design intent: fail closed, redact or block on a match, and write an audit record for every decision. ePHI handling will follow HIPAA Security Rule controls (audit logging, access control, encryption in transit and at rest).

## Repository layout

```
blitzthreat.html     Demo app (launcher, splash, SSO)
README.md      This file
LICENSE        All rights reserved
.gitignore     Excludes secrets, logs, dependencies, build output
.nojekyll      Serve files as-is on GitHub Pages
```

## License

Copyright (c) 2026 BlitzWare Solutions LLC. All rights reserved. See `LICENSE`.

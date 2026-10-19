# Ahmed Abdelwahed Portfolio — auth.md

Welcome to the agent authorization and registration instructions for **Ahmed Abdelwahed's personal portfolio & blog** (`https://ahmedabdelwahed.me`).

## Overview

This website is a personal portfolio and blog showcasing data engineering projects, blog posts, and contact information. All resources, blog posts, tools, and capability catalogs on this domain are **publicly accessible** without mandatory authentication.

Agents and automated systems can access all public content directly without authentication credentials.

## Agent Registration

For agents that support standardized agent discovery and authorization protocols (such as Auth.md and OAuth 2.0 Agent Authentication):

- **Protected Resource Metadata (PRM):** `/.well-known/oauth-protected-resource`
- **Authorization Server Metadata:** `/.well-known/oauth-authorization-server`
- **Agent Skill & Registration URI:** `https://ahmedabdelwahed.me/auth.md`
- **Supported Identity Types:** `anonymous`, `identity_assertion`
- **Assertion Types:** `urn:ietf:params:oauth:token-type:id-jag`, `verified_email`
- **Credential Types:** `bearer_token`

### Anonymous Access
No token is required for read access to the portfolio, blog, or metadata files. Automated agents may identify themselves using standard `User-Agent` headers.

### Contact
If you represent an automated crawler or agent system with questions or high-volume requirements, please contact:
- **Email:** [ahmedshehatasaid1@gmail.com](mailto:ahmedshehatasaid1@gmail.com)
- **GitHub:** [https://github.com/ahmed-abdelwahed1](https://github.com/ahmed-abdelwahed1)

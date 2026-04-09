# Reyco Electrical Services — Website

A Jekyll-based static site with Tailwind CSS.

## 🛠 Development & Build

### Local Development
To run the site locally with live reloading and CSS watching:
```bash
npm run dev
```
This uses `_config_dev.yml` to override the `baseurl`, making the site accessible at `http://localhost:4000/` (root-level).

### Production Build
To generate the static site for deployment:
```bash
npm run build
```
The site is built into the `_site/` directory. This build uses the default `baseurl` in `_config.yml`.

---

## 🌐 Dynamic URL Handling (Staging vs. Production)

The site is configured to work at the root of a domain (e.g., `https://reycoelectric.github.io/` or `https://reycoelectric.com`).

### 1. Configuration in `_config.yml`
- **`url`**: The absolute domain (e.g., `https://reycoelectric.github.io`). Used for canonical URLs and SEO tags.
- **`baseurl`**: The path prefix. Set to `""` for root-level hosting.

### 2. Local Development
Local development overrides are handled in `_config_dev.yml`:
- `url`: `http://localhost:4000`
- `baseurl`: `""`

### ⚠️ Important: Using `relative_url`
To ensure links work across all environments, **always** use the `relative_url` filter for internal paths:
- **HTML:** `<link rel="stylesheet" href="{{ '/assets/css/output.css' | relative_url }}">`
- **Liquid:** `<a href="{{ '/contact/' | relative_url }}">Contact</a>`
- **Markdown:** `[Contact]({{ '/contact/' | relative_url }})`

---

## 🏗 Project Structure

- `_includes/`: Reusable HTML components (nav, footer, etc.)
- `_layouts/`: Page templates (default, service, industry)
- `_services/`: Individual service pages (Markdown)
- `_industries/`: Individual industry pages (Markdown)
- `assets/css/main.css`: Source Tailwind CSS
- `assets/css/output.css`: Generated CSS (do not edit directly)
- `_config.yml`: Primary configuration
- `_config_dev.yml`: Development overrides (local root)
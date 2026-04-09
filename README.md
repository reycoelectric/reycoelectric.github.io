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

The site is configured to work in both a GitHub Pages subdirectory (Staging) and at the root of a custom domain (Production).

### 1. Staging (GitHub Pages Subdirectory)
By default, `_config.yml` is configured with:
```yaml
baseurl: "/reycoelectric.github.io"
```
This ensures all assets (CSS, images) and internal links are correctly resolved when hosted at `https://reycoelectric.github.io/reycoelectric.github.io/`.

### 2. Production (Custom Domain at Root)
When the site is moved to its permanent home (e.g., `https://reycoelectric.com`), you only need to change one line in `_config.yml`:
```yaml
baseurl: ""
```

### ⚠️ Important: Using `relative_url`
Always use the `relative_url` filter for internal paths to ensure they work across environments:
- **HTML:** `<link rel="stylesheet" href="{{ '/assets/css/output.css' | relative_url }}">`
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
# Launch Guide — mavis.design

## 1. Preview locally
Double-click `index.html` — it opens in your browser. All pages and links work offline (fonts need internet).

## 2. Launch the official website (free options)

### Option A — Netlify (easiest, ~2 minutes)
1. Go to https://app.netlify.com → sign up free.
2. Drag the whole **My Portfolio** folder onto the "Deploy" area.
3. You get a live URL instantly (e.g. `mavis-portfolio.netlify.app`).

### Option B — GitHub Pages
1. Create a free account at https://github.com → New repository → name it `portfolio`.
2. Upload all files (keep the `projects/` folder structure).
3. Settings → Pages → Source: `main` branch → Save.
4. Site goes live at `https://<username>.github.io/portfolio/`.

### Option C — Vercel
Same drag-and-drop idea at https://vercel.com — also free.

## 3. Connect your own domain (mavismon.com)
1. In Netlify/Vercel/GitHub Pages settings, choose **Add custom domain** → enter `mavismon.com` (or `portfolio.mavismon.com`).
2. In your domain registrar's DNS settings, add the records the host shows you (usually a CNAME pointing to the host's URL).
3. Wait up to 24h for DNS; HTTPS is added automatically.

Since mavismon.com currently hosts your old Wix-exported site, you can either replace it entirely or put this new site on a subdomain like `portfolio.mavismon.com`.

## 4. Get this design into Figma (to adjust it)
Figma can't open HTML directly, but a free plugin converts it in one click:

1. Deploy the site first (step 2) so it has a public URL.
2. In Figma: **Plugins → search "html.to.design" → run it**.
3. Paste your live site URL → Import.
4. Every page becomes editable Figma layers (text, colors, auto-layout frames).

Design tokens used (for your Figma variables):
- Background `#FBF8F3` (cream) · Soft section `#F4EDE3` (sand) · Card `#FFFFFF`
- Text `#33291F` (warm brown) · Secondary text `#6E5F4F` (taupe)
- Primary `#B08968` (nude tan) · Primary dark `#8C6A4A` · Accent `#D8C3A5` (pale camel) · Pill `#F3EADD`
- Fonts: **Fraunces** (headings) + **Figtree** (body) — both free on Google Fonts
- Radius 22px · Shadow `0 8px 30px rgba(140,106,74,.10)`

Per-project showcase palettes (set inline on each `.showcase` block, taken from your real files):
- Yowza (from your design PDF): pink `#FF6DC0` · navy `#102C5C` · cream `#FFFFDB` · green `#66BB6A` · background `#F6FBFE`
- TUI (from your presentation deck): deep navy `#1A1A5E` · bright blue `#4072EE` · pale sky `#E1F0FA` · TUI red `#E2001A`

Note: no Figma files are linked or embedded anywhere on the site — all showcases are rendered directly in HTML/CSS from your real project files. The Kpopper Palace page is text-only case study (no design file was provided for it); Nestly and Daily Bloom are concept projects with concept palettes.

## 5. Before you launch — checklist
- [ ] Replace gradient project thumbnails with real screenshots (drop images in an `images/` folder and swap the `.project-thumb` divs for `<img>` tags)
- [ ] Nestly and Daily Bloom are concept projects I drafted for you — review and edit the details to match work you've actually done (or treat them as briefs to build next)
- [ ] Check your phone number and LinkedIn URL

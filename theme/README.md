# Theme

| File | Type | Does |
|---|---|---|
| [`light-dark.css`](light-dark.css) | CSS | `.show-in-light` / `.show-in-dark` utilities. They follow the OS setting, and `data-bs-theme` overrides it. |
| [`light-dark-image.lava`](light-dark-image.lava) | Include | A `<picture>` that swaps to a dark-mode image. Only one image downloads. |
| [`ignore-editor-styles.js`](ignore-editor-styles.js) | JS | Marks Rock's editors so scoped theme CSS skips them. |

## Light/dark image swaps

There are two approaches. Pick one based on what controls the color scheme.

**Only the visitor's OS setting:** use `light-dark-image.lava`. The browser picks one source, so the other image is never downloaded.

```liquid
{%- assign imageLight = CurrentPage.Layout.Site.SiteLogoBinaryFileId | ImageUrl -%}
{%- assign imageDark = CurrentPage.Layout.Site | Attribute:'SiteLogoLight','RawValue' | ImageUrl -%}
{%- assign imageAlt = 'Global' | Attribute:'OrganizationName' -%}
{% include '~~/Assets/Lava/Utilities/theme/light-dark-image.lava' %}
```

**A section forces a scheme**, e.g. a dark navbar with `data-bs-theme="dark"` on a light site: use the CSS classes. A `<picture>` can't see `data-bs-theme`.

```html
<a class="navbar-brand" href="/">
    <img class="show-in-light" src="logo.svg" alt="Church Name">
    <img class="show-in-dark" src="logo-white.svg" alt="Church Name">
</a>
```

The CSS only ever hides, so each element keeps its own `display` value (inline, flex or block). Both images download, so keep them small; SVG works well. Avoid nesting a light section inside a dark one, or the reverse: the CSS can't tell which override is nearest.

## ignore-editor-styles.js

This is for themes that scope their CSS to a wrapper and skip marked elements, like this:

```css
.theme-wrapper .btn:not(.ignore-theme) { ... }
```

Rock's HTML editor, the Content Component editor and Summernote render inside the theme wrapper, so the theme's styles break their toolbars and dialogs. The script adds `ignore-theme` to those editors and everything inside them on load. It then watches for editors added later, such as modals and UpdatePanel postbacks.

- Change `IGNORE_CLASS` to match your CSS. Compass themes use `ignore-compass`.
- Add other editor chrome to `EDITOR_SELECTORS`.
- Load it at the end of `<body>` with `defer`.

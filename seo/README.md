# SEO

| File | Type | Does |
|---|---|---|
| [`page-meta.lava`](page-meta.lava) | Include (master page `<head>`) | Site-wide Open Graph and X tags from core page and site fields. |
| [`meta-tags.lava`](meta-tags.lava) | Include (detail blocks) | Title, description and image tags for one item (event, message, group, profile). |

## How they work together

`page-meta.lava` runs on every page.
- It always writes `og:type`, `og:url`, `og:site_name`, and `twitter:site` when a handle is set.
- It writes title, description and image tags only when the page is **not** a detail page. A page counts as a detail page when one of the parameters in `detailParams` is present, e.g. `EventOccurrenceId` or `Slug`. Add your own detail parameters to that list.

On detail pages, the item's block includes `meta-tags.lava`, which adds the item's tags with `AddMetaTagToHead`. This keeps one set of tags per page instead of the site defaults plus the item's.

## page-meta.lava

Add it to the master page head:

```aspx
<Rock:Lava ID="PageMeta" runat="server">{% include '~~/Assets/Lava/Utilities/seo/page-meta.lava' %}</Rock:Lava>
```

Settings:
- `shareImageKey`: optional page attribute for a share image. The fallback is the site logo.
- `xHandle`: e.g. `@church`.
- `themeColorLight` / `themeColorDark`: browser UI colors for light and dark mode.
- `detailParams`: page parameters that mark a detail page (see above).

Image URLs are made absolute from `PublicApplicationRoot`.

## meta-tags.lava

```liquid
{%- assign metaTitle = Item.Title -%}
{%- assign metaDescription = Item.Content -%}
{%- assign metaImage = Item | Attribute:'Image','Url' -%}
{% include '~~/Assets/Lava/Utilities/seo/meta-tags.lava' %}
```

- **Description:** HTML is stripped, common entities are decoded, and the result is truncated to `metaMaxLength` (default 160).
- **Image:** root-relative image URLs are made absolute.
- **Card type:** `twitter:card` defaults to `summary_large_image` when there's an image, otherwise `summary`.
- **Browser title:** set `metaSetTitle` to `false` to leave the browser title alone.

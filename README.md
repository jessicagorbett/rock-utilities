# Rock Utilities

Reusable, client-agnostic Lava, CSS and JavaScript for [Rock RMS](https://www.rockrms.com) websites. Each file solves one problem and can be dropped into any Rock site with no client-specific IDs, names or domains.

## Folders

| Folder | What's in it |
|---|---|
| [`content-components/`](content-components/) | Starter template for Content Component blocks. |
| [`events/`](events/) | Calendar event lists: in-progress events, detail links. |
| [`links/`](links/) | Button groups and Page/File/URL link resolution. |
| [`people/`](people/) | Person avatar with photo, initials and icon fallback. |
| [`persisted-datasets/`](persisted-datasets/) | JSON build scripts for Persisted Datasets, using core fields only. |
| [`seo/`](seo/) | Site-wide and detail-page meta tags (Open Graph, X). |
| [`theme/`](theme/) | Light/dark image swaps and the editor-style guard script. |

## Two kinds of files

**Templates** are pasted whole into a block setting, attribute matrix template or dataset. Settings are at the top of the file in a `comment` block followed by `assign` lines. Change those, not the logic below them.

**Includes** are saved to the theme and called from other Lava. Assign the inputs, then include the file. Includes print their result; capture it when you need it as a value.

```liquid
{%- assign avatarPerson = CurrentPerson -%}
{% include '~~/Assets/Lava/Utilities/people/avatar.lava' %}
```

The examples assume the repo's folders are copied to `~~/Assets/Lava/Utilities/` in the theme. Adjust the path if you put them elsewhere.

## Rock core assumptions

These are part of every Rock install, so the files use them directly:

- **Calendar Id `1`** is the core Public calendar.
- **Content channel item Status `2`** is Approved.
- **Global attributes** `PublicApplicationRoot` and `OrganizationName`.
- **Image and file handlers** `/GetImage.ashx` and `/GetFile.ashx`.

Anything else (channel, category and defined type IDs; attribute keys you created) is a setting at the top of the file.

## Conventions

- **Lava engine:** written for the Fluid engine. Uses `startswith`, `{% break %}` and `{% continue %}`.
- **Whitespace:** use `{%-` / `-%}` throughout, so templates don't print stray blank lines.
- **Escaping:** escape every value printed into an HTML attribute with `| Escape`. The exception is `AddMetaTagToHead`, which encodes its own value.
- **Links:** a link that opens a new tab always gets `rel="noopener noreferrer"` and tells screen-reader users that it opens a new tab.
- **Current time:** use `'Now' | Date:'yyyy-MM-ddTHH:mm:ss'`. There is no `now` variable.
- **Empty states:** capture repeated markup and check it before rendering wrappers, so empty sections and rows aren't printed.
- **Line endings:** LF, enforced by `.gitattributes`.
- **Each folder has a README** listing its files.

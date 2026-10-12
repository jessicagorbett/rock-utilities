# Links

| File | Type | Does |
|---|---|---|
| [`button-group.lava`](button-group.lava) | Template (Attribute Matrix) | Renders a row of buttons. Detects download, on-page, map, internal and external links and sets target, icons and accessible text. |
| [`page-route.lava`](page-route.lava) | Include | Resolves a Page, File or URL attribute to link attributes (`href`, plus `target`/`rel`/`download` when needed). |

## button-group.lava

Paste into the **Template** of an Attribute Matrix Template with these attributes:

| Key | Field type | Notes |
|---|---|---|
| `DisplayText` | Text | Button label. |
| `DescriptiveText` | Text | Optional. Becomes the accessible name and tooltip, e.g. "Register for Fall Retreat". |
| `Link` | URL Link | Items without a link are skipped. |
| `Style` | Single-Select | Button classes, e.g. `btn-primary`. |

Detection order is download > anchor (`#`) > map > internal > external.
- **Internal** means relative, `mailto:`, `tel:`, or the same host as `PublicApplicationRoot`. The `www.` prefix and scheme are ignored when comparing hosts.
- **External and map links** open in a new tab.

Icons use Font Awesome 6 names. Change `iconPrefix` for a different style or kit.

Fixes over the previous Button Group versions:
- Map detection now works. It read an undefined variable.
- The `download` attribute no longer carries over to later buttons.
- `rel="noopener noreferrer"` is set on new-tab links.
- An empty `PublicApplicationRoot` no longer makes every link internal.
- Output is escaped.
- Icons are `aria-hidden`, with the "opens in new tab" hint given as text instead.

## page-route.lava

Priority is Page > File > URL. An unset Page attribute resolves to `/page/0`, which is ignored.

```liquid
{%- assign linkPage = item | Attribute:'Page','RawValue' -%}
{%- assign linkFile = item | Attribute:'File','RawValue' -%}
{%- assign linkUrl = item | Attribute:'Url','RawValue' -%}
{%- capture linkAttributes -%}{% include '~~/Assets/Lava/Utilities/links/page-route.lava' %}{%- endcapture -%}
{%- if linkAttributes != empty -%}
    <a {{ linkAttributes }} class="tile">{{ item.Title }}</a>
{%- endif -%}
```

Inside a loop, re-assign all three inputs on every item so values don't carry over.

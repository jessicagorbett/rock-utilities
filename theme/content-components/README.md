# Content Components

| File | Type | Does |
|---|---|---|
| [`template.lava`](template.lava) | Template | Starter for a new Content Component template. |

## template.lava

Rock's Content Component block passes two merge fields:
- `ContentChannel`: the component. Section-level settings are attributes on the channel.
- `Items`: the component's items, already filtered and ordered by the block.

The template follows the same steps every component needs:

1. **Read section settings.** Width, alignment, padding, background, anchor, eyebrow, heading, description and column counts each fall back to a default when the attribute is missing.
   - Alignment accepts either `start/center/end` or `Left/Center/Right`.
   - Column counts are kept at 1 or more, so there's no divide-by-zero.
2. **Capture the header** (eyebrow, heading, description).
3. **Loop and capture the items.** Items with nothing to show are skipped with `{% continue %}`, and `forloop.first` / `forloop.last` add `is-first` / `is-last` classes.
4. **Render only what has content.** The `<section>`, header and row are printed only when their captured markup isn't empty, so there are no empty wrappers.

Item headings are `h3` when the section has a heading, otherwise `h2`, so the page outline stays correct.

## Getting items from another channel

To list items from a channel other than the component's own, wrap the item capture in an entity command and loop its results instead of `Items`:

```liquid
{%- capture itemsMarkup -%}
    {%- contentchannelitem where:'ContentChannelId == 12 && Status == 2' sort:'StartDateTime desc' limit:'6' iterator:'channelItems' -%}
        {%- for item in channelItems -%}
            ...
        {%- endfor -%}
    {%- endcontentchannelitem -%}
{%- endcapture -%}
```

The block needs the **Rock Entity** Lava command enabled.

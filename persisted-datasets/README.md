# Persisted Datasets

Build scripts for **Admin Tools > CMS > Persisted Datasets**. Each script builds a JSON array from Rock core fields only, so it works on any Rock install once its settings are filled in. Enable the **Rock Entity** Lava command on the dataset.

| File | Settings | Builds |
|---|---|---|
| [`content-channel-items.lava`](content-channel-items.lava) | `channelId`, `itemLimit`, `imageKey`, `summaryLength`, `urlPrefix` | A channel's approved, active items: id, title, slug, URL, dates, summary, image, parent item. |
| [`schedule-times.lava`](schedule-times.lava) | `categoryId`, `windowDays` | Start times for the next week from active, public schedules in a category. Collapses to "Daily" or "Weekdays" where that applies. |

## Reading a dataset

```liquid
{%- assign messages = 'messages' | PersistedDataset -%}
{%- for message in messages limit:3 -%}
    <a href="{{ message.url }}">{{ message.title }}</a>
{%- endfor -%}
```

Filter in Lava with `Where`, or pass the JSON to client-side JavaScript with `ToJSON`.

## The JSON array pattern

Lava has no "join objects" filter, so both scripts build arrays the same way:

```liquid
{%- capture out -%}
    {%- for item in items -%}
        ,{ "id": {{ item.Id | ToJSON }}, "title": {{ item.Title | ToJSON }} }
    {%- endfor -%}
{%- endcapture -%}
[{{ out | Strip | ReplaceFirst:',','' }}]
```

- Every row starts with a comma, and `ReplaceFirst` removes the first one. That keeps the JSON valid even when rows are skipped with `{% continue %}`.
- Every value goes through `ToJSON`, so quotes, line breaks and nulls are encoded correctly.
- To sort by a computed key, collect `sortKey^^^json` strings separated by `~~~`, then `Split` and `Sort` them. `schedule-times.lava` does this.

## Refresh

Set the refresh interval to fit the data. Time-based datasets like `schedule-times.lava` need at least a daily refresh.

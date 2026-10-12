# Events

Lava templates for Rock calendar event lists. Both read calendar `1`, Rock's core Public calendar.

| File | Type | Does |
|---|---|---|
| [`include-until-ends.lava`](include-until-ends.lava) | Template | Keeps in-progress events visible until their scheduled end time. Events with no duration stay until the end of their start day. Shows an empty-state message when nothing is left. |
| [`details-url.lava`](details-url.lava) | Template | Links each event to its Details URL, or to the block's Details Page. External URLs open in a new tab with `rel="noopener noreferrer"` and screen-reader text. |

## Settings

**include-until-ends.lava**
- `lookbackDays` (default `30`): how far back to fetch, so multi-day events that started earlier still show. Past occurrences count toward `maxoccurrences`.
- `emptyMessage`: text shown when no events are in progress or upcoming.

**details-url.lava**
- `detailsPage`: the block's `DetailsPage` setting, or `/events` when that isn't set.
- `detailsUrlStyle`:
  - `'query'` builds `/events?EventOccurrenceId=12`. This is Rock's default.
  - `'path'` builds `/events/12`, for a route like `events/{EventOccurrenceId}`.
- `srOnlyClass`: visually hidden class. `sr-only` is Bootstrap 3, `visually-hidden` is Bootstrap 5.

## Combining them

Both templates loop over `EventScheduledInstances`. To use both, put the end-time check from `include-until-ends.lava` inside the loop of `details-url.lava`, around the `<a>`.

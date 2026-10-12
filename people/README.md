# People

| File | Type | Does |
|---|---|---|
| [`avatar.lava`](avatar.lava) | Include | Person photo, falling back to initials, then a person icon. |

## avatar.lava

```liquid
{%- for member in Group.Members -%}
    {%- assign avatarPerson = member.Person -%}
    {%- assign avatarSize = 48 -%}
    {%- assign avatarClass = 'avatar rounded-circle' -%}
    {% include '~~/Assets/Lava/Utilities/people/avatar.lava' %}
    <span>{{ member.Person.FullName }}</span>
{%- endfor -%}
```

| Input | Default | Notes |
|---|---|---|
| `avatarPerson` | required | A Person. From an alias, use `alias.Person`. |
| `avatarSize` | `96` | Display size in px. The photo is requested at 2x and cropped square. |
| `avatarClass` | none | Applied to the `<img>` or `<span>`, so photo and initials get the same styling. |
| `avatarDecorative` | `true` | Use `false` when the name isn't shown next to the avatar. The avatar then gets the person's name as its accessible name. |
| `avatarFallback` | `initials` | Use `rock` for Rock's generated avatar (`PhotoUrl`) when there's no photo. |
| `avatarIcon` | `fa fa-user` | Icon used when there's no photo or name. |

The initials `<span>` needs your own sizing and centering CSS. For example, with Bootstrap 5:

```
d-inline-flex align-items-center justify-content-center rounded-circle bg-primary text-white
```

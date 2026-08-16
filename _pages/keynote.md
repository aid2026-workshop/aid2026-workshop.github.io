---
layout: page
permalink: /keynote/
title: Keynote Speech
nav: true
nav_order: 2
nav_key: keynote
---

{%- assign wk = site.data.workshop -%}

## {{ wk.keynote.heading }}

{% if wk.keynote.talks and wk.keynote.talks != empty -%}
{%- for k in wk.keynote.talks %}

<h3 id="{{ k.id }}">{{ k.title }}</h3>

<br>
{% include wk/person_card.liquid person=k %}

{%- if k.bio and k.bio != "" %}
{{ k.bio | markdownify | replace_first: '<p>', '<p><strong>Bio.</strong> ' }}
{%- endif %}

{%- if k.abstract and k.abstract != "" %}
{{ k.abstract | markdownify | replace_first: '<p>', '<p><strong>Keynote Abstract.</strong> ' }}
{%- endif %}

{%- unless forloop.last %}

---

{%- endunless %}
{%- endfor -%}
{%- else %}

_{{ wk.keynote.tba_message }}_
{%- endif %}

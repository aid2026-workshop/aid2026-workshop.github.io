---
layout: index
title: Home
permalink: /
---

{%- assign wk = site.data.workshop -%}

# {{ wk.edition.full_title }}

{{ wk.home.summary | markdownify }}

{%- if wk.home.cta.enabled and wk.home.cta.url != "" %}

<h5 style="text-align:center;"><a href="{{ wk.home.cta.url }}">{{ wk.home.cta.text }}</a></h5>
{%- endif %}

{%- if wk.home.poster.enabled and wk.home.poster.url != "" %}

<p style="text-align:center;"><a href="{{ wk.home.poster.url | relative_url }}">{{ wk.home.poster.text }}</a></p>
{%- endif %}

{%- if wk.edition.logo and wk.edition.logo != "" %}
{%- comment -%}
Keep the <picture> below on one line: kramdown does not recognise inline tags split across lines.
The <source> serves the webp variants that jekyll-imagemagick generates, which are ~1-2% of the
size of the source PNG. Browsers without webp support ignore it and fall back to the <img>, so
nothing is lost. Do not wrap this in the figure.liquid include: that emits a block-level <figure>
and drops the inline style, which breaks the right-hand float.
{%- endcomment %}
{%- assign logo_base = wk.edition.logo | remove: '.png' | remove: '.jpg' | remove: '.jpeg' | remove: '.tiff' | remove: '.gif' -%}

<picture><source type="image/webp" srcset="{% for w in site.imagemagick.widths %}{{ logo_base | relative_url }}-{{ w }}.webp {{ w }}w{% unless forloop.last %}, {% endunless %}{% endfor %}" sizes="(min-width: 1200px) 460px, 40vw"><img src="{{ wk.edition.logo | relative_url }}" alt="{{ wk.edition.logo_alt }}" style="margin-left: 20px; width: {{ wk.edition.logo_width | default: '40%' }};" align="right"/></picture>
{%- endif %}

## {{ wk.home.about_heading }}

{{ wk.home.about | markdownify }}

{%- if wk.topics.items and wk.topics.items != empty %}

## {{ wk.topics.heading }}

{{ wk.topics.lead }}

<ul>
  {%- for t in wk.topics.items %}
    <li><strong>{{ t.title }}.</strong> {{ t.description | strip }}</li>
  {%- endfor %}
</ul>
{%- endif %}

## {{ wk.submission.heading }}

{{ wk.submission.body | markdownify }}

{%- if wk.submission.url and wk.submission.url != "" %}

Submission link: [{{ wk.submission.url }}]({{ wk.submission.url }})
{%- endif %}

{%- if wk.submission.publication_note and wk.submission.publication_note != "" %}
{{ wk.submission.publication_note | markdownify }}
{%- endif %}

{%- if wk.submission.note and wk.submission.note != "" %}
{{ wk.submission.note | markdownify }}
{%- endif %}

{%- if wk.important_dates.tracks and wk.important_dates.tracks != empty %}

## {{ wk.important_dates.heading }}

{% if wk.important_dates.lead and wk.important_dates.lead != "" %}
{{ wk.important_dates.lead }}
{% endif -%}

{% for t in wk.important_dates.tracks -%}
{%- if t.items and t.items != empty %}
{%- if t.name and t.name != "" %}

### {{ t.name }}

{%- endif %}

<ul>
  {%- for d in t.items %}
    <li>
      {{- d.label }}:
      {%- if d.previous and d.previous != "" %} <del>{{ d.previous }}</del>{% endif %}
      {{ d.date }}
      {%- if d.note and d.note != "" %} {{ d.note }}{% endif -%}
    </li>
  {%- endfor %}
</ul>
{%- endif %}
{%- endfor %}
{%- endif %}

{%- if wk.organizers.groups and wk.organizers.groups != empty %}

## {{ wk.organizers.heading }}

{% for g in wk.organizers.groups -%}
{%- if g.members and g.members != empty %}

### {{ g.role }}

{% if g.style == "cards" -%}
{%- for m in g.members %}{% include wk/person_card.liquid person=m %}{% endfor %}
<br>
{%- else -%}
{% include wk/person_list.liquid members=g.members %}
{%- endif %}
{% endif -%}
{%- endfor -%}
{%- endif %}

{%- for s in wk.home.extra_sections %}

## {{ s.heading }}

{{ s.body | markdownify }}
{%- endfor %}

{%- if wk.links.contact_email and wk.links.contact_email != "" %}

## Contact

Questions about {{ wk.edition.short_name }}? Please reach out to
<a href="mailto:{{ wk.links.contact_email }}">{{ wk.links.contact_email }}</a>.
{%- endif %}

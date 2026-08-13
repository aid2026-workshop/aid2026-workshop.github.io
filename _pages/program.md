---
layout: page
permalink: /papers/
title: Accepted papers
nav: true
nav_order: 1
nav_key: papers
---

{%- assign wk = site.data.workshop -%}

{%- assign paper_count = 0 -%}
{%- for track in wk.program.tracks -%}
{%- if track.papers -%}{%- assign paper_count = paper_count | plus: track.papers.size -%}{%- endif -%}
{%- endfor -%}

{%- if paper_count == 0 %}

_{{ wk.program.tba_message }}_

{%- else %}

{%- if wk.program.intro and wk.program.intro != "" %}
{{ wk.program.intro | markdownify }}
{%- endif %}

{%- for track in wk.program.tracks -%}
{%- if track.papers and track.papers != empty %}

## {{ track.name }}

{% for p in track.papers -%}

<h3 id="{{ p.id }}">{{ p.title }}</h3>

{{ p.authors }}

{{ p.abstract | markdownify | replace_first: '<p>', '<p><strong>Abstract.</strong> ' }}

{%- if p.video and p.video != "" %}

<div class="col-sm mt-3 mt-md-0">
    {% include video.liquid path=p.video class="img-fluid rounded z-depth-1" controls=true %}
</div>
{%- endif %}

{%- assign extra_links = "" | split: "" -%}
{%- if p.pdf and p.pdf != "" %}{% capture l %}[Paper PDF]({{ p.pdf | relative_url }}){% endcapture %}{% assign extra_links = extra_links | push: l %}{% endif %}
{%- if p.slides and p.slides != "" %}{% capture l %}[Slides]({{ p.slides | relative_url }}){% endcapture %}{% assign extra_links = extra_links | push: l %}{% endif %}
{%- if extra_links != empty %}
{{ extra_links | join: " · " }}
{%- endif %}

{% endfor -%}
{%- endif -%}
{%- endfor -%}
{%- endif %}

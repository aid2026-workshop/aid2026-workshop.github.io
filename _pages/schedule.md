---
layout: page
permalink: /schedule/
title: Schedule
nav: true
nav_order: 3
nav_key: schedule
---

{%- assign wk = site.data.workshop -%}

{%- capture papers_url %}{% link _pages/program.md %}{% endcapture -%}
{%- capture keynote_url %}{% link _pages/keynote.md %}{% endcapture -%}

{%- assign all_papers = "" | split: "" -%}
{%- for track in wk.program.tracks -%}
{%- if track.papers -%}{%- assign all_papers = all_papers | concat: track.papers -%}{%- endif -%}
{%- endfor -%}

{%- capture venue_line -%}
{{ wk.event.date }}
{%- if wk.event.venue.name and wk.event.venue.name != "" %} / location: {{ wk.event.venue.name }}{% endif -%}
{%- if wk.event.venue.address and wk.event.venue.address != "" %}, {{ wk.event.venue.address }}{% endif -%}
{%- endcapture %}

{{ venue_line }}

{%- if wk.event.venue.map_embed_url and wk.event.venue.map_embed_url != "" %}

<iframe
  src="{{ wk.event.venue.map_embed_url }}"
  width="600"
  height="450"
  style="border:0; max-width:100%;"
  allowfullscreen=""
  loading="lazy"
  referrerpolicy="no-referrer-when-downgrade"
  title="{{ wk.event.venue.name }} map"
></iframe>
{%- endif %}

{%- if wk.schedule.intro and wk.schedule.intro != "" %}

{{ wk.schedule.intro | markdownify }}
{%- endif %}

{%- if wk.schedule.update.date and wk.schedule.update.date != "" %}

###### Last Updated on {{ wk.schedule.update.date }}

{{ wk.schedule.update.body | markdownify }}
{%- endif %}

{%- if wk.schedule.session_summary and wk.schedule.session_summary != empty %}

<ul>
  {%- for s in wk.schedule.session_summary %}
    <li><strong>{{ s.name }}</strong>. {{ s.description | strip }}</li>
  {%- endfor %}
</ul>
{%- endif %}

{%- if wk.schedule.overview and wk.schedule.overview != empty %}

<table class="table table-striped">
  <thead>
    <tr>
      <th class="text-center"><span class="h5">Time ({{ wk.event.timezone }})</span></th>
      <th class="text-center"><span class="h5">Event</span></th>
    </tr>
  </thead>
  <tbody>
    {%- for r in wk.schedule.overview %}
      <tr>
        <td class="text-center">{% include wk/inline.liquid text=r.time %}</td>
        <td class="text-center">
          {%- include wk/inline.liquid text=r.event -%}
          {%- if r.sub and r.sub != "" %}<br>{% include wk/inline.liquid text=r.sub %}{% endif -%}
          {%- if r.who and r.who != "" %}<br><em>{% include wk/inline.liquid text=r.who %}</em>{% endif -%}
        </td>
      </tr>
    {%- endfor %}
  </tbody>
</table>
{%- endif %}

{%- if wk.schedule.sessions and wk.schedule.sessions != empty %}

<br>

---

## {{ wk.schedule.presentation_heading }}

{%- if wk.schedule.presentation_note and wk.schedule.presentation_note != "" %}
{{ wk.schedule.presentation_note | markdownify }}
{%- endif %}

{% for s in wk.schedule.sessions -%}

### {{ s.name }}

{% for t in s.talks -%}
{%- assign t_title = "" -%}
{%- assign t_url = "" -%}
{%- assign t_missing = "" -%}
{%- if t.paper and t.paper != "" -%}
{%- assign found = all_papers | where: "id", t.paper | first -%}
{%- if found -%}
{%- assign t_title = found.title -%}
{%- capture t_url %}{{ papers_url }}#{{ t.paper }}{% endcapture -%}
{%- else -%}
{%- capture t_missing %}paper: {{ t.paper }}{% endcapture -%}
{%- endif -%}
{%- elsif t.keynote and t.keynote != "" -%}
{%- assign found = wk.keynote.talks | where: "id", t.keynote | first -%}
{%- if found -%}
{%- assign t_title = found.title -%}
{%- capture t_url %}{{ keynote_url }}#{{ t.keynote }}{% endcapture -%}
{%- else -%}
{%- capture t_missing %}keynote: {{ t.keynote }}{% endcapture -%}
{%- endif -%}
{%- endif -%}
{%- if t_title == "" and t.label and t.label != "" -%}
{%- assign t_title = t.label -%}
{%- assign t_url = t.link -%}
{%- endif -%}
{%- if t_title == "" -%}
{%- capture t_title %}**(unknown {{ t_missing }} — check \_data/workshop.yml)**{% endcapture -%}
{%- assign t_url = "" -%}
{%- endif -%}
**{{ t.time }}** {% if t_url and t_url != "" %}[{{ t_title }}]({{ t_url }}){% else %}{{ t_title }}{% endif %}

{% endfor -%}
{%- endfor -%}
{%- endif %}

{%- if wk.schedule.overview == empty and wk.schedule.sessions == empty %}

_{{ wk.schedule.tba_message }}_
{%- endif %}

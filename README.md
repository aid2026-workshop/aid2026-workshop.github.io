# AID'26 Workshop website

Source for the website of the IEEE PRDC 2026 Workshop on AI Dependability (AID'26).
It uses the [al-folio](https://github.com/alshedivat/al-folio) Jekyll theme and is deployed to GitHub Pages by GitHub Actions.

All site content lives in a single file, **`_data/workshop.yml`**.
The pages under `_pages/` are templates that read from it, so editing content does not require touching any template.

## Editing content

| To change                                                                   | Edit                                                          |
| --------------------------------------------------------------------------- | ------------------------------------------------------------- |
| Dates, venue, topics, submission info, organizers, keynote, papers, program | `_data/workshop.yml`                                          |
| Photos and logos                                                            | add to `assets/img/`, then point `_data/workshop.yml` at them |
| Page names and menu order                                                   | the front matter of `_pages/*.md` (`title`, `nav_order`)      |
| Site address                                                                | `url` in `_config.yml`                                        |
| Banner photo at the top of every page                                       | `.header-background .img` in `_sass/_themes.scss`             |

Values still to be filled in are marked `TBD` or left empty in `_data/workshop.yml`. As of the
first release those are `event.date`, `event.venue.address`, `submission.url` and
`links.contact_email`; an empty value hides its line or section rather than showing a blank.

### Image credits

`assets/img/hk-victoria-harbour-2024.jpg` — the banner photo — is **cropped and resized to 8:1**
from [Panorama of Hong Kong Harbour from The Peak dllu.jpg](https://commons.wikimedia.org/wiki/File:Panorama_of_Hong_Kong_Harbour_from_The_Peak_dllu.jpg)
by Dllu on Wikimedia Commons, shot 2024-09-13, licensed
[CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/).

That licence carries obligations, so do not drop these when editing:

- **Attribution is required.** The visible credit is `links.footer_note` in `_data/workshop.yml`,
  which renders in the footer of every page. Keep it as long as this photo is used.
- **ShareAlike.** The cropped file is itself CC BY-SA 4.0.
- **Changes must be indicated** — the footer credit says "cropped", and the crop is described above.

Replacing the banner means updating the `url(...)` in `_sass/_themes.scss`, `links.footer_note`,
and this note. If you swap in a public-domain or CC0 photo, the footer credit can be dropped.

### Showing and hiding pages

Keep a page hidden until its content is final:

```yaml
show_pages:
  keynote: false
  papers: false
  schedule: false
```

While a page is `false` it only disappears from the menu. Visiting its URL directly shows that section's `tba_message`.

### Links to earlier editions

`previous_editions` in `_data/workshop.yml` becomes a dropdown at the end of the navigation bar.
List editions newest first; the dropdown holds any number of them.

```yaml
previous_editions:
  heading: "Past Workshops"
  items:
    - name: "AID 2025"
      url: "https://aid2025-workshop.github.io"
```

When starting the next edition, add an entry above `AID 2025` rather than replacing it.
An empty `items` list hides the dropdown. These links open in a new tab.

### Important dates

Each named track renders as its own subheading, so per-track deadlines can differ.
Both tracks currently share one schedule, so there is a single track with an empty
`name` (no subheading) and `lead` states that the dates apply to both.

```yaml
important_dates:
  lead: "Both the Regular Paper Track and the R&D Paper Track share the **same deadlines**:" # optional
  tracks:
    - name: "" # empty renders the list with no subheading
      items:
        - label: "Paper submission"
          date: "11 September 2026"
          previous: "" # e.g. "4 September 2026" to show the old date struck through
          note: "(AoE)"
```

If the tracks ever diverge, give this track a `name`, add a second one, and drop or
reword `lead`. `lead` accepts Markdown; `previous` shows the pre-extension date struck through.

### Organizers

`style: cards` renders photo cards; `style: list` renders a "Name (Affiliation)" list.

```yaml
organizers:
  groups:
    - role: "Organization Chairs"
      style: cards
      members:
        - name: "Someone Somebody" # no Prof./Dr. -- see below
          affiliation: "Some University, Country"
          img: "assets/img/someone.jpg"
          url: ""
```

Two conventions to preserve when editing this section:

- **No titles.** Names carry no `Prof.` or `Dr.`, matching the PRDC committee pages.
- **The Program Committee is sorted alphabetically by given name**, not by surname. Because
  names are written given-name-first, the sort is visible at a glance (`Ah Reum Kang`,
  `Byung Il Kwak`, `Hyoungshick Kim`, ...), which keeps the order from reading as a ranking.
  Chairs keep their own order.

### Accepted papers

`id` is how the schedule refers to a paper.

```yaml
program:
  tracks:
    - name: "Regular Paper Track"
      papers:
        - id: "llm-patching"
          title: "Dependable Code Repair with LLMs"
          authors: "First Author (Affiliation); Second Author (Affiliation)"
          abstract: |
            Paper abstract goes here.
          video: "" # path to an mp4 in assets/video/
          pdf: ""
          slides: ""
```

### Program

Reference a paper by `id` rather than repeating its title; the title and link are filled in automatically.
A wrong `id` renders a visible "unknown paper" note, so it shows up in the local preview.

```yaml
schedule:
  overview: # timetable for the day
    - time: "09:00--09:10"
      event: "Opening remark for AID'26"
  sessions: # presentation order per session
    - name: "Session I"
      talks:
        - time: "09:10--09:30"
          paper: "llm-patching" # a paper id from program
        - time: "09:30--09:50"
          label: "Panel discussion" # anything that is not a paper
    - name: "Keynote"
      talks:
        - time: "15:10--16:00"
          keynote: "secure-programs-with-llms" # an id from keynote
```

## Local preview

Docker avoids a local Ruby install:

```bash
docker compose up          # http://localhost:8080, reloads on save
```

To build once and inspect the output in `_site/`:

```bash
docker run --rm -v "$PWD":/srv/jekyll -w /srv/jekyll \
  --entrypoint bash amirpourmand/al-folio:v0.14.6 \
  -c "bundle exec jekyll build"
```

With Ruby 3.x installed you can run Jekyll directly. (The Ruby 2.6 that ships with macOS will not work.)

```bash
bundle install
bundle exec jekyll serve   # http://localhost:4000
```

The many Sass `DEPRECATION WARNING` messages during a build come from the theme and are expected.

## Deployment

Pushing to `main` triggers `.github/workflows/deploy.yml`, which builds the site and publishes it to the `gh-pages` branch.
Under **Settings → Pages**, set Source to `Deploy from a branch` / `gh-pages` / `/ (root)`.

First push to a new repository:

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/aid2026-workshop/aid2026-workshop.github.io.git
git push -u origin main
```

If the repository is not named `<user-or-org>.github.io`, adjust `url` and `baseurl` in `_config.yml` to match the real address.

## Repository layout

```
_data/workshop.yml    all site content
_pages/               index.md (/), program.md (/papers/), keynote.md (/keynote/), schedule.md (/schedule/)
_includes/wk/         components specific to this site (person card, person list)
_includes/ _layouts/ _sass/ assets/    al-folio theme
_config.yml           Jekyll settings
.github/workflows/    deploy.yml (deployment), prettier.yml (format check)
docker-compose.yml    local preview
```

## Notes for editors

- Indent YAML with spaces only. Quote any value containing `:` or `#`.
- Write multi-line text as `key: |` to keep paragraph breaks, or `key: >` to fold it into one paragraph.
- `---` in body text renders as an em dash.
- Keep inline HTML tags such as `<img>` in `_pages/*.md` on a single line.
  Split across lines, kramdown treats them as plain text instead of HTML.
- Formatting is checked with Prettier:

  ```bash
  npm install && npx prettier . --write
  ```

## Starting the next edition

1. Copy this repository.
2. Update `edition`, `event`, `important_dates` and `submission.url` in `_data/workshop.yml`.
3. Reset `keynote.talks`, `program.tracks[].papers`, `schedule.overview` and `schedule.sessions` to `[]`.
4. Set every entry under `show_pages` back to `false`.
5. Point `url` in `_config.yml` at the new address.

No year appears in the templates or in `_config.yml`, so those five steps are enough.

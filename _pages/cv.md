---
permalink: /cv/
title: "Curriculum Vitae"
author_profile: true
---

{% include base_path %}

<ul class="cv-actions">
  <li><a class="button-link button-link--primary" href="{{ base_path }}/files/David-Amebley-CV.pdf">View PDF</a></li>
  <li><a class="button-link" href="{{ base_path }}/files/David-Amebley-CV.pdf" download="David-Amebley-CV.pdf">Download CV<span class="visually-hidden"> (PDF)</span></a></li>
</ul>

<ul class="cv-links" aria-label="Profiles">
  {% if site.author.github %}<li><a href="https://github.com/{{ site.author.github }}">GitHub</a></li>{% endif %}
  {% if site.author.linkedin %}<li><a href="https://www.linkedin.com/in/{{ site.author.linkedin }}">LinkedIn</a></li>{% endif %}
</ul>

{% include cv-sections.html %}

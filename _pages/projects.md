---
permalink: /projects/
title: "Selected Projects and Engineering Work"
author_profile: true
---

<ul class="project-list">
  {% for project in site.data.projects.projects %}
  <li>{% include project-entry.html project=project %}</li>
  {% endfor %}
</ul>

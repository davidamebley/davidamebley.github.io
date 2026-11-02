---
permalink: /contact/
title: "Contact"
author_profile: true
---

For research collaborations, professional opportunities, or other inquiries, feel free to get in touch.

{% include contact-form.html %}

## Professional profiles

<ul class="contact-links">
  {% if site.author.linkedin %}
  <li><span class="contact-links__label">LinkedIn</span> <a href="https://www.linkedin.com/in/{{ site.author.linkedin }}">linkedin.com/in/{{ site.author.linkedin }}</a></li>
  {% endif %}
  {% if site.author.github %}
  <li><span class="contact-links__label">GitHub</span> <a href="https://github.com/{{ site.author.github }}">github.com/{{ site.author.github }}</a></li>
  {% endif %}
</ul>

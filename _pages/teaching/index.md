---
permalink: /teaching/
title: "Teaching"
author_profile: true
---

{% include base_path %}
{% include teaching-nav.html %}

I currently serve as a Graduate Teaching Assistant at The University of Alabama for CS 200: Software Design and Engineering. Before beginning my doctoral studies, I taught information technology in Ghana. These experiences have shaped my approach to teaching, particularly the importance I place on encouragement, clear explanations, and practical learning.

<h2 id="teaching-sections">Explore Teaching</h2>

<ul class="card-grid" aria-labelledby="teaching-sections">
  {% for item in site.data.navigation.teaching %}
  <li>
    <a class="card" href="{{ base_path }}{{ item.url }}">
      <span class="card__title">{{ item.title }}</span>
      <span class="card__text">{{ item.description }}</span>
      {% if item.note %}<span class="card__note">{{ item.note }}</span>{% endif %}
    </a>
  </li>
  {% endfor %}
</ul>

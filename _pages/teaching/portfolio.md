---
permalink: /teaching/portfolio/
title: "Teaching & Learning Reflections"
author_profile: true
---

{% include base_path %}
{% include teaching-nav.html %}
{% assign activities = site.data.teaching_activities.activities %}

These reflections draw on self-assessment inventories, reflective writing, and lesson planning that helped me examine how I teach and why. The inventories describe my preferences rather than measured teaching effectiveness, so I treat their results as prompts for reflection. Each entry notes what the activity showed me and how it informs my teaching.

<nav class="activity-index" aria-labelledby="activity-index-title">
  <h2 id="activity-index-title" class="visually-hidden">Activities</h2>
  <ol>
    {% for activity in activities %}
    <li><a href="#{{ activity.id }}">{{ activity.title }}</a></li>
    {% endfor %}
  </ol>
</nav>

<ol class="activity-list">
  {% for activity in activities %}
  <li class="activity" id="{{ activity.id }}">
    <h2 class="activity__title">{{ activity.title }}</h2>
    <p class="activity__purpose">{{ activity.focus }}</p>
    <p class="activity__reflection"><span class="activity__label">Reflection:</span> {{ activity.reflection }}</p>
    {% if activity.link %}<p class="activity__link"><a href="{{ base_path }}{{ activity.link.url }}">{{ activity.link.label }}</a></p>{% endif %}
  </li>
  {% endfor %}
</ol>

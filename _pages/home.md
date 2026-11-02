---
layout: home
permalink: /
title: "David Amebley"
---

{% include base_path %}
{% assign publications = site.publications | sort: "order" %}

<section class="hero" aria-labelledby="hero-name">
  <div class="hero__photo">
    {% include headshot.html %}
  </div>
  <div class="hero__body">
    <h1 id="hero-name" class="hero__name">{{ site.author.name }}</h1>
    <p class="hero__role">Ph.D. Student in Computer Science <span class="hero__institution">The University of Alabama</span></p>
    <p class="hero__bio">I study how people understand and interact with intelligent systems, focusing on privacy, trust, and usable security. My work combines empirical research, technical evaluation, and software engineering.</p>
    <ul class="hero__actions">
      <li><a class="button-link button-link--primary" href="{{ base_path }}/research/">Research</a></li>
      <li><a class="button-link" href="{{ base_path }}/publications/">Publications</a></li>
      <li><a class="button-link" href="{{ base_path }}/cv/">CV</a></li>
    </ul>
  </div>
</section>

<section class="home-section" aria-labelledby="home-research">
  <div class="home-section__header">
    <h2 id="home-research">Research</h2>
    <a class="home-section__more" href="{{ base_path }}/research/">Research overview</a>
  </div>
  <p>My current work examines how software developers approach post-quantum cryptography adoption. Earlier work evaluated membership inference risks in vision-language models.</p>
  <div class="card-grid-container">
    <ul class="card-grid card-grid--three">
      {% for theme in site.data.research.themes %}
      <li class="card card--static">
        <h3 class="card__title">{{ theme.short_title | default: theme.title }}</h3>
        <p class="card__text">{{ theme.summary }}</p>
      </li>
      {% endfor %}
    </ul>
  </div>
</section>

<section class="home-section" aria-labelledby="home-publications">
  <div class="home-section__header">
    <h2 id="home-publications">Selected publications</h2>
    <a class="home-section__more" href="{{ base_path }}/publications/">All publications</a>
  </div>
  <ul class="pub-list">
    {% for pub in publications %}
      {% if pub.selected %}
      <li>{% include publication-entry.html pub=pub %}</li>
      {% endif %}
    {% endfor %}
  </ul>
</section>

<section class="home-section" aria-labelledby="home-teaching">
  <div class="home-section__header">
    <h2 id="home-teaching">Teaching</h2>
    <a class="home-section__more" href="{{ base_path }}/teaching/">Teaching</a>
  </div>
  <p>I am a Graduate Teaching Assistant at The University of Alabama, supporting instruction and student learning in CS 200: Software Design and Engineering. I previously taught information technology in Ghana.</p>
</section>

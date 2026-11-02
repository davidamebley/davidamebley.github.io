---
permalink: /research/
title: "Research"
author_profile: true
---

{% include base_path %}
{% assign woot = site.publications | where: "key", "woot2026" | first %}
{% assign cogmi = site.publications | where: "key", "cogmi2026" | first %}

My research connects human-centered computing with security and privacy: how developers make decisions about security technologies, and how AI models can expose information about their training data.

## Research themes

<div class="card-grid-container">
  <ul class="card-grid card-grid--three">
    {% for theme in site.data.research.themes %}
    <li class="card card--static">
      <h3 class="card__title">{{ theme.title }}</h3>
      <p class="card__text">{{ theme.summary }}</p>
    </li>
    {% endfor %}
  </ul>
</div>

## Current research

<div class="research-item">
  <h3>Developer decision-making and post-quantum cryptography adoption</h3>
  <p class="pub__tags"><span class="pub__status pub__status--in-progress">In progress</span></p>
  <p>Moving to post-quantum cryptography depends largely on software developers. We are studying how developers decide whether and how to adopt it, and which usability barriers they encounter.</p>
</div>

## Previous work

<div class="research-item">
  <h3>Membership inference privacy risks in vision-language models</h3>
  <p class="pub__tags"><span class="pub__status">Published</span></p>
  <p>We evaluated whether neuro-inspired multimodal vision-language models resist membership inference attacks, which try to determine whether a specific example was part of a model's training data. The work was published at the {{ woot.venue }}.</p>
  <p><a href="{{ woot.links[0].url }}">Read the paper<span class="visually-hidden">: {{ woot.title }}</span></a> or see all <a href="{{ base_path }}/publications/">publications</a>.</p>
</div>

## Collaborative work

<div class="research-item">
  <h3>Spiking neural networks for network intrusion detection</h3>
  <p class="pub__tags"><span class="pub__tag">Coauthor</span></p>
  <p>Our research examines spiking neural networks for network intrusion detection. One paper was accepted at {{ cogmi.venue }}, and a related journal manuscript has been submitted.</p>
  <p><a href="{{ cogmi.links[0].url }}">Read the preprint<span class="visually-hidden">: {{ cogmi.title }}</span></a> or see all <a href="{{ base_path }}/publications/">publications</a>.</p>
</div>

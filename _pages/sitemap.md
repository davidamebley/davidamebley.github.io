---
layout: archive
title: "Sitemap"
permalink: /sitemap/
author_profile: true
---

{% include base_path %}

All pages on this site. An [XML sitemap]({{ base_path }}/sitemap.xml) is also available for search engines.

<h2>Pages</h2>
{% assign sitemap_pages = site.pages | where_exp: "p", "p.title" | where_exp: "p", "p.sitemap != false" | sort: "url" %}
{% for post in sitemap_pages %}
  {% include archive-single.html %}
{% endfor %}

{% if site.posts.size > 0 %}
<h2>Posts</h2>
{% for post in site.posts %}
  {% include archive-single.html %}
{% endfor %}
{% endif %}

{% for collection in site.collections %}
{% unless collection.output == false or collection.label == "posts" or collection.docs.size == 0 %}
  <h2>{{ collection.label | capitalize }}</h2>
  {% for post in collection.docs %}
    {% include archive-single.html %}
  {% endfor %}
{% endunless %}
{% endfor %}

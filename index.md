---
layout: default
title: Konstantin Zaremski
description: Konstantin Zaremski is a software developer specializing in AI/ML and legal technology, based in Littleton, Colorado. Currently building intelligent systems at Tschetter Sulzer Muccio.
last_modified_at: 2026-05-05
---

# Konstantin Zaremski

<div class="card bg-primary shadow-soft border-light mb-4">
  <div class="card-body">
    <p class="card-text">
      Hello! I'm <strong>Konstantin Zaremski</strong>, a software developer specializing in AI/ML and legal technology, based in Littleton, Colorado.
      I'm currently building intelligent systems at <strong>Tschetter Sulzer Muccio</strong>, with full-stack experience spanning ASP.NET Core, Python, C#, and cloud-native deployments in Microsoft Azure and Kubernetes.
    </p>
    <p class="card-text">
      I got my start writing code as a kid and built my first award-winning app at 13, earning Best in State and Best in Region at the Verizon Innovative App Challenge.
      After a cancer diagnosis at 16 interrupted high school, I came back stronger, earning my GED, transferring through Arapahoe Community College, and graduating <i>Summa Cum Laude</i> with a B.S. in Computer Science from Metropolitan State University of Denver in December 2025.
    </p>
    <p class="card-text">
      Beyond code, I have an eye for the visual and a drive to see projects through to fulfillment.
    </p>
  </div>
</div>

<h3>Highlights</h3>

<div class="card bg-primary shadow-soft border-light mb-4">
  <div class="card-body">
    <h4><i class="fab fa-apple mr-2"></i>Apple Notes Exporter</h4>
    <p class="card-text">
      My most popular open-source project: a free macOS app written in Swift that bulk exports Apple Notes to HTML, PDF, Markdown, LaTeX, RTF, and TXT while preserving folder hierarchies and formatting.
      It queries the local Notes database directly for performance and supports both iCloud and local accounts.
      Currently at <strong>300+ stars on GitHub</strong>, Apple-notarized, and actively maintained.
    </p>
    <a class="text-secondary" href="{{ '/projects/applenotesexporter/' | relative_url }}">Read more &rarr;</a>
  </div>
</div>

<div class="card bg-primary shadow-soft border-light mb-4">
  <div class="card-body">
    <h4><i class="fas fa-rocket mr-2"></i>NASA RockSat-X</h4>
    <p class="card-text">
      I contributed software for the <strong>VRSE payload</strong> on a NASA sounding rocket mission with the Community Colleges of Colorado team.
      The payload extended a camera arm to capture VR video from the edge of space.
      On August 19, 2021, the rocket launched successfully and recorded a 1:57 high-resolution VR video from <strong>98 miles above Earth</strong>.
      The footage was <a href="https://scitechdaily.com/hitch-a-virtual-ride-on-a-nasa-sounding-rocket-view-earth-from-98-miles-up/" target="_blank" rel="noopener noreferrer">featured by SciTechDaily</a> and NASA.
    </p>
    <a class="text-secondary" href="{{ '/projects/rocksat/' | relative_url }}">Read more &rarr;</a>
  </div>
</div>

<div class="card bg-primary shadow-soft border-light mb-4">
  <div class="card-body">
    <h4><i class="fas fa-shield-alt mr-2"></i>MSU Denver Cybersecurity Center</h4>
    <p class="card-text">
      As a Software Developer at MSU Denver's Cybersecurity Center, I built a secure internal platform with ASP.NET Core and Vue for analyst management, integrated KeyCloak, WireGuard, and Mailgun via REST APIs and OIDC, and built a custom Alpine Linux distro for Protectli hardware running Suricata for network security alert detection.
      I also managed cloud-native deployments on the production Kubernetes cluster via ArgoCD.
    </p>
    <a class="text-secondary" href="{{ '/experience/' | relative_url }}">See full experience &rarr;</a>
  </div>
</div>

<div class="card bg-primary shadow-soft border-light mb-4">
  <div class="card-body">
    <h4><i class="fas fa-pen-nib mr-2"></i>Recent Writing</h4>
    {% assign latest_post = site.posts | first %}
    {% if latest_post %}
    <p class="card-text">
      <strong><a class="text-secondary" href="{{ latest_post.url | relative_url }}">{{ latest_post.title }}</a></strong>
      <br />
      <span class="text-muted small"><i class="far fa-calendar mr-1"></i>{{ latest_post.date | date: "%B %d, %Y" }}</span>
    </p>
    <p class="card-text">{{ latest_post.excerpt | strip_html | truncate: 280 }}</p>
    {% endif %}
    <a class="text-secondary d-block mt-2" href="{{ '/blog/' | relative_url }}">See all posts &rarr;</a>
  </div>
</div>

<div class="card bg-primary shadow-soft border-light mb-4">
  <div class="card-body">
    <h4><i class="fas fa-trophy mr-2"></i>Awards</h4>
    <ul class="card-text mb-0">
      <li><strong>First Place</strong> in the MSU Denver-DU Joint Hackathon 2023</li>
      <li><strong>First Place</strong> in the ACC Fall 2022 Coding Competition</li>
      <li><strong>Best in State & Region</strong> in the Verizon Innovative App Challenge 2013</li>
    </ul>
    <a class="text-secondary mt-2 d-inline-block" href="{{ '/awards/' | relative_url }}">See all awards &rarr;</a>
  </div>
</div>

<div class="card bg-primary shadow-soft border-light mb-4">
  <div class="card-body">
    <p class="card-text"><i>Let's connect and bring your specs, concepts, and goals to fruition!</i></p>
    <a class="text-secondary" href="{{ '/contact/' | relative_url }}">Get in touch &rarr;</a>
  </div>
</div>

---
layout: project
title: Best Buy Computing Sale Tracker
period: Jun 2021 - Aug 2021
description: I built a web app for retail sales associates at my Best Buy location to independently report sales to Microsoft vendor provided labor.
banner: /assets/img/bbytoolbox.png
order: 3
---

<h1 class="px-4"><span class="h4 text-secondary"><a href="{{ '/projects/' | relative_url }}"><i class="fas fa-folder-open mr-2"></i>Projects/ </a></span>Best Buy Computing Sale Tracker</h1>

<div class="card bg-primary shadow-soft border-light mb-4">
  <div class="card-body">
    <h4>Problem & Scope</h4>
    <p>
      Best Buy tracks sales internally with their reporting software.
      Microsoft provides labor for the store and I saw that their associates can have a more realtime report on the performance of the stores if store associates track their sales directly instead of tallying them on an erasable card.
      I developed a web app using React, Express, and MongoDB that keeps track of products and services sold in individual sales made by employees in the computing department.
      It aims to simplify the tasks of the representatives that Microsoft sends to each Best Buy market in the country.
      I worked with the Microsoft representative that visits our store to add features that would benefit them and pilot the app's use in other stores within the market.
      The app's backend generates and emails a report to the representative every morning for the previous day with a breakdown of sales by employee and calculates key performance indicators.
      At its peak it was in use by three stores in Colorado, on track to becoming a standard procedure, but is now defunct with my departure from the company.
    </p>
    <strong>Core Features:</strong>
    <ul>
      <li>Installable progressive web app.</li>
      <li>Track sales of Windows computers, Microsoft Office, XBOX, and Best Buy Geek Squad Protection or Total Tech Support plans.</li>
      <li>Multiple stores and supports different time zones.</li>
      <li>Automatic calculation and tracking of key performance indicators based on the ratios of the different kinds of units sold to each other.</li>
      <li>End of day automatic reporting with Excel file generation that is then emailed to a set of admin emails (myself and the third-party Microsoft associates).</li>
      <li>Simple PIN authentication to avoid scanning and use by customers and other unauthorized users.</li>
    </ul>
    <h6><small><i>This project was not compensated for by management and was done for entertainment and as an excercise of my skill.</i></small></h6>
  </div>
</div>

<div class="card bg-primary shadow-soft border-light mb-4">
  <div class="card-body">
    <h4>Front End</h4>
    <p>
      ReactJS front end with tags and manifest file for it to function as an "installable" progressive web app for Android and Apple iOS devices.
      Mobile first design as the app is going to be used on the smartphones of the retail sales associates in the department and not the computers.
    </p>
    <h5>Screenshots</h5>
    <div class="row">
      <div class="col-md-4"><img src="{{ '/assets/img/bbytoolbox_sc_1.png' | relative_url }}" class="w-100" alt="Screenshot of the sale tracker app"/></div>
      <div class="col-md-4"></div>
      <div class="col-md-4"></div>
    </div>
  </div>
</div>

<div class="card bg-primary shadow-soft border-light mb-4">
  <div class="card-body">
    <h4>Back End</h4>
    <p>
      I chose to implement the backend in Node.js using the ExpressJS framework.
      Data is stored in a MongoDB database for its parity with the rest of the JavaScript stack.
    </p>
    <p>
      An NGINX instance acts as a reverse proxy for the Node.js service.
      The application itself is hosted on a Linux VPS.
    </p>
    <p>
      Email sending is handled by Mailgun using their Node.js API.
      Report XLSX files are attached to the email API payload as base64 data instead of a binary stream as it is more portable this way.
    </p>
  </div>
</div>

<div class="card bg-primary shadow-soft border-light mb-4">
  <div class="card-body">
    <h4>Recognition & Expansion</h4>
    <p class="card-text">
      After being implemented it garnered the attention of the Microsoft representatives that visit my store.
      I worked with them to implement multi-store capability and email reporting.
      We rolled it out to two additional stores.
    </p>
  </div>
</div>

<div class="card bg-primary shadow-soft border-light mb-4">
  <div class="card-body">
    <h4>Present</h4>
    <p>
      After a loss of interest by the Microsoft vendors in August and my departure from Best Buy/Geek Squad in December of 2021 for my new position at NCH Software, use of the app dwindled and associates reverted to the paper tracking system.
    </p>
  </div>
</div>

<div class="card bg-primary shadow-soft border-light mb-4">
  <div class="card-body">
    <h4>Source Code</h4>
    <p>
      When the project/app was actively being used I had the source code private.
      Now that its use has concluded, I have made the GitHub repostiory public, available here: <a href="https://github.com/kzaremski/bbytoolbox" target="_blank" class="text-secondary" rel="noreferrer">https://github.com/kzaremski/bbytoolbox</a>.
    </p>
  </div>
</div>

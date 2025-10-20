---
layout: project
title: MSU-DU Joint Hackathon 2023 (uConnect)
period: Oct 2023
description: Over 30 hours, I and a team of 4 other people built a multi-university event aggregator website with Node.js and MongoDB.
banner: /assets/img/hack23.png
order: 1
---

<h1 class="px-4"><span class="h4 text-secondary"><a href="{{ '/projects/' | relative_url }}"><i class="fas fa-folder-open mr-2"></i>Projects/ </a></span>MSU-DU Joint Hackathon 2023 (uConnect)</h1>

<div class="card bg-primary shadow-soft border-light mb-4">
  <div class="card-body">
    <p class="card-text">
      Over 30 hours, I and a team of 4 other people built a multi-university event aggregator website with Node.js and MongoDB.
      We called our project/website <i>uConnect</i>.
    </p>
  </div>
</div>

<div class="card shadow-soft border-light mb-4 text-white" style="background-size: cover; background-image: url('{{ '/assets/img/uconnect-bg.jpg' | relative_url }}')">
  <div class="card-body d-flex flex-row align-items-center">
    <div class="d-inline-block p-1 px-3 rounded" style="background-color: rgba(0, 0, 0, 0.5);">
      <h5 class="my-0">Live Demo</h5>
    </div>
    <a target="_blank" rel="noreferrer" href="https://uconnect.ddns.net" class="rounded bg-info px-3 py-2 d-inline-block ml-auto">Check It Out &#187;</a>
  </div>
</div>

<div class="card bg-primary shadow-soft border-light mb-4">
  <div class="card-body">
    <h4>Problem</h4>
    <p class="card-text">
      Engagement outside of class is low at commuter universities like Metropolitan State University of Denver or University of Colorado Denver.
      Furthermore, cross-campus events such as this very hackathon are not visible to students.
      Sometimes university campus events are open to students and or other people outside of the student body of the hosting institution, and there is no good way of advertising these kinds of events for outsiders.
    </p>
  </div>
</div>

<div class="card bg-primary shadow-soft border-light mb-4">
  <div class="card-body">
    <h4>Solution</h4>
    <p class="card-text">
      To promote higher engagement with events on campus and between campuses, we propose a multi-campus event aggregator website.
    </p>
    <h5>Features & Functionality</h5>
    <ul class="card-text">
      <li>Events from all participating colleges and universities.</li>
      <ul>
        <li>Their respective event feeds will be scraped so that the site is pre-populated and continuously updated with new events and content.</li>
      </ul>
      <li>Different feeds to find events that interest you.</li>
      <ul>
        <li><b>For You:</b> Recommended events based on your profile.</li>
        <li><b>Popular:</b> The most popular upcoming events as determined by the number of people that sign up for them.</li>
        <li><b>Recent:</b> The most recently posted or added events.</li>
        <li><b>Upcoming:</b> Events that are starting soonest to the current time.</li>
      </ul>
      <li>Event search functionality.</li>
      <li>Account creation and profile.</li>
      <ul>
        <li>View the events that you are registered for.</li>
      </ul>
      <li>Sign Up For Events.</li>
      <ul>
        <li>Register for events that you would like to attend directly in uConnect.</li>
        <li>See the breakdown of which other institutions people are coming from.</li>
      </ul>
    </ul>
  </div>
</div>

<div class="card bg-primary shadow-soft border-light mb-4">
  <div class="card-body">
    <h4>Technical Approach</h4>
    <p>Since I had the most programming experience out of the other team members and also had experience implementing web applications end-to-end, I stepped up to provide the technical direction for the project's implementation.</p>
    <ul class="card-text">
      <li>The backend is a standard Express.js/Node.js app.</li>
      <li>Events, user accounts, and other data is stored in MongoDB and accessed in Node.js using the <b>mongoose</b> library.</li>
      <li>Scraping of the events is done by scraping each university's respective ICS calendar feed using the <b>node-ics</b> library.</li>
      <ul>
        <li>These events are stored in our database and scraping only happens once a day.</li>
      </ul>
      <li>Since one of the team members did not have any front end JavaScript experience going into the project, I configured backend to make use of server side rendering using <b>nunjucks</b>.</li>
      <li>Front end style and layout is handled by Bootstrap 5.</li>
    </ul>
  </div>
</div>

<div class="card bg-primary shadow-soft border-light mb-4">
  <div class="card-body">
    <h4>Screenshots</h4>
    <img src="{{ '/assets/img/uconnect-home.png' | relative_url }}" alt="Home page" class="img-responsive rounded shadow-light"/>
    <small>Home page, also shows the bar breaking down the participation by members of different institutions.</small>
    <br/>
    <br/>
    <img src="{{ '/assets/img/uconnect-event.png' | relative_url }}" alt="Event page" class="img-responsive rounded shadow-light"/>
    <small>An event page for an event already registered for by the logged-in user.</small>
    <br/>
    <br/>
    <img src="{{ '/assets/img/uconnect-search.png' | relative_url }}" alt="Search page" class="img-responsive rounded shadow-light"/>
    <small>Search engine in action.</small>
  </div>
</div>

<div class="card bg-primary shadow-soft border-light mb-4">
  <div class="card-body">
    <h4>What Didn't Get Done?</h4>
    <p>Given the limited amount of time provided by the competition, naturally there were a number of features that did not get finished in time for judging.</p>
    <ul class="card-text">
      <li>Event creation and management functionality for event organizers.</li>
      <li>Content moderation and event or user reporting functionality.</li>
      <li>Admin panel or site/user management functionality.</li>
      <li>For You feed algorithm.</li>
      <li>User profile settings (name, email, password change, etc).</li>
      <li><i>Other features and functionality limiting this from being a fully production-ready product...</i></li>
    </ul>
    <p class="card-text">
      We have expressed interest in fully fleshing out the project.
      Any future plans or work would be determined by interest from faculty.
    </p>
  </div>
</div>

<div class="card bg-primary shadow-soft border-light mb-4">
  <div class="card-body">
    <h4>Judging</h4>
    <p>
      Once coding time ended and final commits were made, a panel of judges came around to look at presentations and demonstrations by the different teams.
      Projects were evaluated by both their idea as well as whatever working progress was made.
    </p>
    <p class="card-text">
      After a long judging period, our team was awarded first place (tying for first with another team's mobile app project).
    </p>
    <img src="{{ '/assets/img/hack23-winners.png' | relative_url }}" alt="Winners" class="img-responsive rounded shadow-light"/>
    <small>Winners!</small>
    <p class="card-text mt-2">
      We have expressed interest in fully finishing the project.
      Any future plans or work would be determined by interest from faculty.
    </p>
  </div>
</div>

<div class="card bg-primary shadow-soft border-light mb-4">
  <div class="card-body">
    <h4>Source Code</h4>
    <p class="card-text">
      Project source code and other information is available on GitHub: <br/>
      <a href="https://github.com/kzaremski/msu-du-hack23-multi-campus-events-hub" target="_blank" rel="noreferrer" class="text-secondary">https://github.com/kzaremski/msu-du-hack23-multi-campus-events-hub</a>
    </p>
  </div>
</div>

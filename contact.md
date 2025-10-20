---
layout: default
title: Contact
---

# Contact

<div class="card bg-primary shadow-soft border-light mb-4">
  <div class="card-body">
    <p class="card-text">If you feel that I would be a good fit for a position or project don't hesitate to reach out to me through email, LinkedIn, or Telegram.</p>
  </div>
</div>

<div class="row">
  <div class="col-md-6 mb-4">
    <button type="button" class="btn btn-primary animate-down-2 btn-block" data-toggle="modal" data-target="#emailModal">
      <i class="fas fa-envelope mr-2"></i>Email
    </button>
  </div>
  <div class="col-md-6 mb-4">
    <a target="_blank" rel="noopener noreferrer" href="https://www.linkedin.com/in/konstantinzaremski" class="btn btn-primary animate-down-2 d-block text-secondary">
      <i class="fab fa-linkedin mr-2"></i>LinkedIn
    </a>
  </div>
  <div class="col-md-6 mb-4">
    <a target="_blank" rel="noopener noreferrer" href="https://www.github.com/kzaremski" class="btn btn-primary animate-down-2 d-block text-warning">
      <i class="fab fa-github mr-2"></i>GitHub
    </a>
  </div>
  <div class="col-md-6 mb-4">
    <a target="_blank" rel="noopener noreferrer" href="http://t.me/konzski" class="btn btn-primary animate-down-2 d-block text-danger">
      <i class="fab fa-telegram mr-2"></i>Telegram
    </a>
  </div>
</div>

<!-- Email Modal -->
<div class="modal fade" id="emailModal" tabindex="-1" role="dialog" aria-labelledby="emailModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content bg-primary border-light">
      <div class="modal-header">
        <h5 class="modal-title" id="emailModalLabel">Email</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body text-center">
        <p class="mb-3">Click below to send me an email:</p>
        <a id="emailLink" href="#" class="btn btn-secondary btn-lg">
          <i class="fas fa-envelope mr-2"></i><span id="emailText"></span>
        </a>
      </div>
    </div>
  </div>
</div>

<script>
  // Decode base64 email when modal is shown
  document.addEventListener('DOMContentLoaded', function() {
    var emailModal = document.getElementById('emailModal');
    emailModal.addEventListener('show.bs.modal', function (event) {
      var decodedEmail = atob('a29uc3RhbnRpbi56YXJlbXNraUBnbWFpbC5jb20=');
      document.getElementById('emailLink').href = 'mailto:' + decodedEmail;
      document.getElementById('emailText').textContent = decodedEmail;
    });
  });
</script>

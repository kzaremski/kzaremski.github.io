---
layout: project
title: Apple Notes Exporter - Export Apple Notes in Bulk | macOS App
period: Jun 2023 - Oct 2025
description: Free macOS application for bulk exporting Apple Notes and iCloud Notes to HTML, PDF, Markdown, LaTeX, RTF, and TXT formats. Preserve folder hierarchies, formatting, and attachments. Download Apple Notes Exporter v1.0 for macOS Big Sur and later.
banner: /assets/img/applenotesexporter-cropped.png
order: 2

# SEO metadata
seo:
  type: SoftwareApplication
  name: Apple Notes Exporter
  description: Free macOS application that enables bulk exporting of Apple Notes (including iCloud Notes) while preserving folder hierarchies, formatting, and attachments. Supports HTML, PDF, Markdown, LaTeX, RTF, and TXT export formats.

# Open Graph metadata
image: /assets/img/v1.0.png
og_image: /assets/img/v1.0.png
twitter_card: summary_large_image

# Keywords for search engines
keywords: apple notes exporter, export apple notes, apple notes backup, icloud notes export, bulk export apple notes, apple notes to pdf, apple notes to markdown, apple notes to html, macos notes app, notes migration tool, apple notes converter
---

<h1 class="px-4"><span class="h4 text-secondary"><a href="{{ '/projects/' | relative_url }}"><i class="fas fa-folder-open mr-2"></i>Projects/ </a></span>Apple Notes Exporter</h1>

<div class="card bg-primary shadow-soft border-light mb-4">
  <div class="card-body">
    <p class="card-text">
      Dissatisfied with the lack of portability of my Apple Notes data and Apple's poor official export process,
      I developed a macOS application that enables bulk exporting of Apple Notes (including iCloud Notes) while preserving folder hierarchies and formatting.
      Built with Swift, the application directly queries the local Notes database for optimized performance, using approximately 200MB RAM regardless of library size.
      <br />
      <br />
      This project has grown to over 140 stars on GitHub and is actively maintained with version 1.0 released in October 2025.
      The application is notarized for macOS security compliance and supports macOS Big Sur 11.0 or later on both Intel and Apple Silicon processors.
    </p>
  </div>
</div>

<div class="card bg-primary shadow-soft border-light mb-4">
  <div class="card-body">
    <h4>Capabilities</h4>
    <p class="card-text">
      The user is able to choose which Apple Notes account to export the notes out of, including their iCloud account if the user has it configured.
      <br />
      <br />
      The user then chooses what format to export the notes into.
    </p>
    <ul class="card-text">
      <li><b>HTML:</b> Preserves all formatting with embedded images (base64), configurable fonts, sizes, and margins.</li>
      <li><b>PDF:</b> Generated from HTML with support for multiple page sizes (Letter, A4, A5, Legal, Tabloid).</li>
      <li><b>LaTeX/TEX:</b> Export with customizable templates for academic or technical documents.</li>
      <li><b>Markdown:</b> Markdown format for importing into markdown-based notes apps with embedded images.</li>
      <li><b>RTF:</b> Rich text formatting with different fonts, preserves formatting but no inline attachments.</li>
      <li><b>TXT:</b> Plain text export with no formatting or embedded images.</li>
    </ul>
    <p class="card-text">
      <i>All formats export attached files in folders whose names correspond to their respective notes, automatically organizing attachments alongside the exported content.</i>
      <br />
      <br />
      The application uses an optimized database-driven approach with concurrent processing for efficiency, ensuring fast bulk exports regardless of library size.
      Currently supports iCloud and "On My Mac" accounts (version 1.0 limitation: email-based accounts like Gmail, Yahoo, and Outlook are not supported due to different database structures).
    </p>
  </div>
</div>

<div class="card bg-primary shadow-soft border-light mb-4">
  <div class="card-body">
    <h4>Screenshots</h4>
    <p class="card-text">
      Version 1.0 features a clean, intuitive interface with multiple views for configuring and monitoring exports.
    </p>

    <div class="mb-4">
      <img src="{{ '/assets/img/v1.0.png' | relative_url }}" alt="Apple Notes Exporter Main Window" class="img-responsive rounded shadow-light mb-2" />
      Main window showing export format selection and account options.
    </div>

    <div class="mb-4">
      <img src="{{ '/assets/img/v1.0_selection.png' | relative_url }}" alt="Note Selection" class="img-responsive rounded shadow-light mb-2" />
      Note selection interface for choosing which notes to export.
    </div>

    <div class="mb-4">
      <img src="{{ '/assets/img/v1.0_pdf_options.png' | relative_url }}" alt="PDF Export Options" class="img-responsive rounded shadow-light mb-2" />
      PDF export options with configurable page sizes and settings.
    </div>

    <div class="mb-4">
      <img src="{{ '/assets/img/v1.0_tex_options.png' | relative_url }}" alt="LaTeX Template Editor" class="img-responsive rounded shadow-light mb-2" />
      LaTeX template editor for customizing TEX export format.
    </div>

    <div class="mb-4">
      <img src="{{ '/assets/img/v1.0_export_progress.png' | relative_url }}" alt="Export Progress" class="img-responsive rounded shadow-light mb-2" />
      Export progress view displaying real-time status updates.
    </div>

    <div class="mb-4">
      <img src="{{ '/assets/img/v1.0_export_done.png' | relative_url }}" alt="Export Complete" class="img-responsive rounded shadow-light mb-2" />
      Export completion screen confirming successful export.
    </div>

    <div class="mb-4">
      <img src="{{ '/assets/img/v1.0_export_log.png' | relative_url }}" alt="Detailed Export Log" class="img-responsive rounded shadow-light mb-2" />
      Detailed export log with comprehensive information about the export results.
    </div>
  </div>
</div>

<div class="card bg-primary shadow-soft border-light mb-4">
  <div class="card-body">
    <h4>Source Code & Downloads</h4>
    <p class="card-text">
      Source code for this project is available on my GitHub, and downloads are available through the GitHub releases page.
    </p>
    <a href="https://github.com/kzaremski/apple-notes-exporter/releases/latest" target="_blank" rel="noreferrer" class="d-block text-secondary"><i class="fas fa-download mr-2"></i>Download the Latest Version</a>
    <a href="https://github.com/kzaremski/apple-notes-exporter" target="_blank" rel="noreferrer" class="d-block text-secondary"><i class="fas fa-code mr-2"></i>View the Source Code</a>
  </div>
</div>

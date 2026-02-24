---
title: "How I Forensically Analyzed a macOS App That Ripped Off My Open-Source Project"
description: "A step-by-step guide to forensically analyzing a macOS app binary to confirm it was built from stolen open-source code, and what you can do if it happens to you."
date: 2026-02-24
---

I'm [Konstantin Zaremski](https://konstantin.zarem.ski), the author of [Apple Notes Exporter](https://github.com/kzaremski/apple-notes-exporter), a free and open-source macOS app for bulk exporting Apple Notes. I've been building and maintaining it since 2020, and in October 2025 I released version 1.0, a ground-up rewrite in Swift that directly queries the Apple Notes database for performance.

In early 2026, a fan of my project reached out to let me know that someone was selling what appeared to be a repackaged version of my app under the name "Notes Exporter Pro" on [1dot.ai](https://1dot.ai/notes-exporter-macos). They'd slapped a $9.99-$19.99 "Lifetime License" on it via PayPal, added a license key activation system, and were marketing it as their own product.

My project is MIT-licensed. The MIT License lets anyone use, modify, and even sell my code, but there's one non-negotiable requirement: **you must include my copyright notice and the license text**. They didn't. They stripped every trace of my name, my copyright, and the MIT license from the binary. That means they had no valid license to distribute my code at all.

Here's exactly how I confirmed it.

## Prerequisites

Every tool I used comes pre-installed on macOS. You don't need to install anything.

- `strings`: extracts printable strings from binary files
- `codesign`: inspects code signatures
- `otool`: object file display tool
- Terminal.app or any shell

## Step 1: Inspect the App Bundle Structure

A `.app` on macOS is just a directory. I started by looking at what was inside.

```bash
ls -la "Notes Exporter Pro.app/Contents/"
```

Here's what I was looking for:

- `Info.plist`: app metadata, bundle ID, developer info, version
- `MacOS/`: the actual executable binary
- `Frameworks/`: bundled libraries and dependencies
- `Resources/`: assets, localization files, etc.
- `_CodeSignature/`: code signing data

## Step 2: Read the Info.plist

```bash
cat "Notes Exporter Pro.app/Contents/Info.plist"
```

The Info.plist is the app's metadata file. Here are the key fields I looked at:

| Key | What it tells you |
|-----|-------------------|
| `CFBundleIdentifier` | Their bundle ID (e.g., `onedotai.macosapp.notesexporter`) |
| `CFBundleDisplayName` | The app name they're using |
| `CFBundleGetInfoString` | Copyright string they put in |
| `NSHumanReadableCopyright` | Another copyright field |
| `SUFeedURL` | Sparkle update feed URL (if they use auto-updates) |
| `NSAppTransportSecurity` | Network domains the app talks to |

This is where I found their bundle ID (`onedotai.macosapp.notesexporter`), their Sparkle auto-update feed pointing to a GitHub repo under `1dotaidev`, and network permissions for their license validation server.

## Step 3: Check the Code Signature

```bash
codesign -dv --verbose=4 "Notes Exporter Pro.app" 2>&1
```

This gave me:

```
Authority=Developer ID Application: Ramachandran Arumugam Velmurugan (U84Y35UPTV)
Authority=Developer ID Certification Authority
Authority=Apple Root CA
TeamIdentifier=U84Y35UPTV
Timestamp=Jan 22, 2026 at 9:50:36 PM
Notarization Ticket=stapled
```

Now I had a name. This is a real identity tied to an Apple Developer account; you can't fake this. The binary was signed by **Ramachandran Arumugam Velmurugan** with Apple Team ID **U84Y35UPTV**, and Apple had notarized it.

## Step 4: Extract Strings from the Binary

This was the most important step. The `strings` command extracts all readable text from a compiled binary: class names, function names, string literals, SQL queries, error messages, URLs, everything.

```bash
strings "Notes Exporter Pro.app/Contents/MacOS/Notes Exporter Pro"
```

The output was thousands of lines. I piped it through targeted searches for things that are unique to my project.

### Searching for my class and type names

```bash
strings "Notes Exporter Pro.app/Contents/MacOS/Notes Exporter Pro" \
  | grep -i -E "AppleNotesDatabaseParser|NoteStoreProto|SyncManifest|ExportConfiguration"
```

**`AppleNotesDatabaseParser`**, my custom class for parsing the Apple Notes SQLite database, was right there in the binary. So was **`NoteStoreProto`**, my protobuf schema type. These aren't generic names. I wrote them. Finding them in someone else's binary is a smoking gun.

### Searching for my name or attribution

```bash
strings "Notes Exporter Pro.app/Contents/MacOS/Notes Exporter Pro" \
  | grep -i -E "zaremski|konstantin|MIT|license|copyright"
```

Nothing. Zero results for my name. No MIT license text. No copyright notice. They had stripped every trace of attribution.

### Searching for their infrastructure

```bash
strings "Notes Exporter Pro.app/Contents/MacOS/Notes Exporter Pro" \
  | grep -i -E "license|activation|validate|purchase|paypal|payment|https://"
```

This revealed everything they'd bolted on top of my code:

- A license validation server at `cloudloginsystem.pixelperfectdgm.workers.dev`
- PayPal payment integration
- License key activation and validation logic
- Their support email: `support@1dot.ai`

This is what they added: a paywall around my free, open-source software.

### Searching for SQL queries and database patterns

My app queries the Apple Notes SQLite database using specific column names and patterns. I searched for those:

```bash
strings "Notes Exporter Pro.app/Contents/MacOS/Notes Exporter Pro" \
  | grep -i -E "ZACCOUNT|ZIDENTIFIER|FallbackImage"
```

The same SQL query patterns from my database parser were present in their binary. Same column names, same query structure.

### Searching for error messages and debug strings

Error messages and debug logging strings are often left unchanged because they don't face the user:

```bash
strings "Notes Exporter Pro.app/Contents/MacOS/Notes Exporter Pro" \
  | grep -i -E "DEBUG|Error|Failed|error:"
```

These can provide additional evidence of shared code, since developers rarely bother to rewrite log messages.

## Step 5: Check Bundled Frameworks

```bash
ls "Notes Exporter Pro.app/Contents/Frameworks/"
```

They were bundling `SwiftProtobuf.framework`, the same protobuf dependency my project uses to parse Apple Notes' protobuf-encoded data. This isn't proof on its own since anyone can use the same library, but it fits the pattern perfectly.

## Step 6: Check for Embedded Resources

```bash
ls "Notes Exporter Pro.app/Contents/Resources/"
```

I looked for:

- Asset catalogs (`.car` files)
- Bundle resources matching my project structure
- Localization files
- Any files with names matching my project

## Step 7: Inspect Mach-O Binary Details (Advanced)

For a deeper look at the binary itself:

List linked libraries:
```bash
otool -L "Notes Exporter Pro.app/Contents/MacOS/Notes Exporter Pro"
```

List Objective-C/Swift class names:
```bash
otool -oV "Notes Exporter Pro.app/Contents/MacOS/Notes Exporter Pro" | head -100
```

Check architectures:
```bash
lipo -info "Notes Exporter Pro.app/Contents/MacOS/Notes Exporter Pro"
```

Swift binaries are especially leaky when it comes to metadata. Mangled symbol names encode module names, class names, and sometimes even file paths from the build environment. This can reveal the original project's module name even if the surface-level branding has been changed.

## What I Found

Here's the full picture:

**Who they are:**
- Developer: Ramachandran Arumugam Velmurugan
- Apple Team ID: U84Y35UPTV
- Bundle ID: `onedotai.macosapp.notesexporter`
- Contact: support@1dot.ai
- License server: `cloudloginsystem.pixelperfectdgm.workers.dev`
- PayPal payment link: `https://www.paypal.com/ncp/payment/GF5RYTHZMDX6C`
- Update feed: Sparkle framework pointing to a GitHub releases-only repo

**Evidence of my code:**
- `AppleNotesDatabaseParser`, my unique class name, directly in the binary
- `NoteStoreProto` from my protobuf schema
- SQL queries using `ZIDENTIFIER`, `ZACCOUNT`, `FallbackImages` patterns matching my database parser
- `SwiftProtobuf.framework` bundled, same dependency as mine

**What they added on top:**
- License key activation/validation system (paywall)
- Sparkle auto-update framework
- Privacy/Terms of Service views

**What they removed:**
- My name
- My copyright notice
- The MIT license text

## Preserving Evidence

Before doing anything public, I made sure to preserve everything:

1. **Web-archived** their website, payment pages, and GitHub repo using Safari's File > Save As > Web Archive
2. **Screenshotted** everything with timestamps visible
3. **Kept a copy of their .app bundle** untouched
4. **Saved all terminal output** from every forensic command
5. **Archived my own git log** showing my commit history predating their app:

```bash
git log --all --format='%H %ai %an %s' > git-history-evidence.txt
```

## What Constitutes a Violation

The MIT License has one non-negotiable requirement: the copyright notice and license text must be included in all copies or substantial portions of the software. If they strip your name and license, they're in violation, and their right to distribute your code terminates entirely. They didn't just sell my work; they had no valid license to distribute it at all.

## What You Can Do If This Happens to You

1. **File a DMCA takedown** on any platform hosting their content (GitHub, Reddit, web hosts)
2. **Report to Apple** if they're distributing via the Mac App Store or using a Developer ID (include their Team ID)
3. **Contact their payment processor** (PayPal, Stripe, etc.) to report them profiting from infringing software
4. **Public disclosure** with evidence in relevant communities
5. **Email them directly** demanding compliance or removal

I've taken several of these steps. The outcome is still pending. I'll update this post as things develop.

## A Note on License Choice

If you're publishing open-source software and you don't want someone to repackage it and sell it as a closed-source product, think carefully about your license. MIT and BSD licenses explicitly allow commercial use and redistribution; the only requirement is attribution. If that's not enough protection for you, consider GPL v3 (requires derivative works to also be open source), AGPL (same as GPL but also covers network use), or a dual-license model where it's free for open-source use and requires a paid license for commercial distribution.

I learned this the hard way. My code was MIT-licensed, and technically, selling it was allowed, but stripping my attribution was not. Going forward, I've relicensed the project to GPLv3 to prevent this from happening again.

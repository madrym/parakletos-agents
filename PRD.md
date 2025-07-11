# Product Requirements Document (PRD): Parakletos - Bible Note-Taking App

## 1. Overview

**Name**: Parakletos
**Type**: Mobile-first Bible Note-Taking App
**Platform**: iOS & Android via React Native
**Purpose**: Empower churchgoers, Bible readers, and small group leaders to capture sermon notes, annotate Scripture, journal prayers, and share group resources with offline-first capabilities and rich spiritual tooling.

---

## 2. Target Audience

* Churchgoers and regular Bible readers
* Sermon note-takers and small group members
* Growth group leaders
* Youth leaders and pastors
* New and mature Christians seeking organized, searchable spiritual insights

---

## 3. Key Features

### 3.1 Enhanced Bible Note-Taking

* Auto verse importing using triggers like `--John3:16`
* Insert full verse, hyperlink, or popover preview
* Markdown-based note editor with formatting toolbar

### 3.2 Local Tagging & Categorisation

* Tag notes with: Book, Preacher, Theme, Location, Series
* Smart tag suggestions based on previous notes

### 3.3 Sermon Recording with Timestamps

* Record sermons directly in-app
* Auto-insert timestamps as notes are written
* Playback starts from the note's timestamp

### 3.4 Offline Bible Integration

* Store full Bible (e.g. NIV or public-domain fallback) as a JSON bundle
* Enable highlighting, clicking, and annotating verses offline

### 3.5 Bible Passage Annotation

* Highlight and comment on specific verses
* View verse annotations in a margin-style layout
* Export annotated passage as a visual summary (verse in center, notes on sides)

### 3.6 Prayer Journal with Follow-Ups

* Create, tag, and update prayer entries
* Mark as ongoing or answered
* Weekly prayer reminders & review dashboard

### 3.7 Small Group / Study Builder

* Create session-based studies with:

  * Open-ended questions
  * Multiple choice
  * Fill-in-the-blank
  * Group polls (anonymous or named)
* Share via link or QR code

### 3.8 Theology Tooltips

* Tap theological terms (e.g., justification, sanctification)
* View definitions, verses, and summaries
* Toggle on/off in settings

### 3.9 Note Sharing

* Share notes or studies as:

  * Clean summary PDF
  * Rich text or link
  * Post into group space (optional Convex-powered feature)

---

## 4. Technical Architecture

### 4.1 Frontend: React Native Mobile App

| Area            | Tech                                 | Notes                                |
| --------------- | ------------------------------------ | ------------------------------------ |
| UI & UX         | React Native                         | Cross-platform iOS/Android           |
| State           | Zustand                              | Lightweight state handling           |
| Offline Storage | WatermelonDB                         | Structured note and tag storage      |
| Audio           | `react-native-audio-recorder-player` | Timestamped audio note capture       |
| Markdown        | `react-native-markdown-display`      | Render notes and verses nicely       |
| Auth            | Clerk                                | Email, Google, Apple sign-in support |
| File Uploads    | S3 SDK                               | For media (recordings, images)       |

### 4.2 Backend Services

| Area         | Tech    | Notes                                   |
| ------------ | ------- | --------------------------------------- |
| Sync         | Convex  | Real-time sync, shared materials        |
| API          | FastAPI | Verse parsing, transcription, summaries |
| File Storage | S3      | Upload via presigned URLs               |
| Hosting      | Vercel  | Deploy FastAPI backend                  |

---

## 5. Offline Mode Strategy

### Supported Offline:

* Notes and tags (WatermelonDB)
* Verse parsing (local JSON Bible)
* Audio recording
* Study drafts, prayer journaling

### Synced When Online:

* Notes → Convex
* Tags & prayers → Convex
* Audio → S3
* Shared studies & polls → Convex

---

## 6. User Authentication

* Clerk manages sign-up/sign-in (email, Google, Apple)
* JWTs passed to Convex and FastAPI for secure access
* Clerk webhooks ensure user state sync

---

## 7. Data Model Summary

### Notes Table

* `id`
* `userId`
* `title`
* `content`
* `tags[]`
* `timestamps[]`
* `audioRef`

### Tags Table

* `id`
* `userId`
* `type` (Book, Theme, Preacher)
* `value`

### Prayers Table

* `id`
* `userId`
* `title`
* `status` (ongoing, answered)
* `tags[]`
* `notes`
* `createdAt`

### StudySessions Table

* `id`
* `userId`
* `title`
* `passage`
* `questions[]` (typed)
* `responses[]`

### BibleVerseNotes Table

* `userId`
* `book`
* `chapter`
* `verse`
* `note`

---

## 8. Milestones & MVP Scope

### Phase 1 – MVP Core

* Note-taking with markdown
* Verse insertion and lookup (offline Bible)
* Tagging system
* Prayer journal (basic)
* Offline storage (WatermelonDB)
* Auth via Clerk
* Audio recording + timestamping
* Backend API & sync setup (Convex, FastAPI)

### Phase 2 – Sync + Sharing

* Cloud sync (Convex)
* Shareable notes (PDF, link)
* Study builder module (basic)
* Upload audio to S3 via FastAPI

### Phase 3 – Growth Tools & Enhancements

* Theology tooltips
* Real-time polls and group studies
* Summary export of annotated Bible sections
* Transcription integration (optional via Whisper)

---

## 9. Open Questions / Future Ideas

* What translation(s) of the Bible will be supported in offline mode?
* Should studies be collaboratively editable or just sharable?
* Do we need custom notification scheduling (e.g. reminders to pray or review notes)?

---

## 10. Summary

Parakletos is a purpose-built mobile app for Christians who want a thoughtful, structured, and flexible way to record, reflect on, and share what they learn from God's word. With offline-first architecture, real-time sync, and rich spiritual tools, it’s a companion app for everyday faith and group discipleship.

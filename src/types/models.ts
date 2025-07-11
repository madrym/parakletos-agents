// User Model
export interface User {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  profileImageUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Note Model
export interface Note {
  id: string;
  userId: string;
  title: string;
  content: string; // Markdown content
  tags: string[];
  timestamps: NoteTimestamp[];
  audioRef?: string; // Reference to audio file
  createdAt: Date;
  updatedAt: Date;
  syncedAt?: Date;
}

// Note Timestamp for audio recordings
export interface NoteTimestamp {
  id: string;
  noteId: string;
  timestamp: number; // Time in milliseconds
  text: string;
  createdAt: Date;
}

// Tag Model
export interface Tag {
  id: string;
  userId: string;
  type: TagType;
  value: string;
  color?: string;
  createdAt: Date;
  usageCount: number;
}

export enum TagType {
  BOOK = 'Book',
  PREACHER = 'Preacher',
  THEME = 'Theme',
  LOCATION = 'Location',
  SERIES = 'Series',
  CUSTOM = 'Custom',
}

// Prayer Model
export interface Prayer {
  id: string;
  userId: string;
  title: string;
  content: string;
  status: PrayerStatus;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
  answeredAt?: Date;
  reminderDate?: Date;
}

export enum PrayerStatus {
  ONGOING = 'ongoing',
  ANSWERED = 'answered',
  PAUSED = 'paused',
}

// Study Session Model
export interface StudySession {
  id: string;
  userId: string;
  title: string;
  description?: string;
  passage?: BibleReference;
  questions: StudyQuestion[];
  responses: StudyResponse[];
  isPublic: boolean;
  shareToken?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Study Question Types
export interface StudyQuestion {
  id: string;
  type: QuestionType;
  question: string;
  options?: string[]; // For multiple choice
  required: boolean;
  order: number;
}

export enum QuestionType {
  OPEN_ENDED = 'open_ended',
  MULTIPLE_CHOICE = 'multiple_choice',
  FILL_IN_BLANK = 'fill_in_blank',
  POLL = 'poll',
}

// Study Response Model
export interface StudyResponse {
  id: string;
  studySessionId: string;
  questionId: string;
  userId?: string; // Optional for anonymous responses
  response: string | string[];
  submittedAt: Date;
}

// Bible Verse Note Model
export interface BibleVerseNote {
  id: string;
  userId: string;
  book: string;
  chapter: number;
  verse: number;
  note: string;
  highlightColor?: string;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

// Bible Reference
export interface BibleReference {
  book: string;
  chapter: number;
  startVerse: number;
  endVerse?: number;
}

// Bible Verse
export interface BibleVerse {
  book: string;
  chapter: number;
  verse: number;
  text: string;
  translation: string;
}

// Audio Recording
export interface AudioRecording {
  id: string;
  userId: string;
  noteId?: string;
  filename: string;
  duration: number; // in milliseconds
  fileSize: number; // in bytes
  s3Key?: string;
  localPath?: string;
  uploadedAt?: Date;
  createdAt: Date;
}

// App Settings
export interface AppSettings {
  userId: string;
  defaultBibleTranslation: string;
  enableAudioRecording: boolean;
  enableTheologyTooltips: boolean;
  reminderFrequency: ReminderFrequency;
  theme: AppTheme;
  autoSync: boolean;
  updatedAt: Date;
}

export enum ReminderFrequency {
  NEVER = 'never',
  DAILY = 'daily',
  WEEKLY = 'weekly',
  MONTHLY = 'monthly',
}

export enum AppTheme {
  LIGHT = 'light',
  DARK = 'dark',
  SYSTEM = 'system',
}

// Sync Status
export interface SyncStatus {
  lastSyncAt?: Date;
  pendingUploads: number;
  pendingDownloads: number;
  isOnline: boolean;
  hasConflicts: boolean;
} 
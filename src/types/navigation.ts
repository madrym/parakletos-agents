// Main Tab Navigator Types
export type MainTabParamList = {
  Notes: undefined;
  Bible: undefined;
  Prayer: undefined;
  Study: undefined;
  Settings: undefined;
};

// Notes Stack Navigator Types
export type NotesStackParamList = {
  NotesList: undefined;
  NoteCreate: undefined;
  NoteEdit: {noteId: string};
  NoteView: {noteId: string};
};

// Bible Stack Navigator Types
export type BibleStackParamList = {
  BibleReader: undefined;
  BibleSearch: undefined;
  BibleBookmarks: undefined;
  VerseAnnotation: {book: string; chapter: number; verse: number};
};

// Prayer Stack Navigator Types
export type PrayerStackParamList = {
  PrayerList: undefined;
  PrayerCreate: undefined;
  PrayerEdit: {prayerId: string};
  PrayerView: {prayerId: string};
};

// Study Stack Navigator Types
export type StudyStackParamList = {
  StudyList: undefined;
  StudyCreate: undefined;
  StudyEdit: {studyId: string};
  StudyView: {studyId: string};
  StudySession: {studyId: string; sessionId?: string};
};

// Settings Stack Navigator Types
export type SettingsStackParamList = {
  SettingsMain: undefined;
  Profile: undefined;
  AppSettings: undefined;
  DataSync: undefined;
  About: undefined;
};

// Auth Stack Navigator Types
export type AuthStackParamList = {
  Welcome: undefined;
  SignIn: undefined;
  SignUp: undefined;
};

// Root Stack Navigator Types
export type RootStackParamList = {
  Main: undefined;
  Auth: undefined;
}; 
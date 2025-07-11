import {Database} from '@nozbe/watermelondb';
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite';

// Import schema
import schema from './schema';

// Import models
import Note from './models/Note';
import Tag from './models/Tag';
import Prayer from './models/Prayer';
import StudySession from './models/StudySession';
import BibleVerseNote from './models/BibleVerseNote';
import AudioRecording from './models/AudioRecording';

// Database setup
const adapter = new SQLiteAdapter({
  schema,
  // (You might want to comment it out for production)
  onSetUpError: error => {
    console.error('Database setup error:', error);
  },
});

export const database = new Database({
  adapter,
  modelClasses: [
    Note,
    Tag,
    Prayer,
    StudySession,
    BibleVerseNote,
    AudioRecording,
  ],
});

export default database; 
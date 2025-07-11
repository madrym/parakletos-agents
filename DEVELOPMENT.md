# Development Guide

This guide covers the key concepts and next steps for developing the Parakletos Bible note-taking app.

## 🚀 Quick Start

1. **Run the setup script:**
   ```bash
   chmod +x setup.sh
   ./setup.sh
   ```

2. **Configure your environment:**
   - Edit `.env` with your API keys
   - Set up Clerk, Convex, and AWS accounts
   - Get Bible text data (see Bible Integration section)

3. **Start development:**
   ```bash
   npm run ios     # iOS simulator
   npm run android # Android emulator
   ```

## 📋 Implementation Roadmap

### Phase 1: Core Infrastructure ✅
- [x] Project structure and configuration
- [x] Navigation setup with tab and stack navigators
- [x] TypeScript types for all data models
- [x] WatermelonDB schema for offline storage
- [x] Basic authentication with Clerk
- [x] Theme and styling foundation

### Phase 2: Note-Taking Features
- [ ] Markdown note editor with formatting toolbar
- [ ] Verse parsing (`--John3:16` syntax) 
- [ ] Local Bible text integration
- [ ] Tagging system implementation
- [ ] Audio recording with timestamps
- [ ] Note search and filtering

### Phase 3: Bible Integration
- [ ] Offline Bible text storage (JSON format)
- [ ] Verse highlighting and annotations
- [ ] Bible reader interface
- [ ] Verse lookup and cross-references
- [ ] Multiple translation support

### Phase 4: Prayer Journal
- [ ] Prayer entry creation and editing
- [ ] Status tracking (ongoing/answered)
- [ ] Prayer reminders and notifications
- [ ] Prayer history and analytics

### Phase 5: Study Groups
- [ ] Study session builder
- [ ] Question types (multiple choice, open-ended, etc.)
- [ ] QR code sharing for studies
- [ ] Real-time responses and polls
- [ ] Study analytics and reports

### Phase 6: Sync & Cloud Features
- [ ] Convex integration for real-time sync
- [ ] AWS S3 file uploads
- [ ] Offline-first with conflict resolution
- [ ] Data backup and restore
- [ ] Cross-device synchronization

## 🔧 Key Implementation Details

### Bible Text Integration

The app needs a local Bible database for offline functionality:

1. **Bible JSON Format:**
   ```json
   {
     "books": {
       "John": {
         "chapters": {
           "3": {
             "verses": {
               "16": "For God so loved the world..."
             }
           }
         }
       }
     }
   }
   ```

2. **Sources for Bible Text:**
   - [Bible API](https://bible-api.com/) for development
   - [ESV API](https://esv.org/api/) for ESV text
   - [YouVersion API](https://developer.youversion.com/) for multiple translations
   - Public domain translations (WEB, ASV) for free distribution

### Verse Parsing Implementation

The `--John3:16` syntax should:
1. Parse the text for verse patterns
2. Validate book names and verse ranges
3. Insert verse text inline or as a hyperlink
4. Show verse preview on tap/hover

```typescript
// Example implementation in BibleService
const parseAndInsertVerse = (text: string) => {
  const versePattern = /--(\w+)(\d+):(\d+)(?:-(\d+))?/g;
  return text.replace(versePattern, (match, book, chapter, verse) => {
    const verseText = getVerseText(book, chapter, verse);
    return `[${match}](verse://${book}/${chapter}/${verse}) - "${verseText}"`;
  });
};
```

### Audio Recording with Timestamps

Key features to implement:
- Record audio during note-taking
- Auto-insert timestamps when user types
- Playback from specific timestamp
- Upload to S3 for cloud backup

```typescript
// Example timestamp structure
interface NoteTimestamp {
  id: string;
  timestamp: number; // milliseconds from start
  text: string;      // note text at this time
  audioRef: string;  // reference to audio file
}
```

### State Management with Zustand

Create stores for each domain:

```typescript
// stores/useNotesStore.ts
interface NotesState {
  notes: Note[];
  currentNote: Note | null;
  isRecording: boolean;
  addNote: (note: Note) => void;
  updateNote: (id: string, updates: Partial<Note>) => void;
  deleteNote: (id: string) => void;
}
```

### WatermelonDB Models

Implement model classes for each table:

```typescript
// models/Note.ts
import {Model} from '@nozbe/watermelondb';
import {field, date, json} from '@nozbe/watermelondb/decorators';

export default class Note extends Model {
  static table = 'notes';
  
  @field('user_id') userId!: string;
  @field('title') title!: string;
  @field('content') content!: string;
  @json('tags', sanitizeTags) tags!: string[];
  @date('created_at') createdAt!: Date;
  @date('updated_at') updatedAt!: Date;
}
```

## 🎨 UI/UX Guidelines

### Design Principles
- **Spiritual Focus**: Clean, distraction-free interface
- **Accessibility**: Support for various font sizes and screen readers
- **Offline-First**: Clear indicators when offline/syncing
- **Touch-Friendly**: Large tap targets for mobile use

### Color Scheme
- Primary: Indigo (#6366f1) - for navigation and CTAs
- Secondary: Purple (#8b5cf6) - for accents
- Success: Emerald (#10b981) - for confirmations
- Background: Light gray (#f8f9fa) - clean, readable

### Typography
- System fonts for cross-platform consistency
- Clear hierarchy with heading sizes
- Readable body text (16px minimum)
- Support for dynamic type scaling

## 🔐 Security Considerations

### Data Privacy
- Encrypt sensitive notes locally
- Use secure storage for authentication tokens
- Implement proper data retention policies
- Ensure GDPR compliance for EU users

### Authentication
- Implement proper JWT token handling
- Use secure token storage (Keychain/Keystore)
- Handle token refresh gracefully
- Support biometric authentication

## 🧪 Testing Strategy

### Unit Tests
- Test Bible verse parsing logic
- Test data model validations
- Test utility functions

### Integration Tests
- Test database operations
- Test API integrations
- Test authentication flows

### E2E Tests
- Test critical user journeys
- Test offline functionality
- Test cross-device sync

## 📚 Learning Resources

### React Native
- [React Native Documentation](https://reactnative.dev/docs/getting-started)
- [React Navigation](https://reactnavigation.org/docs/getting-started)

### State Management
- [Zustand Documentation](https://github.com/pmndrs/zustand)

### Database
- [WatermelonDB Documentation](https://nozbe.github.io/WatermelonDB/)

### Backend Services
- [Clerk Documentation](https://clerk.dev/docs)
- [Convex Documentation](https://docs.convex.dev/)
- [AWS S3 SDK](https://docs.aws.amazon.com/sdk-for-javascript/)

## 🤝 Contributing

1. Pick a feature from the roadmap
2. Create a feature branch
3. Implement with tests
4. Update documentation
5. Submit pull request

Happy coding! 🙏 
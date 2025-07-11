# TenTap Note Editor Implementation

This document describes the implementation of the TenTap rich text editor with Bible verse insertion functionality for the Parakletos app.

## Features Implemented

### 1. Rich Text Editing with TenTap
- Full-featured rich text editor using `@10play/tentap-editor`
- Markdown support with formatting toolbar
- Bold, italic, underline, lists, blockquotes
- Mobile-optimized interface with keyboard handling

### 2. Bible Verse Insertion
- **Trigger Pattern**: Type `--John3:16` or `--Ephesians3:1-10` to insert Bible verses
- **Insertion Options**:
  - **Full Verse**: Inserts the complete verse text in a formatted blockquote
  - **Reference Link**: Inserts a clickable reference that shows verse on tap

### 3. Bible Verse Popup
- Click on any Bible verse reference to view the verse in an overlay popup
- Supports single verses and verse ranges
- Elegant popup design with proper positioning
- Auto-closes when tapping outside

### 4. Sample Bible Data
- Includes popular verses for demonstration (John 3:16, Romans 8:28, etc.)
- NIV translation with proper attribution
- Easily extensible to add more verses or translations

## Components Created

### 1. `BibleService.ts`
**Location**: `src/services/BibleService.ts`

Singleton service that handles:
- Parsing Bible verse references (`John3:16`, `Ephesians3:1-10`)
- Looking up verses from the database
- Formatting verses for display
- Reference validation

**Key Methods**:
```typescript
parseVerseReference(reference: string): VerseRange | null
getVerse(reference: string): BibleVerse[]
formatVerses(verses: BibleVerse[], reference: string): string
formatReference(reference: string): string
verseExists(reference: string): boolean
```

### 2. `BibleVersePopup.tsx`
**Location**: `src/components/BibleVersePopup.tsx`

Modal popup component that displays Bible verses:
- Responsive design that adapts to screen size
- Smart positioning to avoid screen edges
- Support for single verses and verse ranges
- Beautiful typography and styling

### 3. `EnhancedRichTextEditor.tsx`
**Location**: `src/components/EnhancedRichTextEditor.tsx`

Main editor component that combines TenTap with Bible functionality:
- Real-time detection of `--` verse patterns
- Alert dialogs for insertion choice
- Content processing to make references clickable
- Custom toolbar with Bible help button
- Keyboard handling and mobile optimization

## Usage Examples

### Basic Implementation
```typescript
import {EnhancedRichTextEditor} from '../components/EnhancedRichTextEditor';

export default function NoteScreen() {
  const [content, setContent] = useState('');
  
  return (
    <EnhancedRichTextEditor
      title="My Note"
      placeholder="Start writing..."
      onContentChange={setContent}
      initialContent={content}
    />
  );
}
```

### Supported Bible Reference Formats
- `--John3:16` → Single verse
- `--Ephesians3:1-10` → Verse range
- `--Romans8:28` → Single verse
- `--Psalm23:1` → Single verse
- `--1Corinthians13:4` → Verse with number prefix

### Sample Verses Included
- John 3:16-17
- Romans 8:28
- Philippians 4:13
- Ephesians 3:1-10 (verse range example)
- Psalm 23:1
- 1 Corinthians 13:4
- Matthew 5:16

## Technical Architecture

### Dependencies Added
```json
{
  "@10play/tentap-editor": "latest",
  "react-native-webview": "latest"
}
```

### Key Features
1. **Offline-First**: All Bible verses stored locally, no internet required
2. **Real-time Processing**: Verse triggers detected as you type
3. **Mobile Optimized**: Touch-friendly interface with proper keyboard handling
4. **Extensible**: Easy to add more verses, translations, or formatting options

### Integration with Existing App
- Uses existing theme system (`src/theme/theme.ts`)
- Compatible with React Native Paper components
- Follows app's navigation and styling patterns
- Ready for integration with WatermelonDB for persistence

## Future Enhancements

### Planned Features
1. **Full Bible Integration**: Load complete Bible JSON for offline access
2. **Multiple Translations**: Support for NIV, ESV, KJV, etc.
3. **Verse Highlighting**: Visual highlighting of important verses
4. **Search Functionality**: Search verses by keywords or themes
5. **Export Features**: Export notes with verses to PDF or share
6. **Verse Collections**: Save favorite verses for quick access
7. **Audio Integration**: Connect with sermon recording timestamps

### Technical Improvements
1. **Better Positioning**: More accurate popup positioning based on tap location
2. **Performance**: Optimize for large documents with many verses
3. **Accessibility**: Add proper accessibility labels and screen reader support
4. **Gesture Support**: Swipe gestures for verse navigation

## Testing the Implementation

### Try These Examples
1. Open the Note Create screen
2. Type: `--John3:16` and choose "Full Verse" to see formatted verse
3. Type: `--Ephesians3:1-10` and choose "Reference Link" for a clickable link
4. Click on any verse reference to see the popup
5. Try the Bible help button (📖) in the toolbar for instructions

### Error Handling
- Invalid verse references show "verse not found" message
- Graceful fallback for missing verses
- Non-blocking errors that don't crash the editor

## Notes for Development

- The `EnhancedRichTextEditor` handles all verse processing automatically
- Bible verse data is easily expandable in `BibleService.ts`
- Popup positioning adapts to screen size and orientation
- All components follow TypeScript best practices
- Styled consistently with the app's design system
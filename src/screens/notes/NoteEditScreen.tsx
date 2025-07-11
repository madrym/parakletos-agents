import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {EnhancedRichTextEditor} from '../../components/EnhancedRichTextEditor';
import {theme} from '../../theme/theme';

export default function NoteEditScreen() {
  const [noteContent, setNoteContent] = useState(`
    <h2>Sample Note</h2>
    <p>This is an existing note with some content.</p>
    <p>You can edit this note and try adding Bible verses like <a href="#" data-verse="John3:16" style="color: #6750a4; text-decoration: underline; font-weight: 500;">John 3:16</a></p>
    <blockquote style="border-left: 4px solid #6750a4; padding-left: 16px; margin: 16px 0; font-style: italic; background-color: rgba(0,0,0,0.05);">"For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life." - John 3:16 (NIV)</blockquote>
  `);

  const handleContentChange = (content: string) => {
    setNoteContent(content);
    // TODO: Save to local storage or state management
    console.log('Note content updated:', content);
  };

  return (
    <View style={styles.container}>
      <EnhancedRichTextEditor
        title="Edit Note"
        placeholder="Edit your note... Try typing --Romans8:28 to insert more Bible verses!"
        onContentChange={handleContentChange}
        initialContent={noteContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
}); 
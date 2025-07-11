import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {EnhancedRichTextEditor} from '../../components/EnhancedRichTextEditor';
import {theme} from '../../theme/theme';

export default function NoteCreateScreen() {
  const [noteContent, setNoteContent] = useState('');

  const handleContentChange = (content: string) => {
    setNoteContent(content);
    // TODO: Save to local storage or state management
    console.log('Note content updated:', content);
  };

  return (
    <View style={styles.container}>
      <EnhancedRichTextEditor
        title="Create New Note"
        placeholder="Start writing your note... Try typing --John3:16 to insert a Bible verse!"
        onContentChange={handleContentChange}
        initialContent=""
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
import React, {useRef, useState, useCallback, useEffect} from 'react';
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {RichText, Toolbar, useEditorBridge, DEFAULT_TOOLBAR_ITEMS} from '@10play/tentap-editor';
import {BibleVersePopup} from './BibleVersePopup';
import {BibleService} from '../services/BibleService';
import {theme} from '../theme/theme';

interface EnhancedRichTextEditorProps {
  initialContent?: string;
  onContentChange?: (content: string) => void;
  placeholder?: string;
  title?: string;
}

export const EnhancedRichTextEditor: React.FC<EnhancedRichTextEditorProps> = ({
  initialContent = '',
  onContentChange,
  placeholder = 'Start writing your note...',
  title = 'Create Note',
}) => {
  const [content, setContent] = useState(initialContent);
  const [popupVisible, setPopupVisible] = useState(false);
  const [selectedReference, setSelectedReference] = useState('');
  const [popupPosition, setPopupPosition] = useState({x: 0, y: 0});
  const [isProcessingVerseInsertion, setIsProcessingVerseInsertion] = useState(false);

  const bibleService = BibleService.getInstance();

  const editor = useEditorBridge({
    autofocus: true,
    avoidIosKeyboard: true,
    initialContent: processInitialContent(initialContent),
  });

  // Process content to make Bible references clickable
  function processInitialContent(htmlContent: string): string {
    if (!htmlContent) return '';
    
    // Find Bible verse patterns and make them clickable
    const versePattern = /--([A-Za-z0-9\s]+\d+:\d+(?:-\d+)?)/g;
    return htmlContent.replace(versePattern, (match, reference) => {
      const cleanRef = reference.trim();
      const formattedRef = bibleService.formatReference(cleanRef);
      return `<a href="#" data-verse="${cleanRef}" style="color: ${theme.colors.primary}; text-decoration: underline;">${formattedRef}</a>`;
    });
  }

  const handleContentChange = useCallback((html: string) => {
    setContent(html);
    
    // Process Bible verse insertions without causing infinite loops
    if (!isProcessingVerseInsertion) {
      processVerseInsertions(html);
    }
    
    onContentChange?.(html);
  }, [onContentChange, isProcessingVerseInsertion]);

  const processVerseInsertions = useCallback((html: string) => {
    const versePattern = /--([A-Za-z0-9\s]+\d+:\d+(?:-\d+)?)/g;
    let match;
    let hasChanges = false;
    let updatedHtml = html;

    while ((match = versePattern.exec(html)) !== null) {
      const fullMatch = match[0];
      const reference = match[1].trim();
      
      if (bibleService.verseExists(reference)) {
        const verses = bibleService.getVerse(reference);
        const formattedReference = bibleService.formatReference(reference);
        
        // Show options for how to insert the verse
        setTimeout(() => {
          showVerseInsertionOptions(reference, formattedReference, verses, fullMatch);
        }, 100);
        
        hasChanges = true;
        break; // Process one at a time to avoid conflicts
      }
    }
  }, []);

  const showVerseInsertionOptions = (
    reference: string,
    formattedReference: string,
    verses: any[],
    originalText: string
  ) => {
    Alert.alert(
      'Insert Bible Verse',
      `Found: ${formattedReference}\n\nHow would you like to insert this verse?`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
          onPress: () => {
            // Remove the trigger text
            setIsProcessingVerseInsertion(true);
            setTimeout(() => {
              editor.setContent(content.replace(originalText, ''));
              setIsProcessingVerseInsertion(false);
            }, 100);
          },
        },
        {
          text: 'Full Verse',
          onPress: () => insertFullVerse(reference, originalText),
        },
        {
          text: 'Reference Link',
          onPress: () => insertVerseLink(reference, formattedReference, originalText),
        },
      ],
      {cancelable: true}
    );
  };

  const insertFullVerse = (reference: string, originalText: string) => {
    const verses = bibleService.getVerse(reference);
    const formattedVerse = bibleService.formatVerses(verses, reference);
    
    setIsProcessingVerseInsertion(true);
    setTimeout(() => {
      const newContent = content.replace(
        originalText,
        `<blockquote style="border-left: 4px solid ${theme.colors.primary}; padding-left: 16px; margin: 16px 0; font-style: italic; background-color: rgba(0,0,0,0.05);">${formattedVerse}</blockquote>`
      );
      editor.setContent(newContent);
      setIsProcessingVerseInsertion(false);
    }, 100);
  };

  const insertVerseLink = (reference: string, formattedReference: string, originalText: string) => {
    setIsProcessingVerseInsertion(true);
    setTimeout(() => {
      const newContent = content.replace(
        originalText,
        `<a href="#" data-verse="${reference}" style="color: ${theme.colors.primary}; text-decoration: underline; font-weight: 500;">${formattedReference}</a>`
      );
      editor.setContent(newContent);
      setIsProcessingVerseInsertion(false);
    }, 100);
  };

  // Handle clicks on verse references
  const handleEditorMessage = useCallback((message: any) => {
    if (message.type === 'link-click') {
      const verseReference = message.data?.verse;
      if (verseReference) {
        setSelectedReference(verseReference);
        setPopupPosition({x: 200, y: 300}); // Default position, could be improved with actual click position
        setPopupVisible(true);
      }
    }
  }, []);

  // Custom toolbar items
  const customToolbarItems = [
    {
      onPress: () => () => {
        Alert.alert(
          'Bible Verse Help',
          'To insert a Bible verse, type "--" followed by the reference.\n\nExamples:\n• --John3:16\n• --Ephesians3:1-10\n• --Romans8:28\n\nAfter typing, you\'ll be able to choose how to insert the verse.',
          [{text: 'Got it!'}]
        );
      },
      active: () => false,
      disabled: () => false,
      image: () => '📖', // Bible icon
    },
    ...DEFAULT_TOOLBAR_ITEMS,
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.helpText}>
          Tip: Type --John3:16 to insert Bible verses
        </Text>
      </View>

      <View style={styles.editorContainer}>
        <RichText
          editor={editor}
          style={styles.editor}
          onMessage={handleEditorMessage}
        />
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidingView}
      >
        <Toolbar
          editor={editor}
          items={customToolbarItems}
        />
      </KeyboardAvoidingView>

      <BibleVersePopup
        visible={popupVisible}
        reference={selectedReference}
        onClose={() => setPopupVisible(false)}
        position={popupPosition}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    padding: theme.spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.outline,
    backgroundColor: theme.colors.surface,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.colors.onSurface,
    marginBottom: theme.spacing.xs,
  },
  helpText: {
    fontSize: 12,
    color: theme.colors.onSurfaceVariant,
    fontStyle: 'italic',
  },
  editorContainer: {
    flex: 1,
    margin: theme.spacing.md,
    borderWidth: 1,
    borderColor: theme.colors.outline,
    borderRadius: 8,
    backgroundColor: theme.colors.surface,
    overflow: 'hidden',
  },
  editor: {
    flex: 1,
    padding: theme.spacing.md,
  },
  keyboardAvoidingView: {
    position: 'absolute',
    width: '100%',
    bottom: 0,
  },
  toolbar: {
    backgroundColor: theme.colors.surface,
    borderTopWidth: 1,
    borderTopColor: theme.colors.outline,
    paddingVertical: theme.spacing.sm,
  },
});
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  Pressable,
  StyleSheet,
  ScrollView,
  Dimensions,
} from 'react-native';
import {Portal} from 'react-native-paper';
import {BibleVerse, BibleService} from '../services/BibleService';
import {theme} from '../theme/theme';

interface BibleVersePopupProps {
  visible: boolean;
  reference: string;
  onClose: () => void;
  position?: {x: number; y: number};
}

export const BibleVersePopup: React.FC<BibleVersePopupProps> = ({
  visible,
  reference,
  onClose,
  position = {x: 0, y: 0},
}) => {
  const bibleService = BibleService.getInstance();
  const verses = bibleService.getVerse(reference);
  const formattedReference = bibleService.formatReference(reference);

  const {width: screenWidth, height: screenHeight} = Dimensions.get('window');

  // Calculate popup position - ensure it stays within screen bounds
  const popupWidth = Math.min(320, screenWidth - 40);
  const popupHeight = Math.min(400, screenHeight - 100);
  
  let popupX = position.x - popupWidth / 2;
  let popupY = position.y - popupHeight - 10; // Show above the reference

  // Adjust if popup goes off screen
  if (popupX < 20) popupX = 20;
  if (popupX + popupWidth > screenWidth - 20) popupX = screenWidth - popupWidth - 20;
  if (popupY < 50) popupY = position.y + 30; // Show below if no space above

  const renderVerseContent = () => {
    if (verses.length === 0) {
      return (
        <Text style={styles.noVerseText}>
          Verse not found: {reference}
        </Text>
      );
    }

    if (verses.length === 1) {
      const verse = verses[0];
      return (
        <View>
          <Text style={styles.verseReference}>
            {verse.book} {verse.chapter}:{verse.verse}
          </Text>
          <Text style={styles.verseText}>"{verse.text}"</Text>
          <Text style={styles.translation}>- {verse.translation}</Text>
        </View>
      );
    }

    // Multiple verses
    return (
      <View>
        <Text style={styles.verseReference}>{formattedReference}</Text>
        <ScrollView style={styles.versesContainer} showsVerticalScrollIndicator={false}>
          {verses.map((verse, index) => (
            <View key={`${verse.chapter}-${verse.verse}`} style={styles.singleVerse}>
              <Text style={styles.verseNumber}>{verse.verse}</Text>
              <Text style={styles.verseText}>"{verse.text}"</Text>
            </View>
          ))}
        </ScrollView>
        <Text style={styles.translation}>- {verses[0]?.translation}</Text>
      </View>
    );
  };

  return (
    <Portal>
      <Modal
        visible={visible}
        transparent
        animationType="fade"
        onRequestClose={onClose}
      >
        <Pressable style={styles.overlay} onPress={onClose}>
          <View
            style={[
              styles.popup,
              {
                left: popupX,
                top: popupY,
                width: popupWidth,
                maxHeight: popupHeight,
              },
            ]}
          >
            <View style={styles.header}>
              <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                <Text style={styles.closeButtonText}>✕</Text>
              </TouchableOpacity>
            </View>
            
            <View style={styles.content}>
              {renderVerseContent()}
            </View>

            {/* Arrow pointing to the reference */}
            <View style={[styles.arrow, {
              top: popupY < position.y ? -8 : '100%',
              transform: popupY < position.y ? [] : [{rotate: '180deg'}]
            }]} />
          </View>
        </Pressable>
      </Modal>
    </Portal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  popup: {
    position: 'absolute',
    backgroundColor: theme.colors.surface,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
    maxWidth: 350,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingTop: 8,
    paddingRight: 8,
  },
  closeButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: theme.colors.outline,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    color: theme.colors.onSurface,
    fontSize: 14,
    fontWeight: 'bold',
  },
  content: {
    padding: 16,
    paddingTop: 8,
  },
  verseReference: {
    fontSize: 16,
    fontWeight: 'bold',
    color: theme.colors.primary,
    marginBottom: 8,
    textAlign: 'center',
  },
  verseText: {
    fontSize: 15,
    lineHeight: 22,
    color: theme.colors.onSurface,
    fontStyle: 'italic',
    marginBottom: 8,
  },
  translation: {
    fontSize: 12,
    color: theme.colors.onSurfaceVariant,
    textAlign: 'right',
    fontWeight: '500',
  },
  versesContainer: {
    maxHeight: 250,
  },
  singleVerse: {
    flexDirection: 'row',
    marginBottom: 8,
    alignItems: 'flex-start',
  },
  verseNumber: {
    fontSize: 12,
    fontWeight: 'bold',
    color: theme.colors.primary,
    marginRight: 8,
    marginTop: 2,
    minWidth: 20,
  },
  noVerseText: {
    fontSize: 14,
    color: theme.colors.error,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  arrow: {
    position: 'absolute',
    left: '50%',
    marginLeft: -8,
    width: 0,
    height: 0,
    borderLeftWidth: 8,
    borderRightWidth: 8,
    borderTopWidth: 8,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: theme.colors.surface,
  },
});
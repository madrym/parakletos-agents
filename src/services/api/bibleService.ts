import {BibleVerse, BibleReference} from '../../types/models';

/**
 * Bible Service for handling verse parsing, lookups, and Bible text operations
 */
export class BibleService {
  /**
   * Parse verse reference from text (e.g. "--John3:16")
   */
  static parseVerseReference(text: string): BibleReference | null {
    const versePattern = /--(\w+)(\d+):(\d+)(?:-(\d+))?/;
    const match = text.match(versePattern);
    
    if (!match) return null;
    
    const [, book, chapter, startVerse, endVerse] = match;
    
    return {
      book: book,
      chapter: parseInt(chapter, 10),
      startVerse: parseInt(startVerse, 10),
      endVerse: endVerse ? parseInt(endVerse, 10) : undefined,
    };
  }

  /**
   * Get verse text from local Bible JSON
   */
  static async getVerseText(reference: BibleReference, translation = 'NIV'): Promise<BibleVerse | null> {
    try {
      // TODO: Load from local Bible JSON file
      // For now, return a placeholder
      return {
        book: reference.book,
        chapter: reference.chapter,
        verse: reference.startVerse,
        text: `This is ${reference.book} ${reference.chapter}:${reference.startVerse} text (${translation})`,
        translation,
      };
    } catch (error) {
      console.error('Error fetching verse:', error);
      return null;
    }
  }

  /**
   * Search for verses containing specific text
   */
  static async searchVerses(query: string, translation = 'NIV'): Promise<BibleVerse[]> {
    try {
      // TODO: Implement full-text search in local Bible
      console.log('Searching for:', query, 'in', translation);
      return [];
    } catch (error) {
      console.error('Error searching verses:', error);
      return [];
    }
  }

  /**
   * Get chapter text for a specific book and chapter
   */
  static async getChapter(book: string, chapter: number, translation = 'NIV'): Promise<BibleVerse[]> {
    try {
      // TODO: Load chapter from local Bible JSON
      console.log('Loading chapter:', book, chapter, translation);
      return [];
    } catch (error) {
      console.error('Error loading chapter:', error);
      return [];
    }
  }

  /**
   * Format verse reference as readable string
   */
  static formatReference(reference: BibleReference): string {
    const {book, chapter, startVerse, endVerse} = reference;
    
    if (endVerse && endVerse !== startVerse) {
      return `${book} ${chapter}:${startVerse}-${endVerse}`;
    }
    
    return `${book} ${chapter}:${startVerse}`;
  }

  /**
   * Validate if a book name is valid
   */
  static isValidBook(bookName: string): boolean {
    const bibleBooks = [
      'Genesis', 'Exodus', 'Leviticus', 'Numbers', 'Deuteronomy',
      'Joshua', 'Judges', 'Ruth', '1Samuel', '2Samuel', '1Kings', '2Kings',
      'Matthew', 'Mark', 'Luke', 'John', 'Acts', 'Romans', '1Corinthians',
      // ... Add all 66 books
    ];
    
    return bibleBooks.some(book => 
      book.toLowerCase() === bookName.toLowerCase()
    );
  }
} 
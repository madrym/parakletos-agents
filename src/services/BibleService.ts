export interface BibleVerse {
  book: string;
  chapter: number;
  verse: number;
  text: string;
  translation?: string;
}

export interface VerseRange {
  book: string;
  chapter: number;
  startVerse: number;
  endVerse?: number;
}

// Sample Bible verses for demonstration
const SAMPLE_BIBLE_DATA: BibleVerse[] = [
  {
    book: 'John',
    chapter: 3,
    verse: 16,
    text: 'For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life.',
    translation: 'NIV'
  },
  {
    book: 'John',
    chapter: 3,
    verse: 17,
    text: 'For God did not send his Son into the world to condemn the world, but to save the world through him.',
    translation: 'NIV'
  },
  {
    book: 'Romans',
    chapter: 8,
    verse: 28,
    text: 'And we know that in all things God works for the good of those who love him, who have been called according to his purpose.',
    translation: 'NIV'
  },
  {
    book: 'Philippians',
    chapter: 4,
    verse: 13,
    text: 'I can do all this through him who gives me strength.',
    translation: 'NIV'
  },
  {
    book: 'Ephesians',
    chapter: 3,
    verse: 1,
    text: 'For this reason I, Paul, the prisoner of Christ Jesus for the sake of you Gentiles—',
    translation: 'NIV'
  },
  {
    book: 'Ephesians',
    chapter: 3,
    verse: 2,
    text: 'Surely you have heard about the administration of God\'s grace that was given to me for you,',
    translation: 'NIV'
  },
  {
    book: 'Ephesians',
    chapter: 3,
    verse: 3,
    text: 'that is, the mystery made known to me by revelation, as I have already written briefly.',
    translation: 'NIV'
  },
  {
    book: 'Ephesians',
    chapter: 3,
    verse: 4,
    text: 'In reading this, then, you will be able to understand my insight into the mystery of Christ,',
    translation: 'NIV'
  },
  {
    book: 'Ephesians',
    chapter: 3,
    verse: 5,
    text: 'which was not made known to people in other generations as it has now been revealed by the Spirit to God\'s holy apostles and prophets.',
    translation: 'NIV'
  },
  {
    book: 'Ephesians',
    chapter: 3,
    verse: 6,
    text: 'This mystery is that through the gospel the Gentiles are heirs together with Israel, members together of one body, and sharers together in the promise in Christ Jesus.',
    translation: 'NIV'
  },
  {
    book: 'Ephesians',
    chapter: 3,
    verse: 7,
    text: 'I became a servant of this gospel by the gift of God\'s grace given me through the working of his power.',
    translation: 'NIV'
  },
  {
    book: 'Ephesians',
    chapter: 3,
    verse: 8,
    text: 'Although I am less than the least of all the Lord\'s people, this grace was given me: to preach to the Gentiles the boundless riches of Christ,',
    translation: 'NIV'
  },
  {
    book: 'Ephesians',
    chapter: 3,
    verse: 9,
    text: 'and to make plain to everyone the administration of this mystery, which for ages past was kept hidden in God, who created all things.',
    translation: 'NIV'
  },
  {
    book: 'Ephesians',
    chapter: 3,
    verse: 10,
    text: 'His intent was that now, through the church, the manifold wisdom of God should be made known to the rulers and authorities in the heavenly realms,',
    translation: 'NIV'
  },
  {
    book: 'Psalm',
    chapter: 23,
    verse: 1,
    text: 'The Lord is my shepherd, I lack nothing.',
    translation: 'NIV'
  },
  {
    book: '1 Corinthians',
    chapter: 13,
    verse: 4,
    text: 'Love is patient, love is kind. It does not envy, it does not boast, it is not proud.',
    translation: 'NIV'
  },
  {
    book: 'Matthew',
    chapter: 5,
    verse: 16,
    text: 'In the same way, let your light shine before others, that they may see your good deeds and glorify your Father in heaven.',
    translation: 'NIV'
  }
];

export class BibleService {
  private static instance: BibleService;
  private bibleData: BibleVerse[] = SAMPLE_BIBLE_DATA;

  private constructor() {}

  static getInstance(): BibleService {
    if (!BibleService.instance) {
      BibleService.instance = new BibleService();
    }
    return BibleService.instance;
  }

  /**
   * Parse a verse reference string like "John3:16" or "Ephesians3:1-10"
   */
  parseVerseReference(reference: string): VerseRange | null {
    // Remove spaces and normalize
    const cleaned = reference.replace(/\s/g, '');
    
    // Pattern: BookName + Chapter + : + Verse(s)
    const match = cleaned.match(/^([a-zA-Z\d\s]+)(\d+):(\d+)(?:-(\d+))?$/);
    
    if (!match) {
      return null;
    }

    const [, bookPart, chapterStr, startVerseStr, endVerseStr] = match;
    
    // Extract book name (everything except the last number which is chapter)
    const bookMatch = bookPart.match(/^(.+?)(\d+)$/);
    if (!bookMatch) {
      return null;
    }

    const book = bookMatch[1];
    const chapter = parseInt(chapterStr, 10);
    const startVerse = parseInt(startVerseStr, 10);
    const endVerse = endVerseStr ? parseInt(endVerseStr, 10) : undefined;

    return {
      book,
      chapter,
      startVerse,
      endVerse
    };
  }

  /**
   * Get verse(s) based on reference
   */
  getVerse(reference: string): BibleVerse[] {
    const parsedRef = this.parseVerseReference(reference);
    if (!parsedRef) {
      return [];
    }

    const { book, chapter, startVerse, endVerse } = parsedRef;

    return this.bibleData.filter(verse => {
      const bookMatches = verse.book.toLowerCase() === book.toLowerCase();
      const chapterMatches = verse.chapter === chapter;
      
      if (!bookMatches || !chapterMatches) {
        return false;
      }

      if (endVerse) {
        return verse.verse >= startVerse && verse.verse <= endVerse;
      } else {
        return verse.verse === startVerse;
      }
    });
  }

  /**
   * Format verses for display
   */
  formatVerses(verses: BibleVerse[], reference: string): string {
    if (verses.length === 0) {
      return `${reference} (verse not found)`;
    }

    if (verses.length === 1) {
      const verse = verses[0];
      return `"${verse.text}" - ${verse.book} ${verse.chapter}:${verse.verse} (${verse.translation})`;
    }

    // Multiple verses
    const first = verses[0];
    const last = verses[verses.length - 1];
    const versesText = verses.map(v => v.text).join(' ');
    
    return `"${versesText}" - ${first.book} ${first.chapter}:${first.verse}-${last.verse} (${first.translation})`;
  }

  /**
   * Get a shortened reference for hyperlinks
   */
  formatReference(reference: string): string {
    const parsedRef = this.parseVerseReference(reference);
    if (!parsedRef) {
      return reference;
    }

    const { book, chapter, startVerse, endVerse } = parsedRef;
    if (endVerse) {
      return `${book} ${chapter}:${startVerse}-${endVerse}`;
    } else {
      return `${book} ${chapter}:${startVerse}`;
    }
  }

  /**
   * Check if a reference exists in our database
   */
  verseExists(reference: string): boolean {
    return this.getVerse(reference).length > 0;
  }
}
# Parakletos - Bible Note-Taking App

A React Native mobile application for Bible study, note-taking, and spiritual growth. Built with offline-first capabilities and rich spiritual tooling.

## 🙏 Overview

Parakletos empowers churchgoers, Bible readers, and small group leaders to:
- Capture sermon notes with audio timestamps
- Annotate Scripture with highlighting and notes  
- Maintain a prayer journal with follow-ups
- Create and share small group studies
- Access theology tooltips and definitions
- Work offline with automatic sync when online

## 🏗️ Architecture

- **Frontend**: React Native (iOS & Android)
- **State Management**: Zustand
- **Offline Storage**: WatermelonDB 
- **Authentication**: Clerk
- **Backend Sync**: Convex
- **API Services**: FastAPI
- **File Storage**: AWS S3
- **Audio**: react-native-audio-recorder-player
- **Markdown**: react-native-markdown-display

## 📱 Features

### Core Features
- ✅ Enhanced Bible note-taking with verse importing (`--John3:16`)
- ✅ Local tagging & categorization (Book, Preacher, Theme, Location, Series)
- ✅ Sermon recording with auto-timestamps
- ✅ Offline Bible integration with highlighting
- ✅ Bible passage annotation with margin notes
- ✅ Prayer journal with status tracking
- ✅ Small group study builder with multiple question types
- ✅ Theology tooltips for biblical terms
- ✅ Note sharing as PDF/link

### Planned Features  
- 📝 Real-time collaborative studies
- 🎵 Audio transcription integration
- 📊 Study analytics and insights
- 🔔 Prayer reminder notifications

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- React Native development environment
- iOS Simulator / Android Emulator
- Clerk account for authentication
- Convex account for backend sync
- AWS account for file storage

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/parakletos-agents.git
   cd parakletos-agents
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **iOS setup (if targeting iOS)**
   ```bash
   cd ios && pod install && cd ..
   ```

4. **Environment setup**
   ```bash
   cp .env.example .env
   ```
   
   Fill in your environment variables:
   ```env
   EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_key
   REACT_APP_CONVEX_URL=your_convex_url
   AWS_ACCESS_KEY_ID=your_aws_key
   AWS_SECRET_ACCESS_KEY=your_aws_secret
   S3_BUCKET_NAME=your_bucket_name
   FASTAPI_BASE_URL=your_api_url
   ```

5. **Run the app**
   ```bash
   # iOS
   npm run ios
   
   # Android  
   npm run android
   
   # Start Metro bundler
   npm start
   ```


## 🔧 Development

### Key Scripts

```bash
npm run ios          # Run on iOS simulator
npm run android      # Run on Android emulator  
npm run start        # Start Metro bundler
npm run lint         # Run ESLint
npm run test         # Run tests
```

### Database Schema

The app uses WatermelonDB for offline storage with these main tables:

- **notes** - User notes with markdown content and tags
- **tags** - Categorization tags (Book, Preacher, Theme, etc.)
- **prayers** - Prayer entries with status tracking
- **study_sessions** - Small group studies and questions
- **bible_verse_notes** - Verse annotations and highlights
- **audio_recordings** - Sermon recordings and metadata

### State Management

Zustand stores manage:
- Authentication state
- Notes and tags
- Prayer entries  
- Study sessions
- App settings
- Sync status

## 🔌 API Integration

### Clerk Authentication
Handles user authentication with Google/Apple sign-in support.

### Convex Backend
Real-time sync for notes, prayers, studies, and shared content.

### FastAPI Services
- Verse parsing and validation
- Audio transcription (optional)
- Export services (PDF generation)
- Theology definitions API

### AWS S3 Storage
File uploads for audio recordings and media attachments.

## 📖 Usage

1. **Authentication**: Sign in with Google or Apple
2. **Create Notes**: Tap + to create sermon notes with audio recording
3. **Add Verses**: Use `--John3:16` syntax to insert Bible verses
4. **Tag Content**: Organize with Book, Preacher, Theme tags
5. **Prayer Journal**: Track ongoing and answered prayers
6. **Study Groups**: Create shareable studies with custom questions
7. **Bible Reading**: Highlight and annotate verses offline

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

*"Therefore encourage one another and build each other up" - 1 Thessalonians 5:11*
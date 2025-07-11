#!/bin/bash

# Parakletos React Native Setup Script
echo "🙏 Setting up Parakletos React Native App..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ and try again."
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Node.js version 18+ required. Current version: $(node -v)"
    exit 1
fi

echo "✅ Node.js $(node -v) detected"

# Install dependencies
echo "📦 Installing dependencies..."
if command -v yarn &> /dev/null; then
    yarn install
else
    npm install
fi

# Copy environment file if it doesn't exist
if [ ! -f ".env" ]; then
    echo "📝 Creating .env file from template..."
    cp env.example .env
    echo "⚠️  Please edit .env file with your actual credentials"
else
    echo "✅ .env file already exists"
fi

# iOS setup (if on macOS)
if [[ "$OSTYPE" == "darwin"* ]]; then
    echo "🍎 Setting up iOS dependencies..."
    if command -v pod &> /dev/null; then
        cd ios && pod install && cd ..
        echo "✅ iOS pods installed"
    else
        echo "⚠️  CocoaPods not found. Install with: sudo gem install cocoapods"
    fi
fi

# Create directories for development
echo "📁 Creating required directories..."
mkdir -p src/components/common
mkdir -p src/components/ui
mkdir -p src/services/audio
mkdir -p src/services/sync
mkdir -p src/store
mkdir -p src/utils
mkdir -p assets/bible
mkdir -p recordings

# Set permissions for scripts
chmod +x setup.sh

echo ""
echo "🎉 Setup complete!"
echo ""
echo "Next steps:"
echo "1. Edit .env file with your API keys and configuration"
echo "2. Set up your Clerk, Convex, and AWS accounts"
echo "3. Run 'npm run ios' or 'npm run android' to start developing"
echo ""
echo "📖 See README.md for detailed setup instructions"
echo ""
echo "Happy coding! 🚀" 
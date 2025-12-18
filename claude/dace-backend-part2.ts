// ============================================================================
// FILE: /prisma/schema.prisma
// Database schema for the DACE platform itself
// ============================================================================

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id        String    @id @default(cuid())
  email     String    @unique
  name      String?
  avatar    String?
  createdAt DateTime  @default(now())
  updatedAt DateTime  @updatedAt
  projects  Project[]
}

model Project {
  id            String        @id @default(cuid())
  userId        String
  user          User          @relation(fields: [userId], references: [id], onDelete: Cascade)
  intent        String        @db.Text
  status        String        // initializing, processing, ready, failed, deploying
  deploymentUrl String?
  error         String?       @db.Text
  metadata      Json          @default("{}")
  createdAt     DateTime      @default(now())
  updatedAt     DateTime      @updatedAt
  steps         ProjectStep[]
  
  @@index([userId])
  @@index([status])
}

model ProjectStep {
  id        String   @id @default(cuid())
  projectId String
  project   Project  @relation(fields: [projectId], references: [id], onDelete: Cascade)
  stepName  String
  status    String   // running, completed, failed
  data      String?  @db.Text
  error     String?  @db.Text
  createdAt DateTime @default(now())
  
  @@index([projectId])
}

// ============================================================================
// FILE: /mobile/capacitor.config.ts
// Capacitor configuration for mobile builds
// ============================================================================

import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.dace.app',
  appName: 'DACE App',
  webDir: 'out',
  server: {
    androidScheme: 'https'
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: '#000000',
      showSpinner: false
    }
  }
};

export default config;

// ============================================================================
// FILE: /.github/workflows/mobile-build.yml
// GitHub Actions workflow for automated mobile builds
// ============================================================================

/*
name: Mobile Build Pipeline

on:
  workflow_dispatch:
    inputs:
      projectId:
        description: 'Project ID to build'
        required: true
      platform:
        description: 'Platform to build'
        required: true
        type: choice
        options:
          - ios
          - android
          - both

jobs:
  build-ios:
    if: ${{ github.event.inputs.platform == 'ios' || github.event.inputs.platform == 'both' }}
    runs-on: macos-latest
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - name: Install dependencies
        run: |
          cd workspaces/${{ github.event.inputs.projectId }}
          npm install
      
      - name: Build web assets
        run: |
          cd workspaces/${{ github.event.inputs.projectId }}
          npm run build
      
      - name: Sync Capacitor
        run: |
          cd workspaces/${{ github.event.inputs.projectId }}
          npx cap sync ios
      
      - name: Setup Xcode
        uses: maxim-lobanov/setup-xcode@v1
        with:
          xcode-version: latest-stable
      
      - name: Build iOS app
        run: |
          cd workspaces/${{ github.event.inputs.projectId }}/ios/App
          xcodebuild -workspace App.xcworkspace \
            -scheme App \
            -configuration Release \
            -archivePath $PWD/build/App.xcarchive \
            archive
      
      - name: Export IPA
        run: |
          cd workspaces/${{ github.event.inputs.projectId }}/ios/App
          xcodebuild -exportArchive \
            -archivePath $PWD/build/App.xcarchive \
            -exportOptionsPlist ExportOptions.plist \
            -exportPath $PWD/build
      
      - name: Upload to TestFlight
        env:
          APPLE_ID: ${{ secrets.APPLE_ID }}
          APP_SPECIFIC_PASSWORD: ${{ secrets.APP_SPECIFIC_PASSWORD }}
        run: |
          xcrun altool --upload-app \
            --type ios \
            --file workspaces/${{ github.event.inputs.projectId }}/ios/App/build/App.ipa \
            --username "$APPLE_ID" \
            --password "$APP_SPECIFIC_PASSWORD"

  build-android:
    if: ${{ github.event.inputs.platform == 'android' || github.event.inputs.platform == 'both' }}
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - name: Setup Java
        uses: actions/setup-java@v3
        with:
          distribution: 'temurin'
          java-version: '17'
      
      - name: Install dependencies
        run: |
          cd workspaces/${{ github.event.inputs.projectId }}
          npm install
      
      - name: Build web assets
        run: |
          cd workspaces/${{ github.event.inputs.projectId }}
          npm run build
      
      - name: Sync Capacitor
        run: |
          cd workspaces/${{ github.event.inputs.projectId }}
          npx cap sync android
      
      - name: Build Android APK
        run: |
          cd workspaces/${{ github.event.inputs.projectId }}/android
          ./gradlew assembleRelease
      
      - name: Sign APK
        uses: r0adkll/sign-android-release@v1
        with:
          releaseDirectory: workspaces/${{ github.event.inputs.projectId }}/android/app/build/outputs/apk/release
          signingKeyBase64: ${{ secrets.ANDROID_SIGNING_KEY }}
          alias: ${{ secrets.ANDROID_KEY_ALIAS }}
          keyStorePassword: ${{ secrets.ANDROID_KEYSTORE_PASSWORD }}
          keyPassword: ${{ secrets.ANDROID_KEY_PASSWORD }}
      
      - name: Upload to Play Console
        uses: r0adkll/upload-google-play@v1
        with:
          serviceAccountJsonPlainText: ${{ secrets.GOOGLE_PLAY_SERVICE_ACCOUNT }}
          packageName: com.dace.app.${{ github.event.inputs.projectId }}
          releaseFiles: workspaces/${{ github.event.inputs.projectId }}/android/app/build/outputs/apk/release/app-release-signed.apk
          track: internal
*/

// ============================================================================
// FILE: /fastlane/Fastfile
// Fastlane configuration for iOS/Android deployment
// ============================================================================

/*
default_platform(:ios)

platform :ios do
  desc "Build and upload to TestFlight"
  lane :beta do
    # Increment build number
    increment_build_number(xcodeproj: "ios/App/App.xcodeproj")
    
    # Build the app
    build_app(
      workspace: "ios/App/App.xcworkspace",
      scheme: "App",
      export_method: "app-store"
    )
    
    # Upload to TestFlight
    upload_to_testflight(
      skip_waiting_for_build_processing: true
    )
  end
  
  desc "Submit to App Store"
  lane :release do
    # Upload metadata and screenshots
    deliver(
      submit_for_review: true,
      automatic_release: false,
      force: true,
      metadata_path: "./fastlane/metadata",
      screenshots_path: "./fastlane/screenshots"
    )
  end
end

platform :android do
  desc "Build and upload to Play Console"
  lane :beta do
    # Increment version code
    increment_version_code(
      gradle_file_path: "android/app/build.gradle"
    )
    
    # Build the app
    gradle(
      task: "bundle",
      build_type: "Release",
      project_dir: "android/"
    )
    
    # Upload to Play Console internal track
    upload_to_play_store(
      track: 'internal',
      aab: 'android/app/build/outputs/bundle/release/app-release.aab',
      skip_upload_metadata: true,
      skip_upload_images: true,
      skip_upload_screenshots: true
    )
  end
  
  desc "Promote to production"
  lane :release do
    upload_to_play_store(
      track: 'internal',
      track_promote_to: 'production',
      skip_upload_apk: true,
      skip_upload_aab: true
    )
  end
end
*/

// ============================================================================
// FILE: /lib/supabase.ts
// Supabase client configuration
// ============================================================================

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Server-side client with service role
export function getServiceSupabase() {
  return createClient(
    supabaseUrl,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      auth: {
        persistSession: false,
        autoRefreshToken: false
      }
    }
  );
}

// ============================================================================
// FILE: /engine/store/prisma.ts
// Prisma client singleton
// ============================================================================

import { PrismaClient } from '@prisma/client';

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

// ============================================================================
// FILE: /app/api/projects/[projectId]/status/route.ts
// Real-time project status endpoint
// ============================================================================

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/engine/store/prisma';

export async function GET(
  req: NextRequest,
  { params }: { params: { projectId: string } }
) {
  try {
    const project = await prisma.project.findUnique({
      where: { id: params.projectId },
      include: {
        steps: {
          orderBy: { createdAt: 'asc' }
        }
      }
    });

    if (!project) {
      return NextResponse.json(
        { error: 'Project not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(project);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch project status' },
      { status: 500 }
    );
  }
}

// ============================================================================
// FILE: /app/api/projects/[projectId]/deploy/route.ts
// Manual deployment trigger
// ============================================================================

import { NextRequest, NextResponse } from 'next/server';
import { deployToVercel } from '@/engine/publish/publishVercel';
import { prisma } from '@/engine/store/prisma';
import path from 'path';

export async function POST(
  req: NextRequest,
  { params }: { params: { projectId: string } }
) {
  try {
    const project = await prisma.project.findUnique({
      where: { id: params.projectId }
    });

    if (!project) {
      return NextResponse.json(
        { error: 'Project not found' },
        { status: 404 }
      );
    }

    if (project.status !== 'ready') {
      return NextResponse.json(
        { error: 'Project must be ready to deploy' },
        { status: 400 }
      );
    }

    // Update status
    await prisma.project.update({
      where: { id: params.projectId },
      data: { status: 'deploying' }
    });

    // Deploy
    const workspacePath = path.join(process.cwd(), 'workspaces', params.projectId);
    const deployment = await deployToVercel(params.projectId, workspacePath);

    // Update with deployment info
    await prisma.project.update({
      where: { id: params.projectId },
      data: {
        status: 'ready',
        deploymentUrl: deployment.url
      }
    });

    return NextResponse.json(deployment);
  } catch (error) {
    await prisma.project.update({
      where: { id: params.projectId },
      data: { 
        status: 'failed',
        error: error.message 
      }
    });

    return NextResponse.json(
      { error: 'Deployment failed' },
      { status: 500 }
    );
  }
}

// ============================================================================
// FILE: /app/api/projects/[projectId]/mobile/route.ts
// Mobile build trigger endpoint
// ============================================================================

import { NextRequest, NextResponse } from 'next/server';
import { buildMobileArtifacts } from '@/engine/publish/buildApp';
import { prisma } from '@/engine/store/prisma';
import path from 'path';

export async function POST(
  req: NextRequest,
  { params }: { params: { projectId: string } }
) {
  try {
    const { platform } = await req.json(); // 'ios' | 'android' | 'both'

    const project = await prisma.project.findUnique({
      where: { id: params.projectId }
    });

    if (!project || project.status !== 'ready') {
      return NextResponse.json(
        { error: 'Project not ready for mobile build' },
        { status: 400 }
      );
    }

    const workspacePath = path.join(process.cwd(), 'workspaces', params.projectId);
    const mobileBuild = await buildMobileArtifacts(params.projectId, workspacePath);

    return NextResponse.json(mobileBuild);
  } catch (error) {
    return NextResponse.json(
      { error: 'Mobile build failed: ' + error.message },
      { status: 500 }
    );
  }
}

// ============================================================================
// FILE: /.env.example
// Environment variables template
// ============================================================================

/*
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/dace?schema=public"

# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Anthropic API
ANTHROPIC_API_KEY=sk-ant-your-key

# Vercel
VERCEL_TOKEN=your-vercel-token
VERCEL_ORG_ID=your-org-id

# Apple (for iOS builds)
APPLE_ID=your-apple-id@email.com
APP_SPECIFIC_PASSWORD=your-app-specific-password
APPLE_TEAM_ID=your-team-id

# Google Play (for Android builds)
GOOGLE_PLAY_SERVICE_ACCOUNT={"type":"service_account",...}

# Android Signing
ANDROID_SIGNING_KEY=base64-encoded-keystore
ANDROID_KEY_ALIAS=your-key-alias
ANDROID_KEYSTORE_PASSWORD=your-keystore-password
ANDROID_KEY_PASSWORD=your-key-password

# NextAuth (optional for user auth)
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key
*/

// ============================================================================
// FILE: /package.json
// Root package.json with all dependencies
// ============================================================================

/*
{
  "name": "dace-platform",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "db:push": "prisma db push",
    "db:studio": "prisma studio",
    "db:generate": "prisma generate",
    "postinstall": "prisma generate"
  },
  "dependencies": {
    "@anthropic-ai/sdk": "^0.27.0",
    "@capacitor/cli": "^5.5.1",
    "@capacitor/core": "^5.5.1",
    "@capacitor/ios": "^5.5.1",
    "@capacitor/android": "^5.5.1",
    "@prisma/client": "^5.7.0",
    "@supabase/supabase-js": "^2.39.0",
    "@supabase/auth-helpers-nextjs": "^0.8.0",
    "next": "14.0.4",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "lucide-react": "^0.263.1",
    "glob": "^10.3.10"
  },
  "devDependencies": {
    "@types/node": "^20.10.5",
    "@types/react": "^18.2.45",
    "@types/react-dom": "^18.2.18",
    "autoprefixer": "^10.4.16",
    "postcss": "^8.4.32",
    "prisma": "^5.7.0",
    "tailwindcss": "^3.4.0",
    "typescript": "^5.3.3"
  }
}
*/

// ============================================================================
// FILE: /vercel.json
// Vercel deployment configuration
// ============================================================================

/*
{
  "buildCommand": "npm run build && prisma generate",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "framework": "nextjs",
  "regions": ["iad1"],
  "env": {
    "DATABASE_URL": "@database-url",
    "ANTHROPIC_API_KEY": "@anthropic-api-key",
    "VERCEL_TOKEN": "@vercel-token",
    "SUPABASE_SERVICE_ROLE_KEY": "@supabase-service-role-key"
  },
  "build": {
    "env": {
      "DATABASE_URL": "@database-url"
    }
  }
}
*/

// ============================================================================
// FILE: /README.md
// Complete setup and deployment instructions
// ============================================================================

/*
# DACE - Deterministic App Creation Engine

## Quick Start

### 1. Clone and Install
```bash
git clone <your-repo>
cd dace-platform
npm install
```

### 2. Environment Setup
Copy `.env.example` to `.env.local` and fill in all values:

```bash
cp .env.example .env.local
```

### 3. Database Setup
```bash
# Push schema to database
npm run db:push

# Open Prisma Studio (optional)
npm run db:studio
```

### 4. Run Development Server
```bash
npm run dev
```

Visit http://localhost:3000

## Production Deployment

### Prerequisites
1. Vercel account with CLI access
2. Supabase project (free tier works)
3. Anthropic API key
4. Apple Developer account ($99/year for iOS)
5. Google Play Console account ($25 one-time for Android)

### Deploy to Vercel
```bash
vercel --prod
```

### Set Environment Variables
```bash
vercel env add DATABASE_URL
vercel env add ANTHROPIC_API_KEY
vercel env add VERCEL_TOKEN
# ... add all other env vars
```

## Mobile Build Setup

### iOS Setup
1. Install Xcode from Mac App Store
2. Install CocoaPods: `sudo gem install cocoapods`
3. Add Apple Developer credentials to GitHub Secrets
4. Configure Fastlane: `cd fastlane && fastlane init`

### Android Setup
1. Install Android Studio
2. Create keystore: `keytool -genkey -v -keystore release.keystore ...`
3. Add signing credentials to GitHub Secrets
4. Configure Fastlane for Play Console

### Trigger Mobile Builds
Use GitHub Actions workflow or API:
```bash
POST /api/projects/{projectId}/mobile
{ "platform": "both" }
```

## Architecture

### Core Flow
1. User types command → API receives intent
2. Claude parses intent → Extract entities, features
3. Blueprint selection → Choose framework stack
4. Schema generation → Database tables
5. Code compilation → AI generates all files
6. File system write → Create workspace
7. Vercel deployment → Live URL
8. Mobile build → iOS/Android artifacts

### Tech Stack
- **Frontend**: Next.js 14, React 18, Tailwind CSS
- **Backend**: Next.js API Routes, Prisma ORM
- **Database**: PostgreSQL (via Supabase)
- **AI**: Claude Sonnet 4 (Anthropic API)
- **Deployment**: Vercel (web), GitHub Actions (mobile)
- **Mobile**: Capacitor, Fastlane

## API Reference

### Create App
```typescript
POST /api/create-app
Body: { 
  intent: "make a therapy app",
  userId: "user_123" 
}
Response: { 
  projectId: "proj_abc",
  status: "initializing" 
}
```

### Check Status
```typescript
GET /api/projects/{projectId}/status
Response: {
  id: "proj_abc",
  status: "ready",
  deploymentUrl: "https://proj-abc.vercel.app",
  steps: [...]
}
```

### Deploy
```typescript
POST /api/projects/{projectId}/deploy
Response: {
  url: "https://proj-abc.vercel.app",
  deploymentId: "dpl_xyz"
}
```

### Mobile Build
```typescript
POST /api/projects/{projectId}/mobile
Body: { platform: "ios" | "android" | "both" }
Response: {
  ios: { status: "ready", path: "..." },
  android: { status: "ready", path: "..." }
}
```

## Cost Estimates

### Development Phase
- Vercel: Free (Hobby tier)
- Supabase: Free (2 projects)
- Anthropic API: ~$0.015 per app creation
- Total: ~$0-50/month

### Production Phase (100 apps/month)
- Vercel Pro: $20/month
- Supabase Pro: $25/month
- Anthropic API: ~$150/month (10K requests)
- GitHub Actions: $0-50/month
- Total: ~$195-245/month

### Store Fees
- Apple Developer: $99/year
- Google Play: $25 one-time
- Total: $124 first year, $99/year after

## Troubleshooting

### "Claude API timeout"
- Increase max_tokens in parseIntent()
- Add retry logic with exponential backoff

### "Vercel deployment failed"
- Check environment variables are set
- Verify VERCEL_TOKEN has proper permissions
- Check workspace files were written correctly

### "Mobile build failed"
- Ensure Capacitor is initialized
- Check native dependencies are installed
- Verify signing certificates are valid

## License
MIT
*/
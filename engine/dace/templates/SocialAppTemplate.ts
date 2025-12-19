// /engine/dace/templates/SocialAppTemplate.ts
import { DACEIntent } from '../DeterministicEngine';

export class SocialAppTemplate {
  name = 'social-app';
  version = '1.0.0';
  description = 'Social networking platform with profiles, posts, and messaging';

  generate(intent: DACEIntent) {
    return {
      structure: this.generateStructure(intent.appName),
      packageJson: this.generatePackageJson(intent.appName),
      appFiles: this.generateAppFiles(intent),
      databaseSchema: this.generateDatabaseSchema(),
      deploymentConfigs: this.generateDeploymentConfigs(intent),
    };
  }

  private generateStructure(appName: string) {
    return {
      'app/': [
        'layout.tsx',
        'page.tsx',
        'globals.css',
        'feed/',
        'profile/',
        'messages/',
        'api/',
      ],
      'components/': [
        'post/',
        'comment/',
        'message/',
        'ui/',
      ],
    };
  }

  private generateAppFiles(intent: DACEIntent) {
    const files: Record<string, string> = {};

    files['app/page.tsx'] = `
import Feed from '@/components/feed/Feed';
import CreatePost from '@/components/post/CreatePost';
import SuggestedUsers from '@/components/user/SuggestedUsers';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <CreatePost />
            <Feed />
          </div>
          <div>
            <SuggestedUsers />
          </div>
        </div>
      </div>
    </div>
  );
}
`;

    files['components/post/CreatePost.tsx'] = `
'use client';

import { useState } from 'react';
import { Image, Smile, Video } from 'lucide-react';

export default function CreatePost() {
  const [content, setContent] = useState('');

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-500"></div>
        <div className="flex-1">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="What's on your mind?"
            className="w-full min-h-[100px] p-4 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          />
          <div className="flex items-center justify-between mt-4">
            <div className="flex gap-4">
              <button className="flex items-center gap-2 text-gray-600 hover:text-blue-600">
                <Image className="w-5 h-5" />
                Photo
              </button>
              <button className="flex items-center gap-2 text-gray-600 hover:text-blue-600">
                <Video className="w-5 h-5" />
                Video
              </button>
              <button className="flex items-center gap-2 text-gray-600 hover:text-blue-600">
                <Smile className="w-5 h-5" />
                Feeling
              </button>
            </div>
            <button 
              disabled={!content.trim()}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Post
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
`;

    return files;
  }

  private generateDatabaseSchema() {
    return {
      tables: [
        {
          name: 'posts',
          schema: `
            create table posts (
              id uuid default gen_random_uuid() primary key,
              user_id uuid references users(id),
              content text not null,
              media_urls text[],
              like_count integer default 0,
              comment_count integer default 0,
              created_at timestamp with time zone default timezone('utc'::text, now()) not null
            );
          `,
        },
        {
          name: 'friends',
          schema: `
            create table friends (
              id uuid default gen_random_uuid() primary key,
              user_id uuid references users(id),
              friend_id uuid references users(id),
              status text check (status in ('pending', 'accepted', 'blocked')) default 'pending',
              created_at timestamp with time zone default timezone('utc'::text, now()) not null,
              unique(user_id, friend_id)
            );
          `,
        },
      ],
    };
  }
}
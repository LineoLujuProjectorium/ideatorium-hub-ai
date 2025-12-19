// /engine/dace/templates/EcommerceAppTemplate.ts
import { DACEIntent } from '../DeterministicEngine';

export class EcommerceAppTemplate {
  name = 'ecommerce-app';
  version = '1.0.0';
  description = 'Full-featured e-commerce platform with payments, inventory, and analytics';
  
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
        'products/',
        'cart/',
        'checkout/',
        'dashboard/',
        'api/',
      ],
      'components/': [
        'product/',
        'cart/',
        'checkout/',
        'ui/',
      ],
      'lib/': [
        'stripe.ts',
        'utils.ts',
      ],
    };
  }

  private generatePackageJson(appName: string) {
    return {
      name: appName.toLowerCase().replace(/\s+/g, '-'),
      version: '1.0.0',
      private: true,
      dependencies: {
        'next': '14.0.0',
        'react': '18.2.0',
        'react-dom': '18.2.0',
        '@stripe/stripe-js': '^2.1.0',
        '@stripe/react-stripe-js': '^2.3.0',
        '@supabase/supabase-js': '^2.38.0',
        'lucide-react': '^0.309.0',
        'zustand': '^4.4.0',
      },
    };
  }

  private generateAppFiles(intent: DACEIntent) {
    const files: Record<string, string> = {};

    files['app/page.tsx'] = `
import HeroSection from '@/components/sections/HeroSection';
import ProductGrid from '@/components/product/ProductGrid';
import FeaturedCategories from '@/components/category/FeaturedCategories';

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <FeaturedCategories />
      <ProductGrid />
    </div>
  );
}
`;

    files['components/product/ProductGrid.tsx'] = `
'use client';

import { ShoppingCart, Star } from 'lucide-react';

const products = [
  { id: 1, name: 'Premium Headphones', price: 299.99, rating: 4.5, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop' },
  { id: 2, name: 'Wireless Keyboard', price: 129.99, rating: 4.2, image: 'https://images.unsplash.com/photo-1541140532154-b024d705b90a?w-400&h=400&fit=crop' },
  { id: 3, name: 'Smart Watch', price: 399.99, rating: 4.8, image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop' },
  { id: 4, name: 'Gaming Mouse', price: 79.99, rating: 4.3, image: 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=400&h=400&fit=crop' },
];

export default function ProductGrid() {
  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8">Featured Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div key={product.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className="h-48 overflow-hidden">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-lg">{product.name}</h3>
                <div className="flex items-center gap-1 mt-1">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={\`w-4 h-4 \${i < Math.floor(product.rating) ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}\`}
                    />
                  ))}
                  <span className="text-sm text-gray-600 ml-1">{product.rating}</span>
                </div>
                <div className="flex items-center justify-between mt-4">
                  <span className="text-2xl font-bold">\${product.price.toFixed(2)}</span>
                  <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    <ShoppingCart className="w-4 h-4" />
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
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
          name: 'products',
          schema: `
            create table products (
              id uuid default gen_random_uuid() primary key,
              name text not null,
              description text,
              price decimal(10,2) not null,
              stock_quantity integer default 0,
              category text,
              images text[],
              created_at timestamp with time zone default timezone('utc'::text, now()) not null
            );
          `,
        },
        {
          name: 'orders',
          schema: `
            create table orders (
              id uuid default gen_random_uuid() primary key,
              user_id uuid references users(id),
              total_amount decimal(10,2) not null,
              status text check (status in ('pending', 'processing', 'shipped', 'delivered', 'cancelled')) default 'pending',
              shipping_address jsonb,
              created_at timestamp with time zone default timezone('utc'::text, now()) not null
            );
          `,
        },
      ],
    };
  }

  private generateDeploymentConfigs(intent: DACEIntent) {
    return {
      vercel: {
        'vercel.json': JSON.stringify({
          buildCommand: 'npm run build',
          outputDirectory: '.next',
          devCommand: 'npm run dev',
          installCommand: 'npm install',
          framework: 'nextjs',
        }, null, 2),
      },
    };
  }
}
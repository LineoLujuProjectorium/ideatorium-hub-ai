// /app/page.tsx
import { redirect } from 'next/navigation';

export default function Home() {
  // Redirect to DACE engine
  redirect('/dace');
}
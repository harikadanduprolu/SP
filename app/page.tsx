'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.push('/dashboard');
  }, [router]);

  return (
    <div className="min-h-screen bg-[#0D0D0D] text-white flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold gradient-text mb-4">🥧 StudyPie</h1>
        <p className="text-gray-400">Loading...</p>
      </div>
    </div>
  );
}
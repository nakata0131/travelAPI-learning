// /app/page.jsx (修正後)
'use client';

import { useState } from 'react';
import HotelSearch from '@/components/HotelSearch';
import HotelList from '@/components/HotelList';

export default function Home() {
  const [searchParams, setSearchParams] = useState(null);

  return (
    <main className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">ホテル検索</h1>
      <HotelSearch onSearch={setSearchParams} />
      {searchParams && <HotelList searchParams={searchParams} />}
    </main>
  );
}

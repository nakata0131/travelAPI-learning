'use client';

import { useState } from 'react';
import SearchForm from '@/components/SearchForm';
import HotelList from '@/components/HotelList';

export default function Page() {
  const [searchParams, setSearchParams] = useState(null);

  return (
    <main>
      <h1>関東全域のホテル検索アプリ</h1>
      <SearchForm onSearch={setSearchParams} />
      {searchParams && <HotelList searchParams={searchParams} />}
    </main>
  );
}

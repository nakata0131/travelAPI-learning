"use client";
import { useState } from "react";
import SearchForm from "@/components/SearchForm";
import HotelList from "@/components/HotelList";

export default function Page() {
  const [areaCode, setAreaCode] = useState("");

  return (
    <main>
      <h1>宿泊施設検索</h1>
      <SearchForm onSearch={setAreaCode} />
      <HotelList areaCode={areaCode} />
    </main>
  );
}

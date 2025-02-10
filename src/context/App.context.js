"use client";

import React, { createContext, useContext, useState } from "react";

//  Contextを作成
export const AppContext = React.createContext({
  searchParams: {
    destination: "",   // 初期値を設定
    checkInDate: "",   // 初期値を設定
  },
  setSearchParams: () => {},
  favorites: [],
  toggleFavorite: () => {},
  isDarkMode: false,
  setIsDarkMode: () => {},
});

//  プロバイダーコンポーネント
export function AppProvider({ children }) {
  const [searchParams, setSearchParams] = useState({
    destination: "",
    checkInDate: "",
  }); // 🔍 検索条件の初期値を設定
  const [favorites, setFavorites] = useState([]); //  お気に入りリスト
  const [isDarkMode, setIsDarkMode] = useState(false); //  テーマ設定

  //  お気に入り追加・削除機能
  const toggleFavorite = (hotel) => {
    setFavorites((prev) =>
      prev.some((f) => f.id === hotel.id)
        ? prev.filter((f) => f.id !== hotel.id) // 既にあるなら削除
        : [...prev, hotel] // なければ追加
    );
  };

  return (
    <AppContext.Provider
      value={{
        searchParams,
        setSearchParams,
        favorites,
        toggleFavorite,
        isDarkMode,
        setIsDarkMode,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

//  Contextを使うためのカスタムフック
export function useAppContext() {
  return useContext(AppContext);
}

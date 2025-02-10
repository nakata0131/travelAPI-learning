import { useAppContext } from "../../App.context";

export default function FavoritesPage() {
  const { favorites, toggleFavorite } = useAppContext();

  return (
    <div>
      <h2>お気に入り一覧</h2>
      {favorites.length === 0 ? (
        <p>お気に入りがありません</p>
      ) : (
        <ul>
          {favorites.map((hotel, index) => (
            <li key={index}>
              <h3>{hotel.hotelName}</h3>
              <p><a href={hotel.hotelInformationUrl} target="_blank">詳細を見る</a></p>
              <button onClick={() => toggleFavorite(hotel)}>⭐ 削除</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

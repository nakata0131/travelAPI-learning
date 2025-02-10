import HotelList from "../components/HotelList";
import SearchForm from '../components/SearchForm';

export default function Home() {
  return (
    <div>
      <h1>ホテル検索アプリ</h1>
      <HotelList />
      <SearchForm />
    </div>
  );
}
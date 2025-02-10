import { useState } from "react";
import SearchForm from "./SearchForm";
import HotelList from "./HotelList";

const App = () => {
  const [areaCode, setAreaCode] = useState("");

  return (
    <div>
      <h1>宿泊施設検索</h1>
      <SearchForm onSearch={setAreaCode} />
      <HotelList areaCode={areaCode} />
    </div>
  );
};

export default App;

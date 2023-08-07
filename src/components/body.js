import RestaurantCard from "./Restaurantcard";
import { useState, useEffect } from "react";
import ShimmerComponent from "./shimmer";
import { Link } from "react-router-dom";
import { filterData } from "./Utils/helper";
// function filterData(searchText, restaurants) {
//   const filterData = restaurants.filter((restaurant) =>
//     restaurant?.data?.name.toLowerCase().includes(searchText.toLowerCase())
//   );
//   return filterData;
// }

const BodyComponent = () => {
  // useState: To create a state variable, searchText is local state variable
  const [searchText, setSearchText] = useState("");
  const [allRestaurants, setAllRestaurants] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  async function getRestaurants() {
    const data = await fetch(
      "https://www.swiggy.com/dapi/restaurants/list/v5?lat=22.5057437&lng=88.3567163&page_type=DESKTOP_WEB_LISTING"
    );
    const JSON = await data.json();
    setAllRestaurants(JSON?.data?.cards[2]?.data?.data?.cards);
    setFilteredRestaurants(JSON?.data?.cards[2]?.data?.data?.cards);
  }

  useEffect(() => {
    getRestaurants();
  }, []);

  // use searchData function and set condition if data is empty show error message
  const searchData = (searchText, restaurants) => {
    if (searchText !== "") {
      const data = filterData(searchText, restaurants);
      setFilteredRestaurants(data);
      setErrorMessage("");
      if (data.length === 0) {
        setErrorMessage("No matches restaurant found");
      }
    } else {
      setErrorMessage("");
      setFilteredRestaurants(restaurants);
    }
  };
  return (
    <>
      <div className="search-container">
        <input
          type="text"
          className="search-input"
          placeholder="Search a restaurant you want..."
          value={searchText}
          // update the state variable searchText when we typing in input box
          onChange={(e) => setSearchText(e.target.value)}
        ></input>
        <button
          className="search-btn"
          onClick={() => {
            // user click on button searchData function is called
            searchData(searchText, allRestaurants);
          }}
        >
          Search
        </button>
      </div>
      {errorMessage && <div className="error-container">{errorMessage}</div>}

      {/* if restaurants data is not fetched then display Shimmer UI after the fetched data display restaurants cards */}

      {allRestaurants?.length === 0 ? (
        <div className="restaurant-list">
          {new Array(10).fill("").map((element, index) => {
            return <ShimmerComponent key={index} />;
          })}
        </div>
      ) : (
        <div className="restaurant-list">
          {/* We are mapping restaurants array and passing JSON array data to RestaurantCard component as props with unique key as restaurant.data.id */}
          {filteredRestaurants.map((restaurant) => {
            return (
              <Link to={"/restaurantmenu/" + restaurant.data.id}>
                <RestaurantCard key={restaurant.data.id} {...restaurant.data} />
              </Link>
            );
          })}
        </div>
      )}
    </>
  );
};

export default BodyComponent;

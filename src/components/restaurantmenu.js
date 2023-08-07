import { useParams } from "react-router-dom";
import ShimmerComponent from "./shimmer";
import useRestaurant from "./Utils/useRestaurant";
const RestaurantMenu = () => {
  const { id } = useParams();
  const restaurant = useRestaurant(id);
  //const [restaurant, setRestaurant] = useState(null);
  // useEffect(() => {
  //   getmenu();
  // }, []);

  // async function getmenu() {
  //   try {
  //     const data = await fetch(
  //       "https://www.swiggy.com/dapi/menu/v4/full?lat=21.1702401&lng=72.83106070000001&menuId=" +
  //         id
  //     );
  //     const JSON = await data?.json();
  //     setRestaurant(JSON.data);
  //   } catch (error) {
  //   }
  // }

  return !restaurant ? (
    <ShimmerComponent />
  ) : (
    <div className="menu">
      <div>
        <h2>{restaurant?.name}</h2>
        <img
          src={
            "https://res.cloudinary.com/swiggy/image/upload/fl_lossy" +
            restaurant?.cloudinaryImageId
          }
        />
        <h3>{restaurant?.area}</h3>
        <h3>{restaurant?.city}</h3>
        <h3>{restaurant?.avgRating} stars</h3>
        <h3>{restaurant?.costForTwoMsg}</h3>
      </div>
      <div>
        <h1>Menu</h1>
        <ul>
          {Object.values(restaurant?.menu?.items).map((item) => (
            <li key={item?.id}> {item?.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};
export default RestaurantMenu;

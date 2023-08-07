import { useState, useEffect } from "react";
const useRestaurant = (resId) => {
  const [restaurant, setRestaurant] = useState(null);
  useEffect(() => {
    getmenu();
  }, []);

  async function getmenu() {
    const data = await fetch(
      "https://www.swiggy.com/dapi/menu/v4/full?lat=21.1702401&lng=72.83106070000001&menuId=" +
        resId
    );
    const JSON = await data?.json();
    setRestaurant(JSON.data);
    return restaurant;
  }
};
export default useRestaurant;

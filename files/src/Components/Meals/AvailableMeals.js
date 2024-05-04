import classes from "./AvailableMeals.module.css";
import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";
import { useEffect, useState } from "react";

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState();

  useEffect(() => {
    const fetchMeals = async () => {
      const response = await fetch("https://fakestoreapi.com/Products");
      const responseData = await response.json();

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const loadedMeals = [];
      for (const key in responseData) {
        loadedMeals.push({
          id: key,
          name: responseData[key].title,
          description: responseData[key].description,
          price: responseData[key].price,
          image: responseData[key].image,
        });
      }
      setMeals(loadedMeals);
      setIsLoading(false);
    };
    fetchMeals().catch((error) => {
      setIsLoading(false);
      setIsError(error.message);
    });
  }, []);

  if (isError) {
    return (
      <section className={classes.mealsError}>
        <p>{isError}</p>
      </section>
    );
  }
  if (isLoading) {
    <section>
      <p>Loading....</p>
    </section>;
  }

  const mealsList = meals.map((meal) => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description.slice(0, 140)}
      price={meal.price}
      image={meal.image}
    />
  ));
  return (
    <section className={classes.meals}>
      <Card>
        <div className={classes.grid}>{mealsList}</div>
      </Card>
    </section>
  );
};

export default AvailableMeals;

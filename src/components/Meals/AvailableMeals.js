import { useEffect, useState } from 'react';
import classes from './AvailableMeals.module.css'
import Card from '../UI/Card'
import MealItem from './MealItem/MealItem'




const AvailableMeals = () => {

    const [Meals, setMeals] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [Error, setError] = useState(null);

    useEffect(() => {

        const fetchMeals = async () => {

            setIsLoading(true);


            const response = await fetch('https://food-order-app-d01af-default-rtdb.firebaseio.com/meals.json')

            if (!response.ok) {
                throw new Error('Something Went Wrong');
            }

            const responseData = await response.json();

            const loadedMeals = [];

            for (const key in responseData) {
                loadedMeals.push({
                    id: key,
                    name: responseData[key].name,
                    description: responseData[key].description,
                    price: responseData[key].price,
                });
            }

            setMeals(loadedMeals);
            setIsLoading(false);
        };


        fetchMeals().catch((error) => {
            setIsLoading(false);
            setError(error.message);
        });
    }, [])

    if (isLoading) {
        return <section className={classes.MealsLoading}>
            <p>is Loading...</p>
        </section>
    }

    if (Error) {
        return (
            <section className={classes.MealsError}>
                <p>{Error}</p>
            </section>
        )
    }

    const mealslist = Meals.map(meals =>
        <MealItem key={meals.id} id={meals.id} name={meals.name} description={meals.description} price={meals.price} />
    )

    return <section className={classes.meals}>
        <Card>
            <ul>{mealslist}</ul>
        </Card>
    </section>
};

export default AvailableMeals;
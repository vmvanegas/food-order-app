import { useEffect, useState } from 'react';
import Card from '../UI/Card';
import classes from './AvaliableMeals.module.css'
import MealItem from './MealItem/MealItem';

const AvaliableMeals = () => {

    const [meals, setMeals] = useState([])
    const [loading, setLoading] = useState(true)
    const [httpError, setHttpError] = useState()


    useEffect(() => {
        async function fetchMeals() {
            const response = await fetch('https://react-http-a8f52-default-rtdb.firebaseio.com/meals.json')
            if (!response.ok) {
                throw new Error('Something went wrong!')
            }
            const data = await response.json()
            const loadedMeals = []
            for (const key in data) {
                loadedMeals.push({
                    id: key,
                    name: data[key].name,
                    description: data[key].description,
                    price: data[key].price,
                })
            }

            setMeals(loadedMeals)
            setLoading(false)
        }
        fetchMeals().catch(error => {
            setLoading(false)
            setHttpError(error.message)
        });
    }, [])

    if (loading) {
        return (
            <section className={classes.MealsLoading}>
                <p>Loading...</p>
            </section>
        )
    }

    if (httpError) {
        return (
            <section className={classes.MealsError}>
                <p>{httpError}</p>
            </section>
        )
    }

    const mealsList = meals.map(meal => <MealItem
        id={meal.id}
        key={meal.id}
        name={meal.name}
        description={meal.description}
        price={meal.price}
    ></MealItem>)


    return (
        <section className={classes.meals}>
            <Card>
                <ul>
                    {mealsList}
                </ul>
            </Card>
        </section>
    )
}

export default AvaliableMeals
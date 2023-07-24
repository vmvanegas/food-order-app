import MealsSummary from './MealsSummary'
import AvaliableMeals from './AvaliableMeals'
import classes from './Meals.module.css'
import { Fragment } from 'react'
const Meals = () => {
    return (
        <Fragment>
            <MealsSummary />
            <AvaliableMeals />
        </Fragment>
    )
}

export default Meals
import React , {useEffect,useState} from 'react';
import classes from './AvaliableMeals.module.css';
import Card from '../Ui/Card';
import MealItem from './MealItem/MealItem';
import Loader from '../Other/Loader'
import NiceError from './Error';

// const DUMMY_MEALS = [
//     {
//     id: 'm2',
//     name: 'kosharee',
//     description: 'A Egyptian specialty!',
//     price: 10.00,
//     },
//     {
//     id: 'm1',
//     name: 'Sushi',
//     description: 'Finest fish and veggies',
//     price: 23.49,
//     },
//     {
//     id: 'm3',
//     name: 'Barbecue Burger',
//     description: 'American, raw, meaty',
//     price: 12.99,
//     },
//     {
//     id: 'm4',
//     name: 'Green Bowl',
//     description: 'Healthy...and green...',
//     price: 18.99,
//     },
// ];

function AvaliableMeals() {

    const [meals,setMeals]=useState([]);
    const [isLoading,setIsLoading]=useState(false);
    const [httpError,setHttpError]=useState()

    useEffect(()=>{
        setIsLoading(true);
        const fetchMeals = async ()=>{
            const response = await fetch('https://meals-7c8f6-default-rtdb.firebaseio.com/meals.json');
            if(!response.ok) {
                throw new Error('error')
            }

            const responseData = await response.json();

            const loadedMeals =[]

            for(const key in responseData){
                loadedMeals.push({
                    id:key,
                    name:responseData[key].name,
                    discription:responseData[key].discription,
                    price:responseData[key].price
                })

            }
            setMeals(loadedMeals);
            setIsLoading(false)
        }
            fetchMeals().catch((error)=>{
                setIsLoading(false);
                setHttpError(error.message);
            });
        
    },[])

    if(isLoading){
        return (
            <Loader/>
        )
    }
    
    if(httpError){
        return(
            <div>
                <NiceError />
            </div>
        )
    }

    const mealList=meals.map((meal)=>(
        <MealItem
        id={meal.id}
        key={meal.id}
        price={meal.price}
        name={meal.name}
        description={meal.description}
        
        />
        
        ));

    return (
        <section className={classes.meals}> 
            <Card>
                <ul>{mealList}</ul>
            </Card>
        </section>
    )
    };


export default AvaliableMeals

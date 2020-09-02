import React, {useEffect, useState} from 'react'
import axios from 'axios';

export default function HomePape() {
    const [ingredient, setIngredient] = useState('')
    const [switch1, setSwitch1] = useState(false)
    useEffect(() => {
        const func =  async () => {
            try {
                const {data} = await axios.get('https://www.thecocktaildb.com/api/json/v1/1/random.php') 
                console.log('data', data)
                setIngredient(data.drinks[0].strDrink)
                // setSwitch1(true)
            } catch (error) {
                console.log(error)
            }
        }
        if (!switch1) {
            setSwitch1(true)
            func()
        }
    })

    // console.log(ingredient)
    return(
        <div>
            {ingredient !== '' ? <h1>{ingredient}</h1> : <div></div>}
            <div>
            <h1>Mixogolist</h1>
             <img className="mainPic" 
             src="https://techgirl.co.za/wp-content/uploads/2015/01/pdid3.jpg"/>
            <h3>Drink of the week</h3>
            </div>
        </div>
    )
}
import React, {useEffect, useState} from 'react'
import axios from 'axios';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';

export default function HomePape() {
    const [ingredient, setIngredient] = useState('')
    const [switch1, setSwitch1] = useState(false)
    useEffect(() => {
        const func =  async () => {
            try {
                const {data} = await axios.get('https://www.thecocktaildb.com/api/json/v1/1/random.php') 
                console.log('data', data)
                setIngredient(data.drinks[0])
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
            {/* {ingredient !== '' ? <h1>{ingredient}</h1> : <div></div>} */}
            {/* <div style={{backgroundImage: `url("https://techgirl.co.za/wp-content/uploads/2015/01/pdid3.jpg")`, width:'250px',height:'250px'}}> */}
            {/* <h1>Mixogolist</h1>/ */}
    {/* <div style={{color:"white"}}>{" "}</div> */}
              <img className="mainPic" 
             src="https://i.ibb.co/0Jhtp3b/Cheers-3.png"/>
             <Card>
             <CardMedia
        // className={classes.media}
        image={ingredient.strDrinkThumb}
        // title={ingredient.strDrink}
        title="kak dela"
      />
        </Card>
            {/* <h3>Drink of the week</h3>
            {ingredient.strDrink}
            <img src={ingredient.strDrinkThumb} /> */}
            {/* </div> */}
        </div>
    )
}
import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {getAllIngredientsThunk,addIngredientThunk} from "../redux/ingredients";
import {withRouter} from 'react-router-dom';
import Card from '@material-ui/core/Card'

  
const Cabinet = (props) => {
    const ingredients = useSelector(state => state.ingredients)
    const dispatch = useDispatch()
    const userName = props.match.params.userName

    const [ingredArr, setObj] = useState([])

    useEffect(()=> {
        dispatch(getAllIngredientsThunk(userName))
    }, [])

    useEffect(() => {
        const getIngredientThumb = (ingred) => {
            const url = `https://www.thecocktaildb.com/images/ingredients/${ingred}-small.png`
            setObj(prev => [...prev, {name: ingred, thumbnail: url}])
        }

        ingredients.forEach( (ingred) => getIngredientThumb(ingred))
    }, [ingredients])

        return (
            <div>
                {console.log(ingredArr)}
            <h1>Welcome to cabinet</h1>
            <p>{
            
            ingredArr.map((ingred) => <div>
                <Card>{ingred.name} <img src={ingred.thumbnail} />
                </Card></div>)
            }</p>
            </div>
        )
}

export default withRouter(Cabinet)
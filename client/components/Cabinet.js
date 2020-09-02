import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {getAllIngredientsThunk,addIngredientThunk, deleteIngredientThunk} from "../redux/ingredients";
import {withRouter, Link} from 'react-router-dom';
import Card from '@material-ui/core/Card'
import Button from '@material-ui/core/Button'
  
const Cabinet = (props) => {
    const ingredients = useSelector(state => state.ingredients)
    const dispatch = useDispatch()
    const userName = props.match.params.userName
    const [ingredArr, setObj] = useState([])
    const [val, setVal] = useState(0)

    const handleClick = (e) => {
        e.preventDefault()
        const idx =Number(e.currentTarget.value)
        console.log('idx', idx)
        
        dispatch(deleteIngredientThunk(userName, ingredients, idx))
    }

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
            <h1>Welcome to cabinet</h1>
            {/* <p>{ 
              ingredArr.map((ingred, idx) => <div>
                <Card>{ingred.name} <img src={ingred.thumbnail} />
                <button variant='primary' type='button' value={`${idx}`} onClick={handleClick}>delete</button>
                {console.log(ingred, ingredArr)}
            </Card></div>)} </p>  */}
            {console.log(ingredArr)}
            <Button ><Link to={`/users/${userName}`}>Add to your Cabinet</Link> </Button>
            { ingredArr.length? 
                
                ingredients.map((ingred, idx) => <div>
                    <Card>
                        {ingred} <img src={`https://www.thecocktaildb.com/images/ingredients/${ingred}-small.png`} />
                    <Button color='primary' variant="contained" type='button' value={`${idx}`} onClick={handleClick}>delete</Button>
                    </Card></div>) : <div>No ingredients yet!  <Link to={`/users/${userName}`}>Add to your Cabinet</Link></div>
            }
            </div>
        )
            }


export default withRouter(Cabinet)
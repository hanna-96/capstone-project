import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {getAllIngredientsThunk,addIngredientThunk, deleteIngredientThunk} from "../redux/ingredients";
import {withRouter, Link} from 'react-router-dom';
import Card from '@material-ui/core/Card'
import Button from '@material-ui/core/Button'
import Container from '@material-ui/core/Container'
  
const Cabinet = (props) => {
    const ingredients = useSelector(state => state.ingredients)
    const dispatch = useDispatch()
    const userName = props.match.params.userName
    const [ingredArr, setObj] = useState([])
    const [val, setVal] = useState(0)
    const [unique, setUnique] = useState([])
    
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
            if(!unique.includes(ingred)) setUnique(prev => [...prev, ingred])
        }
        ingredients.forEach( (ingred) => getIngredientThumb(ingred))
    }, [ingredients])

        return (
            <div id='cabinet-page'>
            <Container fixed>
            <h1>Welcome to cabinet</h1>

            <Button ><Link to={`/users/${userName}`}>Add to your Cabinet</Link> </Button>
            <div id='cabinet-shelf'>

            { ingredients.length? 
                
                ingredients.map((ingred, idx) => 
                <div id='cabinet-item'>
                    <Card color='primary' variant='outlined'>
                        {ingred} <img src={`https://www.thecocktaildb.com/images/ingredients/${ingred}-small.png`} />
                    <Button color='secondary' variant="contained" type='button' size='small' value={`${idx}`} onClick={handleClick}>delete</Button>
                    </Card></div>) : <div>No ingredients yet!  <Link to={`/users/${userName}`}>Add to your Cabinet</Link></div>
            }
            </div>
            </Container>
        </div>
        )
    }


export default withRouter(Cabinet)
import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {getAllIngredientsThunk,addIngredientThunk, deleteIngredientThunk} from "../redux/ingredients";
import {withRouter, Link} from 'react-router-dom';
import Card from '@material-ui/core/Card'
import Button from '@material-ui/core/Button'
import Container from '@material-ui/core/Container'
import CardMedia from '@material-ui/core/CardMedia'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faGlassMartini } from "@fortawesome/free-solid-svg-icons";
const Cabinet = (props) => {
    const ingredients = useSelector(state => state.ingredients)
    const dispatch = useDispatch()
    const userName = props.match.params.userName
    const [ingredArr, setObj] = useState([])
    const [val, setVal] = useState(0)
    
    const handleClick = (e) => {
        e.preventDefault()
        const idx =Number(e.currentTarget.value)
        
        dispatch(deleteIngredientThunk(userName, ingredients, idx))
    }

    useEffect(()=> {
        dispatch(getAllIngredientsThunk(userName))
    }, [userName])


        return (
            <div id='cabinet-page'>
                <Container fluid>
                <div id='cabinet-hearder'>
                    <h1>Welcome to cabinet <FontAwesomeIcon icon={faGlassMartini} /></h1>
                <p>You have {ingredients.length} ingredients in your cabinet right now</p>
                </div>

                <Button variant='contained' color='primary'><Link to={`/scan`}>Scan Receipt</Link> </Button>
                <Button variant='contained' color='primary'><Link to={`/users/${userName}`}>Add Manually</Link> </Button>
            <div id='cabinet-shelf'>


                

            { ingredients.length > 0 ? 
                
                ingredients.map((ingred, idx) => 
                <div id='cabinet-item'>
                    
                    <Card color='primary' variant='outlined'>
                        {ingred} 
                        {/* <img src={`https://www.thecocktaildb.com/images/ingredients/${ingred}-small.png`} /> */}
                        <CardMedia
                            component="img"
                            height="100"
                            width="50"
                            image={`https://www.thecocktaildb.com/images/ingredients/${ingred}-small.png`}
                         />
                                <div id='delete-button'><Button color='secondary' variant="contained" type='button' size='small' value={`${idx}`} onClick={handleClick}>delete</Button></div>
                            </Card>
                        
                    </div>)
                    : <div>No ingredients yet!  <Link to={`/users/${userName}`}>Add to your Cabinet</Link></div>
            }
            </div>
            </Container>
        </div>
        )
    }


export default withRouter(Cabinet)
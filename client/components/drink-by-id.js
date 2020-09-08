import axios from 'axios'
import React, {useEffect, useState, useRef } from 'react'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import { Container } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid'
import { connect } from 'react-redux'
import { addToUserFavorites, removeFromUserFavorites, updateFavorites } from '../redux/user'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder'
import FavoriteIcon from '@material-ui/icons/Favorite'
import IconButton from '@material-ui/core/IconButton'
import Card from '@material-ui/core/Card';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    // maxWidth: 450,
    backgroundColor: theme.palette.background.paper,
  },
}));


const DrinkId = (props) => {
    const id = history.state.state.id
    const classes = useStyles()
    const [drinkDetails, setDrink] = useState({})
    const [details, setDetails] = useState([])
    const [didRun, setDidRun] = useState(false) 

    const results = () => {
      props.history.goBack()
    }
  
    useEffect( () => {
      const getDrinkDetails = async (id)  => {
        try {
          const {data}= await axios.get(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
          const {drinks} = data
          setDrink(drinks[0])
        } catch (error) {
          console.log(error);
        }
  
      }
        getDrinkDetails(id)

    }, [])

    useEffect( () => {
      const getIngAndMeasure = () => {
        const drinkProps = Object.keys(drinkDetails)
        const ingredients = drinkProps.filter((prop) => prop.includes('strIngredient') && drinkDetails[prop] !== null).map((prop) => drinkDetails[prop])
        const measurements = drinkProps.filter((prop) => prop.includes('strMeasure') && drinkDetails[prop] !== null).map((prop) => drinkDetails[prop])

        for (let i = 0; i < ingredients.length ; i++) {
          setDetails(prev => [...prev, {ingreds: ingredients[i], measure: measurements[i]}])
        }

      }
      getIngAndMeasure()
  
    }, [drinkDetails]
    )
///////////////////////////favorites start/////////////////////////////////////
  //custom hook that allows us to save previous props  
  function usePrevious(value) {
    const ref = useRef()
    useEffect(() => { ref.current = value })
    return ref.current
  }
  const prevFavorites = usePrevious(props.user.favorites)

  //updates favorites in DB when prevFavorites does not match current favorites
  useEffect(() => {
    if (prevFavorites && prevFavorites.length !== props.user.favorites.length) {
      updateFavorites(props.user.userName, { favorites: props.user.favorites })
    }
  }, [props])

  //updates favorites on the frontend
  const handleFavorite = () => {
    if (props.user.favorites.includes(drinkDetails.idDrink)) props.removeFavorite(drinkDetails.idDrink)
    else props.addFavorite(drinkDetails.idDrink)
  }

  //changes render of favorite button based on favorite status
  let isFavorite = false
  if (props.user.favorites && props.user.favorites.includes(drinkDetails.idDrink)) isFavorite = true

///////////////////////////favorites end///////////////////////////////////////

    return (
        <div>
          { drinkDetails.strDrink ? 
           
            <div className='drink-page'>

              <Container fluid className={classes.root}>
              <div className='drink-detail'>
                <div>
                <List>
                  <ListItem className='recipe-name' key={drinkDetails.strDrink}><p>{drinkDetails.strDrink}</p></ListItem>
                  <ListItem key={drinkDetails.idDrink}><p>{drinkDetails.strInstruction}</p></ListItem>
                    <Divider />
                    <Grid Container>
                    <Paper>
              
                      <Grid item xs={15} spacing={2}>
                    
                        <div><p><img className='drink-img' src={drinkDetails.strDrinkThumb}/></p>

                    </div>
                    </Grid>
                    <Divider /> 

                    <h2>Receipe</h2>
                    <div className="recipe">
                      <ListItem>{drinkDetails.strInstructions}</ListItem>
                    </div>
                    </Paper>
                    
                    </Grid>
                  </List>
                  </div>
                  <div>
                  <Card>
                    <h2>Ingredients:</h2>
                  {details.map((detail, i)  => (
                  <ListItem key={i}>{detail.ingreds} {detail.measure}</ListItem>))}
                  </Card>
                  </div>
                  {
                    props.user.userName && 
                    <IconButton onClick={handleFavorite} className={isFavorite && 'favorited-btn'}>
                      { isFavorite ? <FavoriteIcon color='secondary' /> : <FavoriteBorderIcon color='primary' /> }
                    </IconButton>
                  }
                  {/* <div id ='favorited'>{isFavorite ? 'favorited!' : 'un-favorited'}</div> */}
                  <Button onClick={results}>Back to results</Button>
                </div>
              </Container> 
            </div>
     : <div></div>}
             
            </div>
            
        
      )
}
// props.user.favorites.includes(drinkDetails.idDrink)
const mapState = state => ({ user: state.user })
const mapDispatch = dispatch => ({
  addFavorite: favorite => dispatch(addToUserFavorites(favorite)),
  removeFavorite: unFavorite => dispatch(removeFromUserFavorites(unFavorite))
})

export default connect(mapState, mapDispatch)(DrinkId)
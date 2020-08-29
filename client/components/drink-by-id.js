import axios from 'axios'
import React, {useEffect, useState} from 'react'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import { Container } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid'


const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
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
  

      if(!didRun) {
        getDrinkDetails(id)
        setDidRun(true)
        
      }
      
    } )

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
  
  
    return (
    
        <div>
            

          { drinkDetails.strDrink ? 
           
            <div className='drink-page'>
              <Container fluid>
              <div className='drink-detail'>
                <List>
                <ListItem><p>{drinkDetails.strDrink}</p></ListItem>
                <ListItem><p>{drinkDetails.strInstruction}</p></ListItem>
                  <Divider />
                  <Grid Container>
                  <Paper>
            
                    <Grid item xs={6} spacing={2}>
                  
                      <div><p><img className='drink-img' src={drinkDetails.strDrinkThumb}/></p>

                  </div>
                  </Grid>

                  
                  <Divider /> 
                  <Grid item xs={6} spacing={2}>

                  <h2>Receipe</h2>
                  <h3>{drinkDetails.strInstructions}</h3>



                  {details.map(detail  => <ListItem>{detail.ingreds} {detail.measure}</ListItem> )}
                    </Grid>
                  </Paper>
                  
                  </Grid>
                  </List>
                  <Button onClick={results}>Back to results</Button>
                </div>
              </Container> 
            </div>
     : <div></div>}
             
            </div>
            
        
      )
    }



export default DrinkId

{/* <ListItem button>
  <ListItemText primary="Inbox" />
</ListItem>
<Divider />
<ListItem button divider>
  <ListItemText primary="Drafts" />
</ListItem>
<ListItem button>
  <ListItemText primary="Trash" />
</ListItem>
<Divider light />
<ListItem button>
  <ListItemText primary="Spam" />
</ListItem>
</List> */}
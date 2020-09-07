
import axios from 'axios'
import React, {useEffect, useState} from 'react'
import {useHistory, Link} from 'react-router-dom'
import DrinkList from './components/drink-list'
import {Route} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {fetchSearches} from "./redux/searches";

const Request = (props) => { 

  const [drinkList, setDrinks] = useState([])
  const dispatch = useDispatch()
  const drinks = useSelector(state => state.drinks)
  

  const [len, setLen] = useState([])
  const {ingreds} = props


  useEffect(()=> {
    dispatch(fetchSearches(drinkList))
}, [drinkList])

  useEffect( () => {

    const getDrinks = async (ing)  => {
      try {
        const {data} =await axios.get(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ing}`)
        const {drinks} = data
        setDrinks(prevDrinks => [...prevDrinks,...drinks])
        setLen(prevLen => [...prevLen, drinks.length ])
      } catch (error) {
        console.log(error);
      }

    }
    ingreds.forEach( async ing => {
      await getDrinks(ing)
    })

}, [ingreds])


  return (


    <div>
      { 
      drinkList.length  ?
      
      <div>
        <h2>{drinkList.length} Results</h2>
        <Link to={{ pathname: '/results', state: {drinkList} }}>Go to results</Link> 
        </div>
 : <div> Bleh...
   </div>} 
        </div>

  )
      }


export default Request

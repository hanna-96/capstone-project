
import axios from 'axios'
import React, {useEffect, useState} from 'react'
import RequestFilter from './request-filter'

const Request = () => { 

  const [drinkList, setDrinks] = useState([])

  const [len, setLen] = useState([])
  const ingreds = ['lime_juice', 'tequila', 'gin', 'vodka']
  const [validInputs, setValidInputs] = useState([])
  const [valid, setValid] = useState(false)

//   useEffect( () => {
//     const reqValidator = async (ing) => {
//         try{
//           console.log('fires')
//             // makes call to API DB .. if there is a drinks object present, set to true otherwise set to false
//             const {data} =await axios.get(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ing}`)
//             if(data.drinks) {
//               setValid(true)

//             } else {
//               setValid(false)
//               let validationObj = {ing, valid}
//               setValidInputs(validationObj)
//             }
//         } catch(err) {
//             console.log(err)
//         }
//         console.log(valid)
        
//     }

//     reqValidator(ingreds)
// })

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
    ingreds.forEach( async ing => await getDrinks(ing))
}, [])


  return (


    <div>
      { 
      drinkList.length && len.length === ingreds.length ?
      <div>
        <p><img src={drinkList[140].strDrinkThumb} /></p>
        <h1>hi</h1>
        <p>Drink of the Day : {drinkList[0].strDrink}</p>
        </div>
 : <div> Loading...
   </div>} 
        </div>

  )
      }


export default Request

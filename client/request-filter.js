import axios from 'axios'
import React, {useEffect, useState} from 'react'
import AllIngredients from './components/AllIngredients'


const RequestFilter = (props) => {
    let {ingred} = props
     ingred = ingred.split(' ').join('_') // Handles ingredients with spaces 
    const [valid, setValid] = useState(false)
    const [validInputs, setValidInputs] = useState(JSON.parse(localStorage.getItem('ingred'))|| [])
    localStorage.setItem('ingred', JSON.stringify([]))
    useEffect( () => {
        const reqValidator = async (ing) => {
            try{
                // makes call to API DB .. if there is a drinks object present, set to true otherwise set to false
                const {data} =await axios.get(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ing}`)
                if(data.drinks) {
                        setValid(true)
                        const prev = localStorage.getItem('ingred')
                        localStorage.setItem('ingred',JSON.stringify([ing]))
                        setValidInputs([prev])


                }
            } catch(err) {
                console.log(err)
            }
            
        }

        reqValidator(ingred)
    })

    
    return (
        
        <div>
    <p>{valid ? `${ingred.split('_').join(' ')} has been added. Click here to view drinks!` : `Sorry could not find ${ingred}`}</p>
    {/* <p>{valid ? <AllIngredients ingred={ingred} />: <div></div>}</p> */}
    {console.log(JSON.parse(localStorage.getItem('ingred')),'just valid')}
    </div>

    )
    
}

export default RequestFilter


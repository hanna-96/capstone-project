import axios from 'axios'
import React, {useEffect, useState} from 'react'


const RequestFilter = (props) => {
    let {ingred} = props
     ingred = ingred.split(' ').join('_')
    const [valid, setValid] = useState(false)
    useEffect( () => {
        const reqValidator = async (ing) => {
            try{
                const {data} =await axios.get(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ing}`)
                if(data.drinks) setValid(true)
                else setValid(false)
            } catch(err) {
                console.log(err)
            }
            
        }

        reqValidator(ingred)
    })

    
    return (
        
        <div>
    <p>{valid ? `${ingred.split('_').join(' ')} has been added. Click here to view drinks!` : `Sorry could not find ${ingred}`}</p>
    {console.log(valid, ingred)}
    </div>

    )
    
}

export default RequestFilter


import axios from 'axios'
import React, {useEffect, useState} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import {Button, Input, FormControl }from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

export const InputForm = () => {
    
    const classes = useStyles();

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(e.target.ing.value)
    }
    const handleClick = (e) =>  {
        e.preventDefault()
        console.log(e);
      }
    return (
    <div className='submission'>
    <form onSubmit={handleSubmit}>
        <FormControl >
          <Input type='text' name='ing' placeholder="Placeholder" />
            
        </FormControl>
        <Button type='submit' value='Submit'>Submit Ingredient</Button>
    </form>
    </div>
    )
}

const RequestFilter = () => {


    let ingred = 'lime_juicedfssd'   

    const [valid, setValid] = useState(false)
    const [test, setTest] = useState('')
    useEffect( () => {
        const reqValidator = async (ing) => {
            try{
                const {data} =await axios.get(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ing}`)
                if(data.drinks) setValid(true)
            } catch(err) {
                console.log(err)
            }
            
        }

        reqValidator(ingred)
    })

    
    return (
        <div>
            <InputForm />
    <p>{valid.toString()}</p>
    </div>

    )
    
}

export default RequestFilter
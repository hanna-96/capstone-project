import React, {useEffect, useState} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import Icon from '@material-ui/core/Icon';
import RequestFilter from './request-filter'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { faPlusCircle} from '@fortawesome/free-solid-svg-icons'



const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));


const InputForm = () => {
    
    const classes = useStyles();
    const [submitted, setSubmitted] = useState(false)
    const [test, setTest] = useState([])
    const [inputs, setInputs] = useState([])
    const [clicked, setClicked] = useState(0)
    const [fields, setFields] = useState([1])

    const handleSubmit = (e) => {
        e.preventDefault()
        setSubmitted(true)
        // setInputs([event.target[clicked].value])

        fields.forEach( (val, idx) => setInputs(prev => [...prev, event.target[idx].value]))

    
    }

    const handleChange = (e) => {
        const event = {[e.target.name]: e.target.value}
        setFields(prev => [...prev, 1])
        // setTest(prev => [...prev, 1])
        // } else {
        //     setInputs(prevInput => [...prevInput])
        // }
        
    }

    const clearInput = () => {
       fields.forEach( (val, idx) => {if(event.target[idx]) event.target[idx].value = ''})
    }


    const addField = () => {
        console.log('clicked')
        setFields(prev => [...prev, 1])
        setClicked(clicked+1)
    }

    return (
    <div className='submission'>
    <form onSubmit={handleSubmit}>
        <FormControl >

        <FontAwesomeIcon icon={faPlusCircle} onClick={addField}/> Add another field

        {/* <Input type='text' name='ing' placeholder="Enter an ingredient"  onChange={handleChange}/> */}

            
      {  

              fields.map( (input, idx) => {
                let ing = `ing${idx}`

               return (<Input type='text' name={ing} placeholder="Enter an ingredient" id={idx}/>)
              }
          )}
        

          <Button type='submit' value='Submit'>Submit Ingredient</Button>
          
        </FormControl>

    {submitted? inputs.map((input) => <RequestFilter ingred={input} />): <div></div>}
       {submitted ? clearInput() : <div></div>}
    </form> 
    </div>
    )
}

export default InputForm
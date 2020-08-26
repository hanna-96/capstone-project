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

    const [inputs, setInputs] = useState([])
    const [clicked, setClicked] = useState(0)
    const [fields, setFields] = useState(1)

    const handleSubmit = (e) => {
        e.preventDefault()
        // const ing1 = e.target.ing1.value
        setSubmitted(true)
        // setInputs([e.target.ing1.value])
        // console.log(e.target, e.target.value)
        // e.target.ing2.value = ''
    }

    const handleChange = (e) => {
        e.preventDefault()
        setInputs(prevInput => [...prevInput,e.target.value])
        console.log(e, e.target.value)
    }



    const addField = () => {
        console.log('clicked')
        setFields(fields + 1)
        console.log(fields, clicked)
        setClicked(clicked+1)
    }

    return (
    <div className='submission'>
    <form onSubmit={handleSubmit}>
        <FormControl >

        <FontAwesomeIcon icon={faPlusCircle} onClick={addField}/> Add another field

        <Input type='text' name='ing' placeholder="Enter an ingredient"  onChange={handleChange}/>

            
      {  clicked > 0  && fields > clicked ?

              inputs.map( (input, idx) => {
                let ing = `ing${idx}`

               return (<Input type='text' name='ing2' placeholder="Enter an ingredient"  onChange={handleChange}/>)
              }
          ) : <div></div> }
        

          <Button type='submit' value='Submit'>Submit Ingredient</Button>
          
        </FormControl>

    {submitted? inputs.map((input) => <RequestFilter ingred={input} />): <div></div>}
       {console.log(inputs)}
    </form> 
    </div>
    )
}

export default InputForm
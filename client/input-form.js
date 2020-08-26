import React, {useEffect, useState} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import RequestFilter from './request-filter'


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
    const [input, setInput] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(e.target.ing.value)
        const ing = e.target.ing.value
        setSubmitted(true)
        setInput(ing)
        e.target.ing.value = ''
    }
    return (
    <div className='submission'>
    <form onSubmit={handleSubmit}>
        <FormControl >
          <Input type='text' name='ing' placeholder="Placeholder" />
          <Button type='submit' value='Submit'>Submit Ingredient</Button>
          
        </FormControl>
        {submitted? <RequestFilter ingred={input} />: <div></div>}

       
    </form> 
    </div>
    )
}

export default InputForm
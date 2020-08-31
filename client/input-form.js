import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import RequestFilter from "./request-filter";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
}));

const InputForm = () => {
    const classes = useStyles();
    const [submitted, setSubmitted] = useState(false)
    const [inputs, setInputs] = useState([])
    const [clicked, setClicked] = useState(0)
    const [fields, setFields] = useState([1])

    const handleSubmit = (e) => { // when user submits, set submitted status to be true and set input to be the value of the event
        e.preventDefault()
        setSubmitted(true)

        fields.forEach( (val, idx) => setInputs(prev => [...prev, event.target[idx].value]))
        setFields([1])
    }

    const clearInput = () => { // clear input once the submit event occurs
       fields.forEach( (val, idx) => {if(event.target[idx]) event.target[idx].value = ''})
    }


    const addField = () => { 
        // adds a field with each click on the plus icon
        //Each click increases length of the field array and the number of clicks
        console.log('clicked')
        setFields(prev => [...prev, 1])
        setClicked(clicked+1)
    }

    return (
    <div className='submission'>
    <form onSubmit={handleSubmit}>
        <FormControl >
            <FontAwesomeIcon icon={faPlusCircle} onClick={addField}/> Add another field

            
      {  
        // Renders fields based on the current length of the `fields` array
              fields.map( (input, idx) => {
                let ing = `ing${idx}`

               return (<Input type='text' name={ing} placeholder="Enter an ingredient" id={idx}/>)
              }
          )}
        

          <Button type='submit' value='Submit'>Submit Ingredient</Button>
          
        </FormControl>
              {console.log(inputs, 'the inputs')}
            {submitted? <RequestFilter ingreds={inputs} inputLen={inputs.length} />: <div></div>} 
       {submitted ? clearInput(): <div></div>}
    </form> 
    </div>
  );
};

export default InputForm;

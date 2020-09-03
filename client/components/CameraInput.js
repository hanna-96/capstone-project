import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import { makeStyles } from '@material-ui/core/styles'
import CircularProgress from '@material-ui/core/CircularProgress'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import PhotoCamera from '@material-ui/icons/PhotoCamera'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever'
import CloudUploadIcon from '@material-ui/icons/CloudUpload'
import { Link } from 'react-router-dom'
import RequestFilter from '../request-filter'
import InputForm from '../input-form'
import { readReceipt } from '../util/fruits'
// import readReceipt from '../../readReceipt'

const useStyles = makeStyles((theme) => ({
  root: {
    '& > * + *': {
      marginLeft: theme.spacing(1),
    },
  },
  input: {
    display: 'none',
  },
  scrollBar: {
    '&::-webkit-scrollbar': {
      width: '0.4em'
    },
    '&::-webkit-scrollbar-track': {
      '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.00)'
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: 'rgba(0,0,0,.3)',
      outline: '1px solid slategrey'
    }
  }
}));

const CameraInput = props => {
  const [loading, setLoading] = useState(false)
  const [hasScanned, setScanStatus] = useState(false)
  const [error, setError] = useState(false)
  const [submitted, setSubmitStatus] = useState(false)
  const [text, setText] = useState([])

  useEffect(() => {
    if (!props.user.userName) props.history.push('/login')
  }, [props.user])

  //useStyles() is material ui
  const classes = useStyles()
  const handleInput = evt => {
    setLoading(true)
    setSubmitStatus(false)
    const read = async () => {
      try {
        // lines 74-80 are for fetching real data from vision api
        // file is our uploaded image, in a File object
        // const file = evt.target.files[0]
        // const formData = new FormData()
        // //append the File to formData so it can be sent to the server
        // formData.append('img', file)
        // const { data } = await axios.post(`/gvision`, formData)
        // const receipt = readReceipt(data)

        //fake data for testing so we don't use up loads of api calls
        let receipt = [
          'apples',
          'avocado',
          'white rum',
          'lime',
          'orange liqueur',
          'cake',
          'lemon',
          'whiskey',
          'ice cream',
          'bacon',
          'chocolate'
        ]
        setLoading(false)
        setScanStatus(true)
        //if data comes back empty, throws an error without setting text in state
        if (!receipt) throw new Error('Could not read text')
        //set the transcribed text
        setText(receipt)
      } catch (e) {
        //set error state so that an error message is displayed to user
        setError(true)
        console.error(e)
      }
    }
    read()
  }

  const handleRemove = word => {
    setText(text.filter(w => w !== word))
  }

  //can currently only accept one file at a time
  return (
    <div id='file-input-container-all'>
      { loading ? <CircularProgress id='loading-circle' /> :
      <div id='file-input'>
        { error ? <h2>Could not read text</h2> : ''}
        <ul id='input-text-list' className={classes.scrollBar}>
          { text && text.map(word =>
          <li className='scanned-item'>
            <span>{word}</span>
            <IconButton aria-label="delete">
              <DeleteForeverIcon onClick={() => handleRemove(word)} size="small" />
            </IconButton>
          </li>
          ) }
        </ul>
        <div className={classes.root} id='file-input-buttons'>
          <input
            accept="image/*"
            className={classes.input}
            id="contained-button-file"
            type="file"
            onInput={handleInput}
          />
          <label htmlFor="contained-button-file">
            <Button variant="contained" className='scan-btn' color="primary" component="span" size="large" startIcon={<CloudUploadIcon />}>
              { hasScanned ? 'Scan Again' : 'Scan Receipt' }
            </Button>
          </label>
          {/* <input accept="image/*" className={classes.input} id="icon-button-file" type="file" capture="camera" onInput={handleInput} />
          <label htmlFor="icon-button-file">
            <IconButton color="primary" aria-label="upload picture" component="span">
              <PhotoCamera />
            </IconButton>
          </label> */}
        </div>
        {
        submitted ? <RequestFilter ingreds={text} /> :
        <div id='after-scan-buttons'>
          { hasScanned && 
            <div id='add-to-cabinet-btn'>
              { !error && <Button variant="outlined" color="secondary" size='small' onClick={() => setSubmitStatus(true)}>Get Recipes!</Button> }
            </div>
          }
          <Link to={`users/${props.user.userName}`}>
            <Button variant="outlined" color="secondary" size='small'>Add Items with Text Input</Button>
          </Link>
        </div>
        }
      </div>
      }
    </div>
  )
}

const mapState = state => ({
  user: state.user
})

export default connect(mapState)(CameraInput)
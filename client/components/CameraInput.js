import React, {useState, useEffect} from 'react'
import axios from 'axios'
import Button from '@material-ui/core/Button'
if (process.env.NODE_ENV === 'dev') require('../../vision-secrets')

const CameraInput = () => {
  const [text, setText] = useState('')

  const onSubmit = evt => {
    evt.preventDefault()
    let base64 = ''
    const read = async img => {
      const { data } = await axios.post(`${process.env.VISION_ENDPOINT}${process.env.VISION_KEY}`, {
        "requests": [
          {
            "image": {
              "content": img
            },
            "features": [
              {
                "type": "TEXT_DETECTION",
                "maxResults": 1
              }
            ]
          }
        ]
      })
      setText(data.responses[0].fullTextAnnotation.text)
    }
    const file = evt.target.files[0]
    const reader = new FileReader()

    reader.onload = function(e) {
      base64 = e.target.result.slice(23, -1)
      read(base64)
    }

    if (file) {
      reader.readAsDataURL(file)
    }
  }

  return (
    <div>
      <form>
        <input type="file" accept="image/*" capture="camera" onInput={onSubmit} />
        <Button type='submit'>upload</Button>
      </form>
      <p>{text || 'nothing yet'}</p>
    </div>
  )
}

export default CameraInput
import React, {useState, useEffect} from 'react'
import axios from 'axios'
// import readReceipt from '../../readReceipt'

const blacklisted = {
  total: true,
  subtotal: true,
  supermarket: true,
  market: true,
  ctown: true
}

const readReceipt = receipt => {
  const isAWord = w => {
    if (w in blacklisted) return false
    return w ? w.length > 2 : false
  }
  receipt = receipt.map(word => {
    return word.replace(/[^a-zA-Z]+/, '')
  })
  return receipt.filter(isAWord)
}

const CameraInput = () => {
  const [text, setText] = useState([])
  const [hasScanned, setScanStatus] = useState(false)

  const handleInput = evt => {
    try {
      const read = async () => {
        //file is our uploaded image, in a File object
        const file = evt.target.files[0]
        const formData = new FormData()
        //we addend the File to formData so it can be sent to the server
        formData.append('img', file)
        const { data } = await axios.post(`/gvision`, formData)
        const receipt = readReceipt(data)
        setScanStatus(true)
        setText(receipt)
      }
      read()
    } catch (e) { console.error(e) }
  }

  const handleRemove = word => {
    const t = text
    setText(t.filter(w => w !== word))
  }

  return (
    <div>
      <form action='/gvision' method='POST' onInput={handleInput}>
        <input type='file' accept='image/*' />
      </form>
      <ul>
        {text.length ? text.map(word =>
          <li>
            <div>
            {word}
            <button type='button' onClick={() => handleRemove(word)}>&times;</button>
            </div>
          </li>
          ) : <li>nothing yet</li>}
      </ul>
      {hasScanned && <button type='submit'>All set?</button>}
    </div>
  )
}

export default CameraInput
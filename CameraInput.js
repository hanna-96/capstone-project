import React from 'react'

const CameraInput = () => {
  return (
    <div>
      <input type="file" accept="image/*" capture="camera" />
    </div>
  )
}

export default CameraInput
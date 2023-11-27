import React, { useState } from 'react'

const UpdateOrDeleteModal = () => {
  const [actionType, setActionType] = useState('')
  return (
    <div
      className="absolute flex flex-col items-center justify-center overflow-hidden right-0 top-0 opacity-80 w-screen h-screen bg-white "
      //   onClick={() => setShowModal(false)}
    >
      <div
        className=" relative border-2 border-white w-1/2 h-1/2 flex flex-col items-center justify-around rounded-md bg-blue-600 text-white"
        // onClick={(e) => e.stopPropagation()}
      >
        <button onClick={() => setActionType('delete')}>Delete</button>
        <button onClick={() => setActionType('update')}>Update</button>
      </div>
    </div>
  )
}

export default UpdateOrDeleteModal

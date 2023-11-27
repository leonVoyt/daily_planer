import React, { useState } from 'react'
import CreateMtlyPostModal from '../modals/CreateMtlyPostModal'

const Settings = () => {
  const [showModal, setShowModal] = useState(false)

  return (
    <section className="Page-books flex w-screen items-start justify-center pt-14 bg-pink-100 min-h-screen">
      <div className="mt-10 flex flex-col items-center">
        <h1 className="text-5xl font-bold mb-8 text-green-600">
          Create your monthly post !
        </h1>
        <button
          onClick={() => setShowModal(!showModal)}
          className="bg-green-600 py-1.5 px-3 rounded-3xl hover:bg-green-400 mt-5 text-white"
        >
          {' '}
          Create Monthly Post
        </button>
      </div>

      {showModal && <CreateMtlyPostModal setShowModal={setShowModal} />}
    </section>
  )
}

export default Settings

export const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

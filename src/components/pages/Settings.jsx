import React, { useState } from 'react'
import CreateMtlyPostModal from '../modals/CreateMtlyPostModal'

const Settings = () => {
  const [showModal, setShowModal] = useState(false)

  return (
    <section className="Page-books flex w-screen items-center justify-center pt-14">
      <div className="mt-10 flex flex-col items-center">
        <h1 className="text-3xl text-blue-600">
          Create or update your monthly post
        </h1>
        <button onClick={() => setShowModal(!showModal)} className="">
          {' '}
          click
        </button>
      </div>

      {showModal && <CreateMtlyPostModal setShowModal={setShowModal} />}
    </section>
  )
}

export default Settings

export const expensesOptions = [
  {
    id: 0,
    name: '--Select--',
  },
  {
    id: 1,
    name: 'Rent',
  },
  {
    id: 2,
    name: 'Food',
  },
  {
    id: 3,
    name: 'Entertainment',
  },
  {
    id: 4,
    name: 'Transport',
  },
  {
    id: 5,
    name: 'Other',
  },
]
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

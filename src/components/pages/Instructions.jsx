import React from 'react'

const Instructions = () => {
  return (
    <section className="w-screen flex min-h-screen pt-14 overflow-y-hidden ">
      <div className="w-3/5 flex items-center justify-start flex-col text-gray-600 bg-pink-100 rounded-lg">
        <h1 className="text-4xl font-bold mb-8 ">Instructions</h1>
        <div className="mx-8">
          <h2 className="text-2xl font-semibold mb-6">
            Welcome to the Budget Calculator App!
          </h2>
          <ul className="list-decimal">
            <li className="mb-4">
              <span className="font-bold">1. Authorization Page:</span> Visit
              the app and go to the "Authorization" page. Use the following
              credentials:
              <ul className="list-disc ml-6 mt-2">
                <li>Login: testLogin22</li>
                <li>Password: s#dDA23@44#Ds</li>
              </ul>
              Click the login button to access the app.
            </li>
            <li className="mb-4">
              <span className="font-bold">
                2. Settings and Data Entry Page:
              </span>{' '}
              After logging in, navigate to the "Settings" page. Enter data for
              the reporting month:
              <ul className="list-disc ml-6 mt-2">
                <li>Input how much you earned.</li>
                <li>
                  Enter expenses, which can be divided into different
                  categories. Submit the form to save your financial data.
                </li>
              </ul>
            </li>
            <li className="mb-4">
              <span className="font-bold">3. Statistics Page:</span> Head to the
              "Statistics" page to view your financial information.
              <ul className="list-disc ml-6 mt-2">
                <li>
                  <span className="font-semibold">Current Savings:</span> Check
                  your current savings in UAH, USD, and EUR.
                </li>
                <li>
                  <span className="font-semibold">
                    Monthly Statistics Table:
                  </span>{' '}
                  View a table with columns for the month number, month, profit,
                  expenses, accumulation in hryvnia, and accumulation in foreign
                  currency.
                </li>
                <li>
                  <span className="font-semibold">Manage Data:</span> Update or
                  delete data for a specific reporting month. Add information
                  for a month where data is missing.
                </li>
              </ul>
            </li>
            <li className="mb-4">
              <span className="font-bold">4. Instruction Page:</span> Explore
              the "Instructions" page for detailed guidance on using the
              application. Learn more about the app and find information on the
              technologies used.
            </li>
            <li className="mb-4">
              <span className="font-bold">5. About Page:</span> Visit the
              "About" page to learn about the developer's background,
              experience, and skills. Find links to the developer's portfolio or
              previous works.
            </li>
          </ul>
        </div>
      </div>

      <div className="w-2/5 flex items-center justify-start flex-col text-gray-600 rounded-lg bg-green-100">
        <h1 className="text-3xl font-bold mb-6 ">Technology</h1>
        <div className="text-lg ">
          <ul className="list-disc pl-5 mb-4">
            <li>React</li>
            <li>Mobx-state-tree</li>
            <li>Tailwind CSS</li>
            <li>tanstack/react-table</li>
            <li>Axios</li>
            <li>react-router-dom</li>
          </ul>
        </div>
      </div>
    </section>
  )
}

export default Instructions

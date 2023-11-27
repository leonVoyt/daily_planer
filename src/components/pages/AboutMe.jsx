import React from 'react'

const AboutMe = () => {
  return (
    <section className="bg-pink-100">
      <div className="pt-14 min-h-screen max-w-2xl mx-auto p-8 bg-green-100 rounded-lg flex flex-col justify-around text-gray-600">
        <h1 className="text-3xl font-bold mb-6 00">
          Hello, I'm a Web Developer!
        </h1>
        <p className="text-lg text-gray-800">
          With over 2 years of commercial experience, I specialize in:
        </p>
        <ul className="list-disc pl-8 text-gray-800 mt-4">
          <li>JavaScript (JS)</li>
          <li>Less & SCSS </li>
          <li>Tailwind</li>
          <li>TypeScript</li>
          <li>Next.js</li>
          <li>React </li>
          <li>Mobx & Redux & Redux Toolkit</li>

          <li>Rest & GraphQL</li>
          <li>Webpack</li>
          <li>Node.js </li>
          <li>Prisma & TRPC </li>
          <li>Sequelize & Express</li>
          <li>NoSQL & SQL</li>
          <li>Nest</li>
          <li>basic understanding in React Native</li>
        </ul>
        <p className="text-lg text-gray-800 mt-4">
          I follow the SOLID methodology and have a tendency to quickly learn
          new technologies.
        </p>
        <div className="mt-6">
          <a
            href="https://portfolio-next-slpd.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            Visit my portfolio
          </a>
        </div>
      </div>
    </section>
  )
}

export default AboutMe

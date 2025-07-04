import React from 'react'
import TeamCarousel from './Carousel'

const About = () => {
  return (
    <div className='container  '>
      <div className='mt-32'>
    
        <div className="flex flex-col md:flex-row items-center gap-6 p-6 bg-white rounded-xl shadow-md">
            <img 
              src="./about.png" 
              alt="About Us" 
              className="w-[400px] flex-1  h-[400px] rounded-lg " 
            />
            
            <div className="text-gray-700 flex-1 text-base leading-relaxed md:w-1/2">
              <h2 className="text-2xl font-semibold mb-4">About Our Project</h2>
              <p>
                We are fourth-year Computer Science students at Unity University. For our final year project, 
                we have developed a Facial Recognition System designed specifically to support legal enforcement 
                operations. This system aims to assist authorities in identifying individuals efficiently 
                and enhancing public safety through technology.
              </p>
            </div>
</div>

<TeamCarousel />

<div className="p-8 bg-white rounded-3xl shadow-xl max-w-6xl mx-auto">
  <h1 className="text-4xl font-bold flex items-center justify-center gap-4 mb-10 text-gray-800">
    Our Objective
    <img src="./goal.png" alt="Goal" className="w-10 h-10" />
  </h1>

  <div className="flex flex-col md:flex-row gap-10">
    <div className="flex-1 bg-gray-50 rounded-2xl p-6 shadow-sm hover:shadow-md transition duration-300">
      <div className="flex items-center gap-3 mb-4">
        <img src="./pin.png" alt="General" className="w-8 h-8" />
        <h2 className="text-xl font-semibold text-gray-700">General Objective</h2>
      </div>
      <p className="text-gray-600 text-justify leading-relaxed">
        The primary objective of this project is to develop and implement a criminal face detection system 
        that utilizes advanced facial recognition technology, enabling law enforcement agencies to 
        accurately and efficiently identify and track criminals.
      </p>
    </div>
    <div className="flex-1 bg-gray-50 rounded-2xl p-6 shadow-sm hover:shadow-md transition duration-300">
      <div className="flex items-center gap-3 mb-4">
        <img src="./pin.png" alt="Specific" className="w-8 h-8" />
        <h2 className="text-xl font-semibold text-gray-700">Specific Objective</h2>
      </div>
      <p className="text-gray-600 text-justify leading-relaxed">
       This project aims to create a real-time face detection system using the Haar Cascade classifier
        to identify criminals and alert law enforcement. It includes an admin dashboard for authorized
         personnel to add criminal photos and details (like names and records) to a database. The system
          will store and manage this data efficiently while processing images and videos in real-time with high accuracy.
      </p>
    </div>
  </div>
</div>
        </div>
    </div>
  )
}

export default About


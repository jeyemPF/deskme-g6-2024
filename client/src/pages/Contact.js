import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Contactform from '../components/Contactform'

function Contact() {

  return (
    <div className='bg-neutral-50 dark:bg-neutral-900'>
    
      <div className=''>
     
          <Navbar/>

          <div className='mt-16 mb-10'>
            <Contactform />
          </div>
          
          <Footer/>
          </div>
    </div>
  )
}

export default Contact
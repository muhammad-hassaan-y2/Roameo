import React from 'react'

import Img from './Image'
import Account from './Account'
const Hero = () => {
    return (
        <div className="flex flex-col lg:flex-row min-h-screen">
          {/* Image section */}
            <Img />
    
          {/* Account creation section  */}
          <div className="w-full lg:w-2/5 bg-gray-100 flex items-center justify-center p-6 lg:p-12">
            <Account />
          </div>
        </div>
  )
}

export default Hero




import React from 'react'
import Link from "next/link"
import { Button } from "@/components/ui/button"

const Img = () => {
  return (
    <div className="w-full lg:w-3/5 h-64 lg:h-screen relative border border-black">
      {/* Video element replacing Image */}
      <video
        className="object-cover w-full h-full"
        autoPlay
        muted
        loop
      >
        <source src="/hero.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Overlay content */}
      <div className="absolute inset-0 flex items-center mx-15">
        <h2 className="text-3xl lg:text-6xl font-bold text-white text-center px-4">
          Join <span className="text-[#2FFD74] italic font-mono">Roamio</span> and<br /> 
          turn travel plans<br /> into reality.
        </h2>
      </div>

      {/* Learn More button at the bottom-right */}
      <div className="absolute bottom-0 right-5 mb-6 ml-6">
        <Button variant="outline"
         className="text-white bg-transparent border border-[#12321D]
          rounded-2xl px-6 py-2">
          Learn More
        </Button>
      </div>
    </div>
  )
}

export default Img

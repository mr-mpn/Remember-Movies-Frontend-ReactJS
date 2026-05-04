import React from 'react'

import t1 from '../../../assets/t1.jpg'
import t2 from '../../../assets/t2.jpg'
import t3 from '../../../assets/t3.jpg'
import t4 from '../../../assets/t4.jpg'
import t5 from '../../../assets/t5.jpg'

const images = [t1, t2, t3, t4, t5]

// Duplicate for seamless infinite loop
const items = [...images, ...images]

const TestimonialMarquee = () => {
  return (
    <section className="w-full py-16 bg-gray-950 overflow-hidden">
      <p className="text-center text-yellow-400 uppercase tracking-widest text-sm font-semibold mb-10">
        Newly released movies
      </p>

      <div className="relative flex">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 h-full w-24 bg-gradient-to-r from-gray-950 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 h-full w-24 bg-gradient-to-l from-gray-950 to-transparent z-10 pointer-events-none" />

        {/* Scrolling track */}
        <div className="flex gap-6 animate-marquee">
          {items.map((src, i) => (
            <img
              key={i}
              src={src}
              alt={`feature-${i}`}
              className="h-64 w-auto rounded-2xl object-cover flex-shrink-0 border border-gray-800"
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default TestimonialMarquee

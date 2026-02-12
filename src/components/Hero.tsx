import React from 'react'

export default function Hero(){
  return (
    <section className="w-full relative bg-transparent">
      <div className="relative bg-[var(--bg)] py-14 md:py-20">
        <img src="/floral-corner-top-right.png" alt="" className="pointer-events-none absolute top-0 right-0 opacity-40 w-40 h-40" />
        <img src="/floral-corner-bottom-left.png" alt="" className="pointer-events-none absolute bottom-0 left-0 opacity-40 w-40 h-40" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <img src="/hummingbird.png" alt="hummingbird" className="w-10 h-10 mx-auto mb-4 opacity-80" />
            <h1 className="text-3xl md:text-5xl font-semibold leading-tight tracking-tight text-gray-900">
              Between humans and algorithms,
            </h1>
            <h1 className="text-3xl md:text-5xl font-semibold leading-tight tracking-tight text-gray-900">
              I choose to build what truly matters.
            </h1>

            <p className="mt-4 text-base md:text-xl muted-foreground max-w-3xl mx-auto">
              Products that understand people
              <br />and services that make them feel better.
            </p>

            <div className="mt-6 w-full md:w-1/2 mx-auto">
              <div className="stationery-sep mx-auto" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

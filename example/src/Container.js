import React from 'react'

const Container = ({ children }) => (
    <div className="flex flex-col w-full h-full bg-gray-200 px-3 md:px-0 py-12 items-center">
        {children}
    </div>
)

export default Container

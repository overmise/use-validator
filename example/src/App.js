import React from 'react'
import { useMyHook } from '@overmise/use-validator'

const App = () => {
  const example = useMyHook()
  return (
    <div>
      {example}
    </div>
  )
}
export default App
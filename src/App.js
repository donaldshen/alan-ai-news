import React, { useEffect } from 'react'
import alanBtn from '@alan-ai/alan-sdk-web'

const alanKey =
  '5d17c14f3e006785659345c9ea4ac0592e956eca572e1d8b807a3e2338fdd0dc/stage'

const App = () => {
  useEffect(() => {
    alanBtn({
      key: alanKey,
      onCommand: ({ command }) => {
        if (command === 'testCommand') {
          alert('fuck')
        }
      },
    })
  }, [])

  return (
    <div>
      <h1>Alan AI News</h1>
    </div>
  )
}

export default App

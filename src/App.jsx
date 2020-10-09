import React, { useEffect, useState } from 'react'
import alanBtn from '@alan-ai/alan-sdk-web'
import NewsCards from './components/NewsCards.jsx'

const alanKey =
  '5d17c14f3e006785659345c9ea4ac0592e956eca572e1d8b807a3e2338fdd0dc/stage'

const App = () => {
  const [newsArticles, setNewsArticles] = useState([{title: 'fuck'}])

  useEffect(() => {
    alanBtn({
      key: alanKey,
      onCommand: ({ command, articles }) => {
        switch (command) {
          case 'testCommand':
            alert('testCommand')
            break
          case 'newHeadlines':
            setNewsArticles(articles)
            break
          default:
            alert('fuck')
            break
        }
      },
    })
  }, [])

  return (
    <div>
      <h1>Alan AI News</h1>
      <NewsCards articles={newsArticles} />
    </div>
  )
}

export default App

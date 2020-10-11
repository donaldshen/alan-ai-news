import React, { useEffect, useState } from 'react'
import alanBtn from '@alan-ai/alan-sdk-web'
import NewsCards from './components/NewsCards.jsx'
import { makeStyles } from '@material-ui/core/styles'
import wordsToNumbers from 'words-to-numbers'

const useStyles = makeStyles((theme) => ({
  footer: {
    textAlign: 'center',
    position: 'fixed',
    left: 0,
    bottom: 0,
    color: 'black',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '120px',
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  link: {
    textDecoration: 'none',
    color: 'rgba(21, 101, 192)',
  },
  image: {
    marginLeft: 20,
  },
  card: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '50%',
    padding: '3%',
    borderRadius: 10,
    color: 'white',
    backgroundColor: 'rgba(21, 101, 192)',
    margin: '0 12px',
    textAlign: 'center',
    height: '25vmin',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column-reverse',
      textAlign: 'center',
      width: '100%',
      height: 'initial',
      '&:nth-of-type(1)': {
        marginBottom: '12px',
      },
    },
  },
  infoContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
  },
  logoContainer: {
    padding: '0 5%',
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column-reverse',
      textAlign: 'center',
    },
  },
  alanLogo: {
    height: '27vmin',
    borderRadius: '15%',
    padding: '0 5%',
    margin: '3% 0',
    [theme.breakpoints.down('sm')]: {
      height: '35vmin',
    },
  },
}))

const alanKey =
  '5d17c14f3e006785659345c9ea4ac0592e956eca572e1d8b807a3e2338fdd0dc/stage'

const App = () => {
  const [newsArticles, setNewsArticles] = useState([])
  const classes = useStyles()
  const [activeArticle, setActiveArticle] = useState(-1)

  useEffect(() => {
    alanBtn({
      key: alanKey,
      onCommand: ({ command, articles, n }) => {
        switch (command) {
          case 'testCommand':
            alert('testCommand')
            break
          case 'newHeadlines':
            setNewsArticles(articles)
            setActiveArticle(-1)
            break
          case 'highlight':
            setActiveArticle((prevArticle) => prevArticle + 1)
            break
          case 'open': {
            const parsedNumber = n.length > 2 ? wordsToNumbers(n, {fuzzy: true}) : n
            console.log(n, parsedNumber)
            if (parsedNumber > 20) {
              alanBtn().playText('Please try that again')
              return
            }
            setActiveArticle(parsedNumber - 1)
            window.open(articles[parsedNumber - 1]?.url, '_blank')
            alanBtn().playText('Opening...')
            break
          }
          default:
            // alert('fuck')
            break
        }
      },
    })
  }, [])

  return (
    <div>
      <div className={classes.logoContainer}>
        <img
          src="https://alan.app/voice/images/previews/preview.jpg"
          className={classes.alanLogo}
          alt=''
        />
      </div>
      <NewsCards articles={newsArticles} activeArticle={activeArticle} />
    </div>
  )
}

export default App

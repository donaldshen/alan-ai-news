import React, { createRef, useEffect, useState } from 'react'
import {
  Card,
  CardActions,
  CardActionArea,
  CardContent,
  CardMedia,
  Button,
  Typography,
} from '@material-ui/core'
import classNames from 'classnames'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
  media: {
    height: 250,
  },
  border: {
    border: 'solid',
  },
  fullHeightCard: {
    height: '100%',
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    borderBottom: '10px solid white',
  },
  activeCard: {
    borderBottom: '10px solid #22289a',
  },
  grid: {
    display: 'flex',
  },
  details: {
    display: 'flex',
    justifyContent: 'space-between',
    margin: '20px',
  },
  title: {
    padding: '0 16px',
  },
  cardActions: {
    padding: '0 16px 8px 16px',
    display: 'flex',
    justifyContent: 'space-between',
  },
})

export default function NewsCard({
  description,
  publishedAt,
  source,
  title,
  url,
  urlToImage,
  activeArticle,
  i,
}) {
  const classes = useStyles()
  // TODO: 一个 ref 不就行了？
  const [elRefs, setElRefs] = useState([])
  const scrollToRef = (ref) => window.scroll(0, ref.current.offsetTop - 50)

  useEffect(() => {
    setElRefs((refs) =>
      Array(20)
        .fill()
        .map((_, j) => refs[j] || createRef()),
    )
  }, [])

  useEffect(() => {
    if (i === activeArticle && elRefs[i]) {
      scrollToRef(elRefs[i])
    }
  }, [i, activeArticle, elRefs])

  return (
    <Card
      ref={elRefs[i]}
      className={classNames(classes.card, {
        [classes.activeCard]: activeArticle === i,
      })}
    >
      <CardActionArea href={url} target="_blank">
        <CardMedia className={classes.media} image={urlToImage} />
        <div className={classes.details}>
          <Typography variant="body2" color="textSecondary" component="h2">
            {new Date(publishedAt).toDateString()}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="h2">
            {source.name}
          </Typography>
        </div>
        <Typography className={classes.title} gutterBottom variant="h5">
          {title}
        </Typography>
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions className={classes.cardActions}>
        <Button size="small" color="primary">
          Learn More
        </Button>
        <Typography variant="h5" color="textSecondary">
          {i + 1}
        </Typography>
      </CardActions>
    </Card>
  )
}

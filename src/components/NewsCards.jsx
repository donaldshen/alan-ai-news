import React from 'react'
import NewsCard from './NewsCard.jsx'

export default function NewsCards({ articles }) {
  return (
    <div>
      {articles.map((a) => (
        <NewsCard {...a} key={a.title} />
      ))}
    </div>
  )
}

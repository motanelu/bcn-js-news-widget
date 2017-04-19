module.exports = [
  {
    url: /\d+\/categories$/,
    file: 'categories.json',
    status: 200
  },
  {
    url: /\d+\/categories\/1\/news/,
    file: 'financial-news.json',
    status: 200
  },
  {
    url: /\d+\/categories\/2\/news/,
    file: 'sports-news.json',
    status: 200
  }
]

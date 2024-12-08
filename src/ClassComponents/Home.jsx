import React, { Component } from 'react'
import NewsItem from './NewsItem'

export default class Home extends Component {
  constructor() {
    super()
    this.state = {
      articles: [],
      totalResults: 0
    }
  }

  async getAPIData() {
    let response = await fetch(`https://newsapi.org/v2/everything?q=${this.props.q}&language=${this.props.language}&sortBy=publishedAt&apiKey=807d700957354e9794ec9a60f0d7d8bc`)
    response = await response.json()
    this.setState({
      articles: response.articles.filter(x => x.title !== "[Removed]"),
      totalResults: response.totalResults
    })
  }
  componentDidMount() {
    this.getAPIData()
  }
  componentDidUpdate(prevProps) {
    if (this.props !== prevProps)
      this.getAPIData()
  }
  render() {
    return (
      <div className="container-flud">
        <h5 className='background text-light text-center p-2 mt-2'>{this.props.q} Articles</h5>
        <div className="row">
          {
            this.state.articles?.map((item, index) => {
              return <NewsItem
                key={index}
                source={item.source.name ?? "N/A"}
                title={item.title}
                description={item.description}
                url={item.url}
                pic={item.urlToImage??"/images/noimage.png"}
                date={item.publishedAt}
              />
            })
          }
        </div>
      </div>
    )
  }
}

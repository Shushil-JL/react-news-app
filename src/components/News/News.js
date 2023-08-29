import React, { Component } from 'react'
import NewsItem from '../NewsItem/NewsItem'
import Loader from '../Loader/Loader'
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component';

export class News extends Component {
    static defaultProps = {
        country: 'in',
        pageSize: 6,
        category: 'general',
        totalResults: 0

    }
    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string,
    }


    constructor(props) {
        super(props)
        this.state = {
            articles: [],
            loading: false,
            page: 1
        }
        document.title = "Daily News-" + this.funCatpitalize(this.props.category)
    }
    funCatpitalize = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1)
    }
    async updateNews() {
        try {
            let url = `https://newsapi.org/v2/top-headlines?country=us&page=${this.page}&pageSize=${this.props.pageSize}&category=${this.props.category}&apiKey=53a40310785242acb252f9b2a6de64fa`
            this.setState({
                loading: true
            })
            let data = await fetch(url)
            let parsedData = await data.json()
            console.log(parsedData)
            this.setState({
                articles: this.state.articles.concat(parsedData.articles),
                totalResults: parsedData.totalResults,
                loading: false
            })
        } catch (error) {
            console.log(error.message)

        }

    }
    async componentDidMount() {
        this.updateNews()
    }
    handlePrev = async () => {
        this.setState({
            page: this.state.page - 1
        })
        this.updateNews()

    }
    haldleNext = async () => {
        this.setState({
            page: this.state.page + 1
        })
        this.updateNews()

    }
    fetchMoreData = () => {
        this.setState({
            page: this.state.page + 1,
        });
        this.updateNews()
    }

    render() {
        return (
            <>
                <h1 className='text-center'>Dnews - Top {this.funCatpitalize(this.props.category)} Headilines</h1>
                {/* <h2 className='text-center'>{this.props.category.toUpperCase()}</h2> */}
                {/* {this.state.loading ? <Loader /> : */}
                <InfiniteScroll
                    dataLength={this.state.items.length}
                    next={this.fetchMoreData}
                    style={{ display: 'flex', flexDirection: 'column-reverse' }} //To put endMessage and loader to the top.
                    inverse={true} //
                    hasMore={this.state.articles.length !== this.state.totalResults}
                    loader={<h4>Loading...</h4>}
                    scrollableTarget="scrollableDiv">

                    <div className='row'>
                        {this.state.articles.length > 0 && this.state.articles.map((item) => {
                            return <div className='col-md-4' key={item.url}>
                                <NewsItem
                                    author={item.author}
                                    date={item.publishedAt}
                                    title={item.title}
                                    description={item.description}
                                    imageUrl={item.urlToImage}
                                    newsUrl={item.url}
                                    source={item.source.name}
                                />

                            </div>
                        })}
                    </div>
                </InfiniteScroll>
                <div className='container d-flex justify-content-between'>
                    <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handlePrev}>&larr; Prev</button>
                    <button disabled={Math.ceil(this.state.totalResults / this.props.pageSize) <= this.state.page} type="button" className="btn btn-dark" onClick={this.haldleNext}>Next &rarr;</button>
                </div>
            </>
        )
    }
}

export default News



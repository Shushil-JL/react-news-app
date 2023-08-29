import React, { useEffect, useState } from 'react'
import NewsItem from '../NewsItem/NewsItem'
import Loader from '../Loader/Loader'
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component';
import Spinner from '../Spinner/Spinner';

const News = (props) => {

    // document.title = "Daily News-" + funCatpitalize(props.category)

    const [articles, setArticles] = useState([])
    const [loading, setLoading] = useState(false)
    const [page, setPage] = useState(1)
    const [totalResults, setTotalResults] = useState(0)


    const funCatpitalize = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1)
    }
    const updateNews = async () => {
        try {

            let url = `https://newsapi.org/v2/top-headlines?country=us&page=${page}&pageSize=${props.pageSize}&category=${props.category}&apiKey=${process.env.REACT_APP_API_KEY}`
            setLoading(true)
            let data = await fetch(url)
            let parsedData = await data.json()
            setArticles(parsedData.articles)
            setTotalResults(parsedData.totalResults)
            setLoading(false)
        } catch (error) {
            console.log(error.message)

        }

    }
    useEffect(() => {
        updateNews()


    }, [])


    const fetchMoreData = async () => {
        let url = `https://newsapi.org/v2/top-headlines?country=us&page=${page + 1}&pageSize=${props.pageSize}&category=${props.category}&apiKey=${process.env.REACT_APP_API_KEY}`
        setPage(page + 1)
        setLoading(true)
        let data = await fetch(url)
        let parsedData = await data.json()
        setArticles(articles.concat(parsedData.articles))
        console.log(articles)
        setTotalResults(parsedData.totalResults)
        setLoading(false)
    }

    return (
        <>
            <h1 className='text-center' style={{ marginTop: '80px' }} >Dnews - Top {funCatpitalize(props.category)} Headilines</h1>
            {/* <h2 className='text-center'>{props.category.toUpperCase()}</h2> */}
            {loading ? <Loader /> :
                <InfiniteScroll
                    dataLength={articles.length}
                    next={fetchMoreData}
                    // style={{ display: 'flex', flexDirection: 'column-reverse' }} //To put endMessage and loader to the top.
                    hasMore={articles.length !== totalResults}
                    scrollableTarget="scrollableDiv"
                    loader={<Spinner />}
                >
                    <div className='row '>
                        {articles.length > 0 && articles.map((item) => {
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
            }
        </>
    )
}
News.defaultProps = {
    country: 'in',
    pageSize: 6,
    category: 'general',
    totalResults: 0

}
News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
}
export default News



import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner'
import PropTypes from 'prop-types';

export default class News extends Component {

    static defaultProps = {
        country : 'us',
        pageSize: 6,
        category: 'general'
    };

    static propTypes = {
        country : PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string
      };

    constructor(){
        super();
        this.state = {
            articles : [],
            loading  : false,
            page     : 1
        }
    }

    async componentDidMount(){

        this.setState({loading:true});
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=0ba4e1911f4e4ca19edf545b111820be&pageSize=${this.props.pageSize}`;
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({articles:parsedData.articles, totalResults:parsedData.totalResults, loading:false});
    }

     handlePrevClick = async () => {

        this.setState({loading:true});
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=0ba4e1911f4e4ca19edf545b111820be&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
        let data = await fetch(url);
        let parsedData = await data.json();

        this.setState  ({
            articles : parsedData.articles,
            page     : this.state.page - 1,
            loading  : false
        });

    }

     handleNextClick = async () => {
    
        if(this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)){

        }else{

            this.setState({loading:true});
            let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=0ba4e1911f4e4ca19edf545b111820be&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
            let data = await fetch(url);
            let parsedData = await data.json();
            this.setState ({
                articles : parsedData.articles,
                page     : this.state.page + 1,
                loading  : false
            });

        }        

    }

  render() {

    return (

      <div className='container my-3'>
            <h1 className='text-center'>News Monkey - Top Headlines</h1>
            {this.state.loading && <Spinner />}
            <div className='row'> 

            {!this.state.loading && this.state.articles.map( (element)=> { 

                 return ( 

                <div className='col-md-4' key={element.url}>

                <NewsItem 
                title={element.title ? element.title.slice(0, 45) : "No title available"} 
                description={element.description ? element.description.slice(0, 88) : "No description available"} 
                imageurl={element.urlToImage ? element.urlToImage : "https://a1.espncdn.com/combiner/i?img=%2Fphoto%2F2024%2F0922%2Fr1390467_1296x729_16%2D9.jpg"} 
                newsUrl={element.url} 
                />

                </div>

                 );
             } )}

            </div>

            <div className='container d-flex justify-content-between'>
            <button disabled={this.state.page <= 1} type="button" className="btn btn-secondary" onClick={this.handlePrevClick}>Previous</button>
            <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className="btn btn-secondary" onClick={this.handleNextClick}>Next</button>
            </div>    

      </div>

    )
  }
}

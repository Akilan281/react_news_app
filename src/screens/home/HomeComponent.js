import React from 'react'
import './styles/home.css'
import { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { homeNewsList, loaderAction } from '../../redux/action/Action';
import NewslistComponent from '../../components/NewslistComponent';
import { fetchGet } from '../../common/ApiCommunicator';
import SearchComponent from '../../components/SearchComponent';


function HomeComponent(props) {

    let listcount = 10;
    const [homelist, setHomelist] = useState([])
    const [errorGetList, setErrorGetList] = useState('')

    useEffect(() => {
        getHeadlines()
    }, [])


    //!  Sending  the  API to the common API Communicator component !//
    function getHeadlines() {
        props.loaderAction(true)
        fetchGet('top-headlines?country=us&apiKey=28a63512b6e74ae9a7584f3be85e96ba', successGetHeadlines, errorGetHeadlines)
    }

    //! To handle the  response coming  for the API !//
    function successGetHeadlines(resp) {
        setHomelist(resp.articles.slice(0, listcount))
        props.homedata(resp.articles)
        setErrorGetList('')
        props.loaderAction(false)
    }

    //! To handle the  error coming  for the API !//
    function errorGetHeadlines(error) {
        setHomelist([])
        setErrorGetList(error.message)
        props.loaderAction(false)
        console.log("error", error.message)
    }

    //! For the search when the input value is coming from the search Component !//
    function setSearchList(data) {
        setHomelist(data)
    }

    //! For the search when the input value is empty from search Component !//
    function emptyInputCallback() {
        let filterempty = Object.assign([], props.homestore);
        setHomelist(filterempty.slice(0, listcount))
    }

    //! For the View all button which shows all the articles in the particular topic !//
    function handleViewAll() {
        let viewall = Object.assign([], props.homestore);
        setHomelist(viewall)
    }

    //! For the Show less button which shows the top ten headlines again in the particular topic !//
    function handleShowless() {
        let showless = Object.assign([], props.homestore);
        setHomelist(showless.slice(0, listcount))
    }
    return (
        <div className="home-base" style={{ height: '100%' }}>
            {
                errorGetList == '' && homelist ?
                    <div>
                        <div >

                            <div className="head-part container-fluid">
                                {
                                    homelist.length > 10 ?
                                        <div>
                                        </div> : <div className='col-lg-6 col-md-6  col-sm-6 '>
                                            <marquee className='top-head'><h3>Top 10 Headlines !!</h3></marquee>
                                        </div>
                                }
                                <div className='col-lg-6 col-md-6 col-sm-6' >
                                    <SearchComponent searchDataCallback={(data) => setSearchList(data)} emptyInputCallback={() => emptyInputCallback()} />
                                </div>
                            </div>

                        </div>
                        <div className='body'>

                            <NewslistComponent dataList={homelist} name="homelist" />
                            {
                                homelist.length == 10 ?
                                    <div>
                                        <div>
                                            <div className="view-button">
                                                <button className="btn  btn-success" onClick={handleViewAll}>View all</button>
                                            </div>
                                        </div>
                                    </div> :
                                    <div>
                                        {
                                            homelist.length > 10 ?
                                                <div className="view-button">
                                                    <button className="btn  btn-success" onClick={handleShowless} >Show less</button>
                                                </div> : null
                                        }
                                    </div>
                            }
                        </div>
                    </div> : <div className="error-messsage">
                        {errorGetList}
                    </div>
            }
        </div>

    )
}

//! Getting the state for this component from the Store in redux !//
const mapStateToProps = ({ HomeNewsReducer }) => {
    return {

        homestore: HomeNewsReducer.homelist

    }

}

//! Getting the reducers and dispatch the action values in to the redux!//
const mapDispatchToProps = (dispatch) => {
    return {
        homedata: (data) => (dispatch(homeNewsList(data))),
        loaderAction: (data) => (dispatch(loaderAction(data)))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeComponent)

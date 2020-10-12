import React from 'react'
import { useState, useEffect } from 'react'
import NewslistComponent from '../../components/NewslistComponent';
import SearchComponent from '../../components/SearchComponent';
import { connect } from 'react-redux'
import { wallstreetAction, loaderAction } from '../../redux/action/Action'
import { fetchGet } from '../../common/ApiCommunicator';


function BuisnessComponent(props) {
    let listcount = 10;
    const [wallnewslist, setwallnewslist] = useState([])
    const [errorGetList, setErrorGetList] = useState('')


    useEffect(() => {
        getHeadlines()
    }, [])

    function getHeadlines() {
        props.loaderAction(true)
        fetchGet('everything?domains=wsj.com&apiKey=28a63512b6e74ae9a7584f3be85e96ba', successGetHeadlines, errorGetHeadlines)
    }

    function successGetHeadlines(resp) {
        setwallnewslist(resp.articles.slice(0, listcount))
        props.wallstreetAction(resp.articles)
        setErrorGetList('')
        props.loaderAction(false)
    }

    function errorGetHeadlines(error) {
        setwallnewslist([])
        setErrorGetList(error.message)
        props.loaderAction(false)
        console.log("error", error.message)
    }


    //! For the search when the input value is empty from search Component !//
    function emptyInputCallback() {
        let filterempty = Object.assign([], props.wallstreetnews);
        setwallnewslist(filterempty.slice(0, listcount))
    }
    //! For the search when the input value is coming from the search Component !//
    function setSearchList(data) {
        setwallnewslist(data)
    }

    //! For the View all button which shows all the articles in particular topic !//
    function handleViewAll() {
        let viewall = Object.assign([], props.wallstreetnews);
        console.log('viewall', viewall)
        setwallnewslist(viewall)
    }
    //! For the Showl less button which shows the top ten headlines in particular topic !//
    function handleShowless() {
        let showless = Object.assign([], props.wallstreetnews);
        setwallnewslist(showless.slice(0, listcount))
    }
    return (
        <div className="home-base" style={{ height: '100%' }}>
            {
                errorGetList == '' && wallnewslist ?
                    <div>
                        <div className="head-part  container-fluid">
                            {
                                wallnewslist.length > 10 ?
                                    <div>
                                    </div> :
                                    <div className='col-lg-6 col-md-6  col-sm-6 '>
                                        <marquee className='top-head'><h3>Top 10 Wallstreet Headlines !!</h3></marquee>
                                    </div>
                            }
                            <div className='col-lg-6 col-md-6 col-sm-6' >
                                <SearchComponent searchDataCallback={(data) => setSearchList(data)} emptyInputCallback={() => emptyInputCallback()} />
                            </div>
                        </div>
                        <div className='body'>
                            <NewslistComponent dataList={wallnewslist} name="wallnewslist" />
                            {
                                wallnewslist.length == 10 ?
                                    <div>
                                        <div>
                                            <div className="view-button">
                                                <button className="btn  btn-success" onClick={handleViewAll}>View all</button>
                                            </div>
                                        </div>
                                    </div> :
                                    <div>
                                        {
                                            wallnewslist.length > 10 ?
                                                <div className="view-button">
                                                    <button className="btn  btn-success" onClick={handleShowless} >Show less</button>
                                                </div> : null
                                        }
                                    </div>
                            }
                        </div>
                    </div> : <div className="error-messsage">
                        {errorGetList}</div>
            }
        </div >
    )
}
//! Getting the state for this component from the Store in redux !//
const mapStateToProps = ({ WallstreetReducer }) => {
    console.log("WallstreetReducer", WallstreetReducer)
    return {
        wallstreetnews: WallstreetReducer.wallstreetlist
    }
}


//! Getting the reducers and dispatch the action values in to the redux!//
const mapDispatchToProps = (dispatch) => {
    return {
        wallstreetAction: (data) => (dispatch(wallstreetAction(data))),
        loaderAction: (data) => (dispatch(loaderAction(data)))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BuisnessComponent)

import React from 'react'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import NewslistComponent from '../../components/NewslistComponent';
import SearchComponent from '../../components/SearchComponent';
import { connect } from 'react-redux'
import { businessAction, loaderAction } from '../../redux/action/Action'
import { fetchGet } from '../../common/ApiCommunicator';


function BuisnessComponent(props) {
    let listcount = 10;
    const [businesslist, setbusiness] = useState([])
    const [errorGetList, setErrorGetList] = useState('')


    useEffect(() => {
        getHeadlines()
    }, [])

    function getHeadlines() {
        props.loaderAction(true)
        fetchGet('top-headlines?country=us&category=business&apiKey=28a63512b6e74ae9a7584f3be85e96ba', successGetHeadlines, errorGetHeadlines)
    }

    function successGetHeadlines(resp) {
        setbusiness(resp.articles.slice(0, listcount))
        props.businessAction(resp.articles)
        setErrorGetList('')
        props.loaderAction(false)
    }

    function errorGetHeadlines(error) {
        setbusiness([])
        setErrorGetList(error.message)
        props.loaderAction(false)
        console.log("error", error.message)
    }


    function emptyInputCallback() {
        let filterempty = Object.assign([], props.businesnews);
        setbusiness(filterempty.slice(0, listcount))
    }

    function setSearchList(data) {
        setbusiness(data)
    }

    //! For the View all button which shows all the articles in particular topic !//
    function handleViewAll() {
        let viewall = Object.assign([], props.businesnews);
        setbusiness(viewall)
    }
    //! For the Showl less button which shows the top ten headlines in particular topic !//
    function handleShowless() {
        let showless = Object.assign([], props.businesnews);
        setbusiness(showless.slice(0, listcount))
    }
    return (
        <div className="home-base" style={{ height: '100%' }}>
            {
                errorGetList == '' && businesslist ?
                    <div>
                        <div className="head-part  container-fluid">
                            {
                                businesslist.length > 10 ?
                                    <div>
                                    </div> :
                                    <div className='col-lg-6 col-md-6  col-sm-6 '>
                                        <marquee className='top-head'><h3>Top 10 Buisness Headlines !!</h3></marquee>
                                    </div>
                            }
                            <div className='col-lg-6 col-md-6 col-sm-6' >
                                <SearchComponent searchDataCallback={(data) => setSearchList(data)} emptyInputCallback={() => emptyInputCallback()} />
                            </div>
                        </div>
                        <div className='body'>
                            <NewslistComponent dataList={businesslist} name="businesslist" />
                            {
                                businesslist.length == 10 ?
                                    <div>
                                        <div>
                                            <div className="view-button">
                                                <button className="btn  btn-success" onClick={handleViewAll}>View all</button>
                                            </div>
                                        </div>
                                    </div> :
                                    <div>
                                        {
                                            businesslist.length > 10 ?
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
        </div >
    )
}
const mapStateToProps = ({ BusinessReducer }) => {
    return {
        businesnews: BusinessReducer.businesslist
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        businessAction: (data) => (dispatch(businessAction(data))),
        loaderAction: (data) => (dispatch(loaderAction(data)))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BuisnessComponent)

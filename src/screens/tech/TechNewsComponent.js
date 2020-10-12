import React from 'react'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import NewslistComponent from '../../components/NewslistComponent';
import SearchComponent from '../../components/SearchComponent';
import { connect } from 'react-redux'
import { techAction, loaderAction } from '../../redux/action/Action'
import { fetchGet } from '../../common/ApiCommunicator';


function BuisnessComponent(props) {
    let listcount = 10;
    const [technewslist, setTechnewslist] = useState([])
    const [errorGetList, setErrorGetList] = useState('')


    useEffect(() => {
        getHeadlines()
    }, [])

    function getHeadlines() {
        props.loaderAction(true)
        fetchGet('top-headlines?sources=techcrunch&apiKey=28a63512b6e74ae9a7584f3be85e96ba', successGetHeadlines, errorGetHeadlines)
    }

    function successGetHeadlines(resp) {
        setTechnewslist(resp.articles.slice(0, listcount))
        props.techAction(resp.articles)
        setErrorGetList('')
        props.loaderAction(false)
    }

    function errorGetHeadlines(error) {
        setTechnewslist([])
        setErrorGetList(error.message)
        props.loaderAction(false)
        console.log("error", error.message)
    }


    function emptyInputCallback() {
        let filterempty = Object.assign([], props.technews);
        setTechnewslist(filterempty.slice(0, listcount))
    }

    function setSearchList(data) {
        setTechnewslist(data)
    }

    //! For the View all button which shows all the articles in particular topic !//
    function handleViewAll() {
        let viewall = Object.assign([], props.technews);
        setTechnewslist(viewall)
    }
    //! For the Showl less button which shows the top ten headlines in particular topic !//
    function handleShowless() {
        let showless = Object.assign([], props.technews);
        setTechnewslist(showless.slice(0, listcount))
    }
    return (
        <div className="home-base" style={{ height: '100%' }}>
            {
                errorGetList == '' && technewslist ?
                    <div>
                        <div className="head-part  container-fluid">
                            {
                                technewslist.length > 10 ?
                                    <div>
                                    </div> :
                                    <div className='col-lg-6 col-md-6  col-sm-6 '>
                                        <marquee className='top-head'><h3>Top 10 Tech Headlines !!</h3></marquee>
                                    </div>
                            }
                            <div className='col-lg-6 col-md-6 col-sm-6' >
                                <SearchComponent searchDataCallback={(data) => setSearchList(data)} emptyInputCallback={() => emptyInputCallback()} />
                            </div>
                        </div>
                        <div className='body'>
                            <NewslistComponent dataList={technewslist} name="technewslist" />
                            {
                                technewslist.length == 10 ?
                                    <div>
                                        <div>
                                            <div className="view-button">
                                                <button className="btn  btn-success" onClick={handleViewAll}>View all</button>
                                            </div>
                                        </div>
                                    </div> :
                                    <div>
                                        {
                                            technewslist.length > 10 ?
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
const mapStateToProps = ({ TechReducer }) => {
    console.log("TechReducer", TechReducer)
    return {
        technews: TechReducer.techlist
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        techAction: (data) => (dispatch(techAction(data))),
        loaderAction: (data) => (dispatch(loaderAction(data)))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BuisnessComponent)

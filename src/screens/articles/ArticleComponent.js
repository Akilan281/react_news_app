import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import './styles/article.css'

function ArticleComponent(props) {

    let location = useLocation();

    useEffect(() => {
        if (location.state == null) {
            props.history.goBack()
        }
    }, [])

    return (location.state != null ?
        <div>
            {console.log('location', location.state)}
            <div className="back-button">
                <button className="btn  btn-primary" onClick={() => props.history.goBack()}>Back</button>
            </div>

            <div className="container">
                <div className="article">
                    <div className="col-lg-12 col-md-12 col-sm-12">
                        <h1>Article</h1>
                    </div>
                </div>
            </div>
            <div className="container">
                <div className="row">
                    <div  >
                        <div className="col-lg-12 col-md-12 col-sm-12">
                            <div>
                                <h6>Published at: {location.state.publishedAt}</h6>
                            </div>
                            <div className="article-body">
                                <div>
                                    <h2 className="title">Article Title:</h2>
                                    <h1>{location.state.title}</h1>

                                </div>
                                <div class="card article-card" >
                                    <img className="card-img-top article-image" src={location.state.urlToImage} alt="Card image cap" />
                                </div>
                                <div>
                                    <h2 className="title">Description:</h2>
                                    <p>{location.state.description}</p>
                                </div>
                                <div>
                                    <h2 className="title">Content:</h2>
                                    <p>{location.state.content}</p>
                                </div>
                                <br />
                                <div>

                                    <h2 className="title">View full article:  </h2>
                                    <a href=''>{location.state.url}</a>
                                </div>
                                <br />
                                <div>
                                    <h2 className="title">Author:</h2>
                                    <p>{location.state.author}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </div> : null
    )
}

export default ArticleComponent

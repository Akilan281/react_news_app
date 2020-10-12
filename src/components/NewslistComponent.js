import React from 'react'
import { Link } from 'react-router-dom';

export default function NewslistComponent(props) {
    return <div className="container-fluid">
        <div className="row">
            {props.dataList.map((item, index) => {
                return <div className="col-lg-4 col-md-4 col-sm-6 col-xs-12" key={'newlist' + index}>
                    <div className="card cards " >
                        <img className="card-img-top cardimage" src={item.urlToImage} alt="Card image cap" />
                        <div className="card-body">
                            <Link to={{
                                pathname: '/articles',
                                state: item
                            }}>
                                <h5 className="card-title">{item.title}</h5>
                            </Link>
                            <a >by: {item.author} publishedAt: {item.publishedAt}</a>
                        </div>
                    </div>
                </div>
            })
            }
        </div>
    </div>;
}

import React from 'react'

function SearchComponent(props) {

    function fetchApi(value) {
        const url = 'https://cors-anywhere.herokuapp.com/http://newsapi.org/v2/everything?q=' + value + '&apiKey=28a63512b6e74ae9a7584f3be85e96ba';
        fetch(url, {
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(response => response.json()).then((data) => {
            props.searchDataCallback(data.articles)
        })
    }

    function handlChangeFilter(value) {
        if (value.length > 2) {
            fetchApi(value)
        } else if (value == '') {
            props.emptyInputCallback()
        }
    }
    return (
        <div>
            <form>
                <input type="text" onChange={(e) => handlChangeFilter(e.target.value)} className="searchTerm" placeholder="What are you looking for?" />
            </form>
        </div>
    )
}

export default SearchComponent

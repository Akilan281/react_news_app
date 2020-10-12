
//!! API Communicator is common for all the components in this app for fetching data from APIs and  handling errors from API  !!//

const baseURL = 'https://cors-anywhere.herokuapp.com/http://newsapi.org/v2/'

export const fetchGet = async (url, successCB, errorCB) => {
    try {
        const resp = await httpGet(url)
        if (successCB)
            successCB(resp)
    } catch (error) {
        if (errorCB)
            errorCB(error)
    }
}

const httpGet = (url) => {
    return fetch(baseURL + url, {
        method: 'get',
        headers: {
            'Content-Type': 'application/json',
        }
    }).then(response => response.json())
        .then((response) => {
            if (response.status !== 'ok') {
                var err = new Error(response.message);
                throw err
            }
            return response
        }).then((data) => {
            return data
        }).catch((error) => {
            var err = new Error(error.message);
            throw err
        })
}

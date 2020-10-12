export const HOME_NEWS = 'home_news'
export const BUSINESS_NEWS = 'business_news'
export const TECH_NEWS = 'tech_news'
export const WALSTREET_NEWS = 'wallstreet_news'
export const LOADER = 'loader'

export const homeNewsList = (data) => {
    return {
        type: HOME_NEWS,
        payload: data
    }
}
export const businessAction =(data)=>{
    return{
        type: BUSINESS_NEWS,
        payload: data
    }
}
export const techAction =(data)=>{
    return{
        type: TECH_NEWS,
        payload: data
    }
}
export const wallstreetAction =(data)=>{
    return{
        type: WALSTREET_NEWS,
        payload: data
    }
}
export const loaderAction = (data) => {
    console.log('loaderAction')
    return {
        type: LOADER,
        payload: data
    }
}
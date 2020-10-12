import React from 'react'
import { BrowserRouter as Router, Route, Switch, } from 'react-router-dom';
import BuisnessComponent from './business/BuisnessComponent';
import HomeComponent from './home/HomeComponent';
import NavBarComponent from './navbar/NavBarComponent';
import { Provider } from 'react-redux'
import store from '../redux/store/Store'
import ArticleComponent from './articles/ArticleComponent';
import FooterComponent from './footer/FooterComponent';
import LoaderComponent from '../components/LoaderComponent';
import TechNewsComponent from './tech/TechNewsComponent';
import WallstreetComponent from './wallstreet/WallstreetComponent';
import { SCREENS } from '../common/Constant';

function AppRouter() {
    return (
        <Provider store={store}>
            <Router >
                <NavBarComponent />
                <div className="main-wrap">
                    <LoaderComponent />
                    <Switch>
                        <Route exact path={SCREENS.HOME} component={HomeComponent}></Route>
                        <Route exact path={SCREENS.BUSINESS} component={BuisnessComponent}></Route>
                        <Route exact path={SCREENS.TECH} component={TechNewsComponent}></Route>
                        <Route exact path={SCREENS.WALLSTREET} component={WallstreetComponent}></Route>
                        <Route exact path={SCREENS.ARTICLES} component={ArticleComponent}></Route>
                    </Switch>
                </div>
                <FooterComponent />
            </Router>
        </Provider>
    )
}

export default AppRouter

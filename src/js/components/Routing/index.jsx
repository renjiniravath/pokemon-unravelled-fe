import React, { Fragment, Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';
import Navbar from '../commonComponents/Navbar';
import Footer from '../commonComponents/Footer';
const Home = React.lazy(() => import('../pages/Home'));
const Pokedex = React.lazy(() => import('../pages/Pokedex'));
const Pokemon = React.lazy(() => import('../pages/Pokemon'));
const NotFound = React.lazy(() => import('../pages/NotFound'));

class Routing extends React.Component {
    render() {
        return (
            <Fragment>
                <Route path="/" component={Navbar} />
                <Suspense fallback={<div id="preloder">
                    <div className="loader"></div>
                </div>
                }>
                    <Switch>
                        <Route exact path="/home" component={Home} />
                        <Route exact path="/pokedex" component={Pokedex} />
                        <Route exact path="/pokemon/:id" component={Pokemon} />
                        <Route path="*" component={NotFound} />
                    </Switch>
                </Suspense>
                <Route path="/" component={Footer} />
            </Fragment>
        )
    }
}

export default Routing;
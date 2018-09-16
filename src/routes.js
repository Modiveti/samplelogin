import React from 'react';
import Login from './components/Login/Login';
import LandingPage from './components/LandingPage/LandingPage';
import SearchPage from "./components/SearchPage/SearchPage";
import { Route } from "react-router-dom";

const createRoutes = () => (
    <div>
        <Route  exact path="/" 
            render={props => ( <Login  {...props}  /> )}
        />
        <Route  exact path="/SearchPage" 
            render={props => ( <SearchPage  {...props} /> )}
        />
        <Route  exact path="/LandingPage" 
            render={props => ( <LandingPage  {...props} /> )}
        />
    </div>
);

export default createRoutes;

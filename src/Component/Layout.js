import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
import HomePage from '../Page/HomePage';
import ChooseComment from '../Page/ChooseComment';
import AddComment from '../Page/AddComment';

class Layout extends Component{
    render(){
        return (
            <Router>
                <div>
                    <nav>
                        <ul>
                            <li>
                                <Link to="/">Strona główna</Link>
                            </li>
                            <li>
                                <Link to="/wybrane-komentarze">Wybrane komentarze</Link>
                            </li>
                            <li>
                                <Link to="/nowy-komentarz">Nowy komentarz</Link>
                            </li>
                        </ul>
                    </nav>

                    <Switch>
                        <Route path="/wybrane-komentarze"><ChooseComment/></Route>
                        <Route path="/nowy-komentarz"><AddComment/></Route>
                        <Route exact path="/"><HomePage/></Route>
                    </Switch>
                </div>
            </Router>
        )
    }
}

export default Layout;
import React from 'react';
import { Router, Route, Switch } from "react-router-dom";
import StreamCreate from './streams/StreamCreate';
import StreamList from './streams/StreamList';
import StreamShow from './streams/StreamShow';
import StreamEdit from './streams/StreamEdit';
import StreamDelete from './streams/StreamDelete';
import StreamChat from './streams/StreamChat';
import Header from './Header';
import history from '../history';

const App = () => {
    return (
        <div className="ui container">
            <Router history={history}>
                <div>
                    <Header/>
                    <Switch>
                        <Route path="/" exact component={StreamList}/>
                        <Route path="/streams/new" component={StreamCreate}/>
                        <Route path="/streams/edit/:id" exact component={StreamEdit}/>
                        <Route path="/streams/delete/:id" component={StreamDelete}/>
                        <Route path="/streams/:id" component={StreamShow}/>
                        <Route path="/chat" component={StreamChat}/>
                    </Switch>
                </div>
            </Router>
        </div>
    );
};

export default App;

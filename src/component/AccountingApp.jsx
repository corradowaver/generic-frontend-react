import React, {Component} from 'react';
import {BrowserRouter as Router, Link, Route, Switch} from "react-router-dom";
import GenericList from "./department/GenericList";
import ApplicationService from "../service/ApplicationService";
import ReactLoading from "react-loading";
import GenericForm from "./department/GenericForm";

class AccountingApp extends Component {

    constructor(props) {
        super(props)
        this.state = {
            appName: "",
            titles: [],
            loading: true
        }
    }

    componentDidMount() {
        ApplicationService.retrieveConfig()
            .then(response => {
                this.setState({
                    appName: response.data.appName,
                    titles: response.data.titles,
                    loading: false
                })
            })
    }

    render() {
        return (
            <Router>
                {this.state.loading ? (<ReactLoading className="loader" type={"bars"} color={"#b056d6"}/>
                ) : (
                    <div>
                        <nav id="navbar1" className="navbar navbar-expand navbar-dark bg-dark">
                            <Link to={"/"} className="navbar-brand">
                                {this.state.appName}
                            </Link>
                            <div className="navbar-nav mr-auto">
                                {this.state.titles.map(title =>
                                    <li className="nav-item">
                                        <Link to={title['endpoint']} className="nav-link">
                                            {title["title"]}
                                        </Link>
                                    </li>
                                )}
                            </div>
                        </nav>
                        <div className="main-container">
                            <Switch>
                                {this.state.titles.map(title =>
                                    <Route key={title['endpoint']} exact path={title['endpoint']}
                                           render={(props) => (
                                               <GenericList {...props} endpoint={title['endpoint']}
                                                            title={title['title']}/>
                                           )}/>
                                )}
                                {this.state.titles.map(title =>
                                    <Route key={`${title['endpoint']}/:id`} exact path={`${title['endpoint']}/:id`}
                                           render={(props) => (
                                               <GenericForm {...props} endpoint={title['endpoint']}
                                                            title={title['title']}/>
                                           )}/>
                                )}
                            </Switch>
                        </div>
                    </div>)}
            </Router>
        )
    }
}


export default AccountingApp

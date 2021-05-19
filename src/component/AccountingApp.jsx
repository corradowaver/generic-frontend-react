import React, {Component} from 'react';
import ListEmployeesComponent from "./employee/ListEmployees";
import {BrowserRouter as Router, Link, Route, Switch} from "react-router-dom";
import EmployeeForm from "./employee/EmployeeForm";
import WardList from "./department/WardList";
import WardForm from "./department/WardForm";
import ListProjects from "./project/ListProjects";
import ProjectForm from "./project/ProjectForm";
import {DIAGNOSIS_NAVIGATION_LINK, PEOPLE_NAVIGATION_LINK, WARDS_NAVIGATION_LINK} from "./NavigationConsts";

class AccountingApp extends Component {
    render() {
        return (
            <Router>
                <div>
                    <nav id="navbar1" className="navbar navbar-expand navbar-dark bg-dark">
                        <Link to={"/"} className="navbar-brand">
                            Cringe poker
                        </Link>
                        <div className="navbar-nav mr-auto">

                            <li className="nav-item">
                                <Link to={PEOPLE_NAVIGATION_LINK} className="nav-link">
                                    People
                                </Link>
                            </li>

                            <li className="nav-item">
                                <Link to={WARDS_NAVIGATION_LINK} className="nav-link">
                                    Wards
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to={DIAGNOSIS_NAVIGATION_LINK} className="nav-link">
                                    Diagnosis
                                </Link>
                            </li>
                        </div>
                    </nav>
                    <div className="main-container">
                        <Switch>
                            <Route path={PEOPLE_NAVIGATION_LINK} exact component={ListEmployeesComponent}/>
                            <Route path={`${PEOPLE_NAVIGATION_LINK}/:id`} component={EmployeeForm}/>
                            <Route path={WARDS_NAVIGATION_LINK} exact component={WardList}/>
                            <Route path={`${WARDS_NAVIGATION_LINK}/:id`} exact component={WardForm}/>
                            <Route path={DIAGNOSIS_NAVIGATION_LINK} exact component={ListProjects}/>
                            <Route path={`${DIAGNOSIS_NAVIGATION_LINK}/:id`} exact component={ProjectForm}/>
                        </Switch>
                    </div>
                </div>
            </Router>
        )
    }
}

export default AccountingApp

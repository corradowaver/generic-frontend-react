import React, {Component} from "react";
import EmployeesComponent from "./Employees";
import { withRouter } from "react-router-dom";

class ListEmployeesComponent extends Component {

    constructor(props) {
        super(props)
        this.state = {
            employees: [],
            message: ''
        }
        this.addEmployeeClicked = this.addEmployeeClicked.bind(this)
    }

    addEmployeeClicked() {
        this.props.history.push(`/employees/new`)
    }

    render() {
        let {message} = this.state
        return (
            <div className="list-container">
                <h3 color="#d870e8">Employees</h3>
                {message && <div className="alert alert-success">{message}</div>}
                <EmployeesComponent id="all"/>
                <div className="row">
                    <button className="btn btn-outline-light" onClick={this.addEmployeeClicked}>Add</button>
                </div>
            </div>
        )
    }
}

export default withRouter(ListEmployeesComponent)

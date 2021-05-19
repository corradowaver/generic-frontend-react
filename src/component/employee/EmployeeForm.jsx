import React, {Component} from "react";
import {Field, Form, Formik} from 'formik';
import {withRouter} from "react-router-dom";
import EmployeeDataService from "../../service/EmployeeDataService";
import * as Yup from "yup";


class EmployeeForm extends Component {

    constructor(props) {
        super(props)
        this.state = {
            id: this.props.match.params.id,
            username: '',
            password: '',
            firstName: '',
            lastName: '',
            fatherName: '',
            position: '',
            salary: '',
            department: {
                id: '',
                name: ''
            },
            message: ''
        }
        this.onSubmit = this.onSubmit.bind(this)
    }

    componentDidMount() {

        if (this.state.id === "new") {

        } else {
            EmployeeDataService.retrieveEmployee(this.state.id)
                .then(response => this.setState({
                    username: response.data.username,
                    password: response.data.password,
                    firstName: response.data.firstName,
                    lastName: response.data.lastName,
                    fatherName: response.data.fatherName,
                    position: response.data.position,
                    salary: response.data.salary,
                    department: response.data.department
                }))
        }
    }

    onSubmit(values) {
        this.setState({message: ''})
        let employee = {
            username: values.username,
            password: values.password,
            firstName: values.firstName,
            lastName: values.lastName,
            fatherName: values.fatherName,
            position: values.position,
            salary: values.salary,
            department: values.department,
        }
        if (this.state.id === "new") {
            EmployeeDataService.createEmployee(employee)
                .then(() => this.props.history.push('/employees'),
                    error => {
                        const resMessage =
                            (error.response &&
                                error.response.data &&
                                error.response.data.message) ||
                            error.message ||
                            error.toString();

                        this.setState({
                            message: resMessage
                        });
                    })
        } else {
            EmployeeDataService.updateEmployee(this.state.id, employee)
                .then(() => this.props.history.push('/employees'),
                    error => {
                        const resMessage =
                            (error.response &&
                                error.response.data &&
                                error.response.data.message) ||
                            error.message ||
                            error.toString();
                        this.setState({
                            message: resMessage
                        });
                    })
        }
    }

    employeeSchema = Yup.object().shape({
        username: Yup.string()
            .min(2, 'Too Short!')
            .max(15, 'Too Long!')
            .required('Required'),
        password: Yup.string()
            .min(4, 'Too Short!')
            .required('Required'),
        firstName: Yup.string()
            .min(2, 'Too Short!')
            .max(15, 'Too Long!')
            .required('Required'),
        lastName: Yup.string()
            .min(2, 'Too Short!')
            .max(15, 'Too Long!')
            .required('Required'),
        fatherName: Yup.string()
            .min(2, 'Too Short!')
            .max(15, 'Too Long!'),
        position: Yup.string()
            .min(2, 'Too Short!')
            .max(15, 'Too Long!')
            .required('Required'),
        salary: Yup.number()
            .positive('Cannot be negative!')
            .integer('Not an integer!')
            .min(1, 'Too small salary (-_-)!')
            .max(9999999, 'Too much...!')
            .required('Required'),
        department: Yup.string()
            .min(1, 'Too Short!')
            .max(15, 'Too Long...!')
    });

    render() {
        let {message, id, username, password, firstName, lastName, fatherName, position, salary, department} = this.state

        return (
            <div className="form">
                <h3>Employee details</h3>
                <div className="formik">
                    <Formik
                        initialValues={{
                            id,
                            username,
                            password,
                            firstName,
                            lastName,
                            fatherName,
                            position,
                            salary,
                            department
                        }}
                        onSubmit={this.onSubmit}
                        validationSchema={this.employeeSchema}
                        validateOnChange={false}
                        validateOnBlur={false}
                        enableReinitialize={true}>
                        {
                            ({errors}) => (
                                <Form>
                                    {message && (
                                        <div className="form-group">
                                            <div className="alert alert-danger" role="alert">
                                                {message}
                                            </div>
                                        </div>
                                    )}
                                    {id === "new" && (<fieldset className="form-group">
                                        <label>Username</label>
                                        <Field className="form-control" type="text" name="username"/>
                                    </fieldset>)}
                                    {errors.username && id === "new" && (
                                        <div className="alert alert-danger" role="alert">
                                            {errors.username}
                                        </div>)}
                                    {id === "new" && (<fieldset className="form-group">
                                        <label>Password</label>
                                        <Field className="form-control" type="text" name="password"/>
                                    </fieldset>)}
                                    {errors.password && id === "new" && (
                                        <div className="alert alert-danger" role="alert">
                                            {errors.password}
                                        </div>)}
                                    <fieldset className="form-group">
                                        <label>Name</label>
                                        <Field className="form-control" type="text" name="firstName"/>
                                    </fieldset>
                                    {errors.firstName && (
                                        <div className="alert alert-danger" role="alert">
                                            {errors.firstName}
                                        </div>)}
                                    <fieldset className="form-group">
                                        <label>Last name</label>
                                        <Field className="form-control" type="text" name="lastName"/>
                                    </fieldset>
                                    {errors.lastName && (
                                        <div className="alert alert-danger" role="alert">
                                            {errors.lastName}
                                        </div>)}
                                    <fieldset className="form-group">
                                        <label>Father name</label>
                                        <Field className="form-control" type="text" name="fatherName"/>
                                    </fieldset>
                                    {errors.fatherName && (
                                        <div className="alert alert-danger" role="alert">
                                            {errors.fatherName}
                                        </div>)}
                                    <fieldset className="form-group">
                                        <label>Position</label>
                                        <Field className="form-control" type="text" name="position"/>
                                    </fieldset>
                                    {errors.position && (
                                        <div className="alert alert-danger" role="alert">
                                            {errors.position}
                                        </div>)}
                                    <fieldset className="form-group">
                                        <label>Salary</label>
                                        <Field className="form-control" type="text" name="salary"/>
                                    </fieldset>
                                    {errors.salary && (
                                        <div className="alert alert-danger" role="alert">
                                            {errors.salary}
                                        </div>)}
                                    <fieldset className="form-group">
                                        <label>Department</label>
                                        <Field className="form-control" type="text" name="department.name"/>
                                    </fieldset>
                                    {errors.department && (
                                        <div className="alert alert-danger" role="alert">
                                            {errors.department}
                                        </div>)}
                                    <button className="btn btn-outline-light" type="submit">Save</button>
                                </Form>
                            )
                        }
                    </Formik>
                </div>
            </div>
        )
    }

}

export default withRouter(EmployeeForm)

import React, {Component} from "react";
import {Field, Form, Formik} from 'formik';
import ProjectDataService from "../../service/ProjectDataService";
import * as Yup from "yup";

class ProjectForm extends Component {

    constructor(props) {
        super(props)
        this.state = {
            id: this.props.match.params.id,
            name: '',
            cost: '',
            department: '',
            dateBegin: '',
            dateEnd: '',
            dateEndReal: '',
            message: ''
        }

        this.onSubmit = this.onSubmit.bind(this)
    }

    componentDidMount() {

        if (this.state.id === "new") {

        } else {
            ProjectDataService.retrieveProject(this.state.id)
                .then(response => this.setState({
                    name: response.data.name,
                    cost: response.data.cost,
                    department: response.data.department,
                    dateBegin: response.data.dateBegin,
                    dateEnd: response.data.dateEnd,
                    dateEndReal: response.data.dateEndReal
                }))
        }
    }

    onSubmit(values) {
        this.setState({message: ''})
        let project = {
            name: values.name,
            cost: values.cost,
            department: values.department,
            dateBegin: values.dateBegin,
            dateEnd: values.dateEnd,
            dateEndReal: values.dateEndReal
        }
        if (this.state.id === "new") {
            ProjectDataService.createProject(project)
                .then(() => this.props.history.push('/projects'),
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
            ProjectDataService.updateProject(this.state.id, project)
                .then(() => this.props.history.push('/projects'),
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

    validate(values) {

        function process(date) {
            var parts = date.split("/");
            return new Date(parts[2], parts[1] - 1, parts[0]);
        }

        let errors = {}
        const dateBegin = process(values.dateBegin)
        const dateEnd = process(values.dateEnd)
        const dateEndReal = process(values.dateEndReal)

        if (dateBegin > dateEnd) {
            errors.dateEnd = 'Date begin cannot be greater than date end'
        } else if (dateBegin > dateEndReal) {
            errors.dateEndReal = 'Date begin cannot be greater than date end'
        }
        return errors
    }

    dateRegex = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/

    projectSchema = Yup.object().shape({
        name: Yup.string()
            .min(2, 'Too Short!')
            .max(15, 'Too Long!')
            .required('Required'),
        cost: Yup.number()
            .min(1, 'Too Small!')
            .max(99999999, 'Too Big!')
            .required('Required'),
        department: Yup.string()
            .min(1, 'Too Short!')
            .max(15, 'Too Long...!'),
        dateBegin: Yup.string()
            .matches(this.dateRegex, "Date must be valid DD/MM/YYYY!"),
        dateEnd: Yup.string()
            .matches(this.dateRegex, "Date must be valid DD/MM/YYYY!"),
        dateEndReal: Yup.string()
            .matches(this.dateRegex, "Date must be valid DD/MM/YYYY!"),
    })

    render() {
        let {message, id, name, cost, department, dateBegin, dateEnd, dateEndReal} = this.state

        return (
            <div className="form">
                <h3>Project details</h3>
                <div className="formik">
                    <Formik
                        initialValues={{id, name, cost, department, dateBegin, dateEnd, dateEndReal}}
                        onSubmit={this.onSubmit}
                        validateOnChange={false}
                        validateOnBlur={false}
                        validate={this.validate}
                        validationSchema={this.projectSchema}
                        enableReinitialize={true}>
                        {
                            ({errors}) => (
                                <Form>
                                    {this.state.message && (
                                        <div className="form-group">
                                            <div className="alert alert-danger" role="alert">
                                                {message}
                                            </div>
                                        </div>
                                    )}
                                    <fieldset className="form-group">
                                        <label>Name</label>
                                        <Field className="form-control" type="text" name="name"/>
                                    </fieldset>
                                    {errors.name && (
                                        <div className="alert alert-danger" role="alert">
                                            {errors.name}
                                        </div>)}
                                    <fieldset className="form-group">
                                        <label>Cost</label>
                                        <Field className="form-control" type="text" name="cost"/>
                                    </fieldset>
                                    {errors.cost && (
                                        <div className="alert alert-danger" role="alert">
                                            {errors.cost}
                                        </div>)}
                                    <fieldset className="form-group">
                                        <label>Department</label>
                                        <Field className="form-control" type="text" name="department.name"/>
                                    </fieldset>
                                    {errors.department && (
                                        <div className="alert alert-danger" role="alert">
                                            {errors.department}
                                        </div>)}
                                    <fieldset className="form-group">
                                        <label>Date begin</label>
                                        <Field className="form-control" type="text" name="dateBegin"/>
                                    </fieldset>
                                    {errors.dateBegin && (
                                        <div className="alert alert-danger" role="alert">
                                            {errors.dateBegin}
                                        </div>)}
                                    <fieldset className="form-group">
                                        <label>Date end</label>
                                        <Field className="form-control" type="text" name="dateEnd"/>
                                    </fieldset>
                                    {errors.dateEnd && (
                                        <div className="alert alert-danger" role="alert">
                                            {errors.dateEnd}
                                        </div>)}
                                    <fieldset className="form-group">
                                        <label>Real end date</label>
                                        <Field className="form-control" type="text" name="dateEndReal"/>
                                    </fieldset>
                                    {errors.dateEndReal && (
                                        <div className="alert alert-danger" role="alert">
                                            {errors.dateEndReal}
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

export default ProjectForm

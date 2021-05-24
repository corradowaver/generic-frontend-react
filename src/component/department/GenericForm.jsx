import React, {Component} from "react";
import {Field, Form, Formik} from 'formik';
import DataService from "../../service/DataService";
import ReactLoading from "react-loading";

class GenericForm extends Component {

    constructor(props) {
        super(props)
        this.state = {
            id: props.match.params.id,
            title: props.title,
            endpoint: props.endpoint,
            data: [],
            message: '',
            loading: true
        }
        this.service = new DataService(this.state.endpoint)
        this.onSubmit = this.onSubmit.bind(this)
    }

    componentDidMount() {
        if (this.state.id === "new") {
            this.service.retrieveTemplate()
                .then(response => {
                    delete response.data['data'][0]
                    this.setState({
                        data: response.data['data'],
                        loading: false
                    })
                })
        } else {
            this.service.retrieve(this.state.id)
                .then(response => {
                    this.setState({
                        data: response.data['data'],
                        loading: false
                    })
                })
        }
    }

    onSubmit(values) {
        values = values.filter(function( element ) {
            return element !== undefined;
        });
        let item = {}
        values.forEach(field => {
            if (field['fieldType'].toLowerCase() === 'boolean') {
                // item[field['fieldName']] = document.getElementById(field['fieldName']).checked
                item[field['fieldName']] = field['fieldValue']
            } else {
                item[field['fieldName']] = field['fieldValue']
            }
        })

        this.setState({loading: true})
        this.setState({message: ''})
        if (this.state.id === "new") {
            this.service.create(item)
                .then(() => {
                        this.setState({loading: false})
                        this.props.history.push(this.state.endpoint)
                    },
                    error => {
                        this.setState({loading: false})
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
            this.service.update(item)
                .then(() => {
                        this.setState({loading: false})
                        this.props.history.push(this.state.endpoint)
                    },
                    error => {
                        this.setState({loading: false})
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

    resolveFormElementType = (field) => {
        if (field['fieldType'].toLowerCase() === "boolean") {
            return "checkbox";
        } else {
            return "text";
        }
    }

    render() {
        let {loading, message, data} = this.state
        return (
            <div className="form">
                <h3>{this.state.title} details</h3>
                {loading ? (<ReactLoading className="loader" type={"bars"} color={"#b056d6"}/>
                ) : (
                    <div className="formik">
                        <Formik
                            initialValues={data}
                            onSubmit={this.onSubmit}
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
                                        {data.map(field => (
                                                <fieldset className="form-group">
                                                    <label>{field['fieldName']}</label>
                                                    <Field className="form-control"
                                                           type={this.resolveFormElementType(field)}
                                                           name={field['fieldName']}
                                                           placeholder={field['fieldValue']}
                                                           onChange={(e) => {
                                                               field['fieldValue'] = e.target.value
                                                           }}/>
                                                </fieldset>
                                            )
                                        )}
                                        {errors.name && (
                                            <div className="alert alert-danger" role="alert">
                                                {errors.name}
                                            </div>)}
                                        <button className="btn btn-outline-light" type="submit">Save</button>
                                    </Form>
                                )
                            }
                        </Formik>
                    </div>
                )}
            </div>
        )
    }

}

export default GenericForm

import React, {Component} from "react";
import {Field, Form, Formik} from 'formik';
import WardDataService from "../../service/WardDataService";
import ReactLoading from "react-loading";
import {WARDS_NAVIGATION_LINK} from "../NavigationConsts";

class WardForm extends Component {

    constructor(props) {
        super(props)
        this.state = {
            id: this.props.match.params.id,
            data: {},
            message: '',
            loading: false
        }

        this.onSubmit = this.onSubmit.bind(this)
    }

    componentDidMount() {
        if (this.state.id === "new") {

        } else {
            WardDataService.retrieve(this.state.id)
                .then(response => this.setState({
                    data: response.data,
                }))
        }
    }

    onSubmit(values) {
        let item = values
        this.setState({loading: true})
        this.setState({message: ''})
        if (this.state.id === "new") {
            WardDataService.create(item)
                .then(() => {
                        this.setState({loading: false})
                        this.props.history.push(WARDS_NAVIGATION_LINK)
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
            WardDataService.update(this.state.id, item)
                .then(() => {
                        this.setState({loading: false})
                        this.props.history.push(WARDS_NAVIGATION_LINK)
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

    render() {
        let {loading, message, data} = this.state

        return (
            <div className="form">
                <h3>Ward details</h3>
                {loading ? (<ReactLoading className="loader" type={"bars"} color={"#b056d6"}/>
                ) : (
                    <div className="formik">
                        <Formik
                            initialValues={{data}}
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
                                        {data.map(element => (
                                            <fieldset className="form-group">
                                                <label>{element.key}</label>
                                                <Field className="form-control" type="text" name={element.key}/>
                                            </fieldset>
                                        ))}
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

export default WardForm

import React, {Component} from "react";
import DataService from "../../service/DataService";
import ReactLoading from "react-loading";

class GenericList extends Component {

    constructor(props) {
        super(props)
        this.state = {
            endpoint: props.endpoint,
            title: props.title,
            header: [],
            data: [],
            message: '',
            loading: true
        }
        this.service = new DataService(this.state.endpoint)
        this.addClicked = this.addClicked.bind(this)
        this.deleteClicked = this.deleteClicked.bind(this)
        this.updateClicked = this.updateClicked.bind(this)
    }

    componentDidMount() {
        this.service.retrieveTemplate()
            .then(
                response => {
                    this.setState({
                        header: response.data['data'].map(fieldParam =>
                            fieldParam['fieldName']
                        )
                    })
                    this.refresh();
                }
            )
    }

    refresh() {
        this.setState({loading: true})
        this.service.retrieveAll()
            .then(
                response => {
                    this.setState({
                        data: response.data.map(entity => {
                            return entity['data']
                        }),
                        loading: false
                    })

                }
            )
    }

    deleteClicked(id) {
        this.setState({message: ''})
        this.service.delete(id)
            .then(
                () => {
                    this.refresh()
                },
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

    updateClicked(id) {
        this.props.history.push(`${this.state.endpoint}/${id}`)
    }

    addClicked() {
        this.props.history.push(`${this.state.endpoint}/new`)
    }

    getTableHeader() {
        return (
            <thead className="table-head">
            <tr>
                {this.state.header.map(key => <th>{key}</th>)}
            </tr>
            </thead>
        )
    }

    getTableBody() {
        return (
            <tbody>
            {
                this.state.data.map(listElement =>
                    <tr key={listElement[0]['fieldValue']}>
                        {listElement.map(field => (
                            <td><h6>{field['fieldValue']?.toString()}</h6></td>
                        ))}
                        <td>
                            <button className="btn btn-outline-light"
                                    onClick={() => this.updateClicked(listElement[0]['fieldValue'])}>
                                Update
                            </button>
                        </td>
                        <td>
                            <button className="btn btn-outline-light"
                                    onClick={() => this.deleteClicked(listElement[0]['fieldValue'])}>
                                Delete
                            </button>
                        </td>
                    </tr>
                )
            }
            </tbody>
        )
    }

    render() {
        return (
            <div className="list-container">
                <h3>{this.state.title}</h3>
                {this.state.loading ? (<ReactLoading className="loader" type={"bars"} color={"#b056d6"}/>
                ) : (
                    <div>
                        {this.state.message && (
                            <div className="alert alert-danger" role="alert">
                                {this.state.message}
                            </div>
                        )}
                        <table className="table">
                            {this.getTableHeader()}
                            {this.getTableBody()}
                        </table>
                        <div className="row">
                            <button className="btn  btn-outline-light" onClick={this.addClicked}>Add</button>
                        </div>
                    </div>
                )}
            </div>
        )
    }
}

export default GenericList

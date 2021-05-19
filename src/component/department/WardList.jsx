import React, {Component} from "react";
import WardDataService from "../../service/WardDataService";
import ReactLoading from "react-loading";
import {WARDS_NAVIGATION_LINK} from "../NavigationConsts";

class WardList extends Component {

    constructor(props) {
        super(props)
        this.state = {
            data: [],
            message: '',
            loading: false
        }
        this.addClicked = this.addClicked.bind(this)
        this.deleteClicked = this.deleteClicked.bind(this)
        this.updateClicked = this.updateClicked.bind(this)
    }

    componentDidMount() {
        this.refresh();
    }

    refresh() {
        this.setState({loading: true})
        WardDataService.retrieveAll()
            .then(
                response => {
                    this.setState({loading: false})
                    this.setState({data: response.data})
                }
            )
    }

    deleteClicked(id) {
        this.setState({message: ''})
        WardDataService.delete(id)
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
        this.props.history.push(`${WARDS_NAVIGATION_LINK}/${id}`)
    }

    addClicked() {
        this.props.history.push(`${WARDS_NAVIGATION_LINK}/new`)
    }

    render() {
        return (
            <div className="list-container">
                <h3>Wards</h3>
                {this.state.loading ? (<ReactLoading className="loader" type={"bars"} color={"#b056d6"}/>
                ) : (
                    <div>
                        {this.state.message && (
                            <div className="alert alert-danger" role="alert">
                                {this.state.message}
                            </div>
                        )}
                        <table className="table">
                            <thead className="table-head">
                            <tr>
                                {this.state.data.map(item => <th>{item.key}</th>)}
                            </tr>
                            </thead>
                            <tbody>
                            {
                                this.state.data.map(
                                    item =>
                                        <tr key={item.id}>
                                            <td><h6>{item.key}</h6></td>
                                            {/*<td><EmployeesComponent id={item.id}/></td>*/}
                                            <td>
                                                <button className="btn btn-outline-light"
                                                        onClick={() => this.updateClicked(item.id)}>
                                                    Update
                                                </button>
                                            </td>
                                            <td>
                                                <button className="btn btn-outline-light"
                                                        onClick={() => this.deleteClicked(item.id)}>
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                )
                            }
                            </tbody>
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

export default WardList

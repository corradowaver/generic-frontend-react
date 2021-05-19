import React, {Component} from "react";
import ProjectDataService from "../../service/ProjectDataService";
import ReactLoading from "react-loading";

class ListProjects extends Component {

    constructor(props) {
        super(props)
        this.state = {
            projects: [],
            message: '',
            loading: false
        }
        this.addProjectClicked = this.addProjectClicked.bind(this)
        this.deleteProjectClicked = this.deleteProjectClicked.bind(this)
        this.updateProjectClicked = this.updateProjectClicked.bind(this)
    }

    componentDidMount() {
        this.refreshProjects();
    }

    refreshProjects() {
        this.setState({loading: true})
        ProjectDataService.retrieveAllProjects()
            .then(
                response => {
                    this.setState({loading: false})
                    this.setState({projects: response.data})
                }
            )
    }

    deleteProjectClicked(id) {
        ProjectDataService.deleteProject(id)
            .then(
                () => {
                    this.setState({message: `Deletion of project with id ${id} Successful`})
                    this.refreshProjects()
                }
            )
    }

    updateProjectClicked(id) {
        this.props.history.push(`/projects/${id}`)
    }

    addProjectClicked() {
        this.props.history.push(`/projects/new`)
    }

    render() {
        return (
            <div className="list-container">
                <h3>Projects</h3>
                {this.state.loading ? (<ReactLoading className="loader" type={"bars"} color={"#b056d6"}/>
                ) : (
                    <div>
                        <table className="table">
                            <thead className="table-head">
                            <tr>
                                <th>Name</th>
                                <th>Cost</th>
                                <th>Department</th>
                                <th>Date begin</th>
                                <th>Date end</th>
                                <th>Date end real</th>
                                <th>Update</th>
                                <th>Delete</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                this.state.projects.map(
                                    project =>
                                        <tr key={project.id}>
                                            <td>{project.name}</td>
                                            <td>{project.cost}💲</td>
                                            <td>{project.department == null ? "-" : project.department.name}</td>
                                            <td>{project.dateBegin}</td>
                                            <td>{project.dateEnd}</td>
                                            <td>{project.dateEndReal}</td>
                                            <td>
                                                <button className="btn btn-outline-light"
                                                        onClick={() => this.updateProjectClicked(project.id)}>Update
                                                </button>
                                            </td>
                                            <td>
                                                <button className="btn btn-outline-light"
                                                        onClick={() => this.deleteProjectClicked(project.id)}>Delete
                                                </button>
                                            </td>
                                        </tr>
                                )
                            }
                            </tbody>
                        </table>
                        <div className="row">
                            <button className="btn btn-outline-light" onClick={this.addProjectClicked}>Add</button>
                        </div>
                    </div>
                )}
            </div>
        )
    }
}

export default ListProjects

import { Redirect } from 'react-router-dom';
import React from 'react';
import TaskService from '../../../shared/services/task.service';
import TaskResponseModel from '../models/task-response-model.model';

export class EditTask extends React.Component {
    constructor(props) {
        super(props);

        this.loggedUser = localStorage.getItem('currentUser');
        this.state = {
            currentTask: { id: '', assessment: '', title: '', description: '', userId: '', taskStatus: '' },
            shouldRedirect: false
        };

        this.taskService = new TaskService();
        this.onInputChange = this.onInputChange.bind(this);
        this.onTaskSave = this.onTaskSave.bind(this);
    }

    componentDidMount() {
        if (this.props.match.params.id) {
            this.taskService.getTaskById(this.props.match.params.id).then(
                result => {
                    console.log(result);
                    this.setState({
                        currentTask: { id: this.props.match.params.id, assessment: result.assessment, title: result.title, description: result.description, userId: result.userId, taskStatus: result.taskStatus }
                    });
                }
            );
        }
    }

    onInputChange = (event) => {
        event.persist();
        this.setState((prevState) => ({
            currentTask: { ...prevState.currentTask, [event.target.name]: event.target.value }
        }));
    }

    async onTaskSave(event) {
        if (this.props.match.params.id) {
            event.preventDefault();
            let result = await this.taskService.updateTask(this.state.currentTask);
            if (result) {
                this.setState({
                    currentTask: { id: this.props.match.params.id, assessment: result.assessment, title: result.title, description: result.description, userId: result.userId, taskStatus: result.taskStatus },
                    shouldRedirect: true
                });
            }
        }
        else {
            event.preventDefault();
            let newTask = new TaskResponseModel(null, this.state.currentTask.title, this.state.currentTask.description, this.state.currentTask.assessment, this.state.currentTask.taskStatus, JSON.parse(this.loggedUser).id);

            let task = await this.taskService.addTask(newTask);
            if (task) {
                newTask.id = task.id;
                this.setState({
                    currentTask: newTask,
                    shouldRedirect: true
                });
            }
        }

    }

    render() {
        return (
            <>
                {this.state.shouldRedirect && <Redirect to="/tasks" />}
                <div className="note-edit-wrapper">
                    <form onSubmit={this.onTaskSave}>
                        <div className="form-group">
                            <label labelfor="title">Title: </label>
                            <input className="form-control" type="text" id="title" name="title" onChange={this.onInputChange} value={this.state.currentTask.title} />
                        </div>
                        <div className="form-group">
                            <label labelfor="content">Description: </label>
                            <textarea className="form-control" id="description" name="description" onChange={this.onInputChange} value={this.state.currentTask.description} />
                        </div>
                        <div className="form-group">
                            <label labelfor="content">Assessment: </label>
                            <textarea className="form-control" id="assessment" name="assessment" onChange={this.onInputChange} value={this.state.currentTask.assessment} />
                        </div>
                        <div className="form-group">
                            <label labelfor="status">Status: </label>
                            <select className="form-control" id="taskStatus" name="taskStatus" onChange={this.onInputChange} value={this.state.currentTask.taskStatus}>
                                <option value="Active">Active</option>
                                <option value="Pending">Pending</option>
                                <option value="Done">Done</option>
                            </select>
                        </div>
                        <button className="btn btn-primary">Save task</button>
                    </form>
                </div>
            </>
        )
    }
}
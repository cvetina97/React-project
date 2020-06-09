import React from 'react';
import TaskService from '../../../shared/services/task.service';
import TaskCard from '../task-card/TaskCard';
import { Link } from 'react-router-dom';

export default class Tasks extends React.Component {
    constructor(props) {
        super(props);

        this.loggedUser = localStorage.getItem('currentUser');
        this.state = {
            tasks: []
        };

        this.taskService = new TaskService();
        this.onDelete = this.onDelete.bind(this);
    }

    //when component is attached
    componentDidMount() {
        this.taskService.getAllTasks().then(
            result => {
                console.log(result);
                this.setState({
                    tasks: result
                });
            }
        );
    }

    async onDelete(id) {
        let result = await this.taskService.deleteTask(id);
        if (result) {
            this.setState({
                tasks: this.state.tasks.filter(task => task.id !== id)
            });
        }
    }

    render() {
        return (
            <div className="card">
                <button type="button" className="btn btn-light"><Link to="/tasks/create">Add task</Link></button>
                <div className="notes-list-wrapper d-flex">
                    {this.state.tasks.map(task => <TaskCard {...this.props} task={task} key={task.id} onDeleteClick={this.onDelete} />)}
                </div>
            </div>
        );
    }
}
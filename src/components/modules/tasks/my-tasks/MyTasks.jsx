import React from 'react';
import TaskService from '../../../shared/services/task.service';
import TaskCard from '../task-card/TaskCard';

const listStyles = {
    display: 'flex',
    flexWrap: 'wrap'
};

export default class MyNotes extends React.Component {
    constructor(props) {
        super(props);

        this.loggedUser = localStorage.getItem('currentUser');
        this.state = {
            myTasks: []
        };

        this.taskService = new TaskService();
    }

    componentDidMount() {
        await this.taskService.getAllTasksByUserEmail(JSON.parse(this.loggedUser).email).then(
            result => {
                this.setState({
                    myTasks: result
                });
            }
        );
    }


    render() {
        return (
            <div className="my-notes-wrapper" style={listStyles} >
                {this.state.myTasks.map(task => <TaskCard task={task} key={task.id} />)}
            </div>
        );
    }
}
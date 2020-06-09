import React from 'react';
import { Link } from 'react-router-dom';

export default class TaskCard extends React.Component {

    constructor(props) {
        super(props);

        this.loggedUser = localStorage.getItem('currentUser');
    }

    render() {
        return (
            <div className="col-md-4 mt-4">
                <div className="card profile-card-5">
                    <div className="card-img-block">
                        <img className="card-img-top" src="https://png.pngtree.com/png-vector/20190115/ourlarge/pngtree-vector-checklist-icon-png-image_319693.jpg" alt="Card image cap" />
                    </div>
                    <div className="card-body pt-0">
                        <h5 className="card-title">Title: {this.props.task.title}</h5>
                        <h6 className="card-text">Description: {this.props.task.description}</h6>
                        <h6 className="card-text">Assessment: {this.props.task.assessment}</h6>
                        <p className="card-text">Status: {this.props.task.taskStatus}</p>
                    </div>
                    {(JSON.parse(this.loggedUser).isAdmin || JSON.parse(this.loggedUser).id === this.props.task.userId) ?
                        <div style={{ textAlign: "right" }}>
                            <button type="button" className="btn btn-light" onClick={() => this.props.history.push(`/tasks/edit/${this.props.task.id}`)}>Edit
                        </button>
                        <button type="button" className="btn btn-primary" onClick={() => this.props.onDeleteClick(this.props.task.id)}>Delete</button>
                    </div>
                : "" }
                </div>
            </div >
        )
    }
}
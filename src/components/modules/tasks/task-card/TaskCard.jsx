import React from 'react';
import { Link } from 'react-router-dom';

export default class TaskCard extends React.Component {

    constructor(props) {
        super(props);

        this.loggedUser = localStorage.getItem('currentUser');
    }

    render() {
        return (
            <div class="col-md-4 mt-4">
                <div class="card profile-card-5">
                    <div class="card-img-block">
                        <img class="card-img-top" src="https://png.pngtree.com/png-vector/20190115/ourlarge/pngtree-vector-checklist-icon-png-image_319693.jpg" alt="Card image cap" />
                    </div>
                    <div class="card-body pt-0">
                        <h5 class="card-title">Title: {this.props.task.title}</h5>
                        <h6 class="card-text">Description: {this.props.task.description}</h6>
                        <h6 class="card-text">Assessment: {this.props.task.assessment}</h6>
                        <p class="card-text">Status: {this.props.task.taskStatus}</p>
                    </div>
                    <div style={{ textAlign: "right" }}>
                        <button type="button" className="btn btn-light">{(JSON.parse(this.loggedUser).isAdmin || JSON.parse(this.loggedUser).id === this.props.task.userId) && <Link {...this.props} to={`/tasks/edit/${this.props.task.id}`}>Edit</Link>}
                        </button>
                        <button type="button" className="btn btn-primary">{(JSON.parse(this.loggedUser).isAdmin || JSON.parse(this.loggedUser).id === this.props.task.userId) && <span onClick={() => this.props.onDeleteClick(this.props.task.id)}>Delete</span>}</button>
                    </div>
                </div>
            </div>
        )
    }
}
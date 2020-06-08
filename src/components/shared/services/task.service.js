import firebase from '../../../firebase/firebase';
import 'firebase/firestore';
import 'firebase/auth';
import TaskResponseModel from "../../modules/tasks/models/task-response-model.model";

export default class TaskService {
    constructor() {
        this.tasks = firebase.firestore().collection('Tasks');
        this.users = firebase.firestore().collection('Users');
    }

    async getTaskById(taskId) {
        let result = await this.tasks.where('id', "==", taskId).get();
        if (result) {
            let task = result.docs[0].data();
            let taskResponseModel = new TaskResponseModel(
                task.id,
                task.title,
                task.description,
                task.assessment,
                task.taskStatus,
                task.userId
            );
            return taskResponseModel;
        } else {
            return null;
        }
    }

    async getAllTasksByUserEmail(userEmail) {
        let allTasksArray = [];
        await this.getUserIdByEmail(userEmail).get().then(
            result => {
                if (result) {
                    let allTasks = this.tasks.where('userId', "==", result).get();
                    if (allTasks) {
                        allTasks.docs.forEach(doc => {
                            let currentTask = new TaskResponseModel(doc.data().id, doc.data().title, doc.data().description, doc.data().assessment, doc.data().taskStatus, doc.data().userId);
                            allTasksArray.push(currentTask);
                        });
                        return allTasksArray;
                    } else {
                        return null;
                    }
                }
            }
        );
    }

    async getAllTasks() {
        let allTasksArray = [];
        let result = await this.tasks.get();
        if (result) {
            result.docs.forEach(doc => {
                let currentTask = new TaskResponseModel(doc.data().id, doc.data().title, doc.data().description, doc.data().assessment, doc.data().taskStatus, doc.data().userId);
                allTasksArray.push(currentTask);
            });
            return allTasksArray;
        } else {
            return null;
        }
    }

    async getUserIdByEmail(userEmail) {
        let userId = null;
        await this.users.where('email', "==", userEmail).get().then(
            result => {
                if (result) {
                    userId = result.docs[0].id;

                    return userId;
                } else {
                    return null;
                }
            }
        );
    }

    async addTask(task) {
        if(!task.taskStatus){
            task.taskStatus = TaskStatus.Active;
        }
        const collectionId = this.tasks.doc().id;
        task.id = collectionId;
        await this.tasks.doc(collectionId).set({
            ...task
        });

        return task;
    }

    async updateTask(task) {
        let result = await this.getTaskById(task.id);
        if (result) {
            this.tasks.doc(result.id).update({
                ...task
            });
            return true;
        } else {
            return false;
        }
    }

    async deleteTask(taskId) {
        let result = await this.getTaskById(taskId);
        if (result) {
            this.tasks.doc(result.id).delete();
            return true;
        } else {
            return false;
        }
    }
}


export const TaskStatus = {
    Active: 'Active',
    Pending: 'Pending',
    Done: 'Done'
}
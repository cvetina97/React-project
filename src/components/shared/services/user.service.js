import firebase from '../../../firebase/firebase';
import UserResponseModel from '../../modules/users/models/user-response-model.model';

export default class UserService {
    constructor() {
        this.tasks = firebase.firestore().collection('Tasks');
        this.users = firebase.firestore().collection('Users');
    }

    async getUserById(userId) {
        debugger;
        let result = await this.users.where('id', "==", userId).get();
        if (result.docs.length > 0) {
            let user = result.docs[0].data();
            let userResponseModel = new UserResponseModel(
                user.id,
                user.email,
                user.password,
                user.firstName,
                user.lastName,
                user.isAdmin
            );
            return userResponseModel;
        } else {
            return false;
        }
    }

    async getUserByEmail(email) {
        debugger;
        let result = await this.users.where('email', "==", email).get();
        if (result.docs.length > 0) {
            let data = result.docs[0].data();
            let userResponseModel = new UserResponseModel(
                result.docs[0].id,
                data.email,
                data.password,
                data.firstName,
                data.lastName,
                data.isAdmin
            );

            return userResponseModel;
        } else {
            return null;
        }
    }

    async getAllUsers() {
        debugger;
        let usersToResponseModel = [];
        let users = await this.users.get();

        if (users) {
            users.docs.forEach(doc => {
                let currentUser = new UserResponseModel(doc.data().id, doc.data().email, doc.data().password, doc.data().firstName, doc.data().lastName, doc.data().isAdmin);
                usersToResponseModel.push(currentUser);
            });
            return usersToResponseModel;
        } else {
            return null;
        }
    }

    async addUser(user) {
        const collectionId = this.users.doc().id;
        user.id = collectionId;

        let result = await this.getUserByEmail(user.email);
        if (!result) {
            await this.users.doc(collectionId).set({
                ...user
            });
            return user;
        } else {
            return null;
        }
    }

    async updateUser(user) {
        let result = await this.getUserByEmail(user.email);
        if (result) {
            this.users.doc(result.id).update({
                ...user
            });
            return true;
        } else {
            return false;
        }
    }

    async deleteUserById(userId) {
        let result = await this.getUserById(userId);
        if (result) {
            this.users.doc(result.id).delete();
            this.deleteAssignedTasksToUser(result.id);
            return true;
        } else {
            return false;
        }
    }

    async deleteAssignedTasksToUser(userId) {
        debugger;
        let result = await this.tasks.where('userId', "==", userId).get();
        if (result.docs.length > 0) {
            result.docs.forEach(doc => {
                this.tasks.doc(doc.id).delete();
            });
        }
    }
}
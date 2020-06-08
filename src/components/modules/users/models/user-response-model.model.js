export default class UserResponseModel {
    constructor(
        id,
        email,
        password,
        firstName,
        lastName,
        isAdmin = false
    ) {
        this.id = id;
        this.email = email;
        this.password = password;
        this.firstName = firstName;
        this.lastName = lastName;
        this.isAdmin = isAdmin;
    }
}
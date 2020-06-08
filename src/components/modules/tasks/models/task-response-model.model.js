export default class TaskResponseModel {
    constructor(
        id,
        title,
        description,
        assessment,
        taskStatus,
        userId
    ) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.assessment = assessment;
        this.taskStatus = taskStatus;
        this.userId = userId;
    }
}
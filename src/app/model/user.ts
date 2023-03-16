export class User {
    firstname: string;
    lastname: string;
    username: string;
    password: string;

    constructor(firstname: string, username: string, password: string,lastname: string) {
        this.firstname = firstname
        this.lastname = lastname 
        this.username = username 
        this.password = password 
    }
}

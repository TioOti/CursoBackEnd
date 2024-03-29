import moment from 'moment';
export default class UserDTO {
    constructor(user){
        this.id = user._id || user.id;
        this.first_name = user.first_name;
        this.last_name = user.last_name;
        this.email = user.email;
        this.githubUser = user.githubUser;
        this.age = user.age;
        this.cart = user.cart;
        this.role = user.role;
        this.createdAt = moment(user.createdAt).format('MM/DD/YYYY');
        this.updatedAt = moment(user.updatedAt).format('MM/DD/YYYY');
        this.last_connection = moment(user.last_connection).format('MM/DD/YYYY');
    }
}
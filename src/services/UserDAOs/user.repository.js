import UserDTO from './userDTO.js';

export class UserRepository {
    constructor(dao){
        this.dao = dao;
    }
    

    async createUser(data){
        const user = await this.dao.createUser(data);
        const userDTO = new UserDTO(user);
        return userDTO;
    }
    
    async getUser(email){
        const user = await this.dao.getUser(email);
        const userDTO = user ? new UserDTO(user) : null;
        return userDTO; 
    }

    async getUsers(){
        const users = await this.dao.getUsers();
        const usersDTO = new UsersDTO(users);
        return usersDTO;
    }

    async getUserById(id){
        const user = await this.dao.getUserById(id);
        const userDTO = user ? new UserDTO(user) : null;
        return userDTO; 
    }

    async updateUser(email, data, updatePassword){
        const user = await this.dao.updateUser(email, data, updatePassword);
        const userDTO = user ? new UserDTO(user) : null;
        return userDTO;
    }

    async deleteUsers(){
        await this.dao.deleteUsers();
    }
}
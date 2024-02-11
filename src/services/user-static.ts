import { UserCreate, Users } from "../types/user-type";

let data =[
    { id:"1",
     name: "Manuel Vilaereca",
     email:'manuel@gmail.com',
     username:'Manuel',
     password:'Test@2022'
     },
     { id:"2",
     name: "Steve Vilaereca",
     email:'steven@gmail.com',
     username:'steven',
     password:'Steve@2022'
    }
 ];


export class UserStaticsService{
    public getAll(): Users[] {
        return data; 
   }
   public create(newUser:UserCreate) {
    const filteredData = data.filter(item => item.name.includes(newUser.name) || item.name.includes(newUser.email));

    if(filteredData.length > 0){
        return {
            message: 'User already exists'
        }
    } else {
        data.push({...newUser});
        return {
            message:`User ${newUser.id} has been created successfully`
        }
    }
    
   }

   public update(id: Users['id'],updateUser:Omit<UserCreate,'id'>){
        // find the index of user if exist or not
        const index = data.findIndex((item) => item.id === id);

       if(index != -1){
         // validate if use exist
         const existed = data[index];

        // assign the data in specific index
        const updatedData = {...existed,...updateUser};

        // replace the data that assign in given id
        data[index] = updatedData;

        // return the updated data
        return {
            message:`User ${updatedData.id} has been updated successfully`
        }
       }else{
        return {message:'User not found'}
       }

   }


   public delete(id:Users['id']){
    // find the id of users
    const index = data.findIndex((item) => item.id == id);
    // validate if user exist
    if(index !== -1){
        // remove the data of selected id

        const deleteUser = data.splice(index,1)[0];

        return {message:`Id ${deleteUser.id} has been deleted`}

    }else{
        return {message :'User id not found'}
    }

    

   }
   
}
interface Users {
    id?:string;
    name:string;
    age:number,
    address:string;
    gender:string;
    mobileNumber:string;
    email:string
    username:string
    password:string
  }
  
type UserCreate = Pick<Users,keyof Users>;


  export type {Users,UserCreate};
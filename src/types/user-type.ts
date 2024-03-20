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

interface Account {
	account_id?: string;
	user_id: string;
	displayName: string;
	email: string;
	photo: string;
}

  
type UserCreate = Pick<Users, keyof Users>;
type AccountDto = Pick<Account, keyof Account>;





  export type { Users, UserCreate, AccountDto };
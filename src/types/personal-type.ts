interface PersonalInformation {
	personal_id?: string;
	firstname: string;
	midlename: string;
	lastname: string;
	age: number;
	birthdate: string;
	gender: string;
	nationality: string;
	address: string;
	mobileNumber:string;
  account_id:string;
}


type PersonalDto =Pick<PersonalInformation,keyof PersonalInformation>;



export type { PersonalDto };
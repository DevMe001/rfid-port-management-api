type Passenger = {
	passenger_id?: string;
	firstname: string;
	lastname: string;
	gender: string;
	birthdate: string;
	fare_type: 'student' | 'regular' | 'adult' | 'minor';
	carrier_id: string;
};

type PassengerCarry = {
	carrier_id?: string;
	owner_name: string;
	plate_number: string;
	carrier_fee: number;
	vehicletype_id: string;
};


type PassengerDto = Pick<Passenger, keyof Passenger>;
type PassengeCarryDto = Pick<PassengerCarry, keyof PassengerCarry>;






export type { PassengerDto, PassengeCarryDto };
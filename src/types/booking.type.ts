export interface Booking {
	book_id?: string;
	passengers: string;
	seat_numbers: string;
	amount: number;
	service_charge: number;
	schedule_id: string;
	vehicle_id?: string;
	wallet_id: string;
	status: Status;
	createdAt?: Timestamp;
}


interface Timestamp{
 [key:string]:Date
}

type Status = 'pending' | 'approved' | 'rejected'

type BookingDto = Pick<Booking,keyof Booking>;


export type { BookingDto };
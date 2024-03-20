type Schedules = {
	schedule_id?: string;
	origin: string;
	destination: string;
	arrival_date: Date;
	arrival_time: string;
	seatRange: number;
	vehicle_id: string;
};

type ScheduleDto = Pick<Schedules, keyof Schedules>;

export type { ScheduleDto };
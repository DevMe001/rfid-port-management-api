type Vehicle={
  vehicle_id?:string;
  vehicle_name:string;
  vehicle_type:string;
  vehicle_photo:string;
  vehicle_price:number;

}


type VehicleCarry={
  vehicletype_id?:string;
  vehicletype_name:string;
}

type VehiclesDto = Pick<Vehicle, keyof Vehicle>;
type VehiclesCarryDto = Pick<VehicleCarry, keyof VehicleCarry>;


export type { VehiclesDto, VehiclesCarryDto };
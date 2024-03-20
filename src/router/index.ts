import PassengerRouter from "./passenger"
import BookingRouter from "./schedule/booking.router"
import ScheduleRouter from "./schedule/schedule.router"
import AccountRouter from "./user-module/accounts-router"
import AuthRouter from "./user-module/auth"
import UserPersonalDetailsRouter from "./user-module/personal-details.router"
import UserRouter from "./user-module/users"
import VehicleRouter from "./vehicle-module/vehicle.router"
import WalletRouter from "./wallet"

const   routeModules = [
  UserRouter, 
  AuthRouter, 
  AccountRouter, 
  VehicleRouter,
  ScheduleRouter,
  PassengerRouter,
  WalletRouter,
  UserPersonalDetailsRouter,
  BookingRouter
]

export default routeModules;
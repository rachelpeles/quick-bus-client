import { Passenger } from './passenger';
import { UsersAddress } from './users-address';

export class Transportation {
    constructor(
        public transportationId:string="",
        public description: string="",
        public travels : string[]=[],
        public usersAndAddress: UsersAddress[]=[],
        public waitingList: UsersAddress[]=[],
        public address:string="" ,
        public schedules=null,
        
    ){}
}
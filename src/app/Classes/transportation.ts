import { Passenger } from './passenger';
import { UsersAddress } from './users-address';

export class Transportation {
    constructor(
        public transportationId:string="",
        public description: string="",
        public travels : string[]=null,
        public usersAndAddress: UsersAddress[]=null,
        public waitingList: UsersAddress[]=null,
        public address:string="" ,
        public schedules:number=0,
        
    ){}
}
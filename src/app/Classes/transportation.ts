import { Time } from '@angular/common';

export class Transportation {
    constructor(
        public TransportationId:number=0,
        public StartTime:string="" ,
        public SourceStreet:string="" ,
        public SourceBuilding:string="" ,
        public Price:number=0 ,
        public VehicleId:number=0 ,
        
    ){}
}

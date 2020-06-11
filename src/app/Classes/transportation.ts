export class Transportation {
    constructor(
        public TransportationId:number=0,
        public OutletStreetId:number=0 ,
        public OutletBuilding:number=0 ,
        public DestinationStreetId:number=0 ,
        public DestinationBuilding:number=0 ,
        public VehicleId:number=0 ,
        public FrequencyId:number=0 ,
        public EstimatedStartTime:string="",
        public EstimatedEndTime:string="",
        public Day:string=""

    ){}
}

export class Establishment {
    constructor(
        public EstablishmentId:number=0,
        public StreetId:number=0,
        public Building:number=0,
        public EstablishmentName:string="",
        public ContactCell:string="",
        public Email:string="",
        public StartTime:string="",
        public EndTime:string="",
        public password:string=""
    ) { }
}

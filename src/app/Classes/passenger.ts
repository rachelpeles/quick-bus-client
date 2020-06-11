export class Passenger {
    constructor(
        public PassengerId:string="", 
        public PassengerFirstName:string="", 
        public PassengerLastName:string="", 
        public StreetId:Number=0, 
        public Building:Number=0 ,
        public Telephone:string="" ,
        public FatherCell:string="",
        public MotherCell:string="" ,
        public Email:string="" ,
        public EstablishmentId:Number=0,
        public password:string="",
        public UserName:string="" 
    ){}
}

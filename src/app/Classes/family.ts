export class Family {
    constructor(
        public userId: string="",
        public userName: string="",
        public password: string="",
        public phone: string="",
        public address:string[]=[],
        public email: string="",
        public type: number=0,
        public transportationCreated: string[]=[],
        public organizatioId: string="",
    ){}
}
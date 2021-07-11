import { Routes } from "./routes";

export class Schedules {
    constructor(
        public schduleId: string = null,
        public frequency: {} = null,
        public departureTime: string = "",
        public date: Date = null,
        public price: number = 0,
        public routes: Routes = new Routes()
    ){}
}

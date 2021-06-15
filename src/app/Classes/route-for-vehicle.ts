import { Station } from "./station";

export class RouteForVehicle {
    constructor(
        public vehicle: string = "",
        public duration: string = "",
        public todoLen: number = 0,
        public station: Station[] = []
    ){}
}
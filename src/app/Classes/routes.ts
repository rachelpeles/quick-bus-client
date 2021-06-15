import { RouteForVehicle } from "./route-for-vehicle";

export class Routes {
    constructor(
        public routeId: string = null,
        public travelMode: string = "",
        public isDispersion: boolean = true,
        public countUsers: number = 0,
        public routeForVehicle: RouteForVehicle[] = []
    ) { }
}

// import { Injectable } from '@angular/core';
// import { Member } from '../Classes/member';

// @Injectable({
//   providedIn: 'root'
// })
// export class MyService {

//   member:Member=new Member() ;
//   constructor() {
//     this.member.memberName=null;
//     this.member.password=null;

//    }



// }

import { Injectable } from '@angular/core';
import { Passenger } from '../Classes/passenger';

@Injectable({
  providedIn: 'root'
})
export class MyService {

  passenger:Passenger=new Passenger() ;
  constructor() {
    this.passenger.UserName=null;
    this.passenger.password=null;

   }
}

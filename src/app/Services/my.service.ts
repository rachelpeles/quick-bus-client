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
import { Family } from '../Classes/Family'

@Injectable({
  providedIn: 'root'
})
export class MyService {

  family:Family=new Family();
  constructor() {
    this.family.userName=null;
    this.family.password=null;

   }
}

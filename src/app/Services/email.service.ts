import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalService } from './global.service';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  myurl: any;
  constructor(private http: HttpClient, private globalService: GlobalService) {
    this.myurl = globalService.baseURL;
  }

  sendEmailToList(toList, subject, body)
  {
    this.http.get(this.myurl + 'api/Email/sendEmailCommit?email='+ toList+'&subjectMail='+subject+"&bodyMail="+body).subscribe(x=>console.log(x));
  }
}

import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalService } from './Services/global.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  // encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  title = 'p';
  navLinks: any[];
  activeLinkIndex = 0;
  thisUser: string;
  toolBar;
  constructor(private router: Router, private globalService: GlobalService) {
    this.navLinks = [
      {
        label: 'דף הבית',
        link: '',
        index: 0
      },
      {
        label: 'אזור אישי',
        link: './UserMain',
        index: 1
      }, {
        label: 'ההסעות שלי',
        link: './MyCreateTransportation',
        index: 2
      },

      {
        label: 'הצטרפות להסעה',
        link: './JoinToTransport',
        index: 3
      },
    ];
  }

  resetThisUser(thisUser) {
    this.thisUser = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).userName : 'הכנס';
  }

  route() {
    this.router.navigate([""]);
  }

  ngOnInit(): void {
    this.toolBar = this.globalService.isHome;
    this.router.events.subscribe((res) => {
      this.activeLinkIndex = this.navLinks.indexOf(this.navLinks.find(tab => tab.link === '.' + this.router.url));
    });
    this.resetThisUser(JSON.parse(localStorage.getItem('user')));

  }

  toUserMain() {
    this.router.navigate(['/UserMain']);
  }

  toEditPassernger() {
    this.router.navigate(['/EditPassenger']);
  }

  logInOut() {
    if (localStorage.getItem('user')) {
      localStorage.removeItem('user');
      this.resetThisUser('הכנס');
    }
    this.router.navigate(['/Home']);
  }

  CahngeRoute(link){
    
  }
}

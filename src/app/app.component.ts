import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

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
  constructor(private router: Router) {
    this.navLinks = [
      {
          label: 'בית',
          link: '',
          index: 0
      }, {
          label: 'הסעות (שיצרתי)',
          link: './MyCreateTransportation',
          index: 1
      }, {
          label: 'הצטרפות להסעה',
          link: './JoinToTransport',
          index: 2
      },
  ];
  }

  route()
  {
    this.router.navigate([""]);
  }
  ngOnInit(): void {
    this.router.events.subscribe((res) => {
        this.activeLinkIndex = this.navLinks.indexOf(this.navLinks.find(tab => tab.link === '.' + this.router.url));
    });
  }
}

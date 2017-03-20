import { Component, OnInit } from '@angular/core';
import { User } from '../user/user';

@Component({
  selector: 'app-dashboard',
  styleUrls: ['./full-layout.component.css'],
  templateUrl: './full-layout.component.html'
})
export class FullLayoutComponent implements OnInit {

  public disabled: boolean = false;
  public status: { isopen: boolean } = { isopen: false };
  private user: User;

  constructor() { }

  public toggled(open: boolean): void {
    console.log('Dropdown is now: ', open);
  }

  public toggleDropdown($event: MouseEvent): void {
    $event.preventDefault();
    $event.stopPropagation();
    this.status.isopen = !this.status.isopen;
  }

  ngOnInit(): void {
    const user = JSON.parse(localStorage.getItem('autopackt-currentUser'));
    this.user = user;
  }
}

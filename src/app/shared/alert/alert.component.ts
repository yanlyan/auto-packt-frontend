import { Component, OnInit } from '@angular/core';
import { AlertService } from './alert.service';
@Component({
    selector: 'alert',
    templateUrl: 'alert.component.html'
})
export class AlerComponent implements OnInit {
    message: any;

    constructor(private _alertService: AlertService) { }

    ngOnInit() {
        this._alertService.getMessage().subscribe(message => { this.message = message; });
    }
}

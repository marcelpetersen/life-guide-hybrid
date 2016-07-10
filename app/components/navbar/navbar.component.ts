import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CORE_DIRECTIVES } from '@angular/common'
import { NavController, Popover } from 'ionic-angular';
import { FirebaseAuth } from 'angularfire2';

@Component({
    selector: 'navbar',
    templateUrl: 'build/components/navbar/navbar.component.html',
    directives: [CORE_DIRECTIVES]
})
export class NavbarComponent implements OnInit {
    @Input() pageTitle: string;
    @Output() searchTrigger: EventEmitter<any> =  new EventEmitter();
    public showSearch: boolean = false;
    public username: string;
    public userImage: string;
    constructor(private _auth: FirebaseAuth) { }

    public searchItem(searchQuery: string): void {
        this.searchTrigger.emit(searchQuery);
    }

    public toggleSearch(): void {
        this.showSearch = !this.showSearch;
        this.searchTrigger.emit('');
    }

    ngOnInit(): void {
        this._auth.subscribe(authData => {
            if (authData) {
                this.username = authData.auth.displayName;
                this.userImage = authData.auth.photoURL;
            }
        });
        this.searchTrigger.emit('');
    }

}
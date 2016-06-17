import { Component, OnInit } from "@angular/core";
import { AngularFire, FirebaseAuth } from 'angularfire2';

@Component({
  templateUrl: 'build/pages/home/home.html'
})
export class HomePage implements OnInit{
  constructor(public af: AngularFire, public auth: FirebaseAuth) {
  }

  ngOnInit(): void {
    this.auth.subscribe(data => {
      if (data) {
        console.log(data);
      }
    });
  }
}

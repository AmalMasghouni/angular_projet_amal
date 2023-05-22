import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-modifier-dev',
  templateUrl: './modifier-dev.component.html',
  styleUrls: ['./modifier-dev.component.css']
})
export class ModifierDevComponent implements OnInit {
  id:any
  dev:any;
  constructor(private http:HttpClient,private act:ActivatedRoute){}
  ngOnInit(): void {
    this.id=this.act.snapshot.paramMap.get('id');
    this.http.get<any>("http://localhost:8080/api/auth/getDevById/"+this.id).subscribe(
      res=>{this.dev=res[0]},
      err=>{console.log(err)}
    )
  }

}

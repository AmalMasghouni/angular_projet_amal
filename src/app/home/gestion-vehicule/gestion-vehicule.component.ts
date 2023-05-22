import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-gestion-vehicule',
  templateUrl: './gestion-vehicule.component.html',
  styleUrls: ['./gestion-vehicule.component.css']
})
export class GestionVehiculeComponent implements OnInit {
  vehicule:any;
  searchTerm:""|undefined;
  constructor(private http:HttpClient){}
  ngOnInit(): void {
this.http.get<any>("http://localhost:8080/api/auth/getAllVehiculeMarque").subscribe(res=>{
  this.vehicule=res;
},err=>{console.log(err)})
  }
  delete(id:any){
    this.http.delete("http://localhost:8080/api/auth/delete-vehicule/"+id)
    .subscribe(res=>{
      this.ngOnInit();
    },err=>{console.log(err)})

  }

  performSearch(){
    if(this.searchTerm!=null && this.searchTerm.trim() !== ''){
    this.http.get<any>("http://localhost:8080/api/auth/chercherVehiculeparNom/"+this.searchTerm).subscribe(res=>{
      this.vehicule=res;
     },err=>{console.log(err)})
  }
else{this.http.get<any>("http://localhost:8080/api/auth/getAllVehiculeMarque").subscribe(res=>{
  this.vehicule=res;
},err=>{console.log(err)})}}


}

import { HttpClient } from '@angular/common/http';
import { OnInit } from '@angular/core';
import { Component } from '@angular/core';

@Component({
  selector: 'app-gestion-developpement',
  templateUrl: './gestion-developpement.component.html',
  styleUrls: ['./gestion-developpement.component.css']
})
export class GestionDeveloppementComponent implements OnInit {
  devl:any;
  utilisateur :any
  marque:any
  modele:any
  version:any
  site:any
 refCdc:any
 selectedMarque= '';
 selectedModele = '';
 selectedVersion= '';
 selectedSite= '';
 selectedUtilisateur = '';
 selectedRefCdc='';
 options:any[] = [];
  constructor(private http: HttpClient){}
  ngOnInit(): void {
    this.http.get<any>("http://localhost:8080/api/auth/getAllDev").subscribe(
      Response=>{this.devl=Response;},
      err=>{console.log(err)}
    )
    this.http.get<any>("http://localhost:8080/api/auth/selectMarque").subscribe(
      res=>{this.marque="",
            this.marque=res
            },
      err=>{console.log(err)}
    )

    this.http.get<any>("http://localhost:8080/api/auth/selectModele").subscribe(
      res=>{this.modele="",
            this.modele=res },
      err=>{console.log(err)}
    )

this.http.get<any>("http://localhost:8080/api/auth/selectVersion").subscribe(
  res=>{this.version="",
        this.version=res },
  err=>{console.log(err)}
)
this.http.get<any>("http://localhost:8080/api/auth/selectSite").subscribe(
  res=>{this.site="",
        this.site=res },
  err=>{console.log(err)}
)
this.http.get<any>("http://localhost:8080/api/auth/selectUtilisateur").subscribe(
  res=>{this.utilisateur="",
        this.utilisateur=res },
  err=>{console.log(err)}
)
this.http.get<any>("http://localhost:8080/api/auth/selectCdc").subscribe(
  res=>{this.refCdc="",
        this.refCdc=res },
  err=>{console.log(err)}
)



  }
  onMarqueSelected() {
    console.log("methodeape",this.selectedMarque);
    if (this.selectedMarque) {
      this.http.get<any>("http://localhost:8080/api/auth/selectModeleByMarque/" + this.selectedMarque).subscribe(
        res => {
          this.modele= res;
        },
        err => {
          console.log(err);
        }
      );
    } else {
      this.http.get<any>("http://localhost:8080/api/auth/selectModele").subscribe(
        res=>{this.modele="",
              this.modele=res },
        err=>{console.log(err)}
      )
    }


  }

filtrer(){
  this.options.push(this.selectedModele, this.selectedMarque,this.selectedVersion,this.selectedSite,this.selectedUtilisateur,this.selectedRefCdc);
  const filters = this.options.reduce((obj, item, index) => {
    const key = ['modele', 'marque', 'version', 'site', 'utilisateur', 'cdc'][index];
    obj[key] = item;
    return obj;
  }, {});
  this.http.get<any>(`http://localhost:8080/api/auth/filtrer`, { params: filters }).subscribe(
    res=>{this.devl=res},
    err=>{console.log(err)}
  )
  }
  searchTermDll:any
  SearchDll(){
      if(this.searchTermDll!=null && this.searchTermDll.trim() !== ''){
        this.http.get<any>("http://localhost:8080/api/auth/cherhcherparDll/"+this.searchTermDll)
        .subscribe(res=>{this.devl=res}
          ,err=>{console.log(err)})
      }
      else{this.http.get<any>("http://localhost:8080/api/auth/getAllDev").subscribe(res=>{
        this.devl=res
      },err=>{console.log(err)})}

    }
    searchTermNDev:any
  SearchNdev(){
    if(this.searchTermNDev!=null && this.searchTermNDev.trim() !== ''){
      this.http.get<any>("http://localhost:8080/api/auth/getDevById/"+this.searchTermNDev)
      .subscribe(res=>{this.devl=res}
        ,err=>{console.log(err)})
    }
    else{this.http.get<any>("http://localhost:8080/api/auth/getAllDev").subscribe(res=>{
      this.devl=res
    },err=>{console.log(err)})}
  }

}

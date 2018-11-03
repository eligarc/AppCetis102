import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Platform } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';

import { SocialSharing } from '@ionic-native/social-sharing';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
   films:Observable<any>;
   avisos:Observable<any>;
   galeria:Observable<any>;
   pet: string ="Eventos";
   isAndroid: boolean = false;
   //local:any;
   items: any;
  constructor(public navCtrl: NavController,public http: Http,
     public loadingController:LoadingController, public platform:Platform, private sharingVar:SocialSharing) 
  { 
  /*this.films=this.http.get('http://192.168.1.3/cetis/index.php/anuncios');
    this.films
    .map(res =>res.json())
    .subscribe(data=>{
      var datos=data;
      console.log('Mis datos',datos);
  })*/
   
    this.isAndroid=platform.is('android');
    
   
       this.films = this.http.get('https://www.cetis102.edu.mx/cetis/index.php/anuncios').map(res => res.json());
      
       this.avisos = this.http.get('https://www.cetis102.edu.mx/cetis/index.php/avisos').map(res => res.json());
       this.galeria=this.http.get('https://www.cetis102.edu.mx/cetis/index.php/galeria').map(res => res.json());
           
      }
      whatsappShare(){
        this.sharingVar.shareViaWhatsApp("Esta es la app Oficial del CETis 102",null, "https://www.cetis102.edu.mx" )
          .then(()=>{
            //alert("exitoso");
            console.log('Exitoso');
          },
          ()=>{
             //alert("fallida")

             console.log('fallida');
          })
      }

    

 

  openDetails(film) {
    this.navCtrl.push('DetallesPage', {film: film});
  }

  doRefresh(refresher) {
    console.log('Begin async operation', refresher);

    setTimeout(() => {
      console.log('Async operation has ended');
      this.films = this.http.get('https://www.cetis102.edu.mx/cetis/index.php/anuncios').map(res => res.json());
      this.avisos = this.http.get('https://www.cetis102.edu.mx/cetis/index.php/avisos').map(res => res.json());
      this.galeria=this.http.get('https://www.cetis102.edu.mx/cetis/index.php/galeria').map(res => res.json());
          
      refresher.complete();
    }, 2000);
  }



}

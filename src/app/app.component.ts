import { Component,ViewChild } from '@angular/core';
import { Platform,Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {InsertPage} from '../pages/insert/insert';
import { ReinscripcionPage } from '../pages/reinscripcion/reinscripcion';

import {AlertController} from "ionic-angular";
import { HomePage } from '../pages/home/home';
import {AcercaPage} from '../pages/acerca/acerca';
import { Push, PushObject, PushOptions } from '@ionic-native/push';
import { Http} from '@angular/http';
import 'rxjs/add/operator/map';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild('NAV') nav:Nav;
  
  public rootPage:any;
  public pages: Array<{titulo: string,component:any,icon:string}>;

  constructor(public http:Http,platform: Platform, statusBar: StatusBar,
 splashScreen: SplashScreen,private push: Push,public alertCtrl: AlertController) {
  this.rootPage = HomePage;
  this.pages=[
   {titulo:"Inicio",component:HomePage,icon:"home"},
   {titulo:"Solicitud de Inscripción",component:InsertPage,icon:"create"},
   {titulo:"Solicitud de Reincripción",component:ReinscripcionPage,icon:"create"},
   {titulo:"Acerca",component:AcercaPage,icon:"share"}
  ];

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      this.initPushNotification();

    });
  }

saveDeviceToken(t)
{  

        this.http.get('https://www.cetis102.edu.mx/push/saveToken.php?token='+t)
            .map(res => res.json())
                .subscribe(
                  data => {
        alert(JSON.stringify(data));
    },
    err => {
        console.log("Oops!");
    }
                );

}
  initPushNotification()
  {
    // to check if we have permission
this.push.hasPermission()
  .then((res: any) => {

    if (res.isEnabled) {
      console.log('We have permission to send push notifications');
    } else {
      console.log('We don\'t have permission to send push notifications');
    }

  });

// to initialize push notifications

const options: PushOptions = {
   android: {
       
   },
   ios: {
       alert: 'true',
       badge: true,
       sound: 'false'
   },
   windows: {}
};

const pushObject: PushObject = this.push.init(options);

pushObject.on('notification').subscribe((notification: any) =>{
  console.log('Received a notification', notification);

  //Notification Display Section
   let confirmAlert = this.alertCtrl.create({
          title: 'Nueva notificación',
          message: JSON.stringify(notification),
          buttons: [{
            text: 'Ignorar',
            role: 'Cancelar'
          }, {
            text: 'Ver',
            handler: () => {
              //TODO: Your logic here
              //self.nav.push(DetailsPage, {message: data.message});
            }
          }]
        });
        confirmAlert.present();
  //
});

pushObject.on('registration').subscribe((registration: any) => {
  //console.log('Device registered', registration);
  //alert(JSON.stringify(registration));
  this.saveDeviceToken( registration.registrationId);
});

pushObject.on('error').subscribe(error => console.error('Error with Push plugin', error));
  }
  goToPage(page){
    this.nav.setRoot(page);
  }

}


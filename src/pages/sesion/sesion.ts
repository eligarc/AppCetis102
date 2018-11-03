import { Component } from '@angular/core';
import {  NavController,ToastController } from 'ionic-angular';
import {AuthService} from "../../providers/auth-service/auth-service";
import {InsertPage} from '../../pages/insert/insert';


@Component({
  selector: 'page-sesion',
  templateUrl: 'sesion.html',
})
export class SesionPage {
  
  resposeData : any;
  userData = {"username":"", "password":""};

  constructor(public navCtrl: NavController, public authService: AuthService, private toastCtrl:ToastController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Login');
  }

  login(){
   if(this.userData.username && this.userData.password){
    this.authService.postData(this.userData, "login").then((result) =>{
    this.resposeData = result;
    console.log(this.resposeData);
    if(this.resposeData.userData){
     localStorage.setItem('userData', JSON.stringify(this.resposeData) )
    this.navCtrl.push(InsertPage);
  }
  else{
    this.presentToast("Please give valid username and password");
  }
    

    }, (err) => {
      //Connection failed message
    });
   }
   else{
    this.presentToast("Give username and password");
   }
  
  }


  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }

}
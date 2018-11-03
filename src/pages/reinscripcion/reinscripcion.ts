import { Component } from '@angular/core';
import {  NavController, NavParams,AlertController } from 'ionic-angular';
import {ServiceProvider} from '../../providers/service/service';
import { HomePage } from "../home/home";

/**
 * Generated class for the ReinscripcionPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */


@Component({
  selector: 'page-reinscripcion',
  templateUrl: 'reinscripcion.html',
})
export class ReinscripcionPage {
	miModelo: any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public service: ServiceProvider,public alertCtrl: AlertController) {
		this.miModelo = {};
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReinscripcionPage');
  }
  public envioDato(req)
	{
		this.service.dataRegister1(req.value)
			.subscribe(
						data=>{
							this.showAlert(data.mensaje);
							this.navCtrl.setRoot(HomePage);
							//console.log(data.mensaje);
						},
						err=>console.log(err)			
			);
	}

public 	showAlert(men)
	{
		let alert = this.alertCtrl.create({
		  title: 'Información!',
		  subTitle: men,
		  buttons: ['OK']
		});
		alert.present();
	}

}

import { Component,ViewChild } from '@angular/core';
import { NavParams, AlertController } from 'ionic-angular';
import {ServiceProvider} from '../../providers/service/service';
import { HomePage } from "../home/home";
import { NavController, ActionSheetController, ToastController, Platform, LoadingController, Loading } from 'ionic-angular';
import { File } from '@ionic-native/file';
import { Transfer, TransferObject } from '@ionic-native/transfer';
import { FilePath } from '@ionic-native/file-path';
import { Camera } from '@ionic-native/camera';
import { DatePickerDirective } from 'ion-datepicker';


declare var cordova: any;

@Component({
  selector: 'page-insert',
	templateUrl: 'insert.html',
	providers:[DatePickerDirective],
})
export class InsertPage {
	@ViewChild(DatePickerDirective) public datepicker: DatePickerDirective;
  public localDate: Date = new Date();
  public initDate: Date = new Date();
  public initDate2: Date = new Date(2015, 1, 1);
  public disabledDates: Date[] = [new Date(2017, 7, 14)];
  public localeString = {
    monday: true,
    weekdays: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'],
    months: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
  };
  public maxDate: Date = new Date(new Date().setDate(new Date().getDate() + 30));
  public min: Date = new Date()
  
	lastImage: string = null;
	loading: Loading;
	miModelo: any;
	constructor(public navCtrl: NavController, public navParams: NavParams,public service: ServiceProvider,public alertCtrl: AlertController,
		private camera: Camera, private transfer: Transfer, private file: File, private filePath: FilePath, public actionSheetCtrl: ActionSheetController, 
		public toastCtrl: ToastController, public platform: Platform, public loadingCtrl: LoadingController) {

		
			this.miModelo = {};
		
		}

	
		public ngOnInit() {
			
				}
				public Log(stuff): void {
					this.datepicker.open();
					this.datepicker.changed.subscribe(() => console.log('test'));
					console.log(stuff);
				}
			
				public event(data: Date): void {
					this.localDate = data;
				}
				setDate(date: Date) {
					console.log(date);
					this.initDate = date;
				}

  public presentActionSheet(){
		let actionSheet=this.actionSheetCtrl.create({
			title:'Selecciona la foto',
			buttons:[
				{
					text:'Cargar desde la galería',
					handler:()=>{
						this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
					}
				},{
					text:'Usar la camara',
					handler:()=>{
						this.takePicture(this.camera.PictureSourceType.CAMERA);
					}
				},{
					text:'cancelar',
				 role:'cancel'
				}
			]
		});
		actionSheet.present();
	}
	
	public takePicture(sourceType) {
		// Create options for the Camera Dialog
		var options = {
			quality: 100,
			sourceType: sourceType,
			saveToPhotoAlbum: false,
			correctOrientation: true
		};
	 
		// Get the data of an image
		this.camera.getPicture(options).then((imagePath) => {
			// Special handling for Android library
			if (this.platform.is('android') && sourceType === this.camera.PictureSourceType.PHOTOLIBRARY) {
				this.filePath.resolveNativePath(imagePath)
					.then(filePath => {
						let correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
						let currentName = imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.lastIndexOf('?'));
						this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
					});
			} else {
				var currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
				var correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
				this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
			}
		}, (err) => {
			this.presentToast('Error while selecting image.');
		});
	}

	// Create a new name for the image
private createFileName() {
  var d = new Date(),
  n = d.getTime(),
  newFileName =  n + ".jpg";
  return newFileName;
}
 
// Copy the image to a local folder
private copyFileToLocalDir(namePath, currentName, newFileName) {
  this.file.copyFile(namePath, currentName, cordova.file.dataDirectory, newFileName).then(success => {
    this.lastImage = newFileName;
  }, error => {
    this.presentToast('Error while storing file.');
  });
}
 
private presentToast(text) {
  let toast = this.toastCtrl.create({
    message: text,
    duration: 3000,
    position: 'top'
  });
  toast.present();
}
 
// Always get the accurate path to your apps folder
public pathForImage(img) {
  if (img === null) {
    return '';
  } else {
    return cordova.file.dataDirectory + img;
  }
}

public uploadImage() {
  // Destination URL
  var url = "http://www.cetis102.edu.mx//uploads.php";
 
  // File for Upload
  var targetPath = this.pathForImage(this.lastImage);
 
  // File name only
  var filename = this.lastImage;
 
  var options = {
    fileKey: "file",
    fileName: filename,
    chunkedMode: false,
    mimeType: "multipart/form-data",
    params : {'fileName': filename}
  };
 
  const fileTransfer: TransferObject = this.transfer.create();
 
  this.loading = this.loadingCtrl.create({
    content: 'Cargando...',
  });
  this.loading.present();
 
  // Use the FileTransfer to upload the image
  fileTransfer.upload(targetPath, url, options).then(data => {
    this.loading.dismissAll()
    this.presentToast('Imagen cargado carrectamente.');
  }, err => {
    this.loading.dismissAll()
    this.presentToast('Error mientras se cargaba el archivo.');
  });
}
	public envioDato(req)
	{
		this.service.dataRegister(req.value)
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
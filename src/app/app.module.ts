import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpModule } from '@angular/http';
import { IonicStorageModule } from '@ionic/storage';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ReinscripcionPage } from '../pages/reinscripcion/reinscripcion';
import { ServiceProvider } from '../providers/service/service';
import {InsertPage} from '../pages/insert/insert';
import {AcercaPage}  from '../pages/acerca/acerca';
import { ListInscripcionPage } from '../pages/list-inscripcion/list-inscripcion';
import {SesionPage} from '../pages/sesion/sesion';
import { Login } from '../pages/login/login';
import { File } from '@ionic-native/file';
import { Transfer } from '@ionic-native/transfer';
import { FilePath } from '@ionic-native/file-path';
import { Camera } from '@ionic-native/camera';
import { Push } from '@ionic-native/push';
import { Calendar } from '@ionic-native/calendar';
import { FormsModule } from '@angular/forms'; 
import { CustomFormsModule} from 'ng2-validation';
import { DatePickerModule } from 'ion-datepicker';
import { AuthService } from '../providers/auth-service/auth-service';
import { SocialSharing } from '@ionic-native/social-sharing';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    InsertPage,
    Login,
    AcercaPage,
    ListInscripcionPage,
    
    SesionPage,
    ReinscripcionPage
  ],
  imports: [
    BrowserModule,
    FormsModule,
    CustomFormsModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    DatePickerModule
 //   IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    InsertPage,
    AcercaPage,
    ListInscripcionPage,
    Login,
    SesionPage,
   
    ReinscripcionPage
  ],
  providers: [
    Push,
    StatusBar,
    SplashScreen,
    File,
    Calendar,
    Transfer,
    Camera,
    FilePath,IonicStorageModule,{provide: ErrorHandler, useClass: IonicErrorHandler},
    ServiceProvider,
    SocialSharing,
   AuthService
  ]
})
export class AppModule {}

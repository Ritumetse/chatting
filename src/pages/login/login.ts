import { ChatroomPage } from './../chatroom/chatroom';
import { Component } from '@angular/core';
import { AuthProvider } from './../../providers/auth/auth';
import { Alert, AlertController, Loading, LoadingController, IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { ResetPasswordPage } from '../reset-password/reset-password';
import { SignUpPage } from '../sign-up/sign-up';


/**
* Generated class for the LoginPage page.
*
* See https://ionicframework.com/docs/components/#navigation for more info on
* Ionic pages and navigation.
*/

@IonicPage()
@Component({
 selector: 'page-login',
 templateUrl: 'login.html',
})
export class LoginPage {


 private load:Loading;
 email:string;
 password:string;

   constructor(public navCtrl: NavController, private loadingCTR: LoadingController,
   private alertCTR: AlertController, private authPROV: AuthProvider) {
   }

   ionViewDidLoad() {
     console.log('ionViewDidLoad LoginPage');
   }

 goToSignUp():void{
   this.navCtrl.push(SignUpPage);
 }

 signIn(){
   if(!this.email && !this.password){
     console.log('error');
   }else{
     this.authPROV.signIn(this.email,this.password)
     .then(authPROV =>{
       this.load.dismiss().then(()=>{
         this.navCtrl.setRoot(ChatroomPage);
       })
     },error=>{
       this.load.dismiss().then(()=>{
         const alert :Alert = this.alertCTR.create({
           message:error.message,
           buttons:[{text:'ok',role:'cancel'}]
         })
         alert.present();
       })
     })
     this.load = this.loadingCTR.create();
     this.load.present();
   }

   }
   passwordreset(){
     this.navCtrl.push(ResetPasswordPage);
   }
}
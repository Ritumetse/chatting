import { ChatroomPage } from './../pages/chatroom/chatroom';
import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import * as firebase from 'firebase';

const config = {
  apiKey: "AIzaSyD793Jm0b_FqhARcqCTnAMQXd6PwErdFVM",
  authDomain: "chatting-c0ae2.firebaseapp.com",
  databaseURL: "https://chatting-c0ae2.firebaseio.com",
  projectId: "chatting-c0ae2",
  storageBucket: "chatting-c0ae2.appspot.com",
  messagingSenderId: "259230742527"
};
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = LoginPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
    firebase.initializeApp(config);
    const unsubscribe=firebase.auth().onAuthStateChanged(user=>{
      if(!user){
        // this.rootPage=('LoginPage');
        unsubscribe();
      }
      else{
        this.rootPage= 'ChatroomPage';
        unsubscribe();
      }
    });
  }
}



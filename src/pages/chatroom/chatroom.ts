import { ProfileProvider } from './../../providers/profile/profile';
import { HomePage } from './../home/home';
import { AuthProvider } from './../../providers/auth/auth';
import { ProfilePage } from './../profile/profile';
import { LoginPage } from './../login/login';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Alert, AlertController } from 'ionic-angular';
import { ChatRoomsProvider } from '../../providers/chat-rooms/chat-rooms';

/**
* Generated class for the ChatroomPage page.
*
* See https://ionicframework.com/docs/components/#navigation for more info on
* Ionic pages and navigation.
*/

@IonicPage()
@Component({
 selector: 'page-chatroom',
 templateUrl: 'chatroom.html',
})
export class ChatroomPage {

 chatRoomList:Array<any>;
 userProfile:any;
 name:string;

 constructor(public navCtrl: NavController,private pro:ProfileProvider, private authPROV:AuthProvider, public navParams: NavParams, private chatRoom:ChatRoomsProvider,private alertCTR: AlertController) {
 }
 ionViewCanEnter(){
   this.chatRoom.getChatRoomList().off;
}
ionViewDidLoad() {

  this.chatRoom.getChatRoomList().on('value',chatRoomsListSnapChat=>{
     this.chatRoomList=[];
     chatRoomsListSnapChat.forEach(snap=>{
        this.chatRoomList.push({
          id:snap.key,
          name:snap.val().chatRoomName
        });
        return false;
     })
  })
  this.pro.getUserProfile().on('value',userProfileSnapShot=>{
    this.userProfile =userProfileSnapShot.val();
    console.log("pro",this.userProfile)
  })
}

createChatRooom(){
  let alert:Alert =this.alertCTR.create({
    message:'Please enter a chat room',
    inputs:[{
      name:'name',
      placeholder:'Enter chat room name'
    }],
    buttons:[{
        text:'Cancel',
        role:'cancel'
      },
      {
        text:'ok',
        handler:data=>{
          this.chatRoom.createRoom(data.name).then(newChatRoom=>{
          });
        }
      }
    ]
  })
  alert.present();
}
profile(){
  this.navCtrl.push(ProfilePage);
}
logout(){
  this.authPROV.signOut().then(()=>{
     this.navCtrl.push(LoginPage);
  });

}
joinRoom(key){
  console.log( this.userProfile);
  if( !this.userProfile.hasOwnProperty ('firstName') ||  !this.userProfile.hasOwnProperty('lastName'))
{
  let alert :Alert = this.alertCTR.create({
    message: 'you need to update your profile before entering the chat',
buttons:[{
text: 'cancel',
role: 'cancel',
},{
text :'update profile',
handler:data =>{
  this.navCtrl.push('ProfilePage')
}

}]
  })
  alert.present();
}
else{
  this.navCtrl.setRoot(HomePage,{
    'key':key,'userProfile':this.userProfile
  })
}
}

}
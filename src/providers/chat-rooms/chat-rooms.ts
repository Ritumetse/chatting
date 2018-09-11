import { Injectable } from '@angular/core';
import firebase from 'firebase/app';
import 'firebase/database';

@Injectable()
export class ChatRoomsProvider {
  private chatRoomlistRef:firebase.database.Reference;
  constructor() {
    firebase.auth().onAuthStateChanged(user=>{
      if(user){
        this.chatRoomlistRef=firebase.database().ref(`/userProfile/${user.uid}/chatRooms`);
        
      }
    })
  }
  createRoom(name:string):firebase.database.ThenableReference{
     return this.chatRoomlistRef.push({
       chatRoomName:name
     }) 
    
  }
  getChatRoomList():firebase.database.Reference{
    return this.chatRoomlistRef;
  }
}


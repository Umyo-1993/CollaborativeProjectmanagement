import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View , FlatList,TextInput} from 'react-native'

import { auth } from '../firebase'
import {  signOut } from "firebase/auth";
import { db } from '../firebase';
import {   getDatabase,ref, onValue ,set} from "firebase/database";

import { useState, useEffect } from "react";
import { Linking } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';


const invitationscreen=({navigation})=>{
  const [person1, setperson1] = React.useState("");
  const [code, setcode] = React.useState("");
  const [officename, setofficename] = React.useState("");
  var a="nocturnalboys007@gmail.com"

  return(
<View style={styles.container}>

<TextInput
        placeholder='Invite and type email'
        value={person1}
       
        onChangeText={newtext=>setperson1(newtext)}             
        />
        <TextInput
        placeholder='Officename'
        value={officename}
       
        onChangeText={newtext=>setofficename(newtext)}
               
        />
        <TextInput
        placeholder='Code'
        value={code}
       
        onChangeText={newtext=>setcode(newtext)}
               
        />
        <TouchableOpacity
        
         onPress={() => Linking.openURL('mailto:'+ person1 +'?subject=Code and officename&body=please send the data'+' Code  : '+code + 'Officename : '+officename) }
  
        style={styles.button}
      >
        <Text style={styles.buttonText}>Send</Text>
   </TouchableOpacity>

   
   <TouchableOpacity  style={styles.button} onPress={()=>navigation.navigate('Home',{Code:code,Office:officename})}>
   <Text style={styles.buttonText}>Proceed</Text>
   </TouchableOpacity>
      </View>
  )
}
export default invitationscreen;
const styles = StyleSheet.create({
  container: {
    marginTop:30,
    padding:2,
  },
   button: {
    backgroundColor: '#0782F9',
    width: '60%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 40,
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
  item: {
    backgroundColor: '#f5f520',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  addWrapper: {
    width: 60,
    height: 60,
    backgroundColor: '#FFF',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#C0C0C0',
    borderWidth: 1,
  },
  RectangleShapeView: {
    borderRadius: 5,
    // Set border width.
    borderWidth: 2,
    // Set border Hex Color Code Here.
    borderColor: '#FF5722', 
    // Setting up Text Font Color.
    color: '#000',
    // Setting Up Background Color of Text component.
    backgroundColor : '#CDDC39', 
    // Adding padding on Text component.
    padding : 2,
    fontSize: 14,
    textAlign: 'center',
    margin: 5
   
    }
   
  
})
//invitation and create both own and invited and show ..own is only todo list 
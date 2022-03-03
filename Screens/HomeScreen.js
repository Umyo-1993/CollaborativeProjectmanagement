import { useNavigation } from '@react-navigation/core'
import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View , FlatList} from 'react-native'
import { auth } from '../firebase'
import {  signOut } from "firebase/auth";
import { db } from '../firebase';
import {   getDatabase,ref, onValue ,set} from "firebase/database";
import { useState, useEffect } from "react";


const HomeScreen=()=>  {
  const navigation = useNavigation()
  //const [todo, setTodo] = useState("");
  const [value, setvalue] = useState([]);
  const  dbs = getDatabase();
  var array=[];
  var a;
  const DATA = [
    {
      id:"1",
      title:"Data Structures"
    },
    {
      id:"2",
      title:"STL"
    },
    {
      id:"3",
      title:"C++"
    },
    {
      id:"4",
      title:"Java"
    },
    {
      id:"5",
      title:"Python"
    },
    {
      id:"6",
      title:"CP"
    },
    {
      id:"7",
      title:"ReactJs"
    },
    {
      id:"8",
      title:"NodeJs"
    },
    {
      id:"9",
      title:"MongoDb"
    },
    {
      id:"10",
      title:"ExpressJs"
    },
    {
      id:"11",
      title:"PHP"
    },
    {
      id:"12",
      title:"MySql"
    },
  ];
 

 const Item = ({title}) => {
  return( 
    <View style={styles.item}>
      <Text>{title}</Text>
    </View>
  );
}
  useEffect(()=>{

    onValue(ref(dbs,'/users'), (snapshot) => {
      snapshot.forEach((childSnapshot) => {
     
       const childKey = childSnapshot.key;
       const childData = childSnapshot.val();
      // const childData = childSnapshot.child("name").val();
       
     

       array.push({key:childSnapshot.child("name").val()});
     
      //  array.push({childData});
        setvalue(array);

        

      });
     
   
      const data = snapshot.val();
      if (data !== null) {
        console.log(data);
      }
     
    });
  },[]); 
  
  console.log(value);
  const renderItems=({item})=>
  {
    <View style={styles.container}>
    <Text>Email: {item.key}</Text>
    
  
  </View>
  }

  const handleSignOut = () => {
    signOut(auth).then(() => {
      // Sign-out successful.
      navigation.replace("Login");
      console.log("Logout success");
    }).catch((error) => {
      // An error happened.
      console.log(error);
    });
    
  /*  onValue(ref(dbs,'/users'), (snapshot) => {
      snapshot.forEach((childSnapshot) => {
       var array=[];
       const childKey = childSnapshot.key;
       const childData = childSnapshot.val();
       
     

        array.push(childData);
        console.log(array);

      });
   
  /*    const data = snapshot.val();
      if (data !== null) {
        console.log(data);
      }
    }); */

  }

/*    return (
      <View style={styles.container}>
     <Text>Email: {auth.currentUser?.email}</Text>
      <Text>Email: {a}</Text>
    
      <TouchableOpacity
        onPress={handleSignOut}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Sign out</Text>
      </TouchableOpacity>
     
    
    </View>
    )*/
    const renderItemupdated = ({item})=>( 
      <Text>Student's Name: {item.key}</Text>
      
     
    );
    return (
      <View style={styles.container}>
        <FlatList
       data={value}
       
       keyExtractor={(item) => item.key}
       renderItem={renderItemupdated}
          
      
         
    />
    
    <TouchableOpacity
        onPress={handleSignOut}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Sign out</Text>
      </TouchableOpacity>
    
    </View>
    )
}
export default HomeScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
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
})
//https://www.freecodecamp.org/news/react-native-firebase-tutorial/
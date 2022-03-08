
import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View , FlatList} from 'react-native'
import { auth } from '../firebase'
import {  signOut } from "firebase/auth";
import { db } from '../firebase';
import {   getDatabase,ref, onValue ,set} from "firebase/database";
import { useState, useEffect } from "react";


const HomeScreen=({navigation})=>  {
 
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

        const IELTS=childSnapshot.child("IELTS").val();
        const name=childSnapshot.child("name").val();
        const childkey=childSnapshot.key;
        array.push({name : name,IELTS: IELTS,key:childkey});
      
      // const childData = childSnapshot.child("name").val();
       
     


    //   array.push({key:childKey});
   //  array.push({name:childSnapshot.child("name").val()});
    // array.push({IELTS:childSnapshot.child("IELTS").val()});
   //    array.push({IELTS:childSnapshot.child("IELTS").val()});
     
      //  array.push({childData});
        

       

      });
     
   
      const data = snapshot.val();
      if (data !== null) {
        
        setvalue(array);
      }
     
    });
  },[]); 
  
  console.log(value);
  

  const handleSignOut = () => {
    signOut(auth).then(() => {
      // Sign-out successful.
      navigation.navigate("Login");
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
      <Text>Student's Name: {item.name}</Text>   
      
  
    );
   
    return (
      <View style={styles.container}>
       
        <FlatList
       data={value}     
       
       keyExtractor={(item) => item.key}
    //   renderItem={renderItemupdated}
    renderItem={({ item }) => {
      // return <Text>{item.name}</Text>;

        return(
          <TouchableOpacity onPress={()=>navigation.navigate('Details',{key:item.key})}>
          
          <Text>
          {item.name}
         </Text>
         
         
         
          </TouchableOpacity>
          
         )
      }}
        
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
})
//https://www.freecodecamp.org/news/react-native-firebase-tutorial/v
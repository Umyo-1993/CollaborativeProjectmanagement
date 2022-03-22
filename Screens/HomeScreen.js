
import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View , FlatList,TextInput} from 'react-native'
import { auth } from '../firebase'
import {  signOut } from "firebase/auth";
import { db } from '../firebase';
import {   getDatabase,ref, onValue ,set} from "firebase/database";

import { useState, useEffect } from "react";


const HomeScreen=({navigation})=>  {
 
  //const [todo, setTodo] = useState("");
  const [value, setvalue] = useState([]);
  const [valueinvite, setvalueinvite] = useState([]);
  const [text, setText] = React.useState("");
  const [deadline, setdeadline] = React.useState("");
  const [description, setdescription] = React.useState("");
 
  const  dbs = getDatabase();
  var array=[];
  var arrayinvite=[];
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
  const handleAddTask = () => {
  
    setTaskItems([...taskItems, task])
    setTask(null);
  }

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
        const projectname=childSnapshot.child("projectname").val();
        const pdead=childSnapshot.child("projectdeadline").val();
        const childkey=childSnapshot.key;
        array.push({name : name,IELTS: IELTS,key:childkey,projectname:projectname,projectdeadline:pdead});
      
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
  useEffect(()=>{

    onValue(ref(dbs,'/invitations'), (snapshot) => {
     
      
      snapshot.forEach((childSnapshot) => {

        const sender=childSnapshot.child("sender").val();
        const receiver=childSnapshot.child("receiver").val();
       
        const childkey=childSnapshot.key;
        array.push({sender : sender ,receiver: receiver,key:childkey});
      
      // const childData = childSnapshot.child("name").val();
       
     


    //   array.push({key:childKey});
   //  array.push({name:childSnapshot.child("name").val()});
    // array.push({IELTS:childSnapshot.child("IELTS").val()});
   //    array.push({IELTS:childSnapshot.child("IELTS").val()});
     
      //  array.push({childData});
        

       

      });
     
   
      const data = snapshot.val();
      if (data !== null) {
        
        setvalueinvite(arrayinvite);
      }
     
    });
  },[]); 
  
  console.log(value);

  const handleSignOut = () => {
    signOut(auth).then(() => {
      // Sign-out successful.

   //   set(ref(dbs, '/users' ), {
    //    projectbane: {text}
        
  //    });
 
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
  const save=()=>{
    //add with uid.......
    
const user=auth.currentUser;
const userId=user.uid;
       set(ref(dbs, 'users/'+userId ), {
        projectname: text,
        projectdeadline:deadline,
        description:description
        
      });

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
        <TextInput
        placeholder='Project Name'
        value={text}
        onChangeText={newtext=>setText(newtext)}
               
        />
           <TextInput
        placeholder='Project Deadline'
        value={deadline}
        onChangeText={newtext=>setdeadline(newtext)}
               
        />
          <TextInput
        placeholder='Project Description(max 20 words)'
        value={description}
        onChangeText={newtext=>setdescription(newtext)}
               
        />
        
        
       
        <FlatList
       data={value}     
       
       keyExtractor={(item) => item.key}
    //   renderItem={renderItemupdated}
       renderItem={({ item }) => {
      // return <Text>{item.name}</Text>;
      // next task is  creat eanother flatlist to see the joint project.......

        return(
          <TouchableOpacity onPress={()=>navigation.navigate('Details',{key:item.key})}>

          
         
         <Text>
          {item.projectname}
         </Text>
         <Text>
          {item.projectdeadline}
         </Text>
         <Text>
          "Invitations Lists"
         </Text>
         <Text>
          {item.sender}
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
      <TouchableOpacity
        onPress={save}
        style={styles.button}
      >

        <Text style={styles.buttonText}>Save Data</Text>
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
  addWrapper: {
    width: 60,
    height: 60,
    backgroundColor: '#FFF',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#C0C0C0',
    borderWidth: 1,
  }
})
//https://www.freecodecamp.org/news/react-native-firebase-tutorial/v
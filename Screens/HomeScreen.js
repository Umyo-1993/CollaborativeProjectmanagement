import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View , FlatList,TextInput} from 'react-native'
import { auth } from '../firebase'
import {  signOut } from "firebase/auth";
import { db } from '../firebase';
import {   getDatabase,ref, onValue ,set} from "firebase/database";

import { useState, useEffect } from "react";


const HomeScreen=({route,navigation})=>  {
 
  //const [todo, setTodo] = useState("");
  const [value, setvalue] = useState([]);
  const [valueinvite, setvalueinvite] = useState([]);
  const [text, setText] = React.useState("");
  const [person1, setperson1] = React.useState("");
  const [status,setstatus] = React.useState("");
  const [invite, setinvite] = React.useState("");
 
  const  dbs = getDatabase();
  var array=[];
  var arrayinvite=[];
  var a;
  const pincode=route.params.Code;
  const officename=route.params.Office;
  
  
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
const user=auth.currentUser;
const userId=user.uid;
    onValue(ref(dbs,'/users'+"/"+pincode+"/"+officename), (snapshot) => {
     
      
      snapshot.forEach((childSnapshot) => {

        const IELTS=childSnapshot.child("IELTS").val();
        const status=childSnapshot.child("status").val();
        const projectname=childSnapshot.child("projectname").val();
        const person1=childSnapshot.child("person1").val();
        const childkey=childSnapshot.key;
        array.push({person1 : person1,key:childkey,projectname:projectname,status:status});
      
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

    onValue(ref(dbs,'invitations/umotheing'), (snapshot) => {
     
      
      snapshot.forEach((childSnapshot) => {

        const person1=childSnapshot.child("person1").val();
        const status=childSnapshot.child("status").val();
       
        const childkey=childSnapshot.key;
        arrayinvite.push({person1 : person1 ,status : status,key:childkey});
      
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
  
  //console.log(valueinvite);

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
       set(ref(dbs, 'users/'+pincode+"/"+officename +"/"+text ), {
        projectname: text,
        person1:person1,
        status:status
        
      });

  }
  const invitation=()=>{
    //add with uid.......     
      navigation.navigate("Invitation");

  }
//275


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
      
      
      <View style={[styles.container, {
        // Try setting `flexDirection` to `"row"`.
        flexDirection: "column"
      }]}>
        <TextInput
        placeholder='Project Name'
        value={text}
        onChangeText={newtext=>setText(newtext)}
               
        />
           <TextInput
        placeholder='Person1'
        value={person1}
        onChangeText={newtext=>setperson1(newtext)}
               
        />
          <TextInput
        placeholder='status'
        value={status}
        onChangeText={newtext=>setstatus(newtext)}
               
        />
        <TextInput
        placeholder='Invite'
        value={invite}
        onChangeText={newtext=>setinvite(newtext)}
               
        />
         
       
        <FlatList
       data={value}     
       
       keyExtractor={(item) => item.key}
    //   renderItem={renderItemupdated}
       renderItem={({ item }) => {
      // return <Text>{item.name}</Text>;
      // next task is  creat eanother flatlist to see the joint project...........

        return(
          
         
          <TouchableOpacity 
          
          onPress={()=>navigation.navigate('Details',{keyid:item.key,pincode:pincode,officename:officename})}>
         <View style={styles.rectangle}>
     
         <View style={[styles.container, {
        // Try setting `flexDirection` to `"row"`.
        flexDirection: "row",
      },]}>
        
      
       <Text style={[styles.RectangleShapeView, 
        // Try setting `flexDirection` to `"row"`.
        {flex :2}
    ]} >
          ToDo
          
         </Text>
         <Text style={[styles.RectangleShapeView, 
        // Try setting `flexDirection` to `"row"`.
        {flex :2}
    ]} >Name
          
         </Text>
         <Text style={[styles.RectangleShapeView, 
        // Try setting `flexDirection` to `"row"`.
        {flex :2}
    ]} >
          Status
          
         </Text>
         <Text style={[styles.RectangleShapeView, 
        // Try setting `flexDirection` to `"row"`.
        {flex :2}
    ]} >
         End Date
          
         </Text>
       </View>
       

       <View style={[styles.container, {
        // Try setting `flexDirection` to `"row"`.
        flexDirection: "row",
      },]}>
         <Text style={[styles.RectangleShapeView, 
        // Try setting `flexDirection` to `"row"`.
        {flex :2}
    ]} >
          {item.projectname}
          
         </Text>
         <Text style={[styles.RectangleShapeView, 
        // Try setting `flexDirection` to `"row"`.
        {flex :2}
    ]} >
          {item.person1}
         </Text>
         
         <Text style={[styles.RectangleShapeView, 
        // Try setting `flexDirection` to `"row"`.
        {flex :2}
    ]} >
          {item.status}
         </Text>
         <Text style={[styles.RectangleShapeView, 
        // Try setting `flexDirection` to `"row"`.
        {flex :2}
    ]} >
          3/04/2022
         </Text>
         </View>
      </View>
      
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
      
      <TouchableOpacity
        onPress={invitation}
        style={styles.button}
      >

        <Text style={styles.buttonText}>See Invitations</Text>
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
   
    },
    rectangle : {
      width: '100%',
      height: 200,
      marginTop: 10,
      borderRadius: 5,
    // Set border width.
    borderWidth: 2,
    

      // Set border Hex Color Code Here.
    
      // Setting up Text Font Color.
    
      // Setting Up Background Color of Text component.
      
      // Adding padding on Text component.
      padding : 2,
      fontSize: 14
      
    }
  
})
//invitation and create both own and invited and show ..own is only todo list 
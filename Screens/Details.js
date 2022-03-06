
import React from 'react'

import { StyleSheet, Text, TouchableOpacity, View , FlatList} from 'react-native'

const Details=({route})=>{
  
 const id=route.params.key;
 console.log(id);
   
    return (<View>
       <Text>Hello there </Text>
     

      
         

    </View>);

}
export default Details;
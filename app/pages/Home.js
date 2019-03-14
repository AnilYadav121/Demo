import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet,ScrollView,Dimensions,Alert } from 'react-native';
import CategoriesMap from '../pages/categoriesMap';
import Data from '../locations.json';
import CardView from 'react-native-cardview'
import Icon from 'react-native-vector-icons/AntDesign';
// import {Seachbar} from 'react-native-elements'
const {viewWidth,viewHeight} = Dimensions.get('window')
import { SearchBar } from 'react-native-elements';
export default class Home extends Component {
    constructor(props) {
        super(props);
       this.state={text:'',show:false,Data:Data}
    //    navigator.geolocation.watchPosition((position)=>{
    //       alert(position.coords.latitude)
    //    })
    }
    cancelSearch=()=>{
      if(this.state.text==''){
        //   this.setState({Data:Data})
        this.state.Data=Data;
      }
    }
    handleSearch=()=>{
       let value=this.state.text.toLowerCase();
       let count = 0;
       this.state.Data.filter((item)=>{
            let vals = item.city.toLowerCase();
            item.city.includes(this.state.text)
            if(vals.includes(value)==true){
                count++;
            }
       })
       if(count==0){
        Alert.alert(
            'Search Result',
            'No search result with this keyword',
            [
              { text: 'OK', onPress: () => console.log('OK Pressed') },
            ],
            { cancelable: false }
          )
          this.setState({ Value: this.state.Value })
          return false;
       }
       else{
        this.setState({Data:this.state.Data.filter((item)=>{
            return item.city.includes(this.state.text)
        })}) 
       }
    //    let valueData=[]
    //    this.state.Data.filter((item)=>{
    //       item.city.includes(this.state.text)
    //    })
       
    }
    showSearch=()=>{
      this.setState({show:!this.state.show})
    }

    render() {
        const search=''
        return (
            <ScrollView style={styles.container}>
                <View style={styles.header}>
                <TouchableOpacity onPress={()=>this.showSearch()}>
                    <Icon name="search1" size={28}/>
                    </TouchableOpacity>
                    <Text style={styles.headerText}>Locations</Text>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('CategoriesMap')}>
                        <Text style={styles.mapViewText}>MapView</Text>
                    </TouchableOpacity>
                   
                </View>
                {this.state.show?
                <View style={{backgroundColor:'white'}}>
                <SearchBar placeholder="Type Here..." lightTheme
          clearIcon={{ color: 'red' }}
          value={this.state.text}
          showLoading={false}
          onBlur={() => this.handleSearch()}
          onClear={this.cancelSearch()}
          onChangeText={(text) => {
            this.setState({ text: text })
          }
          
          }
          ref={ref => this.textInputRef = ref}
          placeholder='Search'
          inputStyle={{ width: viewWidth - 20, backgroundColor: '#ffffff' }}
        /></View>:null
        }
                {this.state.Data.map((item) => {
                    return (
                        <View style={{ padding: 10 }}>
                        <TouchableOpacity onPress={()=>alert("go Next")}>
                            <CardView
                                cardElevation={6}
                                cardMaxElevation={6}
                                cornerRadius={5} style={{ padding: 10 }}>
                                <Text style={styles.cityText}>{item.city}</Text>
                                <Text style={styles.milesText}>15 miles</Text>
                                <Text style={styles.addressText}>{item.address}</Text>
                                <View style={styles.stateContainer}>
                                {item.store_tags.split(",").map((item)=>{
                                    return (
                                        <View style={styles.state}><Text style={styles.valueText}>{item}</Text></View>
                                    )
                                })}
                                </View>
                            </CardView>
                            </TouchableOpacity>
                        </View>
                    )
                })}
            </ScrollView>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        //    backgroundColor:'#ffffff'
    },
    header: {
        backgroundColor: '#ffffff',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomColor: 'black',
        borderBottomWidth: 0.5,
        height: 60,
        padding: 10
    },
    headerText: {
        fontSize: 22,
        fontWeight: 'bold'
    },
    mapViewText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    DataView: {
        borderColor: 'black',
        borderWidth: 0.5,
        backgroundColor: '#ffffff'
    },
    cityText: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    milesText: {
        fontSize: 16
    },
    addressText: {
        fontSize: 18
    },
    state: {
        justifyContent:'center',
        alignItems:'center',
        width: 80,
        height: 30,
        borderRadius: 20,
        borderWidth:1.5,
        borderColor:'#626466',
        marginLeft:10
        
    },
    state2: {
        width: 60,
        height: 30,
        borderRadius: 20,
        borderWidth:0.5,
        borderColor:'#626466'
    },
    stateContainer:{
        flexDirection:'row',
        paddingTop:10,
        marginLeft:-10
        
        
    },
    valueText:{
        fontSize:16,
        fontWeight:'bold'

    }
})
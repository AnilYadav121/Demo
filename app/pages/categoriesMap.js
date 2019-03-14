import React, { Component } from 'react';
import { Dimensions, StyleSheet ,View,Text,TouchableOpacity,Image} from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker} from 'react-native-maps'
import MapViewDirections from 'react-native-maps-directions';
import Data from '../locations.json'
import PolyLine from '@mapbox/polyline';
// const {viewWidth,viewHeight} = Dimensions.get('window')
import { SearchBar } from 'react-native-elements';
// import Icon from 'react-native-vector-icons/AntDesign';
import Home from './Home'
import Icon from 'react-native-vector-icons/AntDesign';
const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE = 37.771707;
const LONGITUDE = -122.4053769;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const GOOGLE_MAPS_APIKEY = 'AIzaSyC---------------------F5k';

export default class CategoriesMap extends Component {

  constructor(props) {
   
    super(props);
   this.maps=[]
    var coords=[];
    Data.map((marker)=>{
      let latitude=parseFloat(marker.latitude);
      let longitude=parseFloat(marker.longitude);
      this.maps.push({latitude:latitude,longitude:longitude});
   })
    this.state = {
      coordinates: [
        {
          latitude: 37.3317876,
          longitude: -122.0054812,
        },
        {
          latitude: 37.771707,
          longitude: -122.4053769,
        },
      ],
      pointCoords:[]
      // coordinates:coords
    };

    this.mapView = null;
   
  }

  onMapPress = (e) => {
    this.setState({
      coordinates: [
        ...this.state.coordinates,
        e.nativeEvent.coordinate,
      ],
    });
  }
  render() {
    return (
      <View style={styles.container}>
      {/* <View style={{width:window.width,height:50,backgroundColor:'#efefef',flex:0,alignItems:'center'}}><Text>{this.name}</Text></View> */}
      <View style={styles.header}>
                <TouchableOpacity onPress={()=>this.showSearch()}>
                    <Icon name="search1" size={28}/>
                    </TouchableOpacity>
                    <Text style={styles.headerText}>Locations</Text>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Home')}>
                        <Text style={styles.mapViewText}>ListView</Text>
                    </TouchableOpacity>
                   
                </View>
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          region={{
            latitude:26.916409,
            longitude: 70.808993,
            latitudeDelta:LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          }}
        >
    {Data.map((marker) => 
    
    (
    <MapView.Marker 
      coordinate={{latitude:parseFloat(marker.latitude),longitude:parseFloat(marker.longitude)}}
    >         
    </MapView.Marker>
  ))}
      </MapView>
      </View>
    )   
  }
}
const styles = StyleSheet.create({
   container: { flex:1 },
  map: { flex:1 },
  navBar: {
    flexDirection: 'row',
    paddingTop: 30,
    height: 64,
  },
  navBarButton: {
    color: "red",
    textAlign: 'center',
    width: 64
  },
  navBarHeader: {
    fontSize: 18,
    flex: 2,
    color: "#000000",
    fontWeight: "bold",
    textAlign: "center"
  }, tabBar: {
    height: 50,
    flexDirection: 'row'
  },
  tabBarButton: {
    flex: 1
  },
  button3: { fontSize: 15, fontWeight:'bold' ,marginLeft:20},
  buttons3: { fontSize: 18, fontWeight:'bold' ,marginLeft:20},
  imageView: {
    width: '30%',
    height: 100,
    margin: 7,
    borderRadius: 7
  },
  textView: {
    width: '80%',
    fontSize: 15,
    padding: 10,
    color: 'red',
    fontWeight: 'bold',
    marginRight: 20
  },
  textView2: {
    width: '80%',
    fontSize: 16,
    paddingLeft: 10,
    color: 'black',
    fontWeight: 'bold',
    marginRight: 20
  },
  TextInputStyle: {
    margin: 10,
    height: 40,
    width: window.width - 20,
    borderColor: '#96969b',
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderRadius: 5,
  },header: {
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
})
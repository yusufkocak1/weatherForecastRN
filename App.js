import React from 'react';
import Geolocation from '@react-native-community/geolocation';
import Weather from './Weather';
import { ActivityIndicator, StyleSheet , Text, View, Picker } from 'react-native';

export default class App extends React.Component {

  state = {
  		isLoading: true,
  		temperature: 0,
      cities: require('./city.list.json'),
  		weatherCondition: "",
      selected:"sivas",
      cities: require('./city.list.json')
  	};
  componentDidMount() {
  		Geolocation.getCurrentPosition(
  			position => {
          this.fetchWeather(position.coords.latitude,position.coords.longitude)
  			},
  			error => {
  				this.setState({
            isLoading: false,
  				});
  			}
  		);
  	}

  	fetchWeather(lat, lon) {
  		fetch("http://api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+lon+"&APPID=f2af13ce3af0ef206b4129c430a11cdd&units=metric")
  			.then(res => res.json())
  			.then(json => {
  				this.setState({
  					temperature: json.main.temp,
  					weatherCondition: json.weather[0].main,
            name:json.sys.country+ " "+ json.name,
  					isLoading: false
  				});
  			});
  	}

  onPickerValueChange=(value, index)=>{
    fetch('http://api.openweathermap.org/data/2.5/weather?q='+value+'&APPID=f2af13ce3af0ef206b4129c430a11cdd&units=metric')
          .then((response) => response.json())
          .then((responseJson) => {

            this.setState({
              isLoading: false,
              selected:responseJson.name,
              temperature: responseJson.main.temp,
              weatherCondition: responseJson.weather[0].main,
              name:responseJson.sys.country+ " "+ responseJson.name,
            }, function(){

            });

          })
          .catch((error) =>{
            console.error(error);
          });
    }

  render(){

    if(this.state.isLoading){
      return(
        <View style={{flex: 1, padding: 20}}>
          <ActivityIndicator/>
        </View>
      )
    }

    return(
      <View style={{flex: 1, paddingTop:20}}>
       <Text style={styles.titleText}>Change Location</Text>
      <Picker
    style={styles.picker}
    selectedValue={this.state.selected}
    onValueChange={this.onPickerValueChange
    }>
    {this.state.cities.map((item, index) => {
        return (<Picker.Item label={item.name} value={item.name} key={index}/>)
    })}
  </Picker>

  { this.state.isLoading ? (
  					<Text>Fetching The Weather</Text>
  				) : (
            <Weather
  						weather={this.state.weatherCondition}
  						temperature={this.state.temperature}
              name ={this.state.name}
  					/>
  				)}

      </View>
    );
  }
}
const styles = StyleSheet.create({
  picker: {
    fontSize: 12,
    margin:16,
    fontWeight: 'bold'
      },
  titleText: {
    fontSize: 24,
    paddingLeft:24,
    fontWeight: 'bold',
  },
});

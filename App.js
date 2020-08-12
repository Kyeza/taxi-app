import { StatusBar } from "expo-status-bar";
import React, { Component } from "react";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import MapView from "react-native-maps";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import DestinationButton from "./components/DestinationButton";
import CurrentLocationButton from "./components/CurrentLocationButton";
import Driver from "./components/Driver";

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      region: null,
    };

    this._getLocationAsync();
  }

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== "granted") {
      console.log("Permission not granted");
    }

    let location = await Location.getCurrentPositionAsync({
      enabledHighAccuracy: true,
    });
    let region = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: 0.922,
      longitudeDelta: 0.0421,
    };

    this.setState({
      region: region,
    });
  };

  centerMap() {
    const {
      latitude,
      longitude,
      latitudeDelta,
      longitudeDelta,
    } = this.state.region;

    this.map.animateToRegion({
      latitude,
      longitude,
      latitudeDelta,
      longitudeDelta,
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <DestinationButton />
        <CurrentLocationButton
          cb={() => {
            this.centerMap();
          }}
        />
        <MapView
          style={styles.mapView}
          showsCompass={true}
          showsUserLocation={true}
          rotateEnabled={false}
          ref={(map) => {
            this.map = map;
          }}
          initialRegion={this.state.region}
        >
          <Driver
            driver={{
              uid: "null",
              location: { latitude: 0.3756, longitude: 32.59735 },
            }}
          />
        </MapView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  mapView: {
    flex: 1,
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});

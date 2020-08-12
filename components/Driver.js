import React from "react";
import { Image } from "react-native";
import MapView from "react-native-maps";

class Driver extends React.Component {
  constructor(props) {
    super(props);

    const driver = this.props.driver
      ? this.props.driver
      : { uid: "noDriverPassed", location: { latitude: 0, longitude: 0 } };

    const coordinate = new MapView.AnimatedRegion({
      latitude: driver.location.latitude,
      longitude: driver.location.longitude,
      latitudeDelta: 0.922,
      longitudeDelta: 0.0421,
    });

    this.state = {
      driver: driver,
      coordinate: coordinate,
    };
  }
  render() {
    return (
      <MapView.Marker.Animated
        coordinate={this.state.coordinate}
        anchor={{ x: 0.35, y: 0.32 }}
        ref={(marker) => {
          this.marker = marker;
        }}
        style={{ width: 50, height: 50 }}
      >
        <Image
          source={require("../assets/car.png")}
          style={{ width: "100%", height: 25 }}
        />
      </MapView.Marker.Animated>
    );
  }
}

export default Driver;


// @flow
import React, { Component } from "react";
import { View, Text } from "react-native";

import { inject, observer } from 'mobx-react'

class Book extends Component {
  render() {
    return (
      <View style={{flex:1}}>
        <Text>Book Tab</Text>
      </View>
    );
  }
}

export default Book



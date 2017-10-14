import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class Emergency extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Does your emergency pose an immediate threat to someone's someone’s life, safety, health, or property?</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

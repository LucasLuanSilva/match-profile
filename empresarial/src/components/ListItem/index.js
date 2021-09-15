import React from 'react';
import { View, Text, StyleSheet, Animated, TouchableOpacity } from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import Icon from 'react-native-vector-icons/Feather';

export default function ListItem({ data, handleRight, onPress }) {
  function RightActions({ progress, dragX, onPress }) {
    const scale = dragX.interpolate({
      inputRange: [-100, 0],
      outputRange: [1, 0],
      extrapolate: 'clamp',
    });

    return (
      <TouchableOpacity onPress={onPress} style={styles.rightAction}>
        <Animated.View
          style={[{ paddingHorizontal: 10 }, { transform: [{ scale: scale }] }]}>
          <Icon name={'trash'} size={40} color="#FFF" />
        </Animated.View>
      </TouchableOpacity>
    );
  }

  return (
    <Swipeable
      renderRightActions={(progress, dragX) => (
        <RightActions progress={progress} dragX={dragX} onPress={handleRight} />
      )}>
      <TouchableOpacity onPress={onPress} style={styles.container}>
        <Text style={styles.text}> {data.tarefa} </Text>
      </TouchableOpacity>
    </Swipeable>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
    paddingHorizontal: 10,
    paddingVertical: 20,
    borderRadius: 10,
    margin: 0.5,
  },
  text: {
    fontSize: 17,
    color: '#222',
  },
  rightAction: {
    backgroundColor: '#FF0000',
    justifyContent: 'center',
    alignItems: 'flex-end',
    borderRadius: 10,
  },
});

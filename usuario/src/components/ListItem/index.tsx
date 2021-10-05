import React from 'react';
import { View, Text, StyleSheet, Animated, TouchableOpacity, Handle, ViewStyle } from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import Icon from 'react-native-vector-icons/Feather';

interface IListItem {
  title: string;
  titleStyle?: ViewStyle;
  subtitle?: string;
  subtitleStyle?: ViewStyle;
  handleRight?: any;
  onPress?: any;
}

export default function ListItem({
  title,
  titleStyle,
  subtitle,
  subtitleStyle,
  handleRight,
  onPress
}: IListItem) {
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

  function Title() {
    if (titleStyle) {
      return (
        <Text style={titleStyle}> {title} </Text>
      )
    } else {
      return (
        <Text style={styles.titleStyle}> {title} </Text>
      )
    }
  }

  function Subtitle() {
    if (subtitle) {
      if (subtitleStyle) {
        return (
          <Text style={subtitleStyle}> {subtitle} </Text>
        )
      }

      return (
        <Text style={styles.subtitleStyle}> {subtitle} </Text>
      )
    }

    return null;
  }

  return (
    <Swipeable
      renderRightActions={(progress, dragX) => (
        <RightActions progress={progress} dragX={dragX} onPress={handleRight} />
      )}>
      <TouchableOpacity onPress={onPress} style={styles.container}>
        <Title />
        <Subtitle />
      </TouchableOpacity>
    </Swipeable>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
    paddingHorizontal: 10,
    paddingVertical: 15,
    borderRadius: 10,
    margin: 0.5,
  },
  titleStyle: {
    fontSize: 17,
    color: '#222',
  },
  subtitleStyle: {
    fontSize: 14,
    color: '#222',
  },
  rightAction: {
    backgroundColor: '#FF0000',
    justifyContent: 'center',
    alignItems: 'flex-end',
    borderRadius: 10,
  },
});

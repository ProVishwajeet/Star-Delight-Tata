import React from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';

export default function ReferAndEarn() {
  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/images/Refer-earn-banner.png')}
        style={styles.banner}
        resizeMode="cover"
      />
      <TouchableOpacity style={styles.button} activeOpacity={0.8}>
        <Image
          source={require('../assets/images/right-arrow.png')}
          style={styles.arrowIcon}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginTop: 8,
    marginBottom: 24,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  banner: {
    width: '100%',
    height: 145,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 0,
  },
  button: {
    position: 'absolute',
    right: 24,
    top: '75%',
    transform: [{ translateY: -24 }],
    backgroundColor: '#EC6300',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 8,
    borderRadius: 22,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.10,
    shadowRadius: 4,
    elevation: 2,
  },
  arrowIcon: {
    width: 18,
    height: 18,
    resizeMode: 'contain',
  },
});

import React from 'react';
import { Dimensions, Image, StyleSheet, View } from 'react-native';

const { width } = Dimensions.get('window');

const StaticOfferCards = () => {
  return (
    <View style={styles.container}>
      <View style={styles.cardsContainer}>
        <Image 
          source={require('../assets/images/card1.png')} 
          style={styles.cardImage}
        />
        <Image 
          source={require('../assets/images/card2.png')} 
          style={styles.cardImage}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingVertical: 0,
    paddingHorizontal: 10,
    backgroundColor: 'transparent',
  },
  cardsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    gap: 15,
  },
  cardImage: {
    width: '48%',
    height: 115,
    resizeMode: 'contain',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 35,
  }
});

export default StaticOfferCards;

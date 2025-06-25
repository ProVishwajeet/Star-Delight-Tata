import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import ArrowButton from './ArrowButton';
import CardContainer from './CardContainer';

interface UserInfoCardsProps {
  savingsAmount?: string;
  itemsCount?: number;
}

const UserInfoCards: React.FC<UserInfoCardsProps> = ({
  savingsAmount = '6,352',
  itemsCount = 19,
}) => {
  return (
    <View style={styles.container}>
      {/* Bills & Savings Card */}
      <CardContainer variant="normal" style={styles.card}>
        <View style={styles.cardContent}>
          <View style={styles.iconContainer}>
            <Image 
              source={require('../assets/images/wallate-money-icon.png')} 
              style={styles.walletIcon} 
              resizeMode="contain"
            />
            <View style={styles.coinsContainer}>
              {/* Coins would be added here when assets are available */}
            </View>
          </View>
          
          <Text style={styles.cardTitle}>My Bills & Savings</Text>
          <View style={styles.amountContainer}>
            <Text style={styles.rupeeSymbol}>₹</Text>
            <Text style={styles.amount}>{savingsAmount}</Text>
            <Text style={styles.savedText}>Saved</Text>
          </View>
          
          <View style={styles.arrowButtonContainer}>
            <ArrowButton size={42} />
          </View>
        </View>
      </CardContainer>

      {/* Shopping List Card */}
      <CardContainer variant="inverted" style={styles.card}>
        <View style={styles.cardContent}>
          <View style={styles.iconContainer}>
            <Image 
              source={require('../assets/images/todo-icon.png')} 
              style={styles.shoppingListIcon} 
              resizeMode="contain"
            />
          </View>
          
          <Text style={styles.cardTitle}>My Shopping List</Text>
          <View style={styles.itemsContainer}>
            <Text style={styles.itemsCount}>{itemsCount}</Text>
            <Text style={styles.itemsText}>Items</Text>
          </View>
          
          <View style={styles.arrowButtonContainer}>
            <ArrowButton size={42} />
          </View>
        </View>
      </CardContainer>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    paddingHorizontal: 16,
    paddingTop: 90,
    paddingBottom: 60,
    gap: 15,
  },
  card: {
    width: 182,
    height: 160,
    marginBottom: 0,
  },
  cardContent: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    paddingTop: 55,
    paddingBottom: 25,
  },
  iconContainer: {
    position: 'relative',
    width: 90,
    height: 90,
    top: -105,
    marginBottom: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  walletIcon: {
    width: 100,
    height: 100,
  },
  coinsContainer: {
    position: 'absolute',
    top: -100,
    right: -10,
    width: 40,
    height: 40,
  },
  coinIcon: {
    width: 20,
    height: 20,
    position: 'absolute',
  },
  coin1: {
    top: 0,
    left: 0,
  },
  coin2: {
    top: 5,
    left: 10,
  },
  coin3: {
    top: 10,
    left: 0,
  },
  shoppingListIcon: {
    // todo: fix icon placement
    width: 90,  
    height: 70,
    top: 10,
    right: 0,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
    marginTop: -100,
    marginBottom: 16,
    textAlign: 'center',
    paddingHorizontal: 8,
  },
  amountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  rupeeSymbol: {
    fontSize: 20,
    fontWeight: '700',
    color: '#EC6300',
    marginRight: 2,
    marginTop: -10,
  },
  amount: {
    fontSize: 20,
    fontWeight: '700',
    color: '#EC6300',
    marginTop: -10,
  },
  savedText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#EC6300',
    marginTop: -10,
    marginLeft: 5,
  },
  itemsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemsCount: {
    fontSize: 20,
    fontWeight: '700',
    color: '#EC6300',
    marginTop: -8,
  },
  itemsText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#EC6300',
    marginLeft: 5,
    marginTop: -8,
  },
  arrowButtonContainer: {
    position: 'absolute',
    bottom: -30,
    alignSelf: 'center',
    zIndex: 1,
  },
});

export default UserInfoCards;

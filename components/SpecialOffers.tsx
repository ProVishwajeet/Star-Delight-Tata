import React, { useRef } from 'react';
import { 
  Animated, 
  Dimensions, 
  ImageBackground,
  StyleSheet, 
  Text, 
  TouchableOpacity, 
  View 
} from 'react-native';
import StarburstBadge from './StarburstBadge';

const { width } = Dimensions.get('window');
const CARD_WIDTH = 137; // Exact width as requested
const CARD_HEIGHT = 188; // Exact height as requested
const SPACING = 10;

interface OfferItem {
  id: string;
  price: string;
  originalPrice: string;
  name: string;
  image: any;
  badgeColor: string;
}

interface SpecialOffersProps {
  specialOffers: OfferItem[];
}

const SpecialOffers = ({ specialOffers }: SpecialOffersProps) => {
  const scrollX = useRef(new Animated.Value(0)).current;

  const renderSpecialOfferItem = ({ item, index }: { item: OfferItem; index: number }) => {
    const inputRange = [
      (index - 1) * (CARD_WIDTH + SPACING),
      index * (CARD_WIDTH + SPACING),
      (index + 1) * (CARD_WIDTH + SPACING),
    ];

    const scale = scrollX.interpolate({
      inputRange,
      outputRange: [0.95, 1, 0.95],
      extrapolate: 'clamp',
    });

    const opacity = scrollX.interpolate({
      inputRange,
      outputRange: [0.8, 1, 0.8],
      extrapolate: 'clamp',
    });

    return (
      <Animated.View 
        style={[styles.offerCard, { 
          transform: [{ scale }],
          opacity,
        }]}
      >
        {/* Product image as background */}
        <ImageBackground 
          source={item.image} 
          style={styles.cardImage}
          resizeMode="cover"
        >
          {/* Overlay to ensure text is readable */}
          <View style={styles.cardOverlay} />
          
          {/* Product name at bottom */}
          <Text style={styles.productName}>{item.name}</Text>
        </ImageBackground>
        
        {/* Price badge - positioned absolutely relative to card */}
        <StarburstBadge 
          price={item.price} 
          originalPrice={item.originalPrice}
          color={item.badgeColor}
          size={55}
          style={styles.starburstBadge}
        />
      </Animated.View>
    );
  };

  return (
    <View style={styles.offersContainer}>
      <View style={styles.offersHeader}>
        <Text style={styles.offersSectionTitle}>Star Special Offers</Text>
        <TouchableOpacity>
          <Text style={styles.viewAllText}>View All <Text style={{ fontSize: 18 }}>›</Text></Text>
        </TouchableOpacity>
      </View>

      <Animated.ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewContent}
        snapToInterval={CARD_WIDTH + SPACING}
        decelerationRate="fast"
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: true }
        )}
      >
        {specialOffers.map((item, index) => (
          <View key={item.id} style={{ width: CARD_WIDTH, marginRight: SPACING }}>
            {renderSpecialOfferItem({ item, index })}
          </View>
        ))}
      </Animated.ScrollView>
      
      <View style={styles.paginationContainer}>
        {specialOffers.map((_, index) => {
          const inputRange = [
            (index - 1) * (CARD_WIDTH + SPACING),
            index * (CARD_WIDTH + SPACING),
            (index + 1) * (CARD_WIDTH + SPACING),
          ];
          
          const opacity = scrollX.interpolate({
            inputRange,
            outputRange: [0.3, 1, 0.3],
            extrapolate: 'clamp',
          });
          
          const scale = scrollX.interpolate({
            inputRange,
            outputRange: [1, 1.3, 1],
            extrapolate: 'clamp',
          });
          
          return (
            <Animated.View
              key={index}
              style={[styles.paginationDot, { opacity, transform: [{ scale }] }]}
            />
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  offersContainer: {
    width: '100%',
    paddingVertical: 20,
  },
  offersHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  offersSectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1f2937',
    fontFamily: 'TESCOBL_1',
  },
  viewAllText: {
    fontSize: 16,
    color: '#f97316',
    fontWeight: '600',
  },
  scrollViewContent: {
    paddingLeft: 20,
    paddingRight: 10,
  },
  offerCard: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    borderRadius: 12, // Exactly 12px as requested
    overflow: 'hidden',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    position: 'relative',
  },
  cardImage: {
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end',
  },
  cardOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.2)', // Slight dark overlay for better text visibility
  },
  productName: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
    padding: 8,
    textShadowColor: 'rgba(0,0,0,0.75)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  starburstBadge: {
    position: 'absolute',
    top: -12,
    right: -12,
    zIndex: 999, // Very high z-index to ensure it's above everything
    elevation: 10, // For Android
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#1f2937',
    marginHorizontal: 4,
  },
});

export default SpecialOffers;

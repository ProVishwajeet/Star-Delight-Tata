import LottieView from 'lottie-react-native';
import { useEffect, useRef } from 'react';
import { Animated, Dimensions, FlatList, ImageBackground, SafeAreaView, StyleSheet, Text, View } from "react-native";
import CustomerReviews from '../components/CustomerReviews';
import PriceBanner from '../components/PriceBanner';
import PromotionalBanner from '../components/PromotionalBanner';
import StarburstBadge from '../components/StarburstBadge';

const { width } = Dimensions.get('window');
const CARD_WIDTH = 137; // Exact width as requested
const CARD_HEIGHT = 188; // Exact height as requested
const SPACING = 10;

interface OfferItem {
  id: string;
  price: string;
  originalPrice: string;
  name: string;
  image: any; // For product image
  badgeColor: string;
}

// Sample product data with images
const specialOffers: OfferItem[] = [
  {
    id: '1',
    name: 'Chips',
    price: '₹100',
    originalPrice: '₹110',
    image: { uri: 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?q=80&w=1000&auto=format&fit=crop' },
    badgeColor: '#4CAF50'
  },
  {
    id: '2',
    name: 'Pepsi',
    price: '₹90',
    originalPrice: '₹110',
    image: { uri: 'https://images.unsplash.com/photo-1629203432180-71e9b18d855c?q=80&w=1000&auto=format&fit=crop' },
    badgeColor: '#4CAF50'
  },
  {
    id: '3',
    name: 'Biscuits',
    price: '₹50',
    originalPrice: '₹70',
    image: { uri: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?q=80&w=1000&auto=format&fit=crop' },
    badgeColor: '#4CAF50'
  },
  {
    id: '4',
    name: 'Chocolate',
    price: '₹80',
    originalPrice: '₹99',
    image: { uri: 'https://images.unsplash.com/photo-1511381939415-e44015466834?q=80&w=1000&auto=format&fit=crop' },
    badgeColor: '#4CAF50'
  },
  {
    id: '5',
    name: 'Coffee',
    price: '₹120',
    originalPrice: '₹150',
    image: { uri: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?q=80&w=1000&auto=format&fit=crop' },
    badgeColor: '#4CAF50'
  },
];

export default function Index() {
  const animationRef = useRef<LottieView>(null);
  const scrollX = useRef(new Animated.Value(0)).current;
  
  useEffect(() => {
    // Play the animation when component mounts
    if (animationRef.current) {
      animationRef.current.play();
    }
  }, []);

  const renderSpecialOfferItem = ({ item, index }: { item: OfferItem, index: number }) => {
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
    <View style={styles.outerContainer}>
      <SafeAreaView style={styles.container}>
        <FlatList
          style={styles.flatListContainer}
          contentContainerStyle={styles.contentContainer}
          showsVerticalScrollIndicator={false}
          data={[{ key: 'content' }]}
          renderItem={() => (
            <View>
              {/* Lottie animation now inside the scrollable content */}
              <View style={styles.lottieContainer}>
                <LottieView
                  ref={animationRef}
                  style={styles.lottieAnimation}
                  source={require('../assets/Hero-lottie.json')}
                  autoPlay
                  loop
                  resizeMode="cover"
                />
              </View>
              <View style={styles.welcomeContainer}>
                <Text style={styles.welcomeText}>
                  Welcome to Star Delight!
                </Text>
              </View>
          
              <View style={styles.offersContainer}>
                <View style={styles.offersHeader}>
                  <Text style={styles.offersSectionTitle}>Star Special Offers</Text>
                  <Text style={styles.viewAllText}>View All</Text>
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
              {/* Price Banner */}
              <PriceBanner />
              {/* Promotional Banner */}
              <PromotionalBanner />
              {/* Customer Reviews Section */}
              <CustomerReviews />
            </View>
          )}
        />
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: '#fff',
  },
  flatListContainer: {
    flex: 1,
    width: '100%',
  },
  lottieContainer: {
    width: '100%',
    height: 370,
    overflow: 'hidden',
  },
  lottieAnimation: {
    width: '100%',
    height: '100%',
  },
  contentContainer: {
    paddingBottom: 40, // Add padding at the bottom for better scrolling experience
  },
  welcomeContainer: {
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  welcomeText: {
    color: '#3b82f6', // blue-500 in Tailwind
    fontWeight: 'bold',
    fontSize: 24,
  },
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
  promoBannerContainer: {
    width: '100%',
    paddingHorizontal: 20,
    marginTop: 20,
    marginBottom: 30,
  },
});

import LottieView from 'lottie-react-native';
import { useEffect, useRef, useState } from 'react';
import { Animated, Dimensions, FlatList, ImageBackground, NativeScrollEvent, NativeSyntheticEvent, StyleSheet, View } from "react-native";
import { SafeAreaProvider } from 'react-native-safe-area-context';
import BogoSection from '../components/BogoSection';
import BottomNavBar from '../components/BottomNavBar';
import ChatWithUsButton from '../components/ChatWithUsButton';
import CustomerReviews from '../components/CustomerReviews';
import GreetingDisplay from '../components/GreetingDisplay';
import Offers_carousel from '../components/Offers_carousel';
import PriceBanner from '../components/PriceBanner';
import PromotionalBanner from '../components/PromotionalBanner';
import SpecialOffers from '../components/SpecialOffers';
import TopNavBar from '../components/TopNavBar';
import UserInfoCards from '../components/UserInfoCards';

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
    image: require('../assets/images/Star-special-image1.png'),
    badgeColor: '#4CAF50'
  },
  {
    id: '2',
    name: 'Pepsi',
    price: '₹90',
    originalPrice: '₹110',
    image: require('../assets/images/Star-special-image2.png'),
    badgeColor: '#4CAF50'
  },
  {
    id: '3',
    name: 'Biscuits',
    price: '₹50',
    originalPrice: '₹70',
    image: require('../assets/images/Star-special-image1.png'),
    badgeColor: '#4CAF50'
  },
  {
    id: '4',
    name: 'Chocolate',
    price: '₹80',
    originalPrice: '₹99',
    image: require('../assets/images/Star-special-image2.png'),
    badgeColor: '#4CAF50'
  },
  {
    id: '5',
    name: 'Coffee',
    price: '₹120',
    originalPrice: '₹150',
    image: require('../assets/images/Star-special-image1.png'),
    badgeColor: '#4CAF50'
  },
];

export default function Index() {
  const animationRef = useRef<LottieView>(null);
  const [scrollY] = useState(new Animated.Value(0));
  const [navBackgroundOpacity, setNavBackgroundOpacity] = useState(0);
  
  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    // Calculate opacity based on scroll position
    // Start showing background after 50px of scrolling, fully opaque at 150px
    const opacity = Math.min(Math.max((offsetY - 50) / 100, 0), 1);
    setNavBackgroundOpacity(opacity);
  };
  
  useEffect(() => {
    // Play the animation when component mounts
    if (animationRef.current) {
      animationRef.current.play();
    }
  }, []);

  return (
    <SafeAreaProvider>
      <View style={styles.outerContainer}>
        {/* Top Navigation Bar with dynamic background opacity */}
        <TopNavBar backgroundOpacity={navBackgroundOpacity} />
        
        <View style={styles.mainContentContainer}>
          <FlatList
            style={styles.flatListContainer}
            contentContainerStyle={[styles.contentContainer, { paddingBottom: 180 }]} // Further increased padding to prevent content from scrolling behind bottom nav
            showsVerticalScrollIndicator={false}
            data={[{ key: 'content' }]}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { y: scrollY } } }],
              { useNativeDriver: false, listener: handleScroll }
            )}
            scrollEventThrottle={16}
            renderItem={() => (
            <View>
              {/* Lottie animation with parent container */}
              <ImageBackground 
                source={require('../assets/images/pattern-bg.png')} 
                style={styles.lottieParentContainer}
                resizeMode="cover">
                {/* Pattern background is visible without overlay */}
                {/* Greeting display */}
                <GreetingDisplay userName="Ashish" />
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
                {/* User Info Cards - moved here after Lottie animation */}
                <UserInfoCards savingsAmount="6,352" itemsCount={19} />

                {/* Buy 1 Get 1 Section - Inside orange background */}
                <View style={styles.bogoSectionContainer}>
                  <BogoSection />
                </View>
              </ImageBackground>
              {/* Special Offers Component */}
              <SpecialOffers specialOffers={specialOffers} />
              {/* Price Banner */}
              <PriceBanner />
              {/* Promotional Banner */}
              <PromotionalBanner />
              
              {/* Customer Reviews Section */}
              <CustomerReviews />
              
              {/* Offers Carousel with Arrow Slider */}
              <Offers_carousel />
            </View>
                  )}
          />
        </View>
      
      <View style={styles.fixedElementsContainer}>
        {/* Chat with Us Button */}
        <ChatWithUsButton />
        
        {/* Bottom Navigation Bar */}
        <BottomNavBar />
      </View>
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  fixedElementsContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 10,
  },
  mainContentContainer: {
    flex: 1,
    width: '100%',
    backgroundColor: '#fff', // Restore white background
    marginTop: 0, // Remove any gap between nav and content
    paddingTop: 0, // No padding as TopNavBar is absolutely positioned
  },
  flatListContainer: {
    flex: 1,
    width: '100%',
  },
  lottieParentContainer: {
    width: '100%',
    height: 1100, // Increased height to accommodate BogoSection
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 0,
    position: 'relative',
    marginTop: 0, // Ensure no gap at the top
    backgroundColor: '#FF7A00', 
  },
  bogoSectionContainer: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingTop: 24,
    marginTop: 20,
  },
  overlayFade: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255,255,255,0.4)',
    zIndex: 1,
  },
  lottieContainer: {
    width: '100%',
    height: 450,
    overflow: 'hidden',
    zIndex: 2,
    position: 'relative',
    marginTop: 0, // Add margin at the top to create space after greeting text
  },
  lottieAnimation: {
    width: '100%',
    height: '100%',
  },
  contentContainer: {
    paddingBottom: 40, // Add padding at the bottom for better scrolling experience
    paddingTop: 0, // No top padding as we want content to flow under the transparent TopNavBar
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
  promoBannerContainer: {
    width: '100%',
    paddingHorizontal: 20,
    marginTop: 20,
    marginBottom: 30,
  },
});

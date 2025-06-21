import LottieView from 'lottie-react-native';
import { useEffect, useRef } from 'react';
import { Dimensions, FlatList, ImageBackground, StyleSheet, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import BottomNavBar from '../components/BottomNavBar';
import ChatWithUsButton from '../components/ChatWithUsButton';
import CustomerReviews from '../components/CustomerReviews';
import GreetingDisplay from '../components/GreetingDisplay';
import TopNavBar from '../components/TopNavBar';
import Offers_carousel from '../components/Offers_carousel';
import PriceBanner from '../components/PriceBanner';
import PromotionalBanner from '../components/PromotionalBanner';
import SpecialOffers from '../components/SpecialOffers';

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
  
  useEffect(() => {
    // Play the animation when component mounts
    if (animationRef.current) {
      animationRef.current.play();
    }
  }, []);

  return (
    <SafeAreaProvider>
      <View style={styles.outerContainer}>
        {/* Top Navigation Bar - outside SafeAreaView to overlay on orange background */}
        <TopNavBar />
        
        <View style={styles.mainContentContainer}>
          <FlatList
            style={styles.flatListContainer}
            contentContainerStyle={[styles.contentContainer, { paddingBottom: 180 }]} // Further increased padding to prevent content from scrolling behind bottom nav
            showsVerticalScrollIndicator={false}
            data={[{ key: 'content' }]}
            renderItem={() => (
            <View>
              {/* Lottie animation with parent container */}
              <ImageBackground 
                source={require('../assets/images/pattern-bg.png')} 
                style={styles.lottieParentContainer}
                resizeMode="cover">
                {/* Faded overlay */}
                <View style={styles.overlayFade}></View>
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
    marginTop: -1, // Remove any gap between nav and content
  },
  flatListContainer: {
    flex: 1,
    width: '100%',
  },
  lottieParentContainer: {
    width: '100%',
    height: 600,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 0,
    position: 'relative',
    marginTop: 0, // Ensure no gap at the top
    backgroundColor: '#FF7A00', // Keep orange background only for the lottie section
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
    height: 370,
    overflow: 'hidden',
    zIndex: 2,
    position: 'relative',
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
  promoBannerContainer: {
    width: '100%',
    paddingHorizontal: 20,
    marginTop: 20,
    marginBottom: 30,
  },
});

import { AntDesign } from '@expo/vector-icons';
import React, { useEffect, useRef, useState } from 'react';
import {
    Animated,
    Dimensions,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width - 32; // Full width minus padding

interface OfferSlide {
  id: string;
  title: string;
  subtitle: string;
  image: any;
  backgroundColor: string;
}

const offerSlides: OfferSlide[] = [
  {
    id: '1',
    title: 'Refer & Earn',
    subtitle: 'Share the Delight & get Rewarded',
    image: require('../assets/images/gift-offer.png'),
    backgroundColor: '#FFF9C4',
  },
  {
    id: '2',
    title: 'Weekend Special',
    subtitle: 'Get 20% off on all orders',
    image: require('../assets/images/gift-offer.png'),
    backgroundColor: '#FFF9C4',
  },
  {
    id: '3',
    title: 'New User Offer',
    subtitle: 'First order discount of ₹100',
    image: require('../assets/images/gift-offer.png'),
    backgroundColor: '#FFF9C4',
  },
];

const Offers_carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<any>(null);
  const scrollX = useRef(new Animated.Value(0)).current;
  
  // Arrow animation
  const arrowAnim = useRef(new Animated.Value(0)).current;
  
  useEffect(() => {
    // Set up auto-scrolling
    const autoScrollTimer = setInterval(() => {
      goToNextSlide();
    }, 4000);
    
    // Set up arrow animation
    const pulseArrow = Animated.loop(
      Animated.sequence([
        Animated.timing(arrowAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(arrowAnim, {
          toValue: 0,
          duration: 800,
          useNativeDriver: true,
        }),
      ])
    );
    
    pulseArrow.start();
    
    return () => {
      clearInterval(autoScrollTimer);
      pulseArrow.stop();
    };
  }, []);
  
  // Spring animation when changing slides
  const animateToSlide = (index: number) => {
    if (flatListRef.current) {
      flatListRef.current.scrollToOffset({
        offset: index * CARD_WIDTH,
        animated: true,
      });
    }
  };
  
  const goToNextSlide = () => {
    const nextIndex = (currentIndex + 1) % offerSlides.length;
    setCurrentIndex(nextIndex);
    animateToSlide(nextIndex);
  };
  
  const arrowScale = arrowAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.2],
  });
  
  const renderItem = ({ item, index }: { item: OfferSlide; index: number }) => {
    // Calculate input range for animations based on card width
    const inputRange = [
      (index - 1) * CARD_WIDTH,
      index * CARD_WIDTH,
      (index + 1) * CARD_WIDTH
    ];
    
    // Scale animation
    const scale = scrollX.interpolate({
      inputRange,
      outputRange: [0.9, 1, 0.9],
      extrapolate: 'clamp'
    });
    
    // Opacity animation
    const opacity = scrollX.interpolate({
      inputRange,
      outputRange: [0.7, 1, 0.7],
      extrapolate: 'clamp'
    });
    
    // Translate animation for content
    const translateX = scrollX.interpolate({
      inputRange,
      outputRange: [50, 0, -50],
      extrapolate: 'clamp'
    });
    
    // Rotate animation for subtle 3D effect
    const rotate = scrollX.interpolate({
      inputRange,
      outputRange: ['2deg', '0deg', '-2deg'],
      extrapolate: 'clamp'
    });
    
    return (
      <Animated.View 
        style={[
          styles.slide, 
          { 
            backgroundColor: item.backgroundColor, 
            width: CARD_WIDTH,
            transform: [
              { scale },
              { rotate }
            ],
            opacity
          }
        ]}
      >
        <Animated.View 
          style={[styles.contentContainer, { transform: [{ translateX }] }]}
        >
          <Image 
            source={item.image} 
            style={styles.image}
            resizeMode="contain"
          />
          <View style={styles.textContainer}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.subtitle}>{item.subtitle}</Text>
          </View>
        </Animated.View>
      </Animated.View>
    );
  };
  
  return (
    <View style={styles.container}>
      <Animated.FlatList
        ref={flatListRef}
        data={offerSlides}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        snapToInterval={CARD_WIDTH}
        decelerationRate="fast"
        contentContainerStyle={styles.flatListContent}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: true }
        )}
        onMomentumScrollEnd={(event) => {
          const newIndex = Math.round(
            event.nativeEvent.contentOffset.x / CARD_WIDTH
          );
          setCurrentIndex(newIndex);
        }}
        snapToAlignment="center"
        scrollEventThrottle={16}
        bounces={true}
      />
      
      <Animated.View 
        style={[
          styles.arrowButton,
          { transform: [{ scale: arrowScale }] }
        ]}
      >
        <TouchableOpacity onPress={goToNextSlide}>
          <AntDesign name="arrowright" size={24} color="#fff" />
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingVertical: 24,
    paddingHorizontal: 16,
    position: 'relative',
    backgroundColor: '#FFFFFF',
  },
  flatListContent: {
    paddingHorizontal: 0,
  },
  slide: {
    height: 188,
    borderRadius: 16,
    overflow: 'hidden',
    width: '100%',
    marginBottom: 8
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 26,
    height: '100%',
  },
  textContainer: {
    flex: 1,
    paddingLeft: 16,
  },
  title: {
    fontFamily: 'TESCOBL_1',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    lineHeight: 22,
  },
  image: {
    width: 120,
    height: 120,
  },
  arrowButton: {
    position: 'absolute',
    right: 34,
    top: 160,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#FF7A00',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    zIndex: 10,
  },
});

export default Offers_carousel;

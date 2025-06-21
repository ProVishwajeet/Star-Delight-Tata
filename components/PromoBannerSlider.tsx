import React, { useState, useRef, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Dimensions, TouchableOpacity, Animated } from 'react-native';
import PromoBanner from './PromoBanner';
import { MegaphoneIcon, DiscountIcon, DeliveryIcon, CalendarIcon } from './IconAssets';
import Svg, { Path } from 'react-native-svg';

// Sample data for banners
const bannerData = [
  {
    id: '1',
    title: 'Check lowest prices',
    subtitle: 'in the store',
    backgroundColor: '#F4F4F4',
    icon: <MegaphoneIcon />,
  },
  {
    id: '2',
    title: 'Get 20% off',
    subtitle: 'on first order',
    backgroundColor: '#F4F4F4',
    icon: <DiscountIcon />,
  },
  {
    id: '3',
    title: 'Free delivery',
    subtitle: 'on orders above ₹500',
    backgroundColor: '#F4F4F4',
    icon: <DeliveryIcon />,
  },
  {
    id: '4',
    title: 'Daily deals',
    subtitle: 'save big everyday',
    backgroundColor: '#F4F4F4',
    icon: <CalendarIcon />,
  },
];

const { width } = Dimensions.get('window');
const BANNER_WIDTH = width - 40; // Account for horizontal padding

// Arrow components
const LeftArrow = () => (
  <View style={styles.arrowContainer}>
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <Path d="M15 18L9 12L15 6" stroke="#FF7A00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </Svg>
  </View>
);

const RightArrow = () => (
  <View style={styles.arrowContainer}>
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <Path d="M9 6L15 12L9 18" stroke="#FF7A00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </Svg>
  </View>
);

const PromoBannerSlider = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollViewRef = useRef<ScrollView>(null);
  const slideAnimation = useRef(new Animated.Value(0)).current;
  
  // Track if we're at the first or last banner
  const isFirstBanner = activeIndex === 0;
  const isLastBanner = activeIndex === bannerData.length - 1;

  const handleScroll = (event: any) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(contentOffsetX / BANNER_WIDTH);
    setActiveIndex(currentIndex);
  };

  const scrollToBanner = (index: number) => {
    if (scrollViewRef.current) {
      // Animate the transition
      Animated.timing(slideAnimation, {
        toValue: index > activeIndex ? 1 : -1,
        duration: 150,
        useNativeDriver: true,
      }).start(() => {
        scrollViewRef.current?.scrollTo({ x: index * BANNER_WIDTH, animated: true });
        setActiveIndex(index);
        // Reset animation value
        slideAnimation.setValue(0);
      });
    }
  };

  // Navigate to previous banner
  const goToPrevious = () => {
    if (activeIndex > 0) {
      scrollToBanner(activeIndex - 1);
    }
  };

  // Navigate to next banner
  const goToNext = () => {
    if (activeIndex < bannerData.length - 1) {
      scrollToBanner(activeIndex + 1);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <ScrollView
          ref={scrollViewRef}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={handleScroll}
          style={styles.scrollView}
          scrollEventThrottle={16}
          decelerationRate="fast"
        >
          {bannerData.map((banner, index) => (
            <Animated.View 
              key={banner.id} 
              style={[
                styles.bannerContainer,
                { 
                  transform: [{
                    translateX: slideAnimation.interpolate({
                      inputRange: [-1, 0, 1],
                      outputRange: [BANNER_WIDTH * 0.05, 0, -BANNER_WIDTH * 0.05]
                    })
                  }],
                  opacity: slideAnimation.interpolate({
                    inputRange: [-1, 0, 1],
                    outputRange: [0.8, 1, 0.8]
                  })
                }
              ]}
            >
              <PromoBanner
                title={banner.title}
                subtitle={banner.subtitle}
                backgroundColor={banner.backgroundColor}
                icon={banner.icon}
                onPress={() => console.log(`Banner ${banner.id} pressed`)}
              />
            </Animated.View>
          ))}
        </ScrollView>

        {/* Navigation arrows */}
        <View style={styles.arrowsContainer}>
          {!isFirstBanner && (
            <TouchableOpacity 
              style={[styles.arrowButton, styles.leftArrow]} 
              onPress={goToPrevious}
              activeOpacity={0.7}
            >
              <LeftArrow />
            </TouchableOpacity>
          )}
          
          {!isLastBanner && (
            <TouchableOpacity 
              style={[styles.arrowButton, styles.rightArrow]} 
              onPress={goToNext}
              activeOpacity={0.7}
            >
              <RightArrow />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 104,
    backgroundColor: '#F4F4F4',
    borderRadius: 12,
    overflow: 'hidden',
  },
  contentContainer: {
    flex: 1,
    position: 'relative',
  },
  scrollView: {
    width: '100%',
    height: '100%',
  },
  bannerContainer: {
    width: BANNER_WIDTH,
    height: 104,
    justifyContent: 'center',
  },
  arrowsContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    pointerEvents: 'box-none',
  },
  arrowButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  leftArrow: {
    marginLeft: 10,
  },
  rightArrow: {
    marginRight: 10,
  },
  arrowContainer: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default PromoBannerSlider;

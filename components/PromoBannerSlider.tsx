import React, { useState, useRef } from 'react';
import { View, StyleSheet, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
import PromoBanner from './PromoBanner';
import { MegaphoneIcon, DiscountIcon, DeliveryIcon, CalendarIcon } from './IconAssets';

// Sample data for banners
const bannerData = [
  {
    id: '1',
    title: 'Check lowest prices',
    subtitle: 'in the store',
    backgroundColor: '#f5f5f5',
    icon: <MegaphoneIcon />,
  },
  {
    id: '2',
    title: 'Get 20% off',
    subtitle: 'on first order',
    backgroundColor: '#E6F7FF',
    icon: <DiscountIcon />,
  },
  {
    id: '3',
    title: 'Free delivery',
    subtitle: 'on orders above ₹500',
    backgroundColor: '#FFECDB',
    icon: <DeliveryIcon />,
  },
  {
    id: '4',
    title: 'Daily deals',
    subtitle: 'save big everyday',
    backgroundColor: '#E8F5E9',
    icon: <CalendarIcon />,
  },
];

const { width } = Dimensions.get('window');

const PromoBannerSlider = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollViewRef = useRef<ScrollView>(null);

  const handleScroll = (event: any) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(contentOffsetX / width);
    setActiveIndex(currentIndex);
  };

  const handleDotPress = (index: number) => {
    scrollViewRef.current?.scrollTo({
      x: index * width,
      animated: true,
    });
    setActiveIndex(index);
  };

  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        style={styles.scrollView}
      >
        {bannerData.map((banner) => (
          <View key={banner.id} style={styles.bannerContainer}>
            <PromoBanner
              title={banner.title}
              subtitle={banner.subtitle}
              backgroundColor={banner.backgroundColor}
              icon={banner.icon}
              onPress={() => console.log(`Banner ${banner.id} pressed`)}
            />
          </View>
        ))}
      </ScrollView>

      {/* Pagination dots */}
      <View style={styles.pagination}>
        {bannerData.map((_, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.paginationDot,
              index === activeIndex && styles.paginationDotActive,
            ]}
            onPress={() => handleDotPress(index)}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
  },
  scrollView: {
    width: '100%',
  },
  bannerContainer: {
    width: width,
    paddingHorizontal: 10,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ccc',
    marginHorizontal: 4,
  },
  paginationDotActive: {
    backgroundColor: '#FF7A00',
    width: 12,
    height: 12,
    borderRadius: 6,
  },
});

export default PromoBannerSlider;

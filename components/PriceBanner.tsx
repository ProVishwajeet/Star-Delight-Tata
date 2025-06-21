import { AntDesign } from '@expo/vector-icons';
import React, { useEffect, useRef, useState } from 'react';
import { Animated, Dimensions, FlatList, Image, StyleSheet, Text, TouchableOpacity, View, ViewToken } from 'react-native';

const { width } = Dimensions.get('window');
const BANNER_WIDTH = width - 32; // Accounting for container padding

interface BannerItem {
  id: string;
  text: string;
}

const bannerData: BannerItem[] = [
  { id: '1', text: 'Check lowest prices in the store' },
  { id: '2', text: 'Get exclusive offers today' },
  { id: '3', text: 'Free delivery on orders above ₹500' },
];

const PriceBanner = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const flatListRef = useRef<FlatList<BannerItem>>(null);
  
  // Auto scroll functionality
  useEffect(() => {
    const timer = setInterval(() => {
      if (flatListRef.current) {
        const nextIndex = (currentIndex + 1) % bannerData.length;
        flatListRef.current.scrollToIndex({ index: nextIndex, animated: true });
        setCurrentIndex(nextIndex);
      }
    }, 3000);
    
    return () => clearInterval(timer);
  }, [currentIndex]);
  
  // Handle manual scroll
  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
    { useNativeDriver: false }
  );
  
  const handleViewableItemsChanged = useRef(({ viewableItems }: { viewableItems: ViewToken[] }) => {
    if (viewableItems.length > 0 && viewableItems[0].index !== null) {
      setCurrentIndex(viewableItems[0].index);
    }
  }).current;
  
  const handleNextPress = () => {
    if (flatListRef.current) {
      const nextIndex = (currentIndex + 1) % bannerData.length;
      flatListRef.current.scrollToIndex({ index: nextIndex, animated: true });
    }
  };
  
  const renderItem = ({ item }: { item: BannerItem }) => (
    <View style={styles.bannerContent}>
      <View style={styles.leftContent}>
        <View style={styles.megaphoneContainer}>
          <Image 
            source={require('../assets/images/megaphone-icon.png')} 
            style={styles.megaphoneIcon} 
            resizeMode="contain"
          />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.title}>{item.text}</Text>
        </View>
      </View>
    </View>
  );
  
  return (
    <View style={styles.container}>
      <Animated.FlatList
        ref={flatListRef}
        data={bannerData}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        onViewableItemsChanged={handleViewableItemsChanged}
        viewabilityConfig={{ viewAreaCoveragePercentThreshold: 50 }}
      />
      <TouchableOpacity style={styles.arrowButton} onPress={handleNextPress}>
        <AntDesign name="arrowright" size={24} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingVertical: 24,
    paddingRight: 64,
    paddingLeft: 5,
    backgroundColor: '#F4F4F4',
    position: 'relative',
  },
  bannerContent: {
    width: BANNER_WIDTH,
    height: 56,
    backgroundColor: '#F4F4F4',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  leftContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  megaphoneContainer: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  megaphoneIcon: {
    width: 40,
    height: 40,
  },
  textContainer: {
    flexDirection: 'column',
    flex: 1,
  },
  title: {
    fontFamily: 'TESCOBL_1',
    fontSize: 26,
    fontStyle: 'normal',
    fontWeight: 'bold',
    lineHeight: 28,
    color: '#333',
  },
  arrowButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FF7A00',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: 10,
    top: 35,
    zIndex: 1,
  },
});

export default PriceBanner;

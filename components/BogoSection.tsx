import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Dimensions,
  FlatList,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewToken,
} from 'react-native';
import StaticOfferCards from './StaticOfferCards';

const { width } = Dimensions.get('window');
const HEADER_PADDING = 12;
const HEADER_BORDER_COLOR = '#CACACA';
const CARD_MARGIN = 10;

interface ProductItem {
  id: string;
  title: string;
  percentage: string;
  discountText: string;
  image: any;
}

interface HeaderItem {
  id: string;
  text: string;
}

const sampleProducts: ProductItem[] = [
  {
    id: '1',
    title: 'upto',
    percentage: '30%',
    discountText: 'OFF',
    image: require('../assets/images/Products mutli1.png'),
  },
  {
    id: '2',
    title: 'upto',
    percentage: '40%',
    discountText: 'OFF',
    image: require('../assets/images/Products mutli2.png'),
  },
  {
    id: '3',
    title: 'upto',
    percentage: '50%',
    discountText: 'OFF',
    image: require('../assets/images/Products mutli1.png'),
  },
  {
    id: '4',
    title: 'upto',
    percentage: '20%',
    discountText: 'OFF',
    image: require('../assets/images/Products mutli2.png'),
  },
];

const headerItems: HeaderItem[] = [
  { id: '1', text: 'BUY 1, GET 1 FREE' },
  { id: '2', text: 'FLASH SALE TODAY' },
  { id: '3', text: 'SPECIAL OFFERS' },
  { id: '4', text: 'COMBO DEALS' },
];

const CARD_WIDTH = (width - (CARD_MARGIN * 4)) / 2; // show exactly 2 cards with equal spacing on both sides
const CARD_HEIGHT = 140;

const BogoSection = () => {
  const productListRef = useRef<FlatList<ProductItem>>(null);
  const headerListRef = useRef<FlatList<HeaderItem>>(null);
  const [currentProductIndex, setCurrentProductIndex] = useState(0);
  const [currentHeaderIndex, setCurrentHeaderIndex] = useState(0);

  const viewabilityConfig = { viewAreaCoveragePercentThreshold: 50 };

  const handleProductViewableItemsChanged = useRef(({ viewableItems }: { viewableItems: Array<ViewToken> }) => {
    if (viewableItems.length > 0) {
      setCurrentProductIndex(viewableItems[0].index || 0);
    }
  }).current;

  const handleHeaderViewableItemsChanged = useRef(({ viewableItems }: { viewableItems: Array<ViewToken> }) => {
    if (viewableItems.length > 0) {
      setCurrentHeaderIndex(viewableItems[0].index || 0);
    }
  }).current;

  const goToNextProductSlide = () => {
    if (productListRef.current) {
      const nextIndex = (currentProductIndex + 1) % sampleProducts.length;
      productListRef.current.scrollToIndex({
        animated: true,
        index: nextIndex,
      });
      setCurrentProductIndex(nextIndex);
    }
  };
  
  const goToNextHeaderSlide = () => {
    if (headerListRef.current) {
      const nextIndex = (currentHeaderIndex + 1) % headerItems.length;
      headerListRef.current.scrollToIndex({
        animated: true,
        index: nextIndex,
      });
      setCurrentHeaderIndex(nextIndex);
    }
  };

  // Auto-scroll every 3 seconds
  useEffect(() => {
    const productTimer = setInterval(() => {
      goToNextProductSlide();
    }, 3000);
    
    const headerTimer = setInterval(() => {
      goToNextHeaderSlide();
    }, 4000);

    return () => {
      clearInterval(productTimer);
      clearInterval(headerTimer);
    };
  }, [currentProductIndex, currentHeaderIndex]);
  
  // For infinite scrolling - products
  const handleProductScroll = (event: any) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const itemWidth = CARD_WIDTH + CARD_MARGIN;
    const index = Math.round(scrollPosition / itemWidth);
    
    // If we're at the last item, prepare to scroll back to first
    if (index === sampleProducts.length - 1) {
      setTimeout(() => {
        if (productListRef.current) {
          productListRef.current.scrollToOffset({ offset: 0, animated: false });
          setCurrentProductIndex(0);
        }
      }, 500);
    }
  };
  
  // For infinite scrolling - header
  const handleHeaderScroll = (event: any) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const itemWidth = width - 32; // Header width
    const index = Math.round(scrollPosition / itemWidth);
    
    // If we're at the last item, prepare to scroll back to first
    if (index === headerItems.length - 1) {
      setTimeout(() => {
        if (headerListRef.current) {
          headerListRef.current.scrollToOffset({ offset: 0, animated: false });
          setCurrentHeaderIndex(0);
        }
      }, 500);
    }
  };



  const renderHeaderItem = ({ item }: { item: HeaderItem }) => (
    <View style={styles.headerContainer}>
      <Image
        source={require('../assets/images/key-discount.png')}
        style={styles.headerIcon}
        resizeMode="contain"
      />
      <Text style={styles.headerText}>{item.text}</Text>
      <TouchableOpacity onPress={goToNextHeaderSlide} activeOpacity={0.8} style={styles.headerArrowBtn}>
        <View style={styles.arrowCircle}>
          <Image 
            source={require('../assets/images/right-arrow.png')} 
            style={styles.arrowIcon} 
            resizeMode="contain"
          />
        </View>
      </TouchableOpacity>
    </View>
  );

  const renderItem = ({ item }: { item: ProductItem }) => (
    <View style={styles.card}>
      <ImageBackground 
        source={require('../assets/images/base-bg.png')} 
        style={styles.cardBackground}
        resizeMode="cover"
      >
        <View style={styles.cardContent}>
          <View style={styles.textContainer}>
            <Text style={styles.titleText}>{item.title}</Text>
            <Text style={styles.percentageText}>{item.percentage}</Text>
            <Text style={styles.discountText}>{item.discountText}</Text>
          </View>
          <Image source={item.image} style={styles.cardImage} resizeMode="contain" />
        </View>
      </ImageBackground>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerSliderContainer}>
        <Animated.FlatList
          ref={headerListRef}
          data={headerItems}
          renderItem={renderHeaderItem}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          snapToInterval={width - 32}
          decelerationRate="fast"
          contentContainerStyle={styles.headerListContent}
          onViewableItemsChanged={handleHeaderViewableItemsChanged}
          viewabilityConfig={viewabilityConfig}
          initialNumToRender={4}
          maxToRenderPerBatch={4}
          windowSize={4}
          onScroll={handleHeaderScroll}
          scrollEventThrottle={16}
          pagingEnabled={true}
        />
      </View>

      <View style={styles.cardsContainer}>
        <StaticOfferCards />
      </View>
      
      <View style={styles.buttonBackground}></View>
      <TouchableOpacity activeOpacity={0.8} style={styles.bottomBtn}>
        <Text style={styles.bottomBtnText}>Click for Delite-ful Offers 💰</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingTop: 24,
    paddingBottom: 36,
    alignItems: 'center',
    backgroundColor: 'transparent',
    marginTop: -70,
    paddingHorizontal: CARD_MARGIN,
  },
  headerSliderContainer: {
    width: '100%',
    marginBottom: 24,
  },
  headerListContent: {
    paddingHorizontal: CARD_MARGIN,
  },
  headerContainer: {
    width: width - 32,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'transparent',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: HEADER_BORDER_COLOR,
    paddingVertical: 16,
    paddingHorizontal: 12,
    marginRight: CARD_MARGIN,
  },
  headerIcon: {
    width: 36,
    height: 36,
  },
  headerText: {
    flex: 1,
    textAlign: 'center',
    fontSize: 26,
    fontWeight: '400',
    color: '#232731',
    fontFamily: 'TESCOBL_1',
  },
  headerArrowBtn: {
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
  },
  arrowCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#EC6300',
    justifyContent: 'center',
    alignItems: 'center',
  },
  arrowIcon: {
    width: 16,
    height: 16,
    tintColor: 'white',
  },
  flatListContent: {
    paddingHorizontal: CARD_MARGIN * 2,
  },
  cardsContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonBackground: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 80,
    backgroundColor: '#A4CA7E',
    opacity: 0.1,
  },
  card: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginHorizontal: CARD_MARGIN,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    position: 'relative',
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#EEEEEE',
  },
  cardBackground: {
    width: '100%',
    height: '100%',
  },

  // ... (rest of the styles remain the same)

  cardContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  textContainer: {
    flex: 1,
  },
  titleText: {
    fontSize: 16,
    color: '#000',
    fontWeight: '500',
  },
  percentageText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#EC6300',
    marginVertical: 4,
  },
  discountText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  cardImage: {
    width: CARD_WIDTH / 1.2,
    height: CARD_HEIGHT / 1.2,
    position: 'absolute',
    right: -10,
    top: 0,
  },
  bottomBtn: {
    marginTop: 24,
    width: width - 30,
    paddingVertical: 16,
    backgroundColor: '#429511',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    zIndex: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  bottomBtnText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
    fontFamily: 'TESCOBL_1',
  },
});

export default BogoSection;

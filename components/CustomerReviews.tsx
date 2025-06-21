import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Path, Svg } from 'react-native-svg';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width - 40; // Full width minus padding

// Sample review data
const reviewData = [
  {
    id: '1',
    name: 'Abhiraj Tiyagi',
    role: 'Customer',
    rating: 5,
    comment: 'This app has completely changed the way I shop for groceries! The offers are amazing, and I love the convenience of finding the best deals before I even step foot in the store. Highly recommend!',
    imageColor: '#FFB74D',
    initials: 'AT',
  },
  {
    id: '2',
    name: 'Priya Sharma',
    role: 'Customer',
    rating: 5,
    comment: 'Star Delight has the best deals in town! I save so much money on my weekly shopping. The app is easy to use and the delivery is always on time.',
    imageColor: '#4FC3F7',
    initials: 'PS',
  },
  {
    id: '3',
    name: 'Rahul Kapoor',
    role: 'Customer',
    rating: 4,
    comment: 'Great selection of products and excellent customer service. The special offers section is my favorite part of the app. Would definitely recommend!',
    imageColor: '#AED581',
    initials: 'RK',
  },
];

// Star component for ratings
const Star = ({ filled }: { filled: boolean }) => (
  <View style={styles.starContainer}>
    <Svg width="24" height="24" viewBox="0 0 24 24" fill={filled ? "#FFD700" : "none"}>
      <Path
        d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
        fill={filled ? "#FFD700" : "none"}
        stroke={filled ? "#FFD700" : "#FFD700"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  </View>
);

// Arrow component for navigation
const RightArrow = () => (
  <View style={styles.arrowContainer}>
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <Path
        d="M9 6L15 12L9 18"
        stroke="#FF7A00"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  </View>
);

const CustomerReviews = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollViewRef = useRef<ScrollView>(null);
  const scrollX = useRef(new Animated.Value(0)).current;

  // Handle scroll events
  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
    { useNativeDriver: false }
  );

  // Update active index based on scroll position
  useEffect(() => {
    const listener = scrollX.addListener(({ value }) => {
      const index = Math.round(value / CARD_WIDTH);
      setActiveIndex(index);
    });
    return () => {
      scrollX.removeListener(listener);
    };
  }, []);

  // Scroll to specific review
  const scrollToReview = (index: number) => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({ x: index * CARD_WIDTH, animated: true });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>What our Delited Shoppers Say</Text>
        <TouchableOpacity style={styles.feedbackButton}>
          <Text style={styles.feedbackText}>Share Feedback</Text>
          <RightArrow />
        </TouchableOpacity>
      </View>

      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        decelerationRate="fast"
        contentContainerStyle={styles.scrollViewContent}
      >
        {reviewData.map((review) => (
          <View key={review.id} style={styles.reviewCard}>
            <View style={styles.reviewHeader}>
              <View style={[styles.profileImage, { backgroundColor: review.imageColor }]}>
                <Text style={styles.profileInitials}>{review.initials}</Text>
              </View>
              <View style={styles.userInfo}>
                <Text style={styles.userName}>{review.name}</Text>
                <Text style={styles.userRole}>{review.role}</Text>
              </View>
              <View style={styles.quoteContainer}>
                <Image 
                  source={require('../assets/images/quote-review.png')} 
                  style={styles.quoteImage} 
                  resizeMode="contain"
                />
              </View>
            </View>
            <View style={styles.ratingContainer}>
              {[...Array(5)].map((_, index) => (
                <Star key={index} filled={index < review.rating} />
              ))}
            </View>
            <Text style={styles.reviewText}>{review.comment}</Text>
          </View>
        ))}
      </ScrollView>

      <View style={styles.paginationContainer}>
        {reviewData.map((_, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.paginationDot,
              index === activeIndex && styles.activeDot,
            ]}
            onPress={() => scrollToReview(index)}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: '#F4F4F4',
    paddingVertical: 45,
    marginTop: 16,
    marginBottom: 24,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    maxWidth: '60%',
  },
  feedbackButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  feedbackText: {
    color: '#FF7A00',
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 4,
  },
  arrowContainer: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollViewContent: {
    paddingHorizontal: 10,
  },
  reviewCard: {
    width: CARD_WIDTH - 20,
    backgroundColor: '#FFFFFF',
    marginBottom: 10,
    borderRadius: 16,
    padding: 20,
    marginHorizontal: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  reviewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileInitials: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  userRole: {
    fontSize: 14,
    color: '#666',
  },
  quoteContainer: {
    position: 'absolute',
    right: 16,
    top: 16,
  },
  quoteImage: {
    width: 46,
    height: 39,
  },
  ratingContainer: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  starContainer: {
    marginRight: 4,
  },
  reviewText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ddd',
    marginHorizontal: 4,
  },
  activeDot: {
    width: 24,
    height: 8,
    backgroundColor: '#333',
  },
});

export default CustomerReviews;

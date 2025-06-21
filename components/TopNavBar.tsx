import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface TopNavBarProps {
  onLogoPress?: () => void;
  onSearchPress?: () => void;
  onFavoritePress?: () => void;
  onNotificationPress?: () => void;
  onProfilePress?: () => void;
  location?: string;
  onLocationPress?: () => void;
  nearestStore?: string;
  onStorePress?: () => void;
}

const TopNavBar: React.FC<TopNavBarProps> = ({
  onLogoPress,
  onSearchPress,
  onFavoritePress,
  onNotificationPress,
  onProfilePress,
  location = 'Thane, Maharashtra',
  onLocationPress,
  nearestStore = 'Nearest Store: 4 kms',
  onStorePress,
}) => {
  return (
    <View style={styles.container}>
      {/* Top row with logo and icons */}
      <View style={styles.topRow}>
        <View style={styles.logoContainer}>
          <TouchableOpacity onPress={onLogoPress}>
            <Image 
              source={require('../assets/images/star logo.png')} 
              style={styles.logo} 
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
        
        <View style={styles.iconsRow}>
          <TouchableOpacity style={styles.iconButton} onPress={onSearchPress}>
            <Image 
              source={require('../assets/images/search.png')} 
              style={styles.icon} 
              resizeMode="contain"
            />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.iconButton} onPress={onFavoritePress}>
            <Image 
              source={require('../assets/images/Favorite.png')} 
              style={styles.icon} 
              resizeMode="contain"
            />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.iconButton} onPress={onNotificationPress}>
            <Image 
              source={require('../assets/images/Bell.png')} 
              style={styles.icon} 
              resizeMode="contain"
            />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.iconButton} onPress={onProfilePress}>
            <Image 
              source={require('../assets/images/profile.png')} 
              style={styles.icon} 
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
      </View>
      
      {/* Separator line */}
      <View style={styles.separator} />
      
      {/* Bottom row with location and store info */}
      <View style={styles.bottomRow}>
        <TouchableOpacity style={styles.locationContainer} onPress={onLocationPress}>
          <Image 
            source={require('../assets/images/location.png')} 
            style={styles.locationIcon} 
            resizeMode="contain"
          />
          <Text style={styles.locationText}>{location}</Text>
          <Image 
            source={require('../assets/images/arrow right.png')} 
            style={styles.arrowIcon} 
            resizeMode="contain"
          />
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.storeContainer} onPress={onStorePress}>
          <Image 
            source={require('../assets/images/Frame 2097.png')} 
            style={styles.storeIcon} 
            resizeMode="contain"
          />
          <Text style={styles.storeText}>{nearestStore}</Text>
          <Image 
            source={require('../assets/images/arrow right.png')} 
            style={styles.arrowIcon} 
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: '#FF7A00', // Orange background to match the screenshot
    paddingTop: 40, // Add padding for status bar
    paddingBottom: 10,
    paddingHorizontal: 15,
    zIndex: 10,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  logoContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 15,
    paddingHorizontal: 14,
    paddingVertical: 8,
    shadowColor: 'rgba(255, 255, 255, 0.70)',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 1,
    shadowRadius: 18.3,
    elevation: 5,
    backdropFilter: 'blur(11.787313461303711px)', // Note: This property works in web but not in React Native
  },
  logo: {
    width: 46,
    height: 18,
  },
  iconsRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    marginHorizontal: 10,
  },
  icon: {
    width: 24,
    height: 24,
    tintColor: '#FFFFFF', // Make icons white to match design
  },
  separator: {
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    marginTop: 10,
    marginBottom: 5,
    marginHorizontal: 0,
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 5,
    paddingHorizontal: 0,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationIcon: {
    width: 16,
    height: 16,
    marginRight: 5,
    tintColor: '#FFFFFF',
  },
  locationText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  arrowIcon: {
    width: 12,
    height: 12,
    marginLeft: 5,
    tintColor: '#FFFFFF',
  },
  storeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  storeIcon: {
    width: 16,
    height: 16,
    marginRight: 5,
    tintColor: '#FFFFFF',
  },
  storeText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});

export default TopNavBar;

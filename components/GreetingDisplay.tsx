import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useRef, useState } from 'react';
import { Animated, Easing, StyleSheet, Text, View } from 'react-native';

interface GreetingDisplayProps {
  userName?: string;
}

const GreetingDisplay: React.FC<GreetingDisplayProps> = ({ userName = '' }) => {
  const [greeting, setGreeting] = useState('');
  const [icon, setIcon] = useState('');
  
  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(-50)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const iconRotateAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const getCurrentGreeting = () => {
      const currentHour = new Date().getHours();
      
      if (currentHour >= 5 && currentHour < 12) {
        setGreeting('Good morning');
        setIcon('sunny');
      } else if (currentHour >= 12 && currentHour < 18) {
        setGreeting('Good afternoon');
        setIcon('partly-sunny');
      } else {
        setGreeting('Good evening');
        setIcon('moon');
      }
    };

    getCurrentGreeting();
    // Update greeting every hour
    const intervalId = setInterval(getCurrentGreeting, 3600000);
    
    // Start animations
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1200,
        useNativeDriver: true,
        easing: Easing.out(Easing.cubic)
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 1200,
        useNativeDriver: true,
        easing: Easing.out(Easing.back(1.5))
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 1200,
        useNativeDriver: true,
        easing: Easing.elastic(1.2)
      }),
      Animated.timing(iconRotateAnim, {
        toValue: 1,
        duration: 1500,
        useNativeDriver: true,
        easing: Easing.out(Easing.back(2))
      })
    ]).start();
    
    return () => clearInterval(intervalId);
  }, [fadeAnim, slideAnim, scaleAnim, iconRotateAnim]);

  return (
    <View style={styles.container}>
      <Animated.Text 
        style={[
          styles.greetingText,
          { 
            opacity: fadeAnim,
            transform: [
              { translateY: slideAnim },
              { scale: scaleAnim }
            ]
          }
        ]}
      >
        {greeting} {userName && userName.trim() !== '' ? userName : ''}
        {' '}
        {icon === 'sunny' && (
          <Animated.View style={{ transform: [{ rotate: iconRotateAnim.interpolate({inputRange: [0, 1], outputRange: ['0deg', '360deg']}) }] }}>
            <Ionicons name="sunny" size={32} color="#FFD700" />
          </Animated.View>
        )}
        {icon === 'partly-sunny' && (
          <Animated.View style={{ transform: [{ rotate: iconRotateAnim.interpolate({inputRange: [0, 1], outputRange: ['0deg', '360deg']}) }] }}>
            <Ionicons name="partly-sunny" size={32} color="#FFD700" />
          </Animated.View>
        )}
        {icon === 'moon' && (
          <Animated.View style={{ transform: [{ rotate: iconRotateAnim.interpolate({inputRange: [0, 1], outputRange: ['0deg', '360deg']}) }] }}>
            <Ionicons name="moon" size={32} color="#F0F8FF" />
          </Animated.View>
        )}
      </Animated.Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingVertical: 10,
    paddingHorizontal: 20,
    position: 'absolute',
    top: 100,
    left: 0,
    right: 0,
    zIndex: 10,
  },
  greetingText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
});

export default GreetingDisplay;

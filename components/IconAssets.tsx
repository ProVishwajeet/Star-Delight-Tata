// This file exports icon assets as React components
// We're using this approach since we can't directly import SVG files in React Native without additional libraries

import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Path, Rect, Circle } from 'react-native-svg';

export const MegaphoneIcon = () => (
  <Svg width="40" height="40" viewBox="0 0 40 40" fill="none">
    <Path d="M35 10C35 8.34 33.66 7 32 7C30.34 7 29 8.34 29 10C29 11.66 30.34 13 32 13C33.66 13 35 11.66 35 10Z" fill="#FF7A00"/>
    <Path d="M32 5C34.76 5 37 7.24 37 10C37 12.76 34.76 15 32 15C29.24 15 27 12.76 27 10C27 7.24 29.24 5 32 5ZM32 3C28.14 3 25 6.14 25 10C25 13.86 28.14 17 32 17C35.86 17 39 13.86 39 10C39 6.14 35.86 3 32 3Z" fill="#FF5722"/>
    <Path d="M28 20V10L8 15V25L28 20Z" fill="#FF7A00"/>
    <Path d="M8 15V25C5.79 25 4 23.21 4 21V19C4 16.79 5.79 15 8 15Z" fill="#FF5722"/>
  </Svg>
);

export const DiscountIcon = () => (
  <Svg width="40" height="40" viewBox="0 0 40 40" fill="none">
    <Path d="M33.5 18.5L21.5 6.5C20.4 5.4 18.8 5 17.5 5H8C6.3 5 5 6.3 5 8V17.5C5 18.8 5.4 20.4 6.5 21.5L18.5 33.5C19.6 34.6 21.3 34.6 22.4 33.5L33.5 22.4C34.6 21.3 34.6 19.6 33.5 18.5ZM11 14C9.3 14 8 12.7 8 11C8 9.3 9.3 8 11 8C12.7 8 14 9.3 14 11C14 12.7 12.7 14 11 14Z" fill="#2196F3"/>
    <Path d="M11 14C12.7 14 14 12.7 14 11C14 9.3 12.7 8 11 8C9.3 8 8 9.3 8 11C8 12.7 9.3 14 11 14Z" fill="#BBDEFB"/>
    <Path d="M30 20L20 30" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round"/>
  </Svg>
);

export const DeliveryIcon = () => (
  <Svg width="40" height="40" viewBox="0 0 40 40" fill="none">
    <Path d="M31 13H26V8H6C3.8 8 2 9.8 2 12V26H6C6 28.2 7.8 30 10 30C12.2 30 14 28.2 14 26H26C26 28.2 27.8 30 30 30C32.2 30 34 28.2 34 26H38V19L31 13Z" fill="#FF9800"/>
    <Path d="M30 28C31.1 28 32 27.1 32 26C32 24.9 31.1 24 30 24C28.9 24 28 24.9 28 26C28 27.1 28.9 28 30 28Z" fill="#FFE0B2"/>
    <Path d="M10 28C11.1 28 12 27.1 12 26C12 24.9 11.1 24 10 24C8.9 24 8 24.9 8 26C8 27.1 8.9 28 10 28Z" fill="#FFE0B2"/>
    <Path d="M31 15L36 19H26V15H31Z" fill="#FFE0B2"/>
  </Svg>
);

export const CalendarIcon = () => (
  <Svg width="40" height="40" viewBox="0 0 40 40" fill="none">
    <Rect x="5" y="8" width="30" height="28" rx="2" fill="#4CAF50"/>
    <Rect x="5" y="14" width="30" height="4" fill="#2E7D32"/>
    <Rect x="10" y="4" width="4" height="8" rx="1" fill="#2E7D32"/>
    <Rect x="26" y="4" width="4" height="8" rx="1" fill="#2E7D32"/>
    <Circle cx="12" cy="22" r="2" fill="white"/>
    <Circle cx="20" cy="22" r="2" fill="white"/>
    <Circle cx="28" cy="22" r="2" fill="white"/>
    <Circle cx="12" cy="30" r="2" fill="white"/>
    <Circle cx="20" cy="30" r="2" fill="white"/>
    <Circle cx="28" cy="30" r="2" fill="white"/>
  </Svg>
);

// Export all icons as a single object
export const Icons = {
  megaphone: <MegaphoneIcon />,
  discount: <DiscountIcon />,
  delivery: <DeliveryIcon />,
  calendar: <CalendarIcon />,
};

const styles = StyleSheet.create({
  iconContainer: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

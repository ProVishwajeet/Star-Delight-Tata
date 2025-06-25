import React from 'react';
import { StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';
import Svg, { Path } from 'react-native-svg';

interface StarburstBadgeProps {
  price: string;
  originalPrice?: string;
  color?: string;
  size?: number;
  style?: StyleProp<ViewStyle>;
}

export const StarburstBadge: React.FC<StarburstBadgeProps> = ({
  price,
  originalPrice,
  color = '#FFFFFF',
  size = 50,
  style,
}) => {
  // Calculate the size of the starburst (slightly larger than the inner circle)
  const starburstSize = size * 1.2;
  
  return (
    <View style={[styles.container, style]}>
      <Svg height={starburstSize} width={starburstSize} viewBox="0 0 51 51">
        {/* Single starburst shape without border */}
        <Path
          d="M5.63556 11.8698C5.63556 10.2163 6.29237 8.63065 7.46151 7.46151C8.63065 6.29237 10.2163 5.63556 11.8698 5.63556H14.7035C16.3496 5.63462 17.9285 4.98267 19.0958 3.82197L21.0794 1.83836C21.6587 1.25575 22.3475 0.7934 23.1062 0.477907C23.8648 0.162415 24.6784 0 25.5 0C26.3216 0 27.1352 0.162415 27.8938 0.477907C28.6525 0.7934 29.3413 1.25575 29.9206 1.83836L31.9042 3.82197C33.0717 4.9838 34.6529 5.63556 36.2965 5.63556H39.1302C40.7836 5.63556 42.3693 6.29237 43.5385 7.46151C44.7076 8.63065 45.3644 10.2163 45.3644 11.8698V14.7035C45.3644 16.3471 46.0162 17.9283 47.178 19.0958L49.1616 21.0794C49.7443 21.6587 50.2066 22.3475 50.5221 23.1062C50.8376 23.8648 51 24.6784 51 25.5C51 26.3216 50.8376 27.1352 50.5221 27.8938C50.2066 28.6525 49.7443 29.3413 49.1616 29.9206L47.178 31.9042C46.0173 33.0715 45.3654 34.6504 45.3644 36.2965V39.1302C45.3644 40.7836 44.7076 42.3693 43.5385 43.5385C42.3693 44.7076 40.7836 45.3644 39.1302 45.3644H36.2965C34.6504 45.3654 33.0715 46.0173 31.9042 47.178L29.9206 49.1616C29.3413 49.7443 28.6525 50.2066 27.8938 50.5221C27.1352 50.8376 26.3216 51 25.5 51C24.6784 51 23.8648 50.8376 23.1062 50.5221C22.3475 50.2066 21.6587 49.7443 21.0794 49.1616L19.0958 47.178C17.9285 46.0173 16.3496 45.3654 14.7035 45.3644H11.8698C10.2163 45.3644 8.63065 44.7076 7.46151 43.5385C6.29237 42.3693 5.63556 40.7836 5.63556 39.1302V36.2965C5.63462 34.6504 4.98267 33.0715 3.82197 31.9042L1.83836 29.9206C1.25575 29.3413 0.7934 28.6525 0.477907 27.8938C0.162415 27.1352 0 26.3216 0 25.5C0 24.6784 0.162415 23.8648 0.477907 23.1062C0.7934 22.3475 1.25575 21.6587 1.83836 21.0794L3.82197 19.0958C4.98267 17.9285 5.63462 16.3496 5.63556 14.7035V11.8698Z"
          fill="white"
        />
      </Svg>
      
      {/* Text content positioned absolutely over the starburst */}
      <View style={styles.textContainer}>
        <Text style={styles.priceText}>{price}</Text>
        {originalPrice && (
          <Text style={styles.originalPriceText}>
            {originalPrice}
          </Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 90,
    left: 40,
    zIndex: 10,
  },
  textContainer: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  priceText: {
    color: '#429511', // Green color for the text
    fontWeight: 'bold',
    fontSize: 14,
    textAlign: 'center',
  },
  originalPriceText: {
    color: '#232731',
    fontSize: 10,
    textDecorationLine: 'line-through',
    textAlign: 'center',
    marginTop: -2,
  },
});

export default StarburstBadge;

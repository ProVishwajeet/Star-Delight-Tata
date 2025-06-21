import React from 'react';
import { Text, View } from 'react-native';
import MaskedView from '@react-native-masked-view/masked-view';
import { LinearGradient } from 'expo-linear-gradient';

interface TextGradientProps {
  text: string;
  style?: any;
  colors?: string[];
}

const TextGradient: React.FC<TextGradientProps> = ({ 
  text, 
  style = {}, 
  colors = ['#FF7A00', '#FFF', '#FF7A00'] 
}) => {
  return (
    <MaskedView
      maskElement={
        <Text style={[{ fontWeight: 'bold' }, style]}>
          {text}
        </Text>
      }
    >
      <LinearGradient
        colors={colors}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={{ flex: 1 }}
      >
        <Text style={[{ opacity: 0, fontWeight: 'bold' }, style]}>
          {text}
        </Text>
      </LinearGradient>
    </MaskedView>
  );
};

export default TextGradient;

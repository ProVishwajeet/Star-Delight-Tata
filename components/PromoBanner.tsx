import React, { ReactElement } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

interface PromoBannerProps {
  title: string;
  subtitle?: string;
  backgroundColor?: string;
  textColor?: string;
  onPress?: () => void;
  icon?: ReactElement;
}

const PromoBanner: React.FC<PromoBannerProps> = ({
  title,
  subtitle,
  backgroundColor = '#F4F4F4',
  textColor = '#333',
  icon,
  onPress,
}) => {
  return (
    <TouchableOpacity
      style={[styles.container, { backgroundColor }]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View style={styles.content}>
        {icon && <View style={styles.iconContainer}>{icon}</View>}
        <View style={styles.textContainer}>
          <Text style={[styles.title, { color: textColor }]}>{title}</Text>
          {subtitle && <Text style={[styles.subtitle, { color: textColor }]}>{subtitle}</Text>}
        </View>
        <View style={styles.arrowContainer}>
          <Text style={styles.arrowText}>›</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 104,
    borderRadius: 12,
    padding: 16,
    justifyContent: 'center',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    marginRight: 16,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
  },
  arrowContainer: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  arrowText: {
    color: '#FF7A00',
    fontSize: 24,
    fontWeight: 'bold',
    lineHeight: 24,
  },
});

export default PromoBanner;

import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity } from 'react-native';

interface ChatWithUsButtonProps {
  onPress?: () => void;
}

const ChatWithUsButton: React.FC<ChatWithUsButtonProps> = ({ onPress }) => {
  return (
    <TouchableOpacity 
      onPress={onPress || (() => console.log('Chat button pressed'))}
      activeOpacity={0.9}
      style={styles.buttonContainer}
    >
      <LinearGradient
        colors={['#cd6a25', '#F86C0A', '#F3BC74', '#F3C47E']}
        start={{ x: 0, y: 0.5 }}
        end={{ x: 1, y: 0.8 }}
        locations={[0, 0.36, 0.99, 1]}
        style={styles.chatButton}
      >
        <Image 
          source={require('../assets/images/chat-icon.png')} 
          style={styles.chatIcon} 
        />
        <Text style={styles.chatText}>Chat with Us</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    position: 'absolute',
    right: 10,
    bottom: 120, 
    zIndex: 999,
  },
  chatButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 10,
    paddingRight: 16,
    paddingBottom: 10,
    paddingLeft: 16,
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  chatIcon: {
    width: 24,
    height: 24,
  },
  chatText: {
    color: '#fff',
    fontFamily: 'Tesco',
    fontWeight: '700',
    fontSize: 16,
    marginLeft: 5,
  },
});

export default ChatWithUsButton;

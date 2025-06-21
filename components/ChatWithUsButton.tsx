import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

interface ChatWithUsButtonProps {
  onPress?: () => void;
}

const ChatWithUsButton: React.FC<ChatWithUsButtonProps> = ({ onPress }) => {
  return (
    <TouchableOpacity 
      style={styles.chatButton}
      onPress={onPress || (() => console.log('Chat button pressed'))}
      activeOpacity={0.9}
    >
      <Ionicons name="chatbubble-ellipses" size={24} color="#fff" />
      <Text style={styles.chatText}>Chat with Us</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  chatButton: {
    position: 'absolute',
    right: 10,
    bottom: 120, // Position above the bottom nav with proper spacing
    backgroundColor: '#FF7A00',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    zIndex: 999,
  },
  chatText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 12,
    marginLeft: 5,
  },
});

export default ChatWithUsButton;

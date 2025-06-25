import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  isActive?: boolean;
  onPress?: () => void;
}

const NavItem = ({ icon, label, isActive = false, onPress }: NavItemProps) => {
  return (
    <TouchableOpacity 
      style={styles.navItem} 
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={isActive ? styles.activeIconContainer : styles.iconContainer}>
        {icon}
      </View>
      <Text style={[
        styles.navLabel, 
        isActive ? styles.activeNavLabel : null
      ]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

const BottomNavBar = () => {
  const [activeTab, setActiveTab] = React.useState('Home');

  const handleTabPress = (tabName: string) => {
    setActiveTab(tabName);
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['bottom']}>
      <View style={styles.container}>
        <NavItem 
          icon={
            <Image 
              source={require('../assets/images/home-icon.png')} 
              style={[styles.icon, activeTab === 'Home' ? styles.activeIcon : null]} 
              resizeMode="contain"
            />
          }
          label="Home"
          isActive={activeTab === 'Home'}
          onPress={() => handleTabPress('Home')}
        />
        <NavItem 
          icon={
            <Image 
              source={require('../assets/images/categories-icon.png')} 
              style={[styles.icon, activeTab === 'Categories' ? styles.activeIcon : null]} 
              resizeMode="contain"
            />
          }
          label="Categories"
          isActive={activeTab === 'Categories'}
          onPress={() => handleTabPress('Categories')}
        />
        <View style={styles.centerButtonContainer}>
          <TouchableOpacity style={styles.centerButton} onPress={() => handleTabPress('MyID')}>
            <View style={styles.centerButtonInner}>
              <Image 
                source={require('../assets/images/star logomark.png')} 
                style={styles.centerButtonIcon} 
                resizeMode="contain"
              />
              <Text style={styles.centerButtonText}>My ID</Text>
            </View>
          </TouchableOpacity>
        </View>
        <NavItem 
          icon={
            <Image 
              source={require('../assets/images/Stores-icon.png')} 
              style={[styles.icon, activeTab === 'Stores' ? styles.activeIcon : null]} 
              resizeMode="contain"
            />
          }
          label="Stores"
          isActive={activeTab === 'Stores'}
          onPress={() => handleTabPress('Stores')}
        />
        <NavItem 
          icon={
            <Image 
              source={require('../assets/images/my-oders-icon.png')} 
              style={[styles.icon, activeTab === 'My Orders' ? styles.activeIcon : null]} 
              resizeMode="contain"
            />
          }
          label="My Orders"
          isActive={activeTab === 'My Orders'}
          onPress={() => handleTabPress('My Orders')}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    zIndex: 1000,
  },
  container: {
    flexDirection: 'row',
    height: 70,
    backgroundColor: '#fff',
    borderTopWidth: 0,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -5 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 10,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeIconContainer: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    width: 24,
    height: 24,
    tintColor: '#666',
  },
  activeIcon: {
    tintColor: '#FF7A00',
  },
  navLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  activeNavLabel: {
    color: '#FF7A00',
    fontWeight: '600',
  },
  centerButtonContainer: {
    width: 80,
    height: 80,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -40,
  },
  centerButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 8,
  },
  centerButtonInner: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  centerButtonIcon: {
    width: 24,
    height: 24,
    marginBottom: 2,
  },
  centerButtonText: {
    color: '#FF7A00',
    fontWeight: 'bold',
    fontSize: 14,
    marginTop: 2,
  },
});

export default BottomNavBar;

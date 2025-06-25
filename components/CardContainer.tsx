import React, { ReactNode } from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import Svg, { ClipPath, Defs, ForeignObject, Path } from 'react-native-svg';

interface CardContainerProps {
  children: ReactNode;
  style?: ViewStyle;
  variant?: 'normal' | 'inverted';
  width?: number;
  height?: number;
}

const CardContainer: React.FC<CardContainerProps> = ({
  children,
  style,
  variant = 'normal',
  width = 194,
  height = 176,
}) => {
  return (
    <View style={[styles.container, style]}>
      {variant === 'normal' ? (
        <Svg width={width} height={height} viewBox="0 0 164 144" fill="none">
          <Path
            d="M2.72839 122.597L15.2213 24.5973C16.4308 15.1096 24.5043 8 34.0688 8H130.342C139.932 8 148.018 15.1452 149.198 24.6613L161.353 122.661C162.759 133.996 153.919 144 142.498 144H116.206H86.2171H51.5429H21.5759C10.1288 144 1.28084 133.953 2.72839 122.597Z"
            fill="#EC6300"
          />
          <Path
            d="M4.46846 115.802L15.8805 17.8023C16.9959 8.22383 25.1098 1 34.753 1H130.595C140.29 1 148.429 8.29826 149.483 17.9351L160.197 115.935C161.426 127.179 152.62 137 141.31 137H116.706H86.7171H52.0429H23.3409C11.9767 137 3.15398 127.09 4.46846 115.802Z"
            fill="white"
            stroke="#D1511E"
          />
          <Defs>
            <ClipPath id="clip0">
              <Path
                d="M4.46846 115.802L15.8805 17.8023C16.9959 8.22383 25.1098 1 34.753 1H130.595C140.29 1 148.429 8.29826 149.483 17.9351L160.197 115.935C161.426 127.179 152.62 137 141.31 137H116.706H86.7171H52.0429H23.3409C11.9767 137 3.15398 127.09 4.46846 115.802Z"
                transform="translate(5.86159 9.2)"
              />
            </ClipPath>
          </Defs>
          <ForeignObject x="-5.86159" y="-9.2" width="176.373" height="156.4" clipPath="url(#clip0)">
            <View style={styles.blurEffect} />
          </ForeignObject>
        </Svg>
      ) : (
        <Svg width={width} height={height} viewBox="0 0 164 144" fill="none">
          <Path
            d="M160.429 35.2221L148.765 127.385C147.564 136.881 139.487 144 129.916 144L33.6726 144C24.0771 144 15.9876 136.845 14.815 127.322L3.53926 35.7445C1.86766 22.1683 14.6575 11.3271 27.7764 15.2L40.8641 19.0637C45.3283 20.3816 50.1209 20.015 54.3326 18.0334L70.2469 10.5457C75.0503 8.2857 80.5801 8.13825 85.4971 10.1391L106.491 18.6821C110.36 20.2565 114.64 20.512 118.669 19.4091L136.562 14.511C149.626 10.9349 162.129 21.7853 160.429 35.2221Z"
            fill="#EC6300"
          />
          <Path
            d="M161.272 22.4027L148.779 120.403C147.569 129.89 139.496 137 129.931 137L33.6575 137C24.0685 137 15.9823 129.855 14.802 120.339L2.64674 22.3387C1.2409 11.0044 10.081 1.00002 21.5022 1.00002L47.7943 1.00001L77.7829 1.00002L112.457 1.00001L142.424 1.00003C153.871 1.00003 162.719 11.0475 161.272 22.4027Z"
            fill="white"
            stroke="#D1511E"
          />
          <Defs>
            <ClipPath id="clip1">
              <Path
                d="M161.272 22.4027L148.779 120.403C147.569 129.89 139.496 137 129.931 137L33.6575 137C24.0685 137 15.9823 129.855 14.802 120.339L2.64674 22.3387C1.2409 11.0044 10.081 1.00002 21.5022 1.00002L47.7943 1.00001L77.7829 1.00002L112.457 1.00001L142.424 1.00003C153.871 1.00003 162.719 11.0475 161.272 22.4027Z"
                transform="translate(7.70058 9.2)"
              />
            </ClipPath>
          </Defs>
          <ForeignObject x="-7.70058" y="-9.2" width="179.328" height="156.4" clipPath="url(#clip1)">
            <View style={styles.blurEffect} />
          </ForeignObject>
        </Svg>
      )}
      <View style={styles.contentContainer}>{children}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    width: 194,
    height: 176,
    justifyContent: 'center',
    alignItems: 'center',
  },
  blurEffect: {
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.15)', // Simulating blur effect
  },
  contentContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
  },
});

export default CardContainer;

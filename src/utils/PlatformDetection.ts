import { Platform, Dimensions } from 'react-native';

export const isAndroidTV = (): boolean => {
  const { width, height } = Dimensions.get('window');

  // Use screen size heuristic - most TVs have larger screens
  // and a landscape orientation with significant width
  if (Platform.OS === 'android' && width > 1200) {
    return true;
  }

  return false;
};

export const getTVPaddleControls = () => {
  // For TV, we might want to adjust paddle sizes, speeds, etc.
  return {
    paddleHeight: 120, // larger paddle for TV
    paddleWidth: 25,   // wider paddle for TV
    ballSize: 25,      // larger ball for visibility
  };
};

export const getPhonePaddleControls = () => {
  // For phones, standard sizes
  return {
    paddleHeight: 100,
    paddleWidth: 20,
    ballSize: 20,
  };
};

// Get appropriate controls based on device
export const getDeviceControls = () => {
  return isAndroidTV() ? getTVPaddleControls() : getPhonePaddleControls();
};

import { withUniwind } from 'uniwind';
import { EaseView as RNEaseView } from 'react-native-ease';
import { LinearGradient as ExpoLinearGradient } from 'expo-linear-gradient';
import { BlurView as ExpoBlurView } from 'expo-blur';

export const EaseView = withUniwind(RNEaseView);
export const LinearGradient = withUniwind(ExpoLinearGradient);
export const BlurView = withUniwind(ExpoBlurView);

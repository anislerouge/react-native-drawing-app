import { useRef, useState } from 'react';
import { View, StyleSheet, PanResponder } from 'react-native';
import Svg, { Path } from 'react-native-svg';

interface DrawingCanvasProps {
  color: string;
}

export function DrawingCanvas({ color }: DrawingCanvasProps) {
  const [paths, setPaths] = useState<string[]>([]);
  const currentPath = useRef<string>('');

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => true,
    onPanResponderGrant: (event) => {
      const { locationX, locationY } = event.nativeEvent;
      currentPath.current = `M ${locationX} ${locationY}`;
    },
    onPanResponderMove: (event) => {
      const { locationX, locationY } = event.nativeEvent;
      currentPath.current += ` L ${locationX} ${locationY}`;
      setPaths([...paths.slice(0, -1), currentPath.current]);
    },
    onPanResponderRelease: () => {
      setPaths([...paths, currentPath.current]);
      currentPath.current = '';
    },
  });

  return (
    <View style={styles.container} {...panResponder.panHandlers}>
      <Svg style={StyleSheet.absoluteFill}>
        {paths.map((path, index) => (
          <Path
            key={index}
            d={path}
            stroke={color}
            strokeWidth={3}
            fill="none"
          />
        ))}
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
});
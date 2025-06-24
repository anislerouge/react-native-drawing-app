import { useRef, useState } from 'react';
import { View, StyleSheet, PanResponder } from 'react-native';
import Svg, { Path as SvgPath } from 'react-native-svg';

interface Path {
  path: string;
  color: string;
}

interface DrawingCanvasProps {
  color: string;
}

export function DrawingCanvas({ color }: DrawingCanvasProps) {
  const [paths, setPaths] = useState<Path[]>([]);
  const currentPath = useRef<Path>({ path: '', color: color });

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => true,
    onPanResponderGrant: (event) => {
      const { locationX, locationY } = event.nativeEvent;
      currentPath.current = { path: `M ${locationX} ${locationY}`, color };
      // add the new path so it can be updated while drawing
      setPaths((prev) => [...prev, currentPath.current]);
    },
    onPanResponderMove: (event) => {
      const { locationX, locationY } = event.nativeEvent;
      currentPath.current.path += ` L ${locationX} ${locationY}`;
      setPaths((prev) => [...prev.slice(0, -1), currentPath.current]);
    },
    onPanResponderRelease: () => {
      // the path was already added during grant, just reset for the next stroke
      currentPath.current = { path: '', color };
    },
  });

  return (
    <View style={styles.container} {...panResponder.panHandlers}>
      <Svg style={StyleSheet.absoluteFill}>
        {paths.map((path, index) => (
          <SvgPath
            key={index}
            d={path.path}
            stroke={path.color}
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
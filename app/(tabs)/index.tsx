import { useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Trash2 } from 'lucide-react-native';
import { ColorPicker } from '@/components/ColorPicker';
import { DrawingCanvas } from '@/components/DrawingCanvas';

export default function DrawScreen() {
  const [selectedColor, setSelectedColor] = useState('#000000');
  const [key, setKey] = useState(0);

  const handleClear = () => {
    setKey(prev => prev + 1);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <ColorPicker
          selectedColor={selectedColor}
          onSelectColor={setSelectedColor}
        />
        <TouchableOpacity
          style={styles.clearButton}
          onPress={handleClear}
        >
          <Trash2 size={24} color="#FF3B30" />
        </TouchableOpacity>
      </View>
      <DrawingCanvas key={key} color={selectedColor} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    paddingTop: 60,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  clearButton: {
    position: 'absolute',
    right: 16,
    bottom: 16,
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#FFF0F0',
  },
});
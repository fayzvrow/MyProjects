import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';

const ConfessionDetailScreen: React.FC = () => (
  <SafeAreaView style={styles.container}>
    <View style={styles.content}>
      <Text style={styles.title}>Confession Detail</Text>
      <Text style={styles.subtitle}>Coming Soon</Text>
    </View>
  </SafeAreaView>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  content: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', color: '#333', marginBottom: 8 },
  subtitle: { fontSize: 16, color: '#666' },
});

export default ConfessionDetailScreen;
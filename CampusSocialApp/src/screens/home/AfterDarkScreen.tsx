import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';

const AfterDarkScreen: React.FC = () => (
  <SafeAreaView style={[styles.container, { backgroundColor: '#000' }]}>
    <View style={styles.content}>
      <Text style={[styles.title, { color: '#fff' }]}>After Dark</Text>
      <Text style={[styles.subtitle, { color: '#999' }]}>Anonymous confessions & nightlife</Text>
    </View>
  </SafeAreaView>
);

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 8 },
  subtitle: { fontSize: 16 },
});

export default AfterDarkScreen;
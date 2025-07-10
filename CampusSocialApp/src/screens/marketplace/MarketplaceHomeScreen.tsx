import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const MarketplaceHomeScreen: React.FC = () => {
  const mockItems = [
    { id: '1', title: 'Textbook: Biology 101', price: 45, image: null },
    { id: '2', title: 'Gaming Chair', price: 120, image: null },
    { id: '3', title: 'Desk Lamp', price: 25, image: null },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Marketplace</Text>
        <TouchableOpacity style={styles.addButton}>
          <Ionicons name="add" size={24} color="#667eea" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.categories}>
          <TouchableOpacity style={styles.categoryButton}>
            <Text style={styles.categoryText}>📚 Textbooks</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.categoryButton}>
            <Text style={styles.categoryText}>🪑 Furniture</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.categoryButton}>
            <Text style={styles.categoryText}>👕 Clothes</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.itemsGrid}>
          {mockItems.map(item => (
            <View key={item.id} style={styles.itemCard}>
              <View style={styles.itemImage}>
                <Ionicons name="image-outline" size={40} color="#ccc" />
              </View>
              <Text style={styles.itemTitle}>{item.title}</Text>
              <Text style={styles.itemPrice}>${item.price}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16, borderBottomWidth: 1, borderBottomColor: '#f0f0f0' },
  title: { fontSize: 24, fontWeight: 'bold', color: '#333' },
  addButton: { padding: 8 },
  content: { flex: 1 },
  categories: { flexDirection: 'row', padding: 16, gap: 12 },
  categoryButton: { backgroundColor: '#f8f9fa', paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20 },
  categoryText: { fontSize: 14, color: '#333' },
  itemsGrid: { padding: 16, gap: 16 },
  itemCard: { backgroundColor: '#f8f9fa', borderRadius: 12, padding: 12 },
  itemImage: { height: 120, backgroundColor: '#e9ecef', borderRadius: 8, justifyContent: 'center', alignItems: 'center', marginBottom: 8 },
  itemTitle: { fontSize: 16, fontWeight: '600', color: '#333', marginBottom: 4 },
  itemPrice: { fontSize: 18, fontWeight: 'bold', color: '#667eea' },
});

export default MarketplaceHomeScreen;
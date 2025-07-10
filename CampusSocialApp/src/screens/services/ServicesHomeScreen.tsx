import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const ServicesHomeScreen: React.FC = () => {
  const mockServices = [
    { id: '1', title: 'Math Tutoring', price: 25, provider: 'Sarah K.', rating: 4.8 },
    { id: '2', title: 'Hair Styling', price: 40, provider: 'Mike D.', rating: 4.9 },
    { id: '3', title: 'Room Cleaning', price: 30, provider: 'Emma L.', rating: 4.7 },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Services</Text>
        <TouchableOpacity style={styles.addButton}>
          <Ionicons name="add" size={24} color="#667eea" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.categories}>
          <TouchableOpacity style={styles.categoryButton}>
            <Text style={styles.categoryText}>📚 Tutoring</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.categoryButton}>
            <Text style={styles.categoryText}>💇 Beauty</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.categoryButton}>
            <Text style={styles.categoryText}>🧹 Cleaning</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.servicesGrid}>
          {mockServices.map(service => (
            <View key={service.id} style={styles.serviceCard}>
              <View style={styles.serviceHeader}>
                <Text style={styles.serviceTitle}>{service.title}</Text>
                <View style={styles.rating}>
                  <Ionicons name="star" size={16} color="#ffd700" />
                  <Text style={styles.ratingText}>{service.rating}</Text>
                </View>
              </View>
              <Text style={styles.provider}>by {service.provider}</Text>
              <Text style={styles.price}>${service.price}/hr</Text>
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
  servicesGrid: { padding: 16, gap: 16 },
  serviceCard: { backgroundColor: '#f8f9fa', borderRadius: 12, padding: 16 },
  serviceHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  serviceTitle: { fontSize: 18, fontWeight: '600', color: '#333' },
  rating: { flexDirection: 'row', alignItems: 'center' },
  ratingText: { marginLeft: 4, fontSize: 14, color: '#666' },
  provider: { fontSize: 14, color: '#666', marginBottom: 8 },
  price: { fontSize: 18, fontWeight: 'bold', color: '#667eea' },
});

export default ServicesHomeScreen;

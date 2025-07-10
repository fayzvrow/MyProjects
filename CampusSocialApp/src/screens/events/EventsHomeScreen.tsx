import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const EventsHomeScreen: React.FC = () => {
  const mockEvents = [
    { id: '1', title: 'Study Group Meetup', date: 'Tomorrow 6PM', location: 'Library', category: 'study-group' },
    { id: '2', title: 'Pizza Night', date: 'Friday 8PM', location: 'Student Center', category: 'free-food' },
    { id: '3', title: 'Career Fair', date: 'Next Week', location: 'Main Hall', category: 'club-event' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Events</Text>
        <TouchableOpacity style={styles.addButton}>
          <Ionicons name="add" size={24} color="#667eea" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.categories}>
          <TouchableOpacity style={styles.categoryButton}>
            <Text style={styles.categoryText}>🍕 Free Food</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.categoryButton}>
            <Text style={styles.categoryText}>📚 Study</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.categoryButton}>
            <Text style={styles.categoryText}>🎉 Party</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.eventsGrid}>
          {mockEvents.map(event => (
            <View key={event.id} style={styles.eventCard}>
              <Text style={styles.eventTitle}>{event.title}</Text>
              <View style={styles.eventDetails}>
                <Ionicons name="time-outline" size={16} color="#666" />
                <Text style={styles.eventText}>{event.date}</Text>
              </View>
              <View style={styles.eventDetails}>
                <Ionicons name="location-outline" size={16} color="#666" />
                <Text style={styles.eventText}>{event.location}</Text>
              </View>
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
  eventsGrid: { padding: 16, gap: 16 },
  eventCard: { backgroundColor: '#f8f9fa', borderRadius: 12, padding: 16 },
  eventTitle: { fontSize: 18, fontWeight: '600', color: '#333', marginBottom: 12 },
  eventDetails: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  eventText: { marginLeft: 8, fontSize: 14, color: '#666' },
});

export default EventsHomeScreen;

import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useApp } from '../../context/AppContext';

const ProfileHomeScreen: React.FC = () => {
  const { state, signOut } = useApp();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.content}>
        {/* Profile Header */}
        <View style={styles.profileHeader}>
          <View style={styles.avatar}>
            {state.user?.photoURL ? (
              <Image source={{ uri: state.user.photoURL }} style={styles.avatarImage} />
            ) : (
              <Text style={styles.avatarText}>
                {state.user?.displayName?.charAt(0).toUpperCase()}
              </Text>
            )}
          </View>
          <Text style={styles.name}>{state.user?.displayName}</Text>
          <Text style={styles.email}>{state.user?.email}</Text>
          {state.user?.major && <Text style={styles.major}>{state.user.major}</Text>}
          {state.user?.year && <Text style={styles.year}>{state.user.year}</Text>}
        </View>

        {/* Stats */}
        <View style={styles.stats}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{state.user?.xp || 0}</Text>
            <Text style={styles.statLabel}>XP Points</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{state.user?.streakDays || 0}</Text>
            <Text style={styles.statLabel}>Day Streak</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{state.user?.badges?.length || 0}</Text>
            <Text style={styles.statLabel}>Badges</Text>
          </View>
        </View>

        {/* Menu Items */}
        <View style={styles.menu}>
          <TouchableOpacity style={styles.menuItem}>
            <Ionicons name="person-outline" size={24} color="#667eea" />
            <Text style={styles.menuText}>Edit Profile</Text>
            <Ionicons name="chevron-forward" size={20} color="#ccc" />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.menuItem}>
            <Ionicons name="document-text-outline" size={24} color="#667eea" />
            <Text style={styles.menuText}>My Posts</Text>
            <Ionicons name="chevron-forward" size={20} color="#ccc" />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.menuItem}>
            <Ionicons name="storefront-outline" size={24} color="#667eea" />
            <Text style={styles.menuText}>My Listings</Text>
            <Ionicons name="chevron-forward" size={20} color="#ccc" />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.menuItem}>
            <Ionicons name="trophy-outline" size={24} color="#667eea" />
            <Text style={styles.menuText}>Leaderboard</Text>
            <Ionicons name="chevron-forward" size={20} color="#ccc" />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.menuItem}>
            <Ionicons name="settings-outline" size={24} color="#667eea" />
            <Text style={styles.menuText}>Settings</Text>
            <Ionicons name="chevron-forward" size={20} color="#ccc" />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.menuItem} onPress={signOut}>
            <Ionicons name="log-out-outline" size={24} color="#e74c3c" />
            <Text style={[styles.menuText, { color: '#e74c3c' }]}>Sign Out</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  content: { flex: 1 },
  profileHeader: { alignItems: 'center', padding: 32, borderBottomWidth: 1, borderBottomColor: '#f0f0f0' },
  avatar: { width: 80, height: 80, borderRadius: 40, backgroundColor: '#667eea', justifyContent: 'center', alignItems: 'center', marginBottom: 16 },
  avatarImage: { width: 80, height: 80, borderRadius: 40 },
  avatarText: { color: '#fff', fontSize: 32, fontWeight: 'bold' },
  name: { fontSize: 24, fontWeight: 'bold', color: '#333', marginBottom: 4 },
  email: { fontSize: 16, color: '#666', marginBottom: 8 },
  major: { fontSize: 16, color: '#667eea', fontWeight: '600' },
  year: { fontSize: 14, color: '#999' },
  stats: { flexDirection: 'row', padding: 24, borderBottomWidth: 1, borderBottomColor: '#f0f0f0' },
  statItem: { flex: 1, alignItems: 'center' },
  statNumber: { fontSize: 24, fontWeight: 'bold', color: '#667eea', marginBottom: 4 },
  statLabel: { fontSize: 12, color: '#999', textAlign: 'center' },
  menu: { padding: 16 },
  menuItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: 16, paddingHorizontal: 12, borderBottomWidth: 1, borderBottomColor: '#f0f0f0' },
  menuText: { flex: 1, marginLeft: 16, fontSize: 16, color: '#333' },
});

export default ProfileHomeScreen;

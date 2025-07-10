import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { View, ActivityIndicator } from 'react-native';

import { useApp } from '../context/AppContext';
import { 
  RootStackParamList, 
  AuthStackParamList, 
  MainTabParamList,
  HomeStackParamList,
  MarketplaceStackParamList,
  ServicesStackParamList,
  EventsStackParamList,
  ProfileStackParamList
} from '../types';

// Screen imports
import WelcomeScreen from '../screens/WelcomeScreen';
import LoginScreen from '../screens/auth/LoginScreen';
import SignupScreen from '../screens/auth/SignupScreen';
import FeedScreen from '../screens/home/FeedScreen';
import PostDetailScreen from '../screens/home/PostDetailScreen';
import CreatePostScreen from '../screens/home/CreatePostScreen';
import StudyGroupsScreen from '../screens/home/StudyGroupsScreen';
import CreateStudyGroupScreen from '../screens/home/CreateStudyGroupScreen';
import StudyGroupDetailScreen from '../screens/home/StudyGroupDetailScreen';
import AfterDarkScreen from '../screens/home/AfterDarkScreen';
import ConfessionDetailScreen from '../screens/home/ConfessionDetailScreen';
import MarketplaceHomeScreen from '../screens/marketplace/MarketplaceHomeScreen';
import ItemDetailScreen from '../screens/marketplace/ItemDetailScreen';
import CreateListingScreen from '../screens/marketplace/CreateListingScreen';
import ChatScreen from '../screens/marketplace/ChatScreen';
import ServicesHomeScreen from '../screens/services/ServicesHomeScreen';
import ServiceDetailScreen from '../screens/services/ServiceDetailScreen';
import CreateServiceScreen from '../screens/services/CreateServiceScreen';
import BookingDetailScreen from '../screens/services/BookingDetailScreen';
import MyBookingsScreen from '../screens/services/MyBookingsScreen';
import EventsHomeScreen from '../screens/events/EventsHomeScreen';
import EventDetailScreen from '../screens/events/EventDetailScreen';
import CreateEventScreen from '../screens/events/CreateEventScreen';
import ProfileHomeScreen from '../screens/profile/ProfileHomeScreen';
import EditProfileScreen from '../screens/profile/EditProfileScreen';
import SettingsScreen from '../screens/profile/SettingsScreen';
import MyPostsScreen from '../screens/profile/MyPostsScreen';
import MyListingsScreen from '../screens/profile/MyListingsScreen';
import LeaderboardScreen from '../screens/profile/LeaderboardScreen';

const RootStack = createStackNavigator<RootStackParamList>();
const AuthStack = createStackNavigator<AuthStackParamList>();
const MainTab = createBottomTabNavigator<MainTabParamList>();
const HomeStack = createStackNavigator<HomeStackParamList>();
const MarketplaceStack = createStackNavigator<MarketplaceStackParamList>();
const ServicesStack = createStackNavigator<ServicesStackParamList>();
const EventsStack = createStackNavigator<EventsStackParamList>();
const ProfileStack = createStackNavigator<ProfileStackParamList>();

// Loading Screen
const LoadingScreen = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <ActivityIndicator size="large" color="#007AFF" />
  </View>
);

// Auth Navigator
const AuthNavigator = () => (
  <AuthStack.Navigator screenOptions={{ headerShown: false }}>
    <AuthStack.Screen name="Login" component={LoginScreen} />
    <AuthStack.Screen name="Signup" component={SignupScreen} />
  </AuthStack.Navigator>
);

// Home Stack Navigator
const HomeNavigator = () => (
  <HomeStack.Navigator>
    <HomeStack.Screen 
      name="Feed" 
      component={FeedScreen} 
      options={{ title: 'Campus Moments' }}
    />
    <HomeStack.Screen name="PostDetail" component={PostDetailScreen} />
    <HomeStack.Screen name="CreatePost" component={CreatePostScreen} />
    <HomeStack.Screen name="StudyGroups" component={StudyGroupsScreen} />
    <HomeStack.Screen name="CreateStudyGroup" component={CreateStudyGroupScreen} />
    <HomeStack.Screen name="StudyGroupDetail" component={StudyGroupDetailScreen} />
    <HomeStack.Screen 
      name="AfterDark" 
      component={AfterDarkScreen}
      options={{ 
        title: 'After Dark',
        headerStyle: { backgroundColor: '#000' },
        headerTintColor: '#fff',
      }}
    />
    <HomeStack.Screen name="ConfessionDetail" component={ConfessionDetailScreen} />
  </HomeStack.Navigator>
);

// Marketplace Stack Navigator
const MarketplaceNavigator = () => (
  <MarketplaceStack.Navigator>
    <MarketplaceStack.Screen 
      name="MarketplaceHome" 
      component={MarketplaceHomeScreen}
      options={{ title: 'Marketplace' }}
    />
    <MarketplaceStack.Screen name="ItemDetail" component={ItemDetailScreen} />
    <MarketplaceStack.Screen name="CreateListing" component={CreateListingScreen} />
    <MarketplaceStack.Screen name="Chat" component={ChatScreen} />
  </MarketplaceStack.Navigator>
);

// Services Stack Navigator
const ServicesNavigator = () => (
  <ServicesStack.Navigator>
    <ServicesStack.Screen 
      name="ServicesHome" 
      component={ServicesHomeScreen}
      options={{ title: 'Services' }}
    />
    <ServicesStack.Screen name="ServiceDetail" component={ServiceDetailScreen} />
    <ServicesStack.Screen name="CreateService" component={CreateServiceScreen} />
    <ServicesStack.Screen name="BookingDetail" component={BookingDetailScreen} />
    <ServicesStack.Screen name="MyBookings" component={MyBookingsScreen} />
  </ServicesStack.Navigator>
);

// Events Stack Navigator
const EventsNavigator = () => (
  <EventsStack.Navigator>
    <EventsStack.Screen 
      name="EventsHome" 
      component={EventsHomeScreen}
      options={{ title: 'Events' }}
    />
    <EventsStack.Screen name="EventDetail" component={EventDetailScreen} />
    <EventsStack.Screen name="CreateEvent" component={CreateEventScreen} />
  </EventsStack.Navigator>
);

// Profile Stack Navigator
const ProfileNavigator = () => (
  <ProfileStack.Navigator>
    <ProfileStack.Screen 
      name="ProfileHome" 
      component={ProfileHomeScreen}
      options={{ title: 'Profile' }}
    />
    <ProfileStack.Screen name="EditProfile" component={EditProfileScreen} />
    <ProfileStack.Screen name="Settings" component={SettingsScreen} />
    <ProfileStack.Screen name="MyPosts" component={MyPostsScreen} />
    <ProfileStack.Screen name="MyListings" component={MyListingsScreen} />
    <ProfileStack.Screen name="MyBookings" component={MyBookingsScreen} />
    <ProfileStack.Screen name="Leaderboard" component={LeaderboardScreen} />
  </ProfileStack.Navigator>
);

// Main Tab Navigator
const MainNavigator = () => {
  const { state } = useApp();
  
  return (
    <MainTab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Marketplace') {
            iconName = focused ? 'storefront' : 'storefront-outline';
          } else if (route.name === 'Services') {
            iconName = focused ? 'briefcase' : 'briefcase-outline';
          } else if (route.name === 'Events') {
            iconName = focused ? 'calendar' : 'calendar-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          } else {
            iconName = 'help-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: state.isAfterDarkMode ? '#fff' : '#007AFF',
        tabBarInactiveTintColor: state.isAfterDarkMode ? '#666' : 'gray',
        tabBarStyle: {
          backgroundColor: state.isAfterDarkMode ? '#000' : '#fff',
        },
      })}
    >
      <MainTab.Screen name="Home" component={HomeNavigator} />
      <MainTab.Screen name="Marketplace" component={MarketplaceNavigator} />
      <MainTab.Screen name="Services" component={ServicesNavigator} />
      <MainTab.Screen name="Events" component={EventsNavigator} />
      <MainTab.Screen name="Profile" component={ProfileNavigator} />
    </MainTab.Navigator>
  );
};

// Root Navigator
const AppNavigator = () => {
  const { state } = useApp();

  if (state.isLoading) {
    return <LoadingScreen />;
  }

  return (
    <NavigationContainer>
      <RootStack.Navigator screenOptions={{ headerShown: false }}>
        {state.user ? (
          <RootStack.Screen name="Main" component={MainNavigator} />
        ) : (
          <>
            <RootStack.Screen name="Welcome" component={WelcomeScreen} />
            <RootStack.Screen name="Auth" component={AuthNavigator} />
          </>
        )}
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
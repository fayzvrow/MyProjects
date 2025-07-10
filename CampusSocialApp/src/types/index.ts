export interface User {
  id: string;
  email: string;
  displayName: string;
  photoURL?: string;
  major?: string;
  year?: string;
  bio?: string;
  location?: {
    latitude: number;
    longitude: number;
  };
  xp: number;
  badges: string[];
  streakDays: number;
  lastLoginDate?: Date;
  createdAt: Date;
}

export interface Post {
  id: string;
  userId: string;
  userDisplayName: string;
  userPhotoURL?: string;
  content: string;
  imageURL?: string;
  likes: string[]; // Array of user IDs who liked
  location?: {
    latitude: number;
    longitude: number;
  };
  createdAt: Date;
}

export interface Comment {
  id: string;
  postId: string;
  userId: string;
  userDisplayName: string;
  userPhotoURL?: string;
  content: string;
  createdAt: Date;
}

export interface MarketplaceItem {
  id: string;
  sellerId: string;
  sellerName: string;
  sellerPhotoURL?: string;
  title: string;
  description: string;
  price: number;
  imageURL: string;
  category: string;
  condition: 'new' | 'like-new' | 'good' | 'fair' | 'poor';
  views: number;
  isAvailable: boolean;
  location?: {
    latitude: number;
    longitude: number;
  };
  createdAt: Date;
}

export interface Service {
  id: string;
  providerId: string;
  providerName: string;
  providerPhotoURL?: string;
  title: string;
  description: string;
  category: 'tutoring' | 'hair' | 'nails' | 'cleaning' | 'other';
  price: number;
  duration: number; // in minutes
  rating: number;
  reviewCount: number;
  availableSlots: Date[];
  location?: {
    latitude: number;
    longitude: number;
  };
  createdAt: Date;
}

export interface Booking {
  id: string;
  serviceId: string;
  clientId: string;
  providerId: string;
  scheduledDate: Date;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  totalPrice: number;
  notes?: string;
  createdAt: Date;
}

export interface Event {
  id: string;
  organizerId: string;
  organizerName: string;
  title: string;
  description: string;
  imageURL?: string;
  date: Date;
  location: string;
  category: 'free-food' | 'study-group' | 'club-event' | 'party' | 'other';
  attendees: string[]; // Array of user IDs
  maxAttendees?: number;
  isFree: boolean;
  price?: number;
  createdAt: Date;
}

export interface StudyGroup {
  id: string;
  creatorId: string;
  className: string;
  classCode: string;
  description: string;
  members: string[]; // Array of user IDs
  maxMembers?: number;
  meetingTime?: Date;
  location?: string;
  isPublic: boolean;
  createdAt: Date;
}

export interface Confession {
  id: string;
  content: string;
  votes: {
    up: number;
    down: number;
  };
  userVotes: { [userId: string]: 'up' | 'down' }; // Track user votes
  replies: number;
  isReported: boolean;
  createdAt: Date;
}

export interface ConfessionReply {
  id: string;
  confessionId: string;
  content: string;
  votes: {
    up: number;
    down: number;
  };
  userVotes: { [userId: string]: 'up' | 'down' };
  createdAt: Date;
}

export interface Chat {
  id: string;
  participants: string[]; // Array of user IDs
  lastMessage?: {
    content: string;
    senderId: string;
    timestamp: Date;
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface Message {
  id: string;
  chatId: string;
  senderId: string;
  content: string;
  type: 'text' | 'image' | 'location';
  timestamp: Date;
  isRead: boolean;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  xpReward: number;
}

export interface UserActivity {
  id: string;
  userId: string;
  type: 'post' | 'like' | 'comment' | 'sale' | 'purchase' | 'booking' | 'login';
  points: number;
  description: string;
  createdAt: Date;
}

// Navigation types
export type RootStackParamList = {
  Welcome: undefined;
  Auth: undefined;
  Main: undefined;
};

export type AuthStackParamList = {
  Login: undefined;
  Signup: undefined;
};

export type MainTabParamList = {
  Home: undefined;
  Marketplace: undefined;
  Services: undefined;
  Events: undefined;
  Profile: undefined;
};

export type HomeStackParamList = {
  Feed: undefined;
  PostDetail: { postId: string };
  CreatePost: undefined;
  StudyGroups: undefined;
  CreateStudyGroup: undefined;
  StudyGroupDetail: { groupId: string };
  AfterDark: undefined;
  ConfessionDetail: { confessionId: string };
};

export type MarketplaceStackParamList = {
  MarketplaceHome: undefined;
  ItemDetail: { itemId: string };
  CreateListing: undefined;
  Chat: { chatId: string };
};

export type ServicesStackParamList = {
  ServicesHome: undefined;
  ServiceDetail: { serviceId: string };
  CreateService: undefined;
  BookingDetail: { bookingId: string };
  MyBookings: undefined;
};

export type EventsStackParamList = {
  EventsHome: undefined;
  EventDetail: { eventId: string };
  CreateEvent: undefined;
};

export type ProfileStackParamList = {
  ProfileHome: undefined;
  EditProfile: undefined;
  Settings: undefined;
  MyPosts: undefined;
  MyListings: undefined;
  MyBookings: undefined;
  Leaderboard: undefined;
};
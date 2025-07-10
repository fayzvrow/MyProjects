import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Image,
  Alert,
  RefreshControl,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { collection, query, orderBy, onSnapshot, doc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { Post, HomeStackParamList } from '../../types';
import { useApp } from '../../context/AppContext';

type FeedScreenNavigationProp = StackNavigationProp<HomeStackParamList, 'Feed'>;

const FeedScreen: React.FC = () => {
  const navigation = useNavigation<FeedScreenNavigationProp>();
  const { state, updateUserXP } = useApp();
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    const postsQuery = query(
      collection(db, 'posts'),
      orderBy('createdAt', 'desc')
    );

    const unsubscribe = onSnapshot(postsQuery, (snapshot) => {
      const postsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate() || new Date(),
      })) as Post[];
      
      setPosts(postsData);
      setIsLoading(false);
      setRefreshing(false);
    });

    return unsubscribe;
  }, []);

  const handleLike = async (postId: string, currentLikes: string[]) => {
    if (!state.user) return;

    const isLiked = currentLikes.includes(state.user.id);
    const postRef = doc(db, 'posts', postId);

    try {
      if (isLiked) {
        await updateDoc(postRef, {
          likes: arrayRemove(state.user.id)
        });
      } else {
        await updateDoc(postRef, {
          likes: arrayUnion(state.user.id)
        });
        // Award XP for liking
        await updateUserXP(1);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to update like');
    }
  };

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    if (diffInSeconds < 60) return 'Just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
    return `${Math.floor(diffInSeconds / 86400)}d ago`;
  };

  const renderPost = ({ item }: { item: Post }) => {
    const isLiked = state.user ? item.likes.includes(state.user.id) : false;

    return (
      <View style={styles.postContainer}>
        {/* Post Header */}
        <View style={styles.postHeader}>
          <View style={styles.userInfo}>
            <View style={styles.avatar}>
              {item.userPhotoURL ? (
                <Image source={{ uri: item.userPhotoURL }} style={styles.avatarImage} />
              ) : (
                <Text style={styles.avatarText}>
                  {item.userDisplayName.charAt(0).toUpperCase()}
                </Text>
              )}
            </View>
            <View style={styles.userDetails}>
              <Text style={styles.username}>{item.userDisplayName}</Text>
              <Text style={styles.timestamp}>{formatTimeAgo(item.createdAt)}</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.moreButton}>
            <Ionicons name="ellipsis-horizontal" size={20} color="#666" />
          </TouchableOpacity>
        </View>

        {/* Post Content */}
        <View style={styles.postContent}>
          <Text style={styles.postText}>{item.content}</Text>
          {item.imageURL && (
            <Image source={{ uri: item.imageURL }} style={styles.postImage} />
          )}
        </View>

        {/* Post Actions */}
        <View style={styles.postActions}>
          <View style={styles.leftActions}>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => handleLike(item.id, item.likes)}
            >
              <Ionicons
                name={isLiked ? "heart" : "heart-outline"}
                size={24}
                color={isLiked ? "#e74c3c" : "#666"}
              />
              <Text style={[styles.actionText, isLiked && styles.likedText]}>
                {item.likes.length}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => navigation.navigate('PostDetail', { postId: item.id })}
            >
              <Ionicons name="chatbubble-outline" size={22} color="#666" />
              <Text style={styles.actionText}>Comment</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="share-outline" size={22} color="#666" />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const onRefresh = () => {
    setRefreshing(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Campus Moments</Text>
        <View style={styles.headerActions}>
          <TouchableOpacity
            style={styles.headerButton}
            onPress={() => navigation.navigate('StudyGroups')}
          >
            <Ionicons name="people-outline" size={24} color="#007AFF" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.headerButton}
            onPress={() => navigation.navigate('AfterDark')}
          >
            <Ionicons name="moon-outline" size={24} color="#007AFF" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Posts Feed */}
      <FlatList
        data={posts}
        renderItem={renderPost}
        keyExtractor={(item) => item.id}
        style={styles.feed}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Ionicons name="chatbubbles-outline" size={60} color="#ccc" />
            <Text style={styles.emptyStateText}>No posts yet</Text>
            <Text style={styles.emptyStateSubtext}>
              Be the first to share something with your campus!
            </Text>
          </View>
        }
      />

      {/* Floating Action Button */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('CreatePost')}
      >
        <Ionicons name="add" size={28} color="#fff" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  headerActions: {
    flexDirection: 'row',
  },
  headerButton: {
    marginLeft: 16,
  },
  feed: {
    flex: 1,
  },
  postContainer: {
    backgroundColor: '#fff',
    marginBottom: 8,
    paddingVertical: 12,
  },
  postHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#667eea',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  avatarImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  avatarText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  userDetails: {
    flex: 1,
  },
  username: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  timestamp: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  moreButton: {
    padding: 4,
  },
  postContent: {
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  postText: {
    fontSize: 16,
    color: '#333',
    lineHeight: 22,
    marginBottom: 12,
  },
  postImage: {
    width: '100%',
    height: 250,
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
  },
  postActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  leftActions: {
    flexDirection: 'row',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
    paddingVertical: 4,
  },
  actionText: {
    marginLeft: 4,
    fontSize: 14,
    color: '#666',
  },
  likedText: {
    color: '#e74c3c',
  },
  fab: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#667eea',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 80,
  },
  emptyStateText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#999',
    marginTop: 16,
  },
  emptyStateSubtext: {
    fontSize: 14,
    color: '#ccc',
    textAlign: 'center',
    marginTop: 8,
    paddingHorizontal: 40,
  },
});

export default FeedScreen;
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert,
  Image,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { addDoc, collection } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { db, storage } from '../../firebase/config';
import { HomeStackParamList } from '../../types';
import { useApp } from '../../context/AppContext';

type CreatePostScreenNavigationProp = StackNavigationProp<HomeStackParamList, 'CreatePost'>;

const CreatePostScreen: React.FC = () => {
  const navigation = useNavigation<CreatePostScreenNavigationProp>();
  const { state, updateUserXP } = useApp();
  const [content, setContent] = useState('');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  const uploadImage = async (uri: string): Promise<string> => {
    const response = await fetch(uri);
    const blob = await response.blob();
    const filename = `posts/${Date.now()}-${Math.random().toString(36).substring(7)}`;
    const imageRef = ref(storage, filename);
    
    await uploadBytes(imageRef, blob);
    return await getDownloadURL(imageRef);
  };

  const handleCreatePost = async () => {
    if (!content.trim() && !selectedImage) {
      Alert.alert('Error', 'Please add some content to your post');
      return;
    }

    if (!state.user) {
      Alert.alert('Error', 'You must be logged in to create a post');
      return;
    }

    setIsLoading(true);
    try {
      let imageURL = null;
      if (selectedImage) {
        imageURL = await uploadImage(selectedImage);
      }

      await addDoc(collection(db, 'posts'), {
        userId: state.user.id,
        userDisplayName: state.user.displayName,
        userPhotoURL: state.user.photoURL,
        content: content.trim(),
        imageURL,
        likes: [],
        createdAt: new Date(),
      });

      // Award XP for posting
      await updateUserXP(10);
      
      Alert.alert('Success', 'Post created successfully!');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', 'Failed to create post');
      console.error('Error creating post:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="close" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>New Post</Text>
        <TouchableOpacity
          onPress={handleCreatePost}
          disabled={isLoading}
          style={[styles.postButton, isLoading && styles.disabledButton]}
        >
          <Text style={styles.postButtonText}>
            {isLoading ? 'Posting...' : 'Post'}
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        {/* User Info */}
        <View style={styles.userInfo}>
          <View style={styles.avatar}>
            {state.user?.photoURL ? (
              <Image source={{ uri: state.user.photoURL }} style={styles.avatarImage} />
            ) : (
              <Text style={styles.avatarText}>
                {state.user?.displayName?.charAt(0).toUpperCase()}
              </Text>
            )}
          </View>
          <Text style={styles.username}>{state.user?.displayName}</Text>
        </View>

        {/* Content Input */}
        <TextInput
          style={styles.textInput}
          placeholder="What's happening on campus?"
          value={content}
          onChangeText={setContent}
          multiline
          textAlignVertical="top"
          maxLength={500}
        />

        {/* Selected Image */}
        {selectedImage && (
          <View style={styles.imageContainer}>
            <Image source={{ uri: selectedImage }} style={styles.selectedImage} />
            <TouchableOpacity
              style={styles.removeImageButton}
              onPress={() => setSelectedImage(null)}
            >
              <Ionicons name="close-circle" size={24} color="#fff" />
            </TouchableOpacity>
          </View>
        )}

        {/* Actions */}
        <View style={styles.actions}>
          <TouchableOpacity style={styles.actionButton} onPress={pickImage}>
            <Ionicons name="image-outline" size={24} color="#667eea" />
            <Text style={styles.actionText}>Photo</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="location-outline" size={24} color="#667eea" />
            <Text style={styles.actionText}>Location</Text>
          </TouchableOpacity>
        </View>

        {/* Character Count */}
        <Text style={styles.charCount}>{content.length}/500</Text>
      </ScrollView>
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
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  postButton: {
    backgroundColor: '#667eea',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  disabledButton: {
    opacity: 0.6,
  },
  postButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
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
  username: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  textInput: {
    fontSize: 18,
    color: '#333',
    minHeight: 120,
    textAlignVertical: 'top',
    marginBottom: 20,
  },
  imageContainer: {
    position: 'relative',
    marginBottom: 20,
  },
  selectedImage: {
    width: '100%',
    height: 200,
    borderRadius: 12,
  },
  removeImageButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 12,
  },
  actions: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 24,
    paddingVertical: 8,
  },
  actionText: {
    marginLeft: 8,
    fontSize: 16,
    color: '#667eea',
    fontWeight: '500',
  },
  charCount: {
    textAlign: 'right',
    fontSize: 12,
    color: '#999',
  },
});

export default CreatePostScreen;
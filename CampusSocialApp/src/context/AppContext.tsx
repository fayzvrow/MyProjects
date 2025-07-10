import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { User as FirebaseUser, onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '../firebase/config';
import { User } from '../types';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';

// App State Interface
interface AppState {
  user: User | null;
  firebaseUser: FirebaseUser | null;
  isLoading: boolean;
  isAfterDarkMode: boolean;
  error: string | null;
}

// Actions
type AppAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_USER'; payload: User | null }
  | { type: 'SET_FIREBASE_USER'; payload: FirebaseUser | null }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'TOGGLE_AFTER_DARK_MODE' }
  | { type: 'UPDATE_USER_XP'; payload: number }
  | { type: 'ADD_USER_BADGE'; payload: string }
  | { type: 'UPDATE_STREAK'; payload: number };

// Initial State
const initialState: AppState = {
  user: null,
  firebaseUser: null,
  isLoading: true,
  isAfterDarkMode: false,
  error: null,
};

// Reducer
const appReducer = (state: AppState, action: AppAction): AppState => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    case 'SET_USER':
      return { ...state, user: action.payload };
    case 'SET_FIREBASE_USER':
      return { ...state, firebaseUser: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    case 'TOGGLE_AFTER_DARK_MODE':
      return { ...state, isAfterDarkMode: !state.isAfterDarkMode };
    case 'UPDATE_USER_XP':
      return {
        ...state,
        user: state.user ? { ...state.user, xp: state.user.xp + action.payload } : null,
      };
    case 'ADD_USER_BADGE':
      return {
        ...state,
        user: state.user
          ? { ...state.user, badges: [...state.user.badges, action.payload] }
          : null,
      };
    case 'UPDATE_STREAK':
      return {
        ...state,
        user: state.user ? { ...state.user, streakDays: action.payload } : null,
      };
    default:
      return state;
  }
};

// Context
interface AppContextType {
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
  updateUserXP: (points: number) => Promise<void>;
  addUserBadge: (badge: string) => Promise<void>;
  updateUserStreak: () => Promise<void>;
  signOut: () => Promise<void>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

// Provider
interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Auth state listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      dispatch({ type: 'SET_FIREBASE_USER', payload: firebaseUser });
      
      if (firebaseUser) {
        try {
          // Get user data from Firestore
          const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
          
          if (userDoc.exists()) {
            const userData = userDoc.data() as User;
            dispatch({ type: 'SET_USER', payload: userData });
            
            // Update login streak
            await updateUserStreak();
          } else {
            // Create new user document
            const newUser: User = {
              id: firebaseUser.uid,
              email: firebaseUser.email!,
              displayName: firebaseUser.displayName || 'Anonymous',
              photoURL: firebaseUser.photoURL || undefined,
              xp: 0,
              badges: [],
              streakDays: 1,
              lastLoginDate: new Date(),
              createdAt: new Date(),
            };
            
            await setDoc(doc(db, 'users', firebaseUser.uid), newUser);
            dispatch({ type: 'SET_USER', payload: newUser });
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
          dispatch({ type: 'SET_ERROR', payload: 'Failed to load user data' });
        }
      } else {
        dispatch({ type: 'SET_USER', payload: null });
      }
      
      dispatch({ type: 'SET_LOADING', payload: false });
    });

    return unsubscribe;
  }, []);

  // Update user XP
  const updateUserXP = async (points: number) => {
    if (!state.user) return;
    
    try {
      const newXP = state.user.xp + points;
      await updateDoc(doc(db, 'users', state.user.id), { xp: newXP });
      dispatch({ type: 'UPDATE_USER_XP', payload: points });
      
      // Check for new badges
      if (newXP >= 100 && !state.user.badges.includes('xp-100')) {
        await addUserBadge('xp-100');
      }
      if (newXP >= 500 && !state.user.badges.includes('xp-500')) {
        await addUserBadge('xp-500');
      }
      if (newXP >= 1000 && !state.user.badges.includes('xp-1000')) {
        await addUserBadge('xp-1000');
      }
    } catch (error) {
      console.error('Error updating XP:', error);
    }
  };

  // Add user badge
  const addUserBadge = async (badge: string) => {
    if (!state.user || state.user.badges.includes(badge)) return;
    
    try {
      const newBadges = [...state.user.badges, badge];
      await updateDoc(doc(db, 'users', state.user.id), { badges: newBadges });
      dispatch({ type: 'ADD_USER_BADGE', payload: badge });
    } catch (error) {
      console.error('Error adding badge:', error);
    }
  };

  // Update user login streak
  const updateUserStreak = async () => {
    if (!state.user) return;
    
    try {
      const today = new Date();
      const lastLogin = state.user.lastLoginDate;
      
      if (lastLogin) {
        const daysDiff = Math.floor((today.getTime() - lastLogin.getTime()) / (1000 * 60 * 60 * 24));
        
        let newStreak = state.user.streakDays;
        
        if (daysDiff === 1) {
          // Consecutive day
          newStreak += 1;
        } else if (daysDiff > 1) {
          // Streak broken
          newStreak = 1;
        }
        // If daysDiff === 0, same day, no change needed
        
        if (newStreak !== state.user.streakDays) {
          await updateDoc(doc(db, 'users', state.user.id), {
            streakDays: newStreak,
            lastLoginDate: today,
          });
          dispatch({ type: 'UPDATE_STREAK', payload: newStreak });
          
          // Award streak badges
          if (newStreak === 5 && !state.user.badges.includes('streak-5')) {
            await addUserBadge('streak-5');
            await updateUserXP(25);
          }
          if (newStreak === 10 && !state.user.badges.includes('streak-10')) {
            await addUserBadge('streak-10');
            await updateUserXP(50);
          }
          if (newStreak === 30 && !state.user.badges.includes('streak-30')) {
            await addUserBadge('streak-30');
            await updateUserXP(100);
          }
        }
      }
    } catch (error) {
      console.error('Error updating streak:', error);
    }
  };

  // Sign out
  const signOut = async () => {
    try {
      await auth.signOut();
    } catch (error) {
      console.error('Error signing out:', error);
      dispatch({ type: 'SET_ERROR', payload: 'Failed to sign out' });
    }
  };

  const value: AppContextType = {
    state,
    dispatch,
    updateUserXP,
    addUserBadge,
    updateUserStreak,
    signOut,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

// Hook to use the app context
export const useApp = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
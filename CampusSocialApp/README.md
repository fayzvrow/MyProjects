# Campus Connect - Campus Social App

A comprehensive social networking app designed specifically for college students to connect, share, and engage with their campus community.

## 🎓 Features

### Core Social Features
- **Campus Moments**: Instagram-style social feed with posts, likes, and comments
- **Real-time Updates**: Live feed with Firebase integration
- **User Profiles**: Complete profile management with XP points and badges
- **Gamification**: XP points, badges, and daily streaks to encourage engagement

### Marketplace
- **Thrift Exchange**: Buy and sell items within the campus community
- **Categories**: Textbooks, furniture, clothes, and more
- **Chat Integration**: Direct messaging between buyers and sellers
- **Image Upload**: Firebase Storage integration for item photos

### Services
- **Student Services**: Tutoring, hair styling, cleaning, and more
- **Booking System**: Schedule and manage service appointments
- **Rating System**: Rate and review service providers
- **Categories**: Easy filtering by service type

### Events
- **Campus Events**: Discover and create campus events
- **RSVP System**: Track attendance and see who's going
- **Categories**: Free food, study groups, club events, parties
- **Event Management**: Create and manage your own events

### Special Features
- **Study Groups**: Auto-matching based on classes and schedules
- **After Dark Mode**: Anonymous confessions and nightlife events
- **Location-based**: Geo-filtered content for nearby students
- **Push Notifications**: Stay updated with campus activities

## 🛠 Tech Stack

- **Frontend**: React Native with Expo
- **Backend**: Firebase (Authentication, Firestore, Storage)
- **Navigation**: React Navigation (Bottom Tab + Stack)
- **State Management**: React Context API
- **UI Components**: Custom components with Expo Vector Icons
- **Image Handling**: Expo Image Picker
- **Real-time**: Firebase Firestore real-time listeners

## 📱 Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- Expo CLI
- Firebase account

### 1. Clone the Repository
\`\`\`bash
git clone <repository-url>
cd CampusSocialApp
\`\`\`

### 2. Install Dependencies
\`\`\`bash
npm install
\`\`\`

### 3. Firebase Configuration
1. Create a new Firebase project at [https://console.firebase.google.com/](https://console.firebase.google.com/)
2. Enable Authentication, Firestore, and Storage
3. Copy your Firebase config object
4. Update \`src/firebase/config.ts\` with your Firebase credentials:

\`\`\`typescript
const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "your-project-id.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project-id.appspot.com",
  messagingSenderId: "your-sender-id",
  appId: "your-app-id"
};
\`\`\`

### 4. Run the App
\`\`\`bash
# For iOS
npm run ios

# For Android
npm run android

# For Web
npm run web
\`\`\`

## 🏗 Project Structure

\`\`\`
src/
├── components/          # Reusable UI components
├── context/            # React Context for state management
├── firebase/           # Firebase configuration
├── navigation/         # App navigation structure
├── screens/           # All app screens
│   ├── auth/          # Authentication screens
│   ├── home/          # Home feed related screens
│   ├── marketplace/   # Marketplace screens
│   ├── services/      # Services screens
│   ├── events/        # Events screens
│   └── profile/       # Profile screens
├── types/             # TypeScript type definitions
└── utils/             # Utility functions
\`\`\`

## 🎯 Key Screens

### Authentication
- **Welcome Screen**: Animated intro with feature preview
- **Login/Signup**: Email/password authentication with Firebase

### Main App
- **Feed**: Social media style feed with posts and interactions
- **Create Post**: Rich post creation with image upload
- **Marketplace**: Grid of items for sale
- **Services**: List of available student services
- **Events**: Campus events discovery
- **Profile**: User profile with stats and settings

### Advanced Features
- **Study Groups**: Class-based study group matching
- **After Dark**: Anonymous confession board with dark theme
- **Real-time Chat**: Messaging for marketplace and services

## 🔧 Firebase Setup

### Firestore Collections
The app uses these main Firestore collections:
- \`users\` - User profiles and stats
- \`posts\` - Social media posts
- \`items\` - Marketplace items
- \`services\` - Available services
- \`events\` - Campus events
- \`study_groups\` - Study groups
- \`confessions\` - Anonymous posts
- \`bookings\` - Service bookings

### Storage Structure
- \`posts/\` - Post images
- \`items/\` - Marketplace item images
- \`services/\` - Service provider images
- \`events/\` - Event images

## 🎮 Gamification System

- **XP Points**: Earned through various activities
  - Login: 5 XP
  - Post: 10 XP
  - Like: 1 XP
  - Comment: 3 XP
  - Sale: 25 XP

- **Badges**: Achievement system
  - First Post
  - First Sale
  - 5-Day Streak
  - XP Milestones (100, 500, 1000)

- **Daily Streaks**: Consecutive day login tracking

## 🔮 Future Enhancements

- [ ] Google/Apple OAuth integration
- [ ] Advanced chat features with media sharing
- [ ] Push notifications for messages and events
- [ ] Location-based features with maps
- [ ] Video posts and stories
- [ ] Group chat for study groups
- [ ] Payment integration for marketplace
- [ ] Event ticket system
- [ ] Advanced search and filtering
- [ ] Dark mode toggle

## 📄 License

This project is licensed under the MIT License.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

**Campus Connect** - Bringing your campus community together! 🎓✨
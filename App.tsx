import React, { useEffect } from 'react';
import { View, LogBox, StatusBar } from 'react-native';
import { CometChat } from '@cometchat-pro/react-native-chat';
import { CometChatUI } from '@cometchat-pro/react-native-ui-kit';

const APP_ID = '277715b4231df2e5';      // Replace with your actual App ID
const REGION = 'IN';      // Replace with your region code, e.g., "us" or "in"
const AUTH_KEY = '720581fd920397dec5fdd24f704336366a07458e';  // Replace with your actual Auth Key

const App = () => {
  useEffect(() => {
    LogBox.ignoreAllLogs(); // Optional: Suppress warnings
    const appSetting = new CometChat.AppSettingsBuilder()
      .subscribePresenceForAllUsers()
      .setRegion(REGION)
      .build();

    CometChat.init(APP_ID, appSetting).then(
      () => {
        console.log('CometChat initialization completed');
        // Optionally, create a default user for testing
        const UID = 'user1';
        const user = new CometChat.User(UID);
        user.setName('User 1');

        CometChat.createUser(user, AUTH_KEY).then(
          user => {
            console.log('User created:', user);
            CometChat.login(UID, AUTH_KEY).then(
              user => console.log('Login successful:', user),
              error => console.log('Login failed:', error),
            );
          },
          error => {
            // User might already exist, try logging in
            CometChat.login(UID, AUTH_KEY).then(
              user => console.log('Login successful:', user),
              error => console.log('Login failed:', error),
            );
          },
        );
      },
      error => {
        console.log('CometChat initialization failed with error:', error);
      },
    );
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <CometChatUI />
    </View>
  );
};

export default App;

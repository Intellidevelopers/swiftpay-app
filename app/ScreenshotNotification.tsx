import React, { useEffect, useState } from 'react';
import { View, Text, AppState, StyleSheet } from 'react-native';
import * as Notifications from 'expo-notifications';

// Requesting permission for notifications
const requestNotificationPermission = async () => {
  const { status } = await Notifications.requestPermissionsAsync();
  if (status !== 'granted') {
    alert('Notification permissions not granted');
  }
};

// Function to send a local notification
const sendNotification = async () => {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Screenshot Detected",
      body: "Your screen is being captured. Please protect your personal information.",
    },
    trigger: null, // Immediately trigger
  });
};

const ScreenshotNotification = () => {
  const [appState, setAppState] = useState(AppState.currentState);

  useEffect(() => {
    // Request notification permissions
    requestNotificationPermission();

    // Detect app state changes
    const subscription = AppState.addEventListener("change", nextAppState => {
      if (appState.match(/active/) && nextAppState === "background") {
        // Trigger notification when app moves to background (potential screenshot)
        sendNotification();
      }
      setAppState(nextAppState);
    });

    return () => {
      subscription.remove();
    };
  }, [appState]);

  return (
    <View>
    </View>
  );
};

const styles = StyleSheet.create({
 
});

export default ScreenshotNotification;

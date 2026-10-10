import React from 'react';
import { Tabs, Redirect } from 'expo-router';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { useApp } from '../../src/context/AppContext';
import { AGE_GROUP_CONFIGS } from '../../src/constants/theme';

function TabIcon({ icon, label, focused, color }: { icon: string; label: string; focused: boolean; color: string }) {
  return (
    <View style={styles.tabIconContainer}>
      <View style={[styles.tabIconWrapper, focused && { backgroundColor: color + '20' }]}>
        <Text style={[styles.tabIcon, focused && styles.tabIconActive]}>{icon}</Text>
      </View>
      <Text style={[styles.tabLabel, focused && { color, fontWeight: '700' }]}>{label}</Text>
    </View>
  );
}

export default function TabLayout() {
  const { profile, isLoading } = useApp();

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingEmoji}>🌍</Text>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  if (!profile) {
    return <Redirect href="/onboarding" />;
  }

  const themeColor = AGE_GROUP_CONFIGS[profile.ageGroup].colors.primary;

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#0A0E27',
          borderTopColor: '#1A1E3C',
          borderTopWidth: 1,
          height: Platform.OS === 'ios' ? 88 : 70,
          paddingBottom: Platform.OS === 'ios' ? 28 : 10,
          paddingTop: 8,
          elevation: 0,
        },
        tabBarShowLabel: false,
        tabBarActiveTintColor: themeColor,
        tabBarInactiveTintColor: '#636E72',
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon icon="🏠" label="Home" focused={focused} color={themeColor} />
          ),
        }}
      />
      <Tabs.Screen
        name="lessons"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon icon="📚" label="Learn" focused={focused} color={themeColor} />
          ),
        }}
      />
      <Tabs.Screen
        name="speak"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon icon="🗣️" label="Speak" focused={focused} color={themeColor} />
          ),
        }}
      />
      <Tabs.Screen
        name="progress"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon icon="📊" label="Progress" focused={focused} color={themeColor} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon icon="👤" label="Profile" focused={focused} color={themeColor} />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0A0E27',
  },
  loadingEmoji: {
    fontSize: 60,
    marginBottom: 16,
  },
  loadingText: {
    fontSize: 18,
    color: '#8B8FA3',
  },
  tabIconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabIconWrapper: {
    width: 40,
    height: 32,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 2,
  },
  tabIcon: {
    fontSize: 20,
    opacity: 0.6,
  },
  tabIconActive: {
    opacity: 1,
  },
  tabLabel: {
    fontSize: 11,
    color: '#636E72',
    fontWeight: '500',
  },
});

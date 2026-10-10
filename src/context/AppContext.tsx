// ==========================================
// LinguaLeap - App Context & State Management
// ==========================================

import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserProfile, ProgressStats } from '../types';
import { LEVEL_XP_THRESHOLDS } from '../constants/theme';

const STORAGE_KEY = '@lingualeap_profile';

interface AppContextType {
  profile: UserProfile | null;
  isLoading: boolean;
  isOnboarded: boolean;
  setProfile: (profile: UserProfile) => void;
  updateProfile: (updates: Partial<UserProfile>) => void;
  addXP: (amount: number) => void;
  completeLesson: (lessonId: string) => void;
  resetProfile: () => void;
  getProgressStats: () => ProgressStats;
}

const defaultStats: ProgressStats = {
  vocabularyMastered: 0,
  grammarScore: 0,
  pronunciationScore: 0,
  listeningScore: 0,
  readingScore: 0,
  conversationScore: 0,
  weeklyXp: [0, 0, 0, 0, 0, 0, 0],
  monthlyProgress: [0, 0, 0, 0],
};

const AppContext = createContext<AppContextType>({
  profile: null,
  isLoading: true,
  isOnboarded: false,
  setProfile: () => {},
  updateProfile: () => {},
  addXP: () => {},
  completeLesson: () => {},
  resetProfile: () => {},
  getProgressStats: () => defaultStats,
});

export const useApp = () => useContext(AppContext);

export function AppProvider({ children }: { children: ReactNode }) {
  const [profile, setProfileState] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load profile on mount
  useEffect(() => {
    let isMounted = true;
    AsyncStorage.getItem(STORAGE_KEY)
      .then((data) => {
        if (!isMounted) return;
        if (data) {
          const parsed = JSON.parse(data);
          // Check and update streak
          const today = new Date().toISOString().split('T')[0];
          const lastActive = parsed.lastActiveDate;
          if (lastActive) {
            const daysDiff = Math.floor(
              (new Date(today).getTime() - new Date(lastActive).getTime()) / (1000 * 60 * 60 * 24)
            );
            if (daysDiff > 1) {
              parsed.streak = 0; // Reset streak if more than 1 day gap
            }
          }
          setProfileState(parsed);
        }
      })
      .catch((error) => {
        console.error('Error loading profile:', error);
      })
      .finally(() => {
        if (isMounted) {
          setIsLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const saveProfile = async (newProfile: UserProfile) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newProfile));
    } catch (error) {
      console.error('Error saving profile:', error);
    }
  };

  const setProfile = useCallback((newProfile: UserProfile) => {
    setProfileState(newProfile);
    saveProfile(newProfile);
  }, []);

  const updateProfile = useCallback((updates: Partial<UserProfile>) => {
    setProfileState((prev) => {
      if (!prev) return prev;
      const updated = { ...prev, ...updates };
      saveProfile(updated);
      return updated;
    });
  }, []);

  const addXP = useCallback((amount: number) => {
    setProfileState((prev) => {
      if (!prev) return prev;
      const newXP = prev.xp + amount;
      let newLevel = prev.level;

      // Check level up
      while (
        newLevel < LEVEL_XP_THRESHOLDS.length - 1 &&
        newXP >= LEVEL_XP_THRESHOLDS[newLevel]
      ) {
        newLevel++;
      }

      // Update streak
      const today = new Date().toISOString().split('T')[0];
      let newStreak = prev.streak;
      if (prev.lastActiveDate !== today) {
        const lastActive = prev.lastActiveDate;
        if (lastActive) {
          const daysDiff = Math.floor(
            (new Date(today).getTime() - new Date(lastActive).getTime()) / (1000 * 60 * 60 * 24)
          );
          newStreak = daysDiff <= 1 ? prev.streak + 1 : 1;
        } else {
          newStreak = 1;
        }
      }

      const updated: UserProfile = {
        ...prev,
        xp: newXP,
        level: newLevel,
        streak: newStreak,
        lastActiveDate: today,
        dailyProgress: prev.dailyProgress + amount,
      };
      saveProfile(updated);
      return updated;
    });
  }, []);

  const completeLesson = useCallback((lessonId: string) => {
    setProfileState((prev) => {
      if (!prev) return prev;
      if (prev.completedLessons.includes(lessonId)) return prev;
      const updated: UserProfile = {
        ...prev,
        completedLessons: [...prev.completedLessons, lessonId],
        totalLessonsCompleted: prev.totalLessonsCompleted + 1,
      };
      saveProfile(updated);
      return updated;
    });
  }, []);

  const resetProfile = useCallback(async () => {
    try {
      await AsyncStorage.removeItem(STORAGE_KEY);
      setProfileState(null);
    } catch (error) {
      console.error('Error resetting profile:', error);
    }
  }, []);

  const getProgressStats = useCallback((): ProgressStats => {
    if (!profile) return defaultStats;
    const completed = profile.completedLessons;
    return {
      vocabularyMastered: completed.filter((id) => id.includes('vocab')).length * 5,
      grammarScore: Math.min(100, completed.filter((id) => id.includes('grammar')).length * 20),
      pronunciationScore: Math.min(100, completed.filter((id) => id.includes('pronunciation')).length * 20),
      listeningScore: Math.min(100, completed.filter((id) => id.includes('listening')).length * 20),
      readingScore: Math.min(100, completed.filter((id) => id.includes('reading')).length * 20),
      conversationScore: Math.min(100, completed.filter((id) => id.includes('conversation')).length * 20),
      weeklyXp: [0, 0, 0, 0, 0, 0, 0],
      monthlyProgress: [0, 0, 0, 0],
    };
  }, [profile]);

  return (
    <AppContext.Provider
      value={{
        profile,
        isLoading,
        isOnboarded: !!profile,
        setProfile,
        updateProfile,
        addXP,
        completeLesson,
        resetProfile,
        getProgressStats,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

// ==========================================
// LinguaLeap - Profile Screen
// User settings, age group switch, achievements
// ==========================================

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Platform,
  Dimensions,
} from 'react-native';
import { router } from 'expo-router';
import { useApp } from '../../src/context/AppContext';
import { AGE_GROUP_CONFIGS, LEVEL_XP_THRESHOLDS } from '../../src/constants/theme';
import { AgeGroup } from '../../src/types';

const { width } = Dimensions.get('window');

export default function ProfileScreen() {
  const { profile, updateProfile, resetProfile } = useApp();
  const [showAgeSelector, setShowAgeSelector] = useState(false);

  if (!profile) return null;

  const config = AGE_GROUP_CONFIGS[profile.ageGroup];
  const currentLevelXP = LEVEL_XP_THRESHOLDS[profile.level - 1] || 0;
  const nextLevelXP = LEVEL_XP_THRESHOLDS[profile.level] || LEVEL_XP_THRESHOLDS[LEVEL_XP_THRESHOLDS.length - 1];
  const xpProgress = Math.min(1, (profile.xp - currentLevelXP) / (nextLevelXP - currentLevelXP));

  const handleChangeAgeGroup = (ageGroup: AgeGroup) => {
    updateProfile({ ageGroup });
    setShowAgeSelector(false);
  };

  const handleResetProfile = () => {
    Alert.alert(
      'Reset Profile',
      'Are you sure? This will delete all your progress.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Reset',
          style: 'destructive',
          onPress: () => {
            resetProfile();
            router.replace('/onboarding');
          },
        },
      ]
    );
  };

  const handleChangeDailyGoal = (goal: number) => {
    updateProfile({ dailyGoal: goal });
  };

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <Text style={styles.title}>Profile 👤</Text>

        {/* Profile Card */}
        <View style={styles.profileCard}>
          <View style={[styles.avatarContainer, { backgroundColor: config.colors.primary + '20' }]}>
            <Text style={styles.avatar}>{profile.avatar}</Text>
          </View>
          <Text style={styles.profileName}>{profile.name}</Text>
          <Text style={[styles.profileBadge, { color: config.colors.primary }]}>
            {config.label} • {config.ageRange}
          </Text>
          <View style={styles.levelContainer}>
            <Text style={styles.levelText}>Level {profile.level}</Text>
            <View style={styles.levelBarBg}>
              <View style={[styles.levelBar, { width: `${xpProgress * 100}%`, backgroundColor: config.colors.primary }]} />
            </View>
            <Text style={styles.levelXP}>{profile.xp} / {nextLevelXP} XP</Text>
          </View>
        </View>

        {/* Stats Grid */}
        <View style={styles.statsGrid}>
          <View style={styles.statBox}>
            <Text style={styles.statEmoji}>🔥</Text>
            <Text style={styles.statValue}>{profile.streak}</Text>
            <Text style={styles.statLabel}>Day Streak</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statEmoji}>📚</Text>
            <Text style={styles.statValue}>{profile.totalLessonsCompleted}</Text>
            <Text style={styles.statLabel}>Lessons</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statEmoji}>⭐</Text>
            <Text style={styles.statValue}>{profile.xp}</Text>
            <Text style={styles.statLabel}>Total XP</Text>
          </View>
        </View>

        {/* Settings */}
        <Text style={styles.sectionTitle}>Settings</Text>

        {/* Age Group */}
        <TouchableOpacity
          style={styles.settingItem}
          onPress={() => setShowAgeSelector(!showAgeSelector)}
          activeOpacity={0.7}
        >
          <View style={styles.settingLeft}>
            <Text style={styles.settingIcon}>{config.emoji}</Text>
            <View>
              <Text style={styles.settingLabel}>Age Group</Text>
              <Text style={styles.settingValue}>{config.label} ({config.ageRange})</Text>
            </View>
          </View>
          <Text style={styles.settingArrow}>{showAgeSelector ? '▲' : '▼'}</Text>
        </TouchableOpacity>

        {showAgeSelector && (
          <View style={styles.ageSelector}>
            {Object.values(AGE_GROUP_CONFIGS).map((groupConfig) => (
              <TouchableOpacity
                key={groupConfig.id}
                style={[
                  styles.ageSelectorItem,
                  profile.ageGroup === groupConfig.id && {
                    backgroundColor: groupConfig.colors.primary + '20',
                    borderColor: groupConfig.colors.primary,
                  },
                ]}
                onPress={() => handleChangeAgeGroup(groupConfig.id)}
              >
                <Text style={styles.ageSelectorEmoji}>{groupConfig.emoji}</Text>
                <View style={styles.ageSelectorInfo}>
                  <Text style={styles.ageSelectorLabel}>{groupConfig.label}</Text>
                  <Text style={styles.ageSelectorRange}>{groupConfig.ageRange}</Text>
                </View>
                {profile.ageGroup === groupConfig.id && (
                  <Text style={[styles.ageSelectorCheck, { color: groupConfig.colors.primary }]}>✓</Text>
                )}
              </TouchableOpacity>
            ))}
          </View>
        )}

        {/* Daily Goal */}
        <View style={styles.settingItem}>
          <View style={styles.settingLeft}>
            <Text style={styles.settingIcon}>🎯</Text>
            <View>
              <Text style={styles.settingLabel}>Daily Goal</Text>
              <Text style={styles.settingValue}>{profile.dailyGoal} XP per day</Text>
            </View>
          </View>
        </View>
        <View style={styles.goalOptions}>
          {[30, 50, 100, 150].map((goal) => (
            <TouchableOpacity
              key={goal}
              style={[
                styles.goalChip,
                profile.dailyGoal === goal && { backgroundColor: config.colors.primary, borderColor: config.colors.primary },
              ]}
              onPress={() => handleChangeDailyGoal(goal)}
            >
              <Text
                style={[
                  styles.goalChipText,
                  profile.dailyGoal === goal && { color: '#FFFFFF' },
                ]}
              >
                {goal} XP
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Member Since */}
        <View style={styles.settingItem}>
          <View style={styles.settingLeft}>
            <Text style={styles.settingIcon}>📅</Text>
            <View>
              <Text style={styles.settingLabel}>Member Since</Text>
              <Text style={styles.settingValue}>
                {new Date(profile.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </Text>
            </View>
          </View>
        </View>

        {/* App Info */}
        <Text style={styles.sectionTitle}>About</Text>
        <View style={styles.aboutCard}>
          <Text style={styles.aboutAppName}>🌍 LinguaLeap</Text>
          <Text style={styles.aboutVersion}>Version 1.0.0</Text>
          <Text style={styles.aboutDesc}>
            Learn English at your own pace with age-appropriate lessons, 
            pronunciation practice, and AI-powered conversations.
          </Text>
        </View>

        {/* Reset Button */}
        <TouchableOpacity
          style={styles.resetButton}
          onPress={handleResetProfile}
          activeOpacity={0.7}
        >
          <Text style={styles.resetButtonText}>🔄 Reset Profile</Text>
        </TouchableOpacity>

        <View style={styles.bottomPadding} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0E27',
  },
  scrollContent: {
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 20,
  },
  profileCard: {
    backgroundColor: '#151831',
    borderRadius: 24,
    padding: 28,
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#252849',
  },
  avatarContainer: {
    width: 90,
    height: 90,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 14,
  },
  avatar: {
    fontSize: 48,
  },
  profileName: {
    fontSize: 24,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  profileBadge: {
    fontSize: 14,
    fontWeight: '600',
    marginTop: 4,
  },
  levelContainer: {
    width: '100%',
    marginTop: 20,
  },
  levelText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 8,
    textAlign: 'center',
  },
  levelBarBg: {
    height: 8,
    backgroundColor: '#252849',
    borderRadius: 4,
    overflow: 'hidden',
  },
  levelBar: {
    height: '100%',
    borderRadius: 4,
  },
  levelXP: {
    fontSize: 12,
    color: '#8B8FA3',
    marginTop: 6,
    textAlign: 'center',
  },
  statsGrid: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 24,
  },
  statBox: {
    flex: 1,
    backgroundColor: '#151831',
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#252849',
  },
  statEmoji: {
    fontSize: 22,
    marginBottom: 6,
  },
  statValue: {
    fontSize: 20,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  statLabel: {
    fontSize: 11,
    color: '#8B8FA3',
    marginTop: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 12,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#151831',
    borderRadius: 16,
    padding: 16,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#252849',
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  settingIcon: {
    fontSize: 24,
  },
  settingLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  settingValue: {
    fontSize: 12,
    color: '#8B8FA3',
    marginTop: 2,
  },
  settingArrow: {
    color: '#8B8FA3',
    fontSize: 12,
  },
  ageSelector: {
    backgroundColor: '#151831',
    borderRadius: 16,
    padding: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#252849',
  },
  ageSelectorItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'transparent',
    marginBottom: 4,
  },
  ageSelectorEmoji: {
    fontSize: 24,
    marginRight: 12,
  },
  ageSelectorInfo: {
    flex: 1,
  },
  ageSelectorLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  ageSelectorRange: {
    fontSize: 12,
    color: '#8B8FA3',
    marginTop: 2,
  },
  ageSelectorCheck: {
    fontSize: 18,
    fontWeight: '700',
  },
  goalOptions: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 16,
  },
  goalChip: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 12,
    backgroundColor: '#151831',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#252849',
  },
  goalChipText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#8B8FA3',
  },
  aboutCard: {
    backgroundColor: '#151831',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#252849',
  },
  aboutAppName: {
    fontSize: 22,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  aboutVersion: {
    fontSize: 12,
    color: '#8B8FA3',
    marginBottom: 10,
  },
  aboutDesc: {
    fontSize: 13,
    color: '#8B8FA3',
    textAlign: 'center',
    lineHeight: 20,
  },
  resetButton: {
    backgroundColor: '#FF6B6B15',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FF6B6B30',
  },
  resetButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FF6B6B',
  },
  bottomPadding: {
    height: 20,
  },
});

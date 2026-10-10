// ==========================================
// LinguaLeap - Home Screen
// Dashboard with daily progress & quick actions
// ==========================================

import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Animated,
  Platform,
} from 'react-native';
import { router } from 'expo-router';
import { useApp } from '../../src/context/AppContext';
import { AGE_GROUP_CONFIGS, LEVEL_XP_THRESHOLDS, CATEGORY_COLORS } from '../../src/constants/theme';
import { getLessonsForAgeGroup } from '../../src/data/lessons';

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const { profile, addXP } = useApp();
  const [scaleAnim] = useState(() => new Animated.Value(0));
  const [fadeAnim] = useState(() => new Animated.Value(0));

  useEffect(() => {
    Animated.parallel([
      Animated.spring(scaleAnim, { toValue: 1, tension: 50, friction: 7, useNativeDriver: true }),
      Animated.timing(fadeAnim, { toValue: 1, duration: 600, useNativeDriver: true }),
    ]).start();
  }, []);

  if (!profile) return null;

  const config = AGE_GROUP_CONFIGS[profile.ageGroup];
  const lessons = getLessonsForAgeGroup(profile.ageGroup);
  const nextLesson = lessons.find((l) => !profile.completedLessons.includes(l.id));
  const currentLevelXP = LEVEL_XP_THRESHOLDS[profile.level - 1] || 0;
  const nextLevelXP = LEVEL_XP_THRESHOLDS[profile.level] || LEVEL_XP_THRESHOLDS[LEVEL_XP_THRESHOLDS.length - 1];
  const xpProgress = Math.min(1, (profile.xp - currentLevelXP) / (nextLevelXP - currentLevelXP));
  const dailyProgress = Math.min(1, profile.dailyProgress / profile.dailyGoal);

  const quickActions = [
    { icon: '📝', label: 'Vocabulary', color: CATEGORY_COLORS.vocabulary, category: 'vocabulary' },
    { icon: '📐', label: 'Grammar', color: CATEGORY_COLORS.grammar, category: 'grammar' },
    { icon: '🗣️', label: 'Speaking', color: CATEGORY_COLORS.pronunciation, category: 'pronunciation' },
    { icon: '👂', label: 'Listening', color: CATEGORY_COLORS.listening, category: 'listening' },
    { icon: '📖', label: 'Reading', color: CATEGORY_COLORS.reading, category: 'reading' },
    { icon: '💬', label: 'Chat', color: CATEGORY_COLORS.conversation, category: 'conversation' },
  ];

  const handleQuickAction = (category: string) => {
    if (category === 'conversation') {
      router.push('/speak');
      return;
    }
    const lesson = lessons.find((l) => l.category === category && !profile.completedLessons.includes(l.id));
    if (lesson) {
      router.push({ pathname: '/lesson', params: { lessonId: lesson.id, ageGroup: profile.ageGroup } });
    } else {
      // All completed, replay first
      const firstLesson = lessons.find((l) => l.category === category);
      if (firstLesson) {
        router.push({ pathname: '/lesson', params: { lessonId: firstLesson.id, ageGroup: profile.ageGroup } });
      }
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header */}
        <Animated.View style={[styles.header, { opacity: fadeAnim }]}>
          <View>
            <Text style={styles.greeting}>
              {getGreeting()}, {profile.name}! {config.emoji}
            </Text>
            <Text style={styles.subtitle}>
              {config.label} • Level {profile.level}
            </Text>
          </View>
          <View style={styles.streakBadge}>
            <Text style={styles.streakEmoji}>🔥</Text>
            <Text style={styles.streakCount}>{profile.streak}</Text>
          </View>
        </Animated.View>

        {/* XP Progress Card */}
        <Animated.View style={[styles.xpCard, { transform: [{ scale: scaleAnim }] }]}>
          <View style={styles.xpHeader}>
            <Text style={styles.xpTitle}>Level {profile.level}</Text>
            <Text style={styles.xpAmount}>{profile.xp} XP</Text>
          </View>
          <View style={styles.xpBarBg}>
            <View style={[styles.xpBar, { width: `${xpProgress * 100}%`, backgroundColor: config.colors.primary }]} />
          </View>
          <Text style={styles.xpToNext}>
            {nextLevelXP - profile.xp} XP to Level {profile.level + 1}
          </Text>
        </Animated.View>

        {/* Daily Goal Card */}
        <Animated.View style={[styles.dailyCard, { opacity: fadeAnim }]}>
          <View style={styles.dailyHeader}>
            <Text style={styles.dailyTitle}>Daily Goal</Text>
            <Text style={styles.dailyXP}>{profile.dailyProgress}/{profile.dailyGoal} XP</Text>
          </View>
          <View style={styles.dailyBarBg}>
            <View style={[styles.dailyBar, { width: `${dailyProgress * 100}%` }]} />
          </View>
          {dailyProgress >= 1 && (
            <View style={styles.dailyComplete}>
              <Text style={styles.dailyCompleteText}>🎉 Daily goal achieved!</Text>
            </View>
          )}
        </Animated.View>

        {/* Continue Learning Card */}
        {nextLesson && (
          <TouchableOpacity
            style={[styles.continueCard, { borderColor: config.colors.primary + '40' }]}
            onPress={() => router.push({ pathname: '/lesson', params: { lessonId: nextLesson.id, ageGroup: profile.ageGroup } })}
            activeOpacity={0.8}
          >
            <View style={styles.continueTop}>
              <Text style={styles.continueIcon}>{nextLesson.icon}</Text>
              <View style={styles.continueInfo}>
                <Text style={styles.continueLabel}>Continue Learning</Text>
                <Text style={styles.continueTitle}>{nextLesson.title}</Text>
                <Text style={styles.continueMeta}>
                  {nextLesson.estimatedMinutes} min • {nextLesson.xpReward} XP
                </Text>
              </View>
            </View>
            <View style={[styles.continueButton, { backgroundColor: config.colors.primary }]}>
              <Text style={styles.continueButtonText}>Start →</Text>
            </View>
          </TouchableOpacity>
        )}

        {/* Quick Actions Grid */}
        <Text style={styles.sectionTitle}>Quick Practice</Text>
        <View style={styles.actionsGrid}>
          {quickActions.map((action, index) => (
            <TouchableOpacity
              key={index}
              style={styles.actionCard}
              onPress={() => handleQuickAction(action.category)}
              activeOpacity={0.7}
            >
              <View style={[styles.actionIconBg, { backgroundColor: action.color + '20' }]}>
                <Text style={styles.actionIcon}>{action.icon}</Text>
              </View>
              <Text style={styles.actionLabel}>{action.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Stats Row */}
        <Text style={styles.sectionTitle}>Your Stats</Text>
        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{profile.totalLessonsCompleted}</Text>
            <Text style={styles.statLabel}>Lessons</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{profile.streak}</Text>
            <Text style={styles.statLabel}>Day Streak</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{profile.xp}</Text>
            <Text style={styles.statLabel}>Total XP</Text>
          </View>
        </View>

        {/* Tips Section */}
        <View style={styles.tipCard}>
          <Text style={styles.tipEmoji}>💡</Text>
          <View style={styles.tipContent}>
            <Text style={styles.tipTitle}>Tip of the Day</Text>
            <Text style={styles.tipText}>{getDailyTip(profile.ageGroup)}</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 17) return 'Good afternoon';
  return 'Good evening';
}

function getDailyTip(ageGroup: string): string {
  const tips: Record<string, string[]> = {
    kids: [
      'Try singing the alphabet song every day!',
      'Point at things and say their name in English!',
      'Watch your favorite cartoon in English!',
    ],
    tweens: [
      'Read one English book page before bed!',
      'Try to think in English for 5 minutes!',
      'Label objects around your room in English!',
    ],
    teens: [
      'Listen to English podcasts during your commute!',
      'Try writing a daily journal entry in English!',
      'Watch movies with English subtitles!',
    ],
    adults: [
      'Practice business email writing in English!',
      'Join an online English discussion group!',
      'Read news articles in English every morning!',
    ],
  };
  const groupTips = tips[ageGroup] || tips.kids;
  return groupTips[Math.floor(Math.random() * groupTips.length)];
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  greeting: {
    fontSize: 24,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  subtitle: {
    fontSize: 14,
    color: '#8B8FA3',
    marginTop: 4,
  },
  streakBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1A1E3C',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
  },
  streakEmoji: {
    fontSize: 18,
    marginRight: 4,
  },
  streakCount: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  xpCard: {
    backgroundColor: '#151831',
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#252849',
  },
  xpHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  xpTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  xpAmount: {
    fontSize: 16,
    fontWeight: '600',
    color: '#A29BFE',
  },
  xpBarBg: {
    height: 10,
    backgroundColor: '#252849',
    borderRadius: 5,
    overflow: 'hidden',
  },
  xpBar: {
    height: '100%',
    borderRadius: 5,
  },
  xpToNext: {
    fontSize: 12,
    color: '#8B8FA3',
    marginTop: 8,
    textAlign: 'right',
  },
  dailyCard: {
    backgroundColor: '#151831',
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#252849',
  },
  dailyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  dailyTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  dailyXP: {
    fontSize: 14,
    fontWeight: '600',
    color: '#00CEC9',
  },
  dailyBarBg: {
    height: 8,
    backgroundColor: '#252849',
    borderRadius: 4,
    overflow: 'hidden',
  },
  dailyBar: {
    height: '100%',
    borderRadius: 4,
    backgroundColor: '#00CEC9',
  },
  dailyComplete: {
    marginTop: 8,
    alignItems: 'center',
  },
  dailyCompleteText: {
    fontSize: 14,
    color: '#00CEC9',
    fontWeight: '600',
  },
  continueCard: {
    backgroundColor: '#151831',
    borderRadius: 20,
    padding: 20,
    marginBottom: 24,
    borderWidth: 1.5,
  },
  continueTop: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  continueIcon: {
    fontSize: 40,
    marginRight: 14,
  },
  continueInfo: {
    flex: 1,
  },
  continueLabel: {
    fontSize: 12,
    color: '#8B8FA3',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  continueTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
    marginTop: 4,
  },
  continueMeta: {
    fontSize: 13,
    color: '#8B8FA3',
    marginTop: 4,
  },
  continueButton: {
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  continueButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 16,
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 24,
    gap: 12,
  },
  actionCard: {
    width: (width - 56) / 3,
    backgroundColor: '#151831',
    borderRadius: 16,
    paddingVertical: 18,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#252849',
  },
  actionIconBg: {
    width: 48,
    height: 48,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  actionIcon: {
    fontSize: 24,
  },
  actionLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  statsRow: {
    flexDirection: 'row',
    backgroundColor: '#151831',
    borderRadius: 20,
    padding: 20,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#252849',
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  statLabel: {
    fontSize: 12,
    color: '#8B8FA3',
    marginTop: 4,
  },
  statDivider: {
    width: 1,
    backgroundColor: '#252849',
    marginHorizontal: 10,
  },
  tipCard: {
    flexDirection: 'row',
    backgroundColor: '#1A1E3C',
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
    alignItems: 'flex-start',
  },
  tipEmoji: {
    fontSize: 28,
    marginRight: 12,
  },
  tipContent: {
    flex: 1,
  },
  tipTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  tipText: {
    fontSize: 13,
    color: '#8B8FA3',
    lineHeight: 18,
  },
});

// ==========================================
// LinguaLeap - Progress Screen
// Skills breakdown & statistics
// ==========================================

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  Platform,
} from 'react-native';
import { useApp } from '../../src/context/AppContext';
import { AGE_GROUP_CONFIGS, CATEGORY_COLORS, CATEGORY_ICONS } from '../../src/constants/theme';

const { width } = Dimensions.get('window');

function SkillBar({ label, icon, value, color }: { label: string; icon: string; value: number; color: string }) {
  return (
    <View style={styles.skillItem}>
      <View style={styles.skillHeader}>
        <Text style={styles.skillIcon}>{icon}</Text>
        <Text style={styles.skillLabel}>{label}</Text>
        <Text style={[styles.skillValue, { color }]}>{value}%</Text>
      </View>
      <View style={styles.skillBarBg}>
        <View style={[styles.skillBar, { width: `${value}%`, backgroundColor: color }]} />
      </View>
    </View>
  );
}

function StatCard({ value, label, emoji }: { value: string | number; label: string; emoji: string }) {
  return (
    <View style={styles.statCard}>
      <Text style={styles.statEmoji}>{emoji}</Text>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

export default function ProgressScreen() {
  const { profile, getProgressStats } = useApp();

  if (!profile) return null;

  const config = AGE_GROUP_CONFIGS[profile.ageGroup];
  const stats = getProgressStats();

  const skills = [
    { label: 'Vocabulary', icon: CATEGORY_ICONS.vocabulary, value: stats.vocabularyMastered, color: CATEGORY_COLORS.vocabulary },
    { label: 'Grammar', icon: CATEGORY_ICONS.grammar, value: stats.grammarScore, color: CATEGORY_COLORS.grammar },
    { label: 'Pronunciation', icon: CATEGORY_ICONS.pronunciation, value: stats.pronunciationScore, color: CATEGORY_COLORS.pronunciation },
    { label: 'Listening', icon: CATEGORY_ICONS.listening, value: stats.listeningScore, color: CATEGORY_COLORS.listening },
    { label: 'Reading', icon: CATEGORY_ICONS.reading, value: stats.readingScore, color: CATEGORY_COLORS.reading },
    { label: 'Conversation', icon: CATEGORY_ICONS.conversation, value: stats.conversationScore, color: CATEGORY_COLORS.conversation },
  ];

  const averageScore = Math.round(
    skills.reduce((sum, s) => sum + s.value, 0) / skills.length
  );

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <Text style={styles.title}>Progress 📊</Text>
        <Text style={styles.subtitle}>Track your English mastery</Text>

        {/* Overall Score Circle */}
        <View style={styles.overallCard}>
          <View style={[styles.scoreCircle, { borderColor: config.colors.primary }]}>
            <Text style={[styles.scoreValue, { color: config.colors.primary }]}>{averageScore}</Text>
            <Text style={styles.scoreLabel}>Overall</Text>
          </View>
          <View style={styles.overallStats}>
            <View style={styles.overallStatItem}>
              <Text style={styles.overallStatValue}>{profile.totalLessonsCompleted}</Text>
              <Text style={styles.overallStatLabel}>Lessons Done</Text>
            </View>
            <View style={styles.overallStatItem}>
              <Text style={styles.overallStatValue}>{profile.xp}</Text>
              <Text style={styles.overallStatLabel}>Total XP</Text>
            </View>
            <View style={styles.overallStatItem}>
              <Text style={styles.overallStatValue}>{profile.streak}</Text>
              <Text style={styles.overallStatLabel}>Day Streak</Text>
            </View>
          </View>
        </View>

        {/* Skills Breakdown */}
        <Text style={styles.sectionTitle}>Skills Breakdown</Text>
        <View style={styles.skillsCard}>
          {skills.map((skill, index) => (
            <SkillBar key={index} {...skill} />
          ))}
        </View>

        {/* Quick Stats */}
        <Text style={styles.sectionTitle}>Quick Stats</Text>
        <View style={styles.quickStatsGrid}>
          <StatCard value={profile.level} label="Level" emoji="🏆" />
          <StatCard value={`${profile.streak}d`} label="Streak" emoji="🔥" />
          <StatCard value={profile.completedLessons.length} label="Completed" emoji="✅" />
          <StatCard value={`${profile.dailyProgress}/${profile.dailyGoal}`} label="Daily XP" emoji="⚡" />
        </View>

        {/* Achievements Preview */}
        <Text style={styles.sectionTitle}>Achievements</Text>
        <View style={styles.achievementsCard}>
          {[
            { emoji: '🎉', title: 'First Steps', desc: 'Complete first lesson', unlocked: profile.totalLessonsCompleted >= 1 },
            { emoji: '🔥', title: 'On Fire!', desc: '3-day streak', unlocked: profile.streak >= 3 },
            { emoji: '⚔️', title: 'Week Warrior', desc: '7-day streak', unlocked: profile.streak >= 7 },
            { emoji: '💯', title: 'High Scorer', desc: 'Earn 500 XP', unlocked: profile.xp >= 500 },
            { emoji: '⭐', title: 'Rising Star', desc: 'Reach Level 5', unlocked: profile.level >= 5 },
            { emoji: '🦸', title: 'Language Hero', desc: 'Reach Level 10', unlocked: profile.level >= 10 },
          ].map((achievement, index) => (
            <View
              key={index}
              style={[
                styles.achievementItem,
                !achievement.unlocked && styles.achievementLocked,
              ]}
            >
              <Text style={[styles.achievementEmoji, !achievement.unlocked && { opacity: 0.3 }]}>
                {achievement.emoji}
              </Text>
              <View style={styles.achievementInfo}>
                <Text style={[styles.achievementTitle, !achievement.unlocked && { color: '#636E72' }]}>
                  {achievement.title}
                </Text>
                <Text style={styles.achievementDesc}>{achievement.desc}</Text>
              </View>
              {achievement.unlocked && (
                <Text style={styles.achievementUnlocked}>✓</Text>
              )}
            </View>
          ))}
        </View>
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
  },
  subtitle: {
    fontSize: 14,
    color: '#8B8FA3',
    marginTop: 4,
    marginBottom: 24,
  },
  overallCard: {
    backgroundColor: '#151831',
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#252849',
  },
  scoreCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 4,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: '#0A0E27',
  },
  scoreValue: {
    fontSize: 36,
    fontWeight: '800',
  },
  scoreLabel: {
    fontSize: 12,
    color: '#8B8FA3',
    marginTop: 2,
  },
  overallStats: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-around',
  },
  overallStatItem: {
    alignItems: 'center',
  },
  overallStatValue: {
    fontSize: 22,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  overallStatLabel: {
    fontSize: 11,
    color: '#8B8FA3',
    marginTop: 4,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 14,
  },
  skillsCard: {
    backgroundColor: '#151831',
    borderRadius: 20,
    padding: 20,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#252849',
  },
  skillItem: {
    marginBottom: 16,
  },
  skillHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  skillIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  skillLabel: {
    flex: 1,
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  skillValue: {
    fontSize: 14,
    fontWeight: '700',
  },
  skillBarBg: {
    height: 8,
    backgroundColor: '#252849',
    borderRadius: 4,
    overflow: 'hidden',
  },
  skillBar: {
    height: '100%',
    borderRadius: 4,
  },
  quickStatsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 24,
  },
  statCard: {
    width: (width - 52) / 2,
    backgroundColor: '#151831',
    borderRadius: 16,
    padding: 18,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#252849',
  },
  statEmoji: {
    fontSize: 28,
    marginBottom: 8,
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
  achievementsCard: {
    backgroundColor: '#151831',
    borderRadius: 20,
    padding: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#252849',
  },
  achievementItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#252849',
  },
  achievementLocked: {
    opacity: 0.5,
  },
  achievementEmoji: {
    fontSize: 28,
    marginRight: 14,
  },
  achievementInfo: {
    flex: 1,
  },
  achievementTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  achievementDesc: {
    fontSize: 12,
    color: '#8B8FA3',
    marginTop: 2,
  },
  achievementUnlocked: {
    fontSize: 18,
    color: '#00B894',
    fontWeight: '700',
  },
});

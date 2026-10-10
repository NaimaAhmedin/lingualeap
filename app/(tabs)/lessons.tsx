// ==========================================
// LinguaLeap - Lessons Screen
// Browse and start lessons by category
// ==========================================

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Platform,
} from 'react-native';
import { router } from 'expo-router';
import { useApp } from '../../src/context/AppContext';
import { AGE_GROUP_CONFIGS, CATEGORY_COLORS, CATEGORY_ICONS } from '../../src/constants/theme';
import { getLessonsForAgeGroup } from '../../src/data/lessons';
import { LessonCategory } from '../../src/types';

const { width } = Dimensions.get('window');

const CATEGORIES: { id: LessonCategory; label: string }[] = [
  { id: 'vocabulary', label: 'Vocabulary' },
  { id: 'grammar', label: 'Grammar' },
  { id: 'pronunciation', label: 'Pronunciation' },
  { id: 'listening', label: 'Listening' },
  { id: 'reading', label: 'Reading' },
];

export default function LessonsScreen() {
  const { profile } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<LessonCategory | 'all'>('all');

  if (!profile) return null;

  const config = AGE_GROUP_CONFIGS[profile.ageGroup];
  const allLessons = getLessonsForAgeGroup(profile.ageGroup);
  const filteredLessons = selectedCategory === 'all'
    ? allLessons
    : allLessons.filter((l) => l.category === selectedCategory);

  const completedCount = allLessons.filter((l) => profile.completedLessons.includes(l.id)).length;
  const overallProgress = allLessons.length > 0 ? completedCount / allLessons.length : 0;

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Lessons 📚</Text>
          <Text style={styles.subtitle}>{config.label} Curriculum</Text>
        </View>

        {/* Overall Progress */}
        <View style={styles.progressCard}>
          <View style={styles.progressHeader}>
            <Text style={styles.progressTitle}>Overall Progress</Text>
            <Text style={[styles.progressPercent, { color: config.colors.primary }]}>
              {Math.round(overallProgress * 100)}%
            </Text>
          </View>
          <View style={styles.progressBarBg}>
            <View
              style={[
                styles.progressBar,
                { width: `${overallProgress * 100}%`, backgroundColor: config.colors.primary },
              ]}
            />
          </View>
          <Text style={styles.progressSub}>
            {completedCount} of {allLessons.length} lessons completed
          </Text>
        </View>

        {/* Category Filter */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoryScroll}
        >
          <TouchableOpacity
            style={[
              styles.categoryChip,
              selectedCategory === 'all' && { backgroundColor: config.colors.primary },
            ]}
            onPress={() => setSelectedCategory('all')}
          >
            <Text
              style={[
                styles.categoryChipText,
                selectedCategory === 'all' && styles.categoryChipActive,
              ]}
            >
              All
            </Text>
          </TouchableOpacity>
          {CATEGORIES.map((cat) => (
            <TouchableOpacity
              key={cat.id}
              style={[
                styles.categoryChip,
                selectedCategory === cat.id && {
                  backgroundColor: CATEGORY_COLORS[cat.id],
                },
              ]}
              onPress={() => setSelectedCategory(cat.id)}
            >
              <Text
                style={[
                  styles.categoryChipText,
                  selectedCategory === cat.id && styles.categoryChipActive,
                ]}
              >
                {CATEGORY_ICONS[cat.id]} {cat.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Lesson Cards */}
        {filteredLessons.map((lesson, index) => {
          const isCompleted = profile.completedLessons.includes(lesson.id);
          return (
            <TouchableOpacity
              key={lesson.id}
              style={[
                styles.lessonCard,
                isCompleted && styles.lessonCompleted,
              ]}
              onPress={() =>
                router.push({
                  pathname: '/lesson',
                  params: { lessonId: lesson.id, ageGroup: profile.ageGroup },
                })
              }
              activeOpacity={0.7}
            >
              <View style={styles.lessonLeft}>
                <View
                  style={[
                    styles.lessonIconBg,
                    { backgroundColor: (CATEGORY_COLORS[lesson.category] || '#6C5CE7') + '20' },
                  ]}
                >
                  <Text style={styles.lessonIcon}>{lesson.icon}</Text>
                </View>
                <View style={styles.lessonInfo}>
                  <Text style={styles.lessonTitle}>{lesson.title}</Text>
                  <Text style={styles.lessonDesc}>{lesson.description}</Text>
                  <View style={styles.lessonMeta}>
                    <Text style={styles.lessonMetaText}>
                      ⏱️ {lesson.estimatedMinutes} min
                    </Text>
                    <Text style={styles.lessonMetaText}>
                      ⭐ {lesson.xpReward} XP
                    </Text>
                    <Text style={styles.lessonMetaText}>
                      {CATEGORY_ICONS[lesson.category]} {lesson.category}
                    </Text>
                  </View>
                </View>
              </View>
              <View style={styles.lessonRight}>
                {isCompleted ? (
                  <View style={styles.completedBadge}>
                    <Text style={styles.completedText}>✓</Text>
                  </View>
                ) : (
                  <View style={[styles.playButton, { backgroundColor: config.colors.primary }]}>
                    <Text style={styles.playText}>▶</Text>
                  </View>
                )}
              </View>
            </TouchableOpacity>
          );
        })}

        {filteredLessons.length === 0 && (
          <View style={styles.emptyState}>
            <Text style={styles.emptyEmoji}>📭</Text>
            <Text style={styles.emptyText}>No lessons in this category yet!</Text>
          </View>
        )}
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
  header: {
    marginBottom: 20,
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
  },
  progressCard: {
    backgroundColor: '#151831',
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#252849',
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  progressTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  progressPercent: {
    fontSize: 18,
    fontWeight: '800',
  },
  progressBarBg: {
    height: 8,
    backgroundColor: '#252849',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    borderRadius: 4,
  },
  progressSub: {
    fontSize: 12,
    color: '#8B8FA3',
    marginTop: 8,
  },
  categoryScroll: {
    paddingBottom: 16,
    gap: 8,
  },
  categoryChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#151831',
    borderWidth: 1,
    borderColor: '#252849',
  },
  categoryChipText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#8B8FA3',
  },
  categoryChipActive: {
    color: '#FFFFFF',
  },
  lessonCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#151831',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#252849',
  },
  lessonCompleted: {
    borderColor: '#00B89440',
    backgroundColor: '#00B89408',
  },
  lessonLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  lessonIconBg: {
    width: 50,
    height: 50,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  lessonIcon: {
    fontSize: 26,
  },
  lessonInfo: {
    flex: 1,
    marginLeft: 14,
  },
  lessonTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  lessonDesc: {
    fontSize: 12,
    color: '#8B8FA3',
    marginTop: 2,
  },
  lessonMeta: {
    flexDirection: 'row',
    marginTop: 6,
    gap: 10,
  },
  lessonMetaText: {
    fontSize: 11,
    color: '#636E72',
  },
  lessonRight: {
    marginLeft: 10,
  },
  completedBadge: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#00B89420',
    justifyContent: 'center',
    alignItems: 'center',
  },
  completedText: {
    color: '#00B894',
    fontSize: 18,
    fontWeight: '700',
  },
  playButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  playText: {
    color: '#FFFFFF',
    fontSize: 14,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyEmoji: {
    fontSize: 48,
    marginBottom: 12,
  },
  emptyText: {
    fontSize: 16,
    color: '#8B8FA3',
  },
});

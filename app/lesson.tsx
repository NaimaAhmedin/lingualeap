// ==========================================
// LinguaLeap - Interactive Lesson Screen
// Handles Quiz, Pronunciation, Listening & Reading
// ==========================================

import React, { useState, useEffect, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Platform,
  Alert,
  Animated,
  Dimensions,
} from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import * as Speech from 'expo-speech';
import * as Haptics from 'expo-haptics';
import { useApp } from '../src/context/AppContext';
import { AGE_GROUP_CONFIGS, CATEGORY_COLORS, CATEGORY_ICONS } from '../src/constants/theme';
import {
  KIDS_LESSONS,
  TWEENS_LESSONS,
  TEENS_LESSONS,
  ADULTS_LESSONS,
} from '../src/data/lessons';
import { Lesson, LessonItem, AgeGroup } from '../src/types';

const { width } = Dimensions.get('window');

const ALL_LESSONS: Lesson[] = [
  ...KIDS_LESSONS,
  ...TWEENS_LESSONS,
  ...TEENS_LESSONS,
  ...ADULTS_LESSONS,
];

export default function LessonScreen() {
  const params = useLocalSearchParams<{ lessonId?: string; ageGroup?: string }>();
  const { profile, addXP, completeLesson } = useApp();

  const lesson = useMemo(() => {
    return ALL_LESSONS.find((l) => l.id === params.lessonId) || null;
  }, [params.lessonId]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswerChecked, setIsAnswerChecked] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [correctAnswersCount, setCorrectAnswersCount] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [hasRecorded, setHasRecorded] = useState(false);

  // Animations
  const [progressAnim] = useState(() => new Animated.Value(0));
  const [fadeAnim] = useState(() => new Animated.Value(1));
  const [pulseAnim] = useState(() => new Animated.Value(1));

  // Update progress bar
  useEffect(() => {
    if (lesson && lesson.content.items.length > 0) {
      const progress = (currentIndex + (isFinished ? 1 : 0)) / lesson.content.items.length;
      Animated.timing(progressAnim, {
        toValue: Math.min(progress, 1),
        duration: 300,
        useNativeDriver: false,
      }).start();
    }
  }, [currentIndex, isFinished, lesson]);

  // Clean up speech on unmount
  useEffect(() => {
    return () => {
      try {
        Speech.stop();
      } catch (e) {
        // ignore
      }
    };
  }, []);

  const triggerHaptic = (type: 'impact' | 'success' | 'error') => {
    try {
      if (Platform.OS === 'web') return;
      if (type === 'impact') {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      } else if (type === 'success') {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      } else if (type === 'error') {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      }
    } catch (e) {
      // Haptics might fail on some devices/web, silently continue
    }
  };

  const playTTS = (textToSpeak: string) => {
    try {
      Speech.stop();
      setIsSpeaking(true);
      Speech.speak(textToSpeak, {
        language: 'en-US',
        pitch: 1.0,
        rate: 0.88,
        onDone: () => setIsSpeaking(false),
        onStopped: () => setIsSpeaking(false),
        onError: () => setIsSpeaking(false),
      });
    } catch (e) {
      setIsSpeaking(false);
    }
  };

  const handleOptionSelect = (option: string) => {
    if (isAnswerChecked) return;
    triggerHaptic('impact');
    setSelectedOption(option);
  };

  const handleCheckAnswer = () => {
    if (!lesson) return;
    const currentItem = lesson.content.items[currentIndex];
    if (!currentItem) return;

    let correct = false;

    // Check multiple choice
    if (currentItem.options && currentItem.options.length > 0) {
      if (!selectedOption) return;
      correct = selectedOption.trim().toLowerCase() === currentItem.correctAnswer.trim().toLowerCase();
    } else {
      // Pronunciation without options: requires having spoken/practiced
      correct = true;
    }

    setIsCorrect(correct);
    setIsAnswerChecked(true);

    if (correct) {
      setCorrectAnswersCount((prev) => prev + 1);
      triggerHaptic('success');
    } else {
      triggerHaptic('error');
    }
  };

  const handleNext = () => {
    if (!lesson) return;
    const totalItems = lesson.content.items.length;

    // If more items exist
    if (currentIndex < totalItems - 1) {
      // Fade transition
      Animated.sequence([
        Animated.timing(fadeAnim, { toValue: 0, duration: 150, useNativeDriver: true }),
        Animated.timing(fadeAnim, { toValue: 1, duration: 150, useNativeDriver: true }),
      ]).start();

      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswerChecked(false);
      setIsCorrect(false);
      setHasRecorded(false);
      setIsRecording(false);
      try {
        Speech.stop();
      } catch (e) {}
    } else {
      // Finished all items!
      completeLesson(lesson.id);
      addXP(lesson.xpReward);
      triggerHaptic('success');
      setIsFinished(true);
    }
  };

  const handleSimulatePronounce = (promptText: string) => {
    triggerHaptic('impact');
    setIsRecording(true);
    
    // Simulate speech detection pulse
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, { toValue: 1.25, duration: 400, useNativeDriver: true }),
        Animated.timing(pulseAnim, { toValue: 1, duration: 400, useNativeDriver: true }),
      ])
    ).start();

    setTimeout(() => {
      pulseAnim.stopAnimation();
      pulseAnim.setValue(1);
      setIsRecording(false);
      setHasRecorded(true);
      setSelectedOption(promptText);
      triggerHaptic('success');
    }, 1600);
  };

  const handleExit = () => {
    if (isFinished || currentIndex === 0 && !isAnswerChecked) {
      router.back();
      return;
    }
    Alert.alert(
      'Exit Lesson?',
      'Are you sure you want to quit? Your current progress in this lesson will be lost.',
      [
        { text: 'Keep Learning', style: 'cancel' },
        {
          text: 'Exit',
          style: 'destructive',
          onPress: () => router.back(),
        },
      ]
    );
  };

  // If lesson wasn't found
  if (!lesson) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorEmoji}>🔍</Text>
          <Text style={styles.errorTitle}>Lesson Not Found</Text>
          <Text style={styles.errorText}>
            {"We couldn't locate this lesson. It may have been moved or updated."}
          </Text>
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <Text style={styles.backButtonText}>Go Back</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const effectiveAgeGroup: AgeGroup = (params.ageGroup as AgeGroup) || profile?.ageGroup || 'kids';
  const ageConfig = AGE_GROUP_CONFIGS[effectiveAgeGroup] || AGE_GROUP_CONFIGS.kids;
  const currentItem: LessonItem | undefined = lesson.content.items[currentIndex];
  const totalItems = lesson.content.items.length;
  const categoryColor = CATEGORY_COLORS[lesson.category] || ageConfig.colors.primary;

  // Render Finished Summary Screen
  if (isFinished) {
    const accuracy = Math.round((correctAnswersCount / totalItems) * 100);
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.finishedContainer}>
          <Text style={styles.finishedEmoji}>
            {accuracy >= 80 ? '🏆' : accuracy >= 50 ? '🌟' : '💪'}
          </Text>
          <Text style={styles.finishedTitle}>
            {accuracy === 100 ? 'Flawless!' : accuracy >= 80 ? 'Lesson Complete!' : 'Good Effort!'}
          </Text>
          <Text style={styles.finishedSubtitle}>{lesson.title}</Text>

          {/* Reward Card */}
          <View style={styles.rewardCard}>
            <View style={styles.rewardItem}>
              <Text style={styles.rewardEmoji}>⚡</Text>
              <Text style={styles.rewardValue}>+{lesson.xpReward} XP</Text>
              <Text style={styles.rewardLabel}>Earned</Text>
            </View>
            <View style={styles.rewardDivider} />
            <View style={styles.rewardItem}>
              <Text style={styles.rewardEmoji}>🎯</Text>
              <Text style={styles.rewardValue}>{accuracy}%</Text>
              <Text style={styles.rewardLabel}>Accuracy</Text>
            </View>
            <View style={styles.rewardDivider} />
            <View style={styles.rewardItem}>
              <Text style={styles.rewardEmoji}>✅</Text>
              <Text style={styles.rewardValue}>{correctAnswersCount}/{totalItems}</Text>
              <Text style={styles.rewardLabel}>Correct</Text>
            </View>
          </View>

          {/* Encouragement text */}
          <View style={styles.encouragementBox}>
            <Text style={styles.encouragementText}>
              {accuracy >= 80
                ? 'Outstanding work! Your English skills are growing stronger every day.'
                : 'Great practice! Reviewing lessons helps reinforce new vocabulary and phrases.'}
            </Text>
          </View>

          {/* Buttons */}
          <TouchableOpacity
            style={[styles.primaryButton, { backgroundColor: ageConfig.colors.primary }]}
            onPress={() => router.back()}
          >
            <Text style={styles.primaryButtonText}>Continue Learning →</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const isPronunciationCategory = lesson.category === 'pronunciation';
  const isListeningCategory = lesson.category === 'listening';
  const hasOptions = currentItem?.options && currentItem.options.length > 0;

  return (
    <SafeAreaView style={styles.container}>
      {/* Top Navigation & Progress Bar */}
      <View style={styles.topBar}>
        <TouchableOpacity style={styles.exitButton} onPress={handleExit}>
          <Text style={styles.exitButtonText}>✕</Text>
        </TouchableOpacity>

        {/* Dynamic Progress Bar */}
        <View style={styles.progressBarTrack}>
          <Animated.View
            style={[
              styles.progressBarFill,
              {
                width: progressAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: ['0%', '100%'],
                }),
                backgroundColor: categoryColor,
              },
            ]}
          />
        </View>

        <View style={styles.counterBadge}>
          <Text style={styles.counterText}>
            {currentIndex + 1}/{totalItems}
          </Text>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Animated.View style={{ opacity: fadeAnim }}>
          {/* Category & Topic Header */}
          <View style={styles.lessonHeader}>
            <View style={[styles.categoryTag, { backgroundColor: categoryColor + '25' }]}>
              <Text style={styles.categoryTagIcon}>{CATEGORY_ICONS[lesson.category]}</Text>
              <Text style={[styles.categoryTagText, { color: categoryColor }]}>
                {lesson.category.toUpperCase()}
              </Text>
            </View>
            <Text style={styles.lessonTopic}>{lesson.title}</Text>
          </View>

          {/* Prompt / Question Card */}
          <View style={styles.questionCard}>
            {/* Audio Button for Question or TTS Item */}
            {(currentItem?.audioText || currentItem?.question) && (
              <TouchableOpacity
                style={[
                  styles.audioSpeakerButton,
                  isSpeaking && { backgroundColor: categoryColor + '40' },
                ]}
                onPress={() => playTTS(currentItem?.audioText || currentItem.question)}
                activeOpacity={0.7}
              >
                <Text style={styles.audioSpeakerIcon}>{isSpeaking ? '🔊' : '🔈'}</Text>
                <Text style={[styles.audioSpeakerText, { color: categoryColor }]}>
                  {isListeningCategory ? 'Listen to Audio' : 'Pronounce Aloud'}
                </Text>
              </TouchableOpacity>
            )}

            <Text style={styles.questionText}>{currentItem?.question}</Text>

            {currentItem?.hint && (
              <View style={styles.hintContainer}>
                <Text style={styles.hintEmoji}>💡</Text>
                <Text style={styles.hintText}>{currentItem.hint}</Text>
              </View>
            )}
          </View>

          {/* Interactive Options OR Pronunciation Voice Assistant */}
          {hasOptions ? (
            <View style={styles.optionsContainer}>
              {currentItem?.options?.map((option, idx) => {
                const isSelected = selectedOption === option;
                const isThisCorrect =
                  option.trim().toLowerCase() === currentItem.correctAnswer.trim().toLowerCase();

                const isOptionCorrectStyle = isAnswerChecked && isThisCorrect;
                const isOptionIncorrectStyle = isAnswerChecked && isSelected && !isThisCorrect;
                const isOptionDimmedStyle = isAnswerChecked && !isThisCorrect && !isSelected;

                return (
                  <TouchableOpacity
                    key={idx}
                    style={[
                      styles.optionCard,
                      isSelected && !isAnswerChecked && [
                        styles.optionSelected,
                        { borderColor: ageConfig.colors.primary, backgroundColor: ageConfig.colors.primary + '20' },
                      ],
                      isOptionCorrectStyle && styles.optionCorrect,
                      isOptionIncorrectStyle && styles.optionIncorrect,
                      isOptionDimmedStyle && styles.optionDimmed,
                    ]}
                    onPress={() => handleOptionSelect(option)}
                    disabled={isAnswerChecked}
                    activeOpacity={0.7}
                  >
                    <View style={styles.optionIndexBadge}>
                      <Text style={styles.optionIndexText}>
                        {String.fromCharCode(65 + idx)}
                      </Text>
                    </View>
                    <Text
                      style={[
                        styles.optionText,
                        isSelected && !isAnswerChecked && styles.optionTextSelected,
                        isOptionCorrectStyle && styles.optionTextCorrect,
                        isOptionIncorrectStyle && styles.optionTextIncorrect,
                      ]}
                    >
                      {option}
                    </Text>
                    {isAnswerChecked && isThisCorrect && (
                      <Text style={styles.optionFeedbackIcon}>✓</Text>
                    )}
                    {isAnswerChecked && isSelected && !isThisCorrect && (
                      <Text style={styles.optionFeedbackIcon}>✗</Text>
                    )}
                  </TouchableOpacity>
                );
              })}
            </View>
          ) : (
            /* Pronunciation / Speaking Practice Card */
            <View style={styles.pronounceCard}>
              <Text style={styles.pronouncePromptTitle}>Target Phrase:</Text>
              <Text style={[styles.targetWord, { color: categoryColor }]}>
                {`"${currentItem?.correctAnswer}"`}
              </Text>

              <TouchableOpacity
                style={[
                  styles.listenPronounceBtn,
                  { borderColor: categoryColor + '40' },
                ]}
                onPress={() => playTTS(currentItem?.correctAnswer || '')}
              >
                <Text style={styles.listenPronounceIcon}>🔊</Text>
                <Text style={styles.listenPronounceText}>Listen Native Audio</Text>
              </TouchableOpacity>

              {/* Simulated Speech Recognition Button */}
              <Animated.View style={{ transform: [{ scale: pulseAnim }] }}>
                <TouchableOpacity
                  style={[
                    styles.micButton,
                    isRecording && styles.micButtonRecording,
                    hasRecorded && styles.micButtonRecorded,
                  ]}
                  onPress={() => handleSimulatePronounce(currentItem?.correctAnswer || '')}
                  disabled={isRecording || isAnswerChecked}
                >
                  <Text style={styles.micEmoji}>
                    {isRecording ? '🎙️' : hasRecorded ? '✨' : '🎤'}
                  </Text>
                  <Text style={styles.micLabel}>
                    {isRecording
                      ? 'Listening... Speak now!'
                      : hasRecorded
                      ? 'Pronunciation Captured! Tap Check'
                      : 'Tap to Practice Speaking'}
                  </Text>
                </TouchableOpacity>
              </Animated.View>
            </View>
          )}
        </Animated.View>
      </ScrollView>

      {/* Bottom Feedback / Action Bar */}
      <View
        style={[
          styles.bottomBar,
          isAnswerChecked &&
            (isCorrect ? styles.bottomBarCorrect : styles.bottomBarIncorrect),
        ]}
      >
        {isAnswerChecked && (
          <View style={styles.feedbackContainer}>
            <View style={styles.feedbackHeader}>
              <Text style={styles.feedbackEmoji}>{isCorrect ? '🎉' : '💡'}</Text>
              <Text
                style={[
                  styles.feedbackTitle,
                  { color: isCorrect ? '#00B894' : '#FF7675' },
                ]}
              >
                {isCorrect ? 'Brilliant!' : 'Correct Answer:'}
              </Text>
            </View>
            {!isCorrect && (
              <Text style={styles.correctAnswerText}>
                {currentItem?.correctAnswer}
              </Text>
            )}
            {currentItem?.explanation && (
              <Text style={styles.feedbackExplanation}>
                {currentItem.explanation}
              </Text>
            )}
          </View>
        )}

        {/* Action Button */}
        {!isAnswerChecked ? (
          <TouchableOpacity
            style={[
              styles.primaryButton,
              {
                backgroundColor:
                  selectedOption || (isPronunciationCategory && hasRecorded)
                    ? ageConfig.colors.primary
                    : '#2D325A',
              },
            ]}
            onPress={handleCheckAnswer}
            disabled={!selectedOption && (!isPronunciationCategory || !hasRecorded)}
            activeOpacity={0.8}
          >
            <Text
              style={[
                styles.primaryButtonText,
                {
                  color:
                    selectedOption || (isPronunciationCategory && hasRecorded)
                      ? '#FFFFFF'
                      : '#636E72',
                },
              ]}
            >
              Check Answer
            </Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={[
              styles.primaryButton,
              { backgroundColor: isCorrect ? '#00B894' : '#FF7675' },
            ]}
            onPress={handleNext}
            activeOpacity={0.8}
          >
            <Text style={styles.primaryButtonText}>
              {currentIndex < totalItems - 1 ? 'Continue ➔' : 'Finish Lesson 🏆'}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0E27',
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'android' ? 36 : 12,
    paddingBottom: 12,
  },
  exitButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#1A1E3C',
    alignItems: 'center',
    justifyContent: 'center',
  },
  exitButtonText: {
    color: '#8B8FA3',
    fontSize: 18,
    fontWeight: '700',
  },
  progressBarTrack: {
    flex: 1,
    height: 10,
    backgroundColor: '#1A1E3C',
    borderRadius: 5,
    marginHorizontal: 14,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 5,
  },
  counterBadge: {
    backgroundColor: '#1A1E3C',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
  },
  counterText: {
    color: '#8B8FA3',
    fontSize: 12,
    fontWeight: '600',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 140,
  },
  lessonHeader: {
    marginTop: 10,
    marginBottom: 16,
  },
  categoryTag: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    marginBottom: 8,
  },
  categoryTagIcon: {
    fontSize: 14,
    marginRight: 6,
  },
  categoryTagText: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  lessonTopic: {
    fontSize: 22,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  questionCard: {
    backgroundColor: '#141838',
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: '#1E2452',
    marginBottom: 20,
  },
  audioSpeakerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: '#1E2452',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 12,
    marginBottom: 14,
  },
  audioSpeakerIcon: {
    fontSize: 18,
    marginRight: 8,
  },
  audioSpeakerText: {
    fontSize: 13,
    fontWeight: '600',
  },
  questionText: {
    fontSize: 20,
    color: '#FFFFFF',
    fontWeight: '600',
    lineHeight: 28,
  },
  hintContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#202550',
    padding: 10,
    borderRadius: 10,
    marginTop: 12,
  },
  hintEmoji: {
    fontSize: 16,
    marginRight: 8,
  },
  hintText: {
    color: '#A0A5C0',
    fontSize: 13,
    flex: 1,
  },
  optionsContainer: {
    gap: 12,
  },
  optionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#141838',
    padding: 18,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: '#1E2452',
  },
  optionSelected: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 18,
    borderRadius: 16,
    borderWidth: 2,
  },
  optionCorrect: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 184, 148, 0.15)',
    padding: 18,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#00B894',
  },
  optionIncorrect: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 118, 117, 0.15)',
    padding: 18,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#FF7675',
  },
  optionDimmed: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#101430',
    padding: 18,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: '#1E2452',
    opacity: 0.45,
  },
  optionIndexBadge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#1E2452',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  optionIndexText: {
    color: '#8B8FA3',
    fontWeight: '700',
    fontSize: 14,
  },
  optionText: {
    color: '#E0E3F0',
    fontSize: 16,
    fontWeight: '500',
    flex: 1,
  },
  optionTextSelected: {
    fontSize: 16,
    fontWeight: '700',
    flex: 1,
  },
  optionTextCorrect: {
    color: '#00B894',
    fontSize: 16,
    fontWeight: '700',
    flex: 1,
  },
  optionTextIncorrect: {
    color: '#FF7675',
    fontSize: 16,
    fontWeight: '700',
    flex: 1,
  },
  optionFeedbackIcon: {
    fontSize: 18,
    fontWeight: '800',
    color: '#FFFFFF',
    marginLeft: 8,
  },
  pronounceCard: {
    backgroundColor: '#141838',
    borderRadius: 20,
    padding: 24,
    borderWidth: 1,
    borderColor: '#1E2452',
    alignItems: 'center',
  },
  pronouncePromptTitle: {
    color: '#8B8FA3',
    fontSize: 13,
    fontWeight: '600',
    textTransform: 'uppercase',
    marginBottom: 8,
  },
  targetWord: {
    fontSize: 32,
    fontWeight: '900',
    textAlign: 'center',
    marginBottom: 18,
  },
  listenPronounceBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1A1E3C',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 24,
  },
  listenPronounceIcon: {
    fontSize: 18,
    marginRight: 8,
  },
  listenPronounceText: {
    color: '#E0E3F0',
    fontSize: 14,
    fontWeight: '600',
  },
  micButton: {
    backgroundColor: '#1E2452',
    paddingVertical: 18,
    paddingHorizontal: 28,
    borderRadius: 20,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#2D325A',
  },
  micButtonRecording: {
    backgroundColor: '#3B1F3C',
    borderColor: '#E84393',
  },
  micButtonRecorded: {
    backgroundColor: 'rgba(0, 184, 148, 0.2)',
    borderColor: '#00B894',
  },
  micEmoji: {
    fontSize: 36,
    marginBottom: 8,
  },
  micLabel: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#0E1232',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: Platform.OS === 'ios' ? 36 : 20,
    borderTopWidth: 1,
    borderTopColor: '#1A1E3C',
  },
  bottomBarCorrect: {
    backgroundColor: '#0A2024',
    borderTopColor: '#00B894',
  },
  bottomBarIncorrect: {
    backgroundColor: '#2A1222',
    borderTopColor: '#FF7675',
  },
  feedbackContainer: {
    marginBottom: 12,
  },
  feedbackHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  feedbackEmoji: {
    fontSize: 20,
    marginRight: 8,
  },
  feedbackTitle: {
    fontSize: 16,
    fontWeight: '800',
  },
  correctAnswerText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 4,
  },
  feedbackExplanation: {
    color: '#B0B5D0',
    fontSize: 13,
    lineHeight: 18,
  },
  primaryButton: {
    height: 54,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryButtonText: {
    fontSize: 17,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  finishedContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  finishedEmoji: {
    fontSize: 84,
    marginBottom: 16,
  },
  finishedTitle: {
    fontSize: 30,
    fontWeight: '900',
    color: '#FFFFFF',
    marginBottom: 6,
    textAlign: 'center',
  },
  finishedSubtitle: {
    fontSize: 16,
    color: '#8B8FA3',
    marginBottom: 28,
    textAlign: 'center',
  },
  rewardCard: {
    flexDirection: 'row',
    backgroundColor: '#141838',
    borderRadius: 20,
    paddingVertical: 20,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#1E2452',
    width: '100%',
    justifyContent: 'space-around',
    marginBottom: 24,
  },
  rewardItem: {
    alignItems: 'center',
  },
  rewardEmoji: {
    fontSize: 22,
    marginBottom: 4,
  },
  rewardValue: {
    fontSize: 18,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 2,
  },
  rewardLabel: {
    fontSize: 12,
    color: '#8B8FA3',
  },
  rewardDivider: {
    width: 1,
    backgroundColor: '#1E2452',
  },
  encouragementBox: {
    backgroundColor: '#141838',
    padding: 16,
    borderRadius: 14,
    marginBottom: 32,
    width: '100%',
  },
  encouragementText: {
    color: '#B0B5D0',
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
  },
  errorContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  errorEmoji: {
    fontSize: 60,
    marginBottom: 16,
  },
  errorTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  errorText: {
    fontSize: 14,
    color: '#8B8FA3',
    textAlign: 'center',
    marginBottom: 24,
  },
  backButton: {
    backgroundColor: '#6C5CE7',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
  },
  backButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 15,
  },
});

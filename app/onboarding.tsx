// ==========================================
// LinguaLeap - Onboarding Screen
// Age Selection & Profile Setup
// ==========================================

import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Animated,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { router } from 'expo-router';
import { useApp } from '../src/context/AppContext';
import { AGE_GROUP_CONFIGS } from '../src/constants/theme';
import { AgeGroup, UserProfile } from '../src/types';

const { width, height } = Dimensions.get('window');

const AVATARS = ['🧒', '👦', '👧', '🧑', '👨', '👩', '🧔', '👱', '🦸', '🧙', '🦊', '🐱'];

export default function OnboardingScreen() {
  const { setProfile } = useApp();
  const [step, setStep] = useState(0); // 0: welcome, 1: age, 2: name, 3: avatar
  const [selectedAge, setSelectedAge] = useState<AgeGroup | null>(null);
  const [name, setName] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState('🧒');
  const [fadeAnim] = useState(() => new Animated.Value(1));
  const [slideAnim] = useState(() => new Animated.Value(0));

  const animateTransition = (nextStep: number) => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 0, duration: 200, useNativeDriver: true }),
      Animated.timing(slideAnim, { toValue: -50, duration: 200, useNativeDriver: true }),
    ]).start(() => {
      setStep(nextStep);
      slideAnim.setValue(50);
      Animated.parallel([
        Animated.timing(fadeAnim, { toValue: 1, duration: 300, useNativeDriver: true }),
        Animated.timing(slideAnim, { toValue: 0, duration: 300, useNativeDriver: true }),
      ]).start();
    });
  };

  const handleComplete = () => {
    if (!selectedAge || !name.trim()) return;

    const profile: UserProfile = {
      id: Date.now().toString(),
      name: name.trim(),
      ageGroup: selectedAge,
      avatar: selectedAvatar,
      level: 1,
      xp: 0,
      streak: 0,
      lastActiveDate: new Date().toISOString().split('T')[0],
      completedLessons: [],
      achievements: [],
      dailyGoal: 50,
      dailyProgress: 0,
      totalLessonsCompleted: 0,
      totalTimeSpent: 0,
      createdAt: new Date().toISOString(),
    };

    setProfile(profile);
    router.replace('/(tabs)');
  };

  const ageConfig = selectedAge ? AGE_GROUP_CONFIGS[selectedAge] : null;

  return (
    <View style={styles.container}>
      {/* Background gradient effect */}
      <View style={styles.bgGradient1} />
      <View style={styles.bgGradient2} />
      <View style={styles.bgGradient3} />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <Animated.View
          style={[
            styles.content,
            { opacity: fadeAnim, transform: [{ translateY: slideAnim }] },
          ]}
        >
          {/* Step 0: Welcome */}
          {step === 0 && (
            <View style={styles.welcomeContainer}>
              <Text style={styles.appIcon}>🌍</Text>
              <Text style={styles.appName}>LinguaLeap</Text>
              <Text style={styles.appTagline}>
                Master English{'\n'}Your Way, Your Pace
              </Text>
              <Text style={styles.welcomeDesc}>
                Age-based learning designed for everyone — from little learners to fluency masters.
              </Text>
              <TouchableOpacity
                style={styles.primaryButton}
                onPress={() => animateTransition(1)}
                activeOpacity={0.8}
              >
                <Text style={styles.primaryButtonText}>Get Started 🚀</Text>
              </TouchableOpacity>
            </View>
          )}

          {/* Step 1: Age Group Selection */}
          {step === 1 && (
            <ScrollView
              contentContainerStyle={styles.ageContainer}
              showsVerticalScrollIndicator={false}
            >
              <Text style={styles.stepTitle}>Who is learning? 🤔</Text>
              <Text style={styles.stepSubtitle}>
                Choose your age group for personalized lessons
              </Text>

              {Object.values(AGE_GROUP_CONFIGS).map((config) => (
                <TouchableOpacity
                  key={config.id}
                  style={[
                    styles.ageCard,
                    selectedAge === config.id && {
                      borderColor: config.colors.primary,
                      borderWidth: 3,
                      backgroundColor: config.colors.primary + '15',
                    },
                  ]}
                  onPress={() => setSelectedAge(config.id)}
                  activeOpacity={0.7}
                >
                  <View style={[styles.ageEmoji, { backgroundColor: config.colors.primary + '20' }]}>
                    <Text style={styles.ageEmojiText}>{config.emoji}</Text>
                  </View>
                  <View style={styles.ageInfo}>
                    <Text style={styles.ageLabel}>{config.label}</Text>
                    <Text style={styles.ageRange}>{config.ageRange}</Text>
                    <Text style={styles.ageDesc}>{config.description}</Text>
                  </View>
                  {selectedAge === config.id && (
                    <Text style={styles.checkMark}>✓</Text>
                  )}
                </TouchableOpacity>
              ))}

              <TouchableOpacity
                style={[styles.primaryButton, !selectedAge && styles.disabledButton]}
                onPress={() => selectedAge && animateTransition(2)}
                disabled={!selectedAge}
                activeOpacity={0.8}
              >
                <Text style={styles.primaryButtonText}>Continue</Text>
              </TouchableOpacity>
            </ScrollView>
          )}

          {/* Step 2: Name Input */}
          {step === 2 && (
            <View style={styles.nameContainer}>
              <Text style={styles.stepTitle}>{"What's your name? ✨"}</Text>
              <Text style={styles.stepSubtitle}>
                {"We'll personalize your learning experience"}
              </Text>

              <View style={styles.inputWrapper}>
                <TextInput
                  style={styles.nameInput}
                  placeholder="Enter your name"
                  placeholderTextColor="#999"
                  value={name}
                  onChangeText={setName}
                  maxLength={20}
                  autoFocus
                />
              </View>

              <TouchableOpacity
                style={[styles.primaryButton, !name.trim() && styles.disabledButton]}
                onPress={() => name.trim() && animateTransition(3)}
                disabled={!name.trim()}
                activeOpacity={0.8}
              >
                <Text style={styles.primaryButtonText}>Continue</Text>
              </TouchableOpacity>
            </View>
          )}

          {/* Step 3: Avatar Selection */}
          {step === 3 && (
            <View style={styles.avatarContainer}>
              <Text style={styles.stepTitle}>Choose your avatar 🎭</Text>
              <Text style={styles.stepSubtitle}>Pick one that represents you!</Text>

              <View style={styles.avatarGrid}>
                {AVATARS.map((avatar, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.avatarItem,
                      selectedAvatar === avatar && styles.avatarSelected,
                    ]}
                    onPress={() => setSelectedAvatar(avatar)}
                    activeOpacity={0.7}
                  >
                    <Text style={styles.avatarEmoji}>{avatar}</Text>
                  </TouchableOpacity>
                ))}
              </View>

              <TouchableOpacity
                style={[
                  styles.primaryButton,
                  ageConfig && { backgroundColor: ageConfig.colors.primary },
                ]}
                onPress={handleComplete}
                activeOpacity={0.8}
              >
                <Text style={styles.primaryButtonText}>Start Learning! 🎉</Text>
              </TouchableOpacity>
            </View>
          )}
        </Animated.View>

        {/* Step indicators */}
        {step > 0 && (
          <View style={styles.stepIndicators}>
            {[1, 2, 3].map((s) => (
              <View
                key={s}
                style={[
                  styles.stepDot,
                  step >= s && styles.stepDotActive,
                ]}
              />
            ))}
          </View>
        )}
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0E27',
  },
  bgGradient1: {
    position: 'absolute',
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: 'rgba(108, 92, 231, 0.15)',
    top: -50,
    right: -100,
  },
  bgGradient2: {
    position: 'absolute',
    width: 250,
    height: 250,
    borderRadius: 125,
    backgroundColor: 'rgba(0, 206, 201, 0.1)',
    bottom: 100,
    left: -80,
  },
  bgGradient3: {
    position: 'absolute',
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: 'rgba(255, 107, 107, 0.1)',
    bottom: -50,
    right: -30,
  },
  keyboardView: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  welcomeContainer: {
    alignItems: 'center',
  },
  appIcon: {
    fontSize: 80,
    marginBottom: 16,
  },
  appName: {
    fontSize: 42,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: 1,
    marginBottom: 8,
  },
  appTagline: {
    fontSize: 20,
    color: '#A29BFE',
    textAlign: 'center',
    fontWeight: '600',
    lineHeight: 28,
    marginBottom: 16,
  },
  welcomeDesc: {
    fontSize: 15,
    color: '#8B8FA3',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 40,
    paddingHorizontal: 20,
  },
  primaryButton: {
    backgroundColor: '#6C5CE7',
    paddingVertical: 16,
    paddingHorizontal: 40,
    borderRadius: 16,
    alignItems: 'center',
    width: '100%',
    marginTop: 20,
    shadowColor: '#6C5CE7',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 8,
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
  },
  disabledButton: {
    backgroundColor: '#2D3048',
    shadowOpacity: 0,
    elevation: 0,
  },
  stepTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 8,
  },
  stepSubtitle: {
    fontSize: 15,
    color: '#8B8FA3',
    textAlign: 'center',
    marginBottom: 28,
  },
  ageContainer: {
    paddingTop: 60,
    paddingBottom: 40,
  },
  ageCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#151831',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#252849',
  },
  ageEmoji: {
    width: 56,
    height: 56,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ageEmojiText: {
    fontSize: 28,
  },
  ageInfo: {
    flex: 1,
    marginLeft: 14,
  },
  ageLabel: {
    fontSize: 17,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  ageRange: {
    fontSize: 13,
    color: '#A29BFE',
    fontWeight: '600',
    marginTop: 2,
  },
  ageDesc: {
    fontSize: 12,
    color: '#8B8FA3',
    marginTop: 4,
    lineHeight: 16,
  },
  checkMark: {
    fontSize: 22,
    color: '#00CEC9',
    fontWeight: '700',
  },
  nameContainer: {
    alignItems: 'center',
  },
  inputWrapper: {
    width: '100%',
    marginTop: 10,
  },
  nameInput: {
    backgroundColor: '#151831',
    borderRadius: 16,
    padding: 18,
    fontSize: 18,
    color: '#FFFFFF',
    textAlign: 'center',
    borderWidth: 1,
    borderColor: '#252849',
  },
  avatarContainer: {
    alignItems: 'center',
  },
  avatarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 12,
    marginTop: 10,
  },
  avatarItem: {
    width: 72,
    height: 72,
    borderRadius: 20,
    backgroundColor: '#151831',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#252849',
  },
  avatarSelected: {
    borderColor: '#6C5CE7',
    backgroundColor: '#6C5CE730',
  },
  avatarEmoji: {
    fontSize: 36,
  },
  stepIndicators: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingBottom: 40,
    gap: 8,
  },
  stepDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#252849',
  },
  stepDotActive: {
    backgroundColor: '#6C5CE7',
    width: 28,
  },
});

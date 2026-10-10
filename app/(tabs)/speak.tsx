// ==========================================
// LinguaLeap - Speak / Conversation Screen
// AI Conversation Partner & Pronunciation Practice
// ==========================================

import React, { useState, useRef, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Platform,
  KeyboardAvoidingView,
  Dimensions,
} from 'react-native';
import * as Speech from 'expo-speech';
import { useApp } from '../../src/context/AppContext';
import { AGE_GROUP_CONFIGS } from '../../src/constants/theme';
import { getConversationTopicsForAgeGroup } from '../../src/data/lessons';
import { ConversationMessage, ConversationTopic } from '../../src/types';

const { width } = Dimensions.get('window');

// Simple AI response generator based on conversation context
function generateAIResponse(userMessage: string, topic: ConversationTopic, ageGroup: string): string {
  const lowerMsg = userMessage.toLowerCase().trim();

  // Positive feedback responses
  const encouragement = [
    "That's a great response! 👏",
    "Well said! 🌟",
    "Excellent point! 💫",
    "Very good! Keep going! 🎉",
    "Nice work with your English! ✨",
  ];

  // Follow-up questions based on age group
  const followUps: Record<string, string[]> = {
    kids: [
      "Can you tell me more about that?",
      "That sounds fun! What else do you like?",
      "Wow! What color is it?",
      "Do you play with your friends too?",
      "That's wonderful! How does it make you feel?",
    ],
    tweens: [
      "That's interesting! Can you explain why?",
      "How often do you do that?",
      "Who do you usually do that with?",
      "What's the best part about it?",
      "Have you tried anything new lately?",
    ],
    teens: [
      "That's a thoughtful perspective. What led you to think that?",
      "Can you give me an example?",
      "Do you think that will change in the future?",
      "What would you suggest as an alternative?",
      "How does that compare to other options?",
    ],
    adults: [
      "That's an insightful observation. Could you elaborate further?",
      "What are the implications of that in your experience?",
      "How would you approach this from a different angle?",
      "What evidence supports that viewpoint?",
      "How does that relate to the broader context?",
    ],
  };

  // Grammar corrections (simple)
  const corrections: Array<{ pattern: RegExp; correction: string }> = [
    { pattern: /i (am|is|are) go/i, correction: '💡 Tip: Use "I am going" or "I go" instead.' },
    { pattern: /he go\b/i, correction: '💡 Tip: With "he/she", use "goes" → "He goes".' },
    { pattern: /they is/i, correction: '💡 Tip: Use "they are" not "they is".' },
    { pattern: /i has/i, correction: '💡 Tip: Use "I have" not "I has".' },
    { pattern: /more better/i, correction: '💡 Tip: Just say "better" — no need for "more".' },
  ];

  let response = encouragement[Math.floor(Math.random() * encouragement.length)] + ' ';

  // Check for grammar issues
  for (const { pattern, correction } of corrections) {
    if (pattern.test(lowerMsg)) {
      response += '\n\n' + correction + '\n\n';
      break;
    }
  }

  // Add follow-up
  const groupFollowUps = followUps[ageGroup] || followUps.kids;
  response += groupFollowUps[Math.floor(Math.random() * groupFollowUps.length)];

  return response;
}

let speakMsgCounter = 0;
function createSpeakMessage(role: 'user' | 'assistant', content: string): ConversationMessage {
  speakMsgCounter += 1;
  return {
    id: `speak-${speakMsgCounter}`,
    role,
    content,
    timestamp: speakMsgCounter,
  };
}

export default function SpeakScreen() {
  const { profile, addXP } = useApp();
  const [selectedTopic, setSelectedTopic] = useState<ConversationTopic | null>(null);
  const [messages, setMessages] = useState<ConversationMessage[]>([]);
  const [inputText, setInputText] = useState('');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const scrollRef = useRef<ScrollView>(null);

  const speakText = useCallback(async (text: string) => {
    try {
      setIsSpeaking(true);
      await Speech.speak(text, {
        language: 'en-US',
        rate: profile?.ageGroup === 'kids' ? 0.8 : profile?.ageGroup === 'adults' ? 1.0 : 0.9,
        pitch: profile?.ageGroup === 'kids' ? 1.2 : 1.0,
        onDone: () => setIsSpeaking(false),
        onError: () => setIsSpeaking(false),
      });
    } catch {
      setIsSpeaking(false);
    }
  }, [profile]);

  if (!profile) return null;

  const config = AGE_GROUP_CONFIGS[profile.ageGroup];
  const topics = getConversationTopicsForAgeGroup(profile.ageGroup);

  const startConversation = (topic: ConversationTopic) => {
    setSelectedTopic(topic);
    const starterMsg = createSpeakMessage('assistant', topic.starterPrompt);
    setMessages([starterMsg]);
    speakText(topic.starterPrompt);
  };

  const sendMessage = () => {
    if (!inputText.trim() || !selectedTopic) return;

    const userMsg = createSpeakMessage('user', inputText.trim());
    const aiResponse = generateAIResponse(inputText, selectedTopic, profile.ageGroup);
    const aiMsg = createSpeakMessage('assistant', aiResponse);

    setMessages((prev) => [...prev, userMsg, aiMsg]);
    setInputText('');
    addXP(5);
    speakText(aiResponse);

    setTimeout(() => scrollRef.current?.scrollToEnd({ animated: true }), 100);
  };

  const handleSuggestion = (suggestion: string) => {
    setInputText(suggestion);
  };

  const endConversation = () => {
    Speech.stop();
    setSelectedTopic(null);
    setMessages([]);
    setIsSpeaking(false);
    addXP(15);
  };

  // Topic selection view
  if (!selectedTopic) {
    return (
      <View style={styles.container}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <Text style={styles.title}>Conversation 💬</Text>
          <Text style={styles.subtitle}>Practice speaking with an AI partner</Text>

          {/* Pronunciation Quick Practice */}
          <View style={styles.quickSection}>
            <Text style={styles.sectionTitle}>🗣️ Quick Pronunciation</Text>
            <TouchableOpacity
              style={styles.pronunciationCard}
              onPress={() => speakText('Hello! How are you doing today? I hope you are having a wonderful day.')}
              activeOpacity={0.7}
            >
              <View style={styles.pronunciationLeft}>
                <Text style={styles.pronunciationIcon}>🔊</Text>
                <View>
                  <Text style={styles.pronunciationTitle}>Listen & Repeat</Text>
                  <Text style={styles.pronunciationDesc}>
                    Tap to hear, then repeat after me!
                  </Text>
                </View>
              </View>
              {isSpeaking && <Text style={styles.speakingIndicator}>🔊</Text>}
            </TouchableOpacity>
          </View>

          {/* Conversation Topics */}
          <Text style={styles.sectionTitle}>💬 Choose a Topic</Text>
          {topics.map((topic) => (
            <TouchableOpacity
              key={topic.id}
              style={styles.topicCard}
              onPress={() => startConversation(topic)}
              activeOpacity={0.7}
            >
              <View style={styles.topicInfo}>
                <Text style={styles.topicTitle}>{topic.title}</Text>
                <Text style={styles.topicDesc}>{topic.description}</Text>
                <View style={styles.topicMeta}>
                  <Text style={styles.topicDifficulty}>
                    {'⭐'.repeat(topic.difficulty)}
                  </Text>
                </View>
              </View>
              <View style={[styles.topicArrow, { backgroundColor: config.colors.primary }]}>
                <Text style={styles.topicArrowText}>→</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    );
  }

  // Conversation view
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
    >
      {/* Conversation Header */}
      <View style={styles.convHeader}>
        <TouchableOpacity onPress={endConversation} style={styles.backButton}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>
        <View style={styles.convHeaderCenter}>
          <Text style={styles.convTitle}>{selectedTopic.title}</Text>
          {isSpeaking && <Text style={styles.speakingBadge}>🔊 Speaking...</Text>}
        </View>
        <TouchableOpacity onPress={endConversation} style={styles.endButton}>
          <Text style={styles.endText}>End</Text>
        </TouchableOpacity>
      </View>

      {/* Messages */}
      <ScrollView
        ref={scrollRef}
        style={styles.messagesContainer}
        contentContainerStyle={styles.messagesContent}
        showsVerticalScrollIndicator={false}
      >
        {messages.map((msg) => (
          <View
            key={msg.id}
            style={[
              styles.messageBubble,
              msg.role === 'user' ? styles.userBubble : styles.aiBubble,
            ]}
          >
            <Text
              style={[
                styles.messageText,
                msg.role === 'user' ? styles.userText : styles.aiText,
              ]}
            >
              {msg.content}
            </Text>
            {msg.role === 'assistant' && (
              <TouchableOpacity
                style={styles.speakButton}
                onPress={() => speakText(msg.content)}
              >
                <Text style={styles.speakButtonText}>🔊 Listen</Text>
              </TouchableOpacity>
            )}
          </View>
        ))}
      </ScrollView>

      {/* Suggested Responses */}
      {selectedTopic.suggestedResponses.length > 0 && (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.suggestionsScroll}
        >
          {selectedTopic.suggestedResponses.map((suggestion, index) => (
            <TouchableOpacity
              key={index}
              style={styles.suggestionChip}
              onPress={() => handleSuggestion(suggestion)}
            >
              <Text style={styles.suggestionText}>{suggestion}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}

      {/* Input */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={inputText}
          onChangeText={setInputText}
          placeholder="Type your response..."
          placeholderTextColor="#636E72"
          multiline
          maxLength={500}
        />
        <TouchableOpacity
          style={[styles.sendButton, { backgroundColor: config.colors.primary }]}
          onPress={sendMessage}
          disabled={!inputText.trim()}
        >
          <Text style={styles.sendText}>↑</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
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
  quickSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 12,
  },
  pronunciationCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#151831',
    borderRadius: 16,
    padding: 18,
    borderWidth: 1,
    borderColor: '#252849',
  },
  pronunciationLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  pronunciationIcon: {
    fontSize: 28,
  },
  pronunciationTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  pronunciationDesc: {
    fontSize: 12,
    color: '#8B8FA3',
    marginTop: 2,
  },
  speakingIndicator: {
    fontSize: 20,
  },
  topicCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#151831',
    borderRadius: 16,
    padding: 18,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#252849',
  },
  topicInfo: {
    flex: 1,
  },
  topicTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  topicDesc: {
    fontSize: 13,
    color: '#8B8FA3',
    marginTop: 4,
  },
  topicMeta: {
    marginTop: 6,
  },
  topicDifficulty: {
    fontSize: 12,
  },
  topicArrow: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  topicArrowText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  // Conversation view
  convHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
    paddingHorizontal: 20,
    paddingBottom: 16,
    backgroundColor: '#0D1130',
    borderBottomWidth: 1,
    borderBottomColor: '#1A1E3C',
  },
  backButton: {
    paddingVertical: 8,
    paddingRight: 12,
  },
  backText: {
    color: '#A29BFE',
    fontSize: 16,
    fontWeight: '600',
  },
  convHeaderCenter: {
    flex: 1,
    alignItems: 'center',
  },
  convTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  speakingBadge: {
    fontSize: 12,
    color: '#00CEC9',
    marginTop: 2,
  },
  endButton: {
    paddingVertical: 8,
    paddingLeft: 12,
  },
  endText: {
    color: '#FF6B6B',
    fontSize: 16,
    fontWeight: '600',
  },
  messagesContainer: {
    flex: 1,
  },
  messagesContent: {
    padding: 20,
    paddingBottom: 10,
  },
  messageBubble: {
    maxWidth: '80%',
    borderRadius: 18,
    padding: 14,
    marginBottom: 10,
  },
  userBubble: {
    alignSelf: 'flex-end',
    backgroundColor: '#6C5CE7',
    borderBottomRightRadius: 4,
  },
  aiBubble: {
    alignSelf: 'flex-start',
    backgroundColor: '#1A1E3C',
    borderBottomLeftRadius: 4,
  },
  messageText: {
    fontSize: 15,
    lineHeight: 22,
  },
  userText: {
    color: '#FFFFFF',
  },
  aiText: {
    color: '#E0E0E0',
  },
  speakButton: {
    marginTop: 8,
    alignSelf: 'flex-start',
  },
  speakButtonText: {
    color: '#A29BFE',
    fontSize: 13,
    fontWeight: '600',
  },
  suggestionsScroll: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    gap: 8,
  },
  suggestionChip: {
    backgroundColor: '#1A1E3C',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#252849',
  },
  suggestionText: {
    color: '#A29BFE',
    fontSize: 13,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: 16,
    paddingVertical: 12,
    paddingBottom: Platform.OS === 'ios' ? 30 : 12,
    backgroundColor: '#0D1130',
    borderTopWidth: 1,
    borderTopColor: '#1A1E3C',
    gap: 10,
  },
  input: {
    flex: 1,
    backgroundColor: '#151831',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    color: '#FFFFFF',
    fontSize: 15,
    maxHeight: 100,
    borderWidth: 1,
    borderColor: '#252849',
  },
  sendButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '700',
  },
});

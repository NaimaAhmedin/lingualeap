// ==========================================
// LinguaLeap - Dedicated Conversation Modal
// Full-screen AI Conversation Partner Session
// ==========================================

import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Platform,
  KeyboardAvoidingView,
  SafeAreaView,
  Dimensions,
  Animated,
} from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import * as Speech from 'expo-speech';
import * as Haptics from 'expo-haptics';
import { useApp } from '../src/context/AppContext';
import { AGE_GROUP_CONFIGS } from '../src/constants/theme';
import { CONVERSATION_TOPICS, getConversationTopicsForAgeGroup } from '../src/data/lessons';
import { ConversationMessage, ConversationTopic, AgeGroup } from '../src/types';

const { width } = Dimensions.get('window');

function generateAIResponse(userMessage: string, topic: ConversationTopic, ageGroup: string): string {
  const lowerMsg = userMessage.toLowerCase().trim();

  const encouragement = [
    "That's a fantastic thought! 🌟",
    "Great phrasing! Keep going! 👏",
    "Very well expressed! ✨",
    "I love hearing your perspective! 💫",
    "Excellent English practice! 🎉",
  ];

  const followUps: Record<string, string[]> = {
    kids: [
      "Can you tell me more about that?",
      "That sounds so cool! What else do you like?",
      "Wow! What color is it?",
      "Do you share that with your family or friends?",
      "That's awesome! How does that make you feel?",
    ],
    tweens: [
      "That's really interesting! Can you give me more details?",
      "How often do you get to do that?",
      "What inspired you to choose that?",
      "What is your favorite memory related to that?",
      "If you could change one thing about it, what would it be?",
    ],
    teens: [
      "That's a thoughtful point of view. How did you come to that conclusion?",
      "Can you share a specific situation where that happened?",
      "How do you see this evolving over the next few years?",
      "What do most of your friends think about this?",
      "What would be the strongest argument against that view?",
    ],
    adults: [
      "That's a nuanced perspective. How do you balance those priorities?",
      "What practical strategies have proven most effective in your experience?",
      "How does that principle apply to other areas of professional or personal life?",
      "What were the pivotal moments that shaped your mindset on this?",
      "How would you advise someone facing a similar challenge?",
    ],
  };

  const grammarHints: Array<{ pattern: RegExp; tip: string }> = [
    { pattern: /\bi (is|are)\b/i, tip: '💡 Friendly tip: Remember to say "I am" rather than "I is/are".' },
    { pattern: /\bhe (don't|go)\b/i, tip: '💡 Friendly tip: For "he/she", use "doesn\'t" or "goes".' },
    { pattern: /\bmore better\b/i, tip: '💡 Friendly tip: "Better" is already comparative — no need for "more".' },
    { pattern: /\bi didn't (went|knew|saw)\b/i, tip: '💡 Friendly tip: After "didn\'t", use the base verb (go, know, see).' },
  ];

  let reply = encouragement[Math.floor(Math.random() * encouragement.length)] + ' ';

  for (const item of grammarHints) {
    if (item.pattern.test(lowerMsg)) {
      reply += '\n\n' + item.tip + '\n\n';
      break;
    }
  }

  const groupQuestions = followUps[ageGroup] || followUps.kids;
  reply += groupQuestions[Math.floor(Math.random() * groupQuestions.length)];

  return reply;
}

let messageSeq = 0;
function makeMessage(role: 'user' | 'assistant', content: string): ConversationMessage {
  messageSeq += 1;
  return {
    id: `msg-${messageSeq}`,
    role,
    content,
    timestamp: messageSeq,
  };
}

export default function ConversationScreen() {
  const params = useLocalSearchParams<{ topicId?: string }>();
  const { profile, addXP } = useApp();

  const effectiveAgeGroup: AgeGroup = profile?.ageGroup || 'kids';
  const ageConfig = AGE_GROUP_CONFIGS[effectiveAgeGroup];

  const topic = useMemo(() => {
    let selected: ConversationTopic | undefined;
    if (params.topicId) {
      selected = CONVERSATION_TOPICS.find((t) => t.id === params.topicId);
    }
    if (!selected) {
      const topics = getConversationTopicsForAgeGroup(effectiveAgeGroup);
      selected = topics[0] || CONVERSATION_TOPICS[0];
    }
    return selected;
  }, [params.topicId, effectiveAgeGroup]);

  const [messages, setMessages] = useState<ConversationMessage[]>(() => [
    makeMessage('assistant', topic.starterPrompt),
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [speakingId, setSpeakingId] = useState<string | null>(null);
  const scrollViewRef = useRef<ScrollView>(null);

  useEffect(() => {
    return () => {
      try {
        Speech.stop();
      } catch (_e) {}
    };
  }, []);

  const triggerHaptic = (type: 'impact' | 'success') => {
    try {
      if (Platform.OS === 'web') return;
      if (type === 'impact') {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      } else {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      }
    } catch (e) {}
  };

  const handleSpeak = (text: string, msgId: string) => {
    try {
      if (speakingId === msgId) {
        Speech.stop();
        setSpeakingId(null);
        return;
      }
      Speech.stop();
      setSpeakingId(msgId);
      Speech.speak(text, {
        language: 'en-US',
        pitch: 1.0,
        rate: 0.9,
        onDone: () => setSpeakingId(null),
        onStopped: () => setSpeakingId(null),
        onError: () => setSpeakingId(null),
      });
    } catch (e) {
      setSpeakingId(null);
    }
  };

  const handleSend = (textToSend?: string) => {
    const text = (textToSend || inputText).trim();
    if (!text || !topic) return;

    triggerHaptic('impact');

    const userMsg = makeMessage('user', text);

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    // Award small XP for engaging in conversation
    addXP(5);

    setTimeout(() => {
      const aiResponse = generateAIResponse(text, topic, effectiveAgeGroup);
      const assistantMsg = makeMessage('assistant', aiResponse);
      setMessages((prev) => [...prev, assistantMsg]);
      setIsTyping(false);
      triggerHaptic('success');
    }, 1200);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Top Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.closeBtn} onPress={() => router.back()}>
          <Text style={styles.closeBtnText}>✕</Text>
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle} numberOfLines={1}>
            {topic?.title || 'Conversation Partner'}
          </Text>
          <Text style={styles.headerSubtitle}>
            {topic?.description || 'Practice conversational English'}
          </Text>
        </View>
        <View style={styles.aiBadge}>
          <Text style={styles.aiBadgeText}>AI 🤖</Text>
        </View>
      </View>

      <KeyboardAvoidingView
        style={styles.flexOne}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          ref={scrollViewRef}
          style={styles.chatArea}
          contentContainerStyle={styles.chatContent}
          onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
        >
          {messages.map((item) => {
            const isUser = item.role === 'user';
            return (
              <View
                key={item.id}
                style={[
                  styles.msgRow,
                  isUser ? styles.msgRowUser : styles.msgRowAssistant,
                ]}
              >
                {!isUser && (
                  <View style={styles.botAvatar}>
                    <Text style={styles.botAvatarText}>🤖</Text>
                  </View>
                )}
                <View
                  style={[
                    styles.bubble,
                    isUser
                      ? [styles.bubbleUser, { backgroundColor: ageConfig.colors.primary }]
                      : styles.bubbleAssistant,
                  ]}
                >
                  <Text style={isUser ? styles.bubbleTextUser : styles.bubbleTextAssistant}>
                    {item.content}
                  </Text>

                  {!isUser && (
                    <TouchableOpacity
                      style={styles.speakButton}
                      onPress={() => handleSpeak(item.content, item.id)}
                    >
                      <Text style={styles.speakButtonText}>
                        {speakingId === item.id ? '⏹️ Stop' : '🔊 Listen'}
                      </Text>
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            );
          })}

          {isTyping && (
            <View style={[styles.msgRow, styles.msgRowAssistant]}>
              <View style={styles.botAvatar}>
                <Text style={styles.botAvatarText}>🤖</Text>
              </View>
              <View style={[styles.bubble, styles.bubbleAssistant, styles.typingBubble]}>
                <Text style={styles.typingText}>Thinking & typing...</Text>
              </View>
            </View>
          )}
        </ScrollView>

        {/* Suggested Quick Starters */}
        {topic?.suggestedResponses && messages.length <= 3 && (
          <View style={styles.suggestionsContainer}>
            <Text style={styles.suggestionsHeader}>💡 Quick phrases you can tap:</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {topic.suggestedResponses.map((phrase: string, i: number) => (
                <TouchableOpacity
                  key={i}
                  style={styles.suggestionChip}
                  onPress={() => handleSend(phrase)}
                >
                  <Text style={styles.suggestionChipText}>{phrase}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        )}

        {/* Input Bar */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textInput}
            value={inputText}
            onChangeText={setInputText}
            placeholder="Type your response in English..."
            placeholderTextColor="#636E72"
            multiline
            maxLength={300}
          />
          <TouchableOpacity
            style={[
              styles.sendButton,
              {
                backgroundColor: inputText.trim()
                  ? ageConfig.colors.primary
                  : '#1E2452',
              },
            ]}
            onPress={() => handleSend()}
            disabled={!inputText.trim()}
          >
            <Text style={styles.sendButtonText}>➔</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0E27',
  },
  flexOne: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: Platform.OS === 'android' ? 36 : 12,
    paddingBottom: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#1A1E3C',
  },
  closeBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#1A1E3C',
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeBtnText: {
    color: '#8B8FA3',
    fontSize: 16,
    fontWeight: '700',
  },
  headerCenter: {
    flex: 1,
    marginHorizontal: 12,
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  headerSubtitle: {
    color: '#8B8FA3',
    fontSize: 12,
  },
  aiBadge: {
    backgroundColor: 'rgba(108, 92, 231, 0.2)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  aiBadgeText: {
    color: '#A29BFE',
    fontSize: 12,
    fontWeight: '700',
  },
  chatArea: {
    flex: 1,
  },
  chatContent: {
    padding: 16,
    paddingBottom: 20,
  },
  msgRow: {
    flexDirection: 'row',
    marginBottom: 16,
    alignItems: 'flex-end',
  },
  msgRowUser: {
    justifyContent: 'flex-end',
  },
  msgRowAssistant: {
    justifyContent: 'flex-start',
  },
  botAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#1E2452',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
    marginBottom: 4,
  },
  botAvatarText: {
    fontSize: 16,
  },
  bubble: {
    maxWidth: width * 0.76,
    borderRadius: 18,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  bubbleUser: {
    borderBottomRightRadius: 4,
  },
  bubbleAssistant: {
    backgroundColor: '#141838',
    borderWidth: 1,
    borderColor: '#1E2452',
    borderBottomLeftRadius: 4,
  },
  bubbleTextUser: {
    color: '#FFFFFF',
    fontSize: 15,
    lineHeight: 21,
    fontWeight: '500',
  },
  bubbleTextAssistant: {
    color: '#E0E3F0',
    fontSize: 15,
    lineHeight: 22,
  },
  speakButton: {
    marginTop: 8,
    alignSelf: 'flex-start',
    backgroundColor: '#1E2452',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  speakButtonText: {
    color: '#8B8FA3',
    fontSize: 12,
    fontWeight: '600',
  },
  typingBubble: {
    paddingVertical: 10,
  },
  typingText: {
    color: '#8B8FA3',
    fontSize: 13,
    fontStyle: 'italic',
  },
  suggestionsContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: '#1A1E3C',
  },
  suggestionsHeader: {
    color: '#8B8FA3',
    fontSize: 12,
    marginBottom: 8,
  },
  suggestionChip: {
    backgroundColor: '#141838',
    borderWidth: 1,
    borderColor: '#1E2452',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    marginRight: 8,
  },
  suggestionChipText: {
    color: '#A29BFE',
    fontSize: 13,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#1A1E3C',
    backgroundColor: '#0E1232',
  },
  textInput: {
    flex: 1,
    backgroundColor: '#141838',
    borderWidth: 1,
    borderColor: '#1E2452',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    color: '#FFFFFF',
    fontSize: 15,
    maxHeight: 90,
  },
  sendButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
  },
  sendButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

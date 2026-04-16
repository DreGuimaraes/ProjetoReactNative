import React, { useRef } from 'react';
import { StyleSheet, ScrollView, View, Dimensions, Platform, StatusBar } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { theme } from './src/styles/theme';
import {
  Navigation,
  Hero,
  Skills,
  AIWorkflow,
  Projects,
  Contact,
} from './src/components';

const { height } = Dimensions.get('window');

export default function App() {
  const scrollViewRef = useRef<ScrollView>(null);

  const scrollToSection = (sectionId: string) => {
    const sectionPositions: { [key: string]: number } = {
      hero: 0,
      skills: height,
      'ai-workflow': height * 2,
      projects: height * 3,
      contact: height * 4,
    };

    const position = sectionPositions[sectionId] ?? 0;
    scrollViewRef.current?.scrollTo({ y: position, animated: true });
  };

  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor={theme.colors.background} />

        {/* Background Gradient */}
        <LinearGradient
          colors={[theme.colors.background, theme.colors.backgroundSecondary]}
          style={styles.backgroundGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
        />

        {/* Navigation */}
        <Navigation onNavigate={scrollToSection} />

        {/* Main Content */}
        <ScrollView
          ref={scrollViewRef}
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          bounces={true}
          scrollEventThrottle={16}
        >
          <SafeAreaView edges={['top']}>
            {/* Hero Section */}
            <Hero onScrollToSection={scrollToSection} />
          </SafeAreaView>

          {/* Skills Section */}
          <Skills />

          {/* AI Workflow Section */}
          <AIWorkflow />

          {/* Projects Section */}
          <Projects />

          {/* Contact Section */}
          <Contact />
        </ScrollView>
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  backgroundGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
});
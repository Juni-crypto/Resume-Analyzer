import React from 'react';
import { Code2, Brain, Building2, Lightbulb, MessageSquare } from 'lucide-react';
import { motion } from 'framer-motion';
import { useResumeAnalysis } from '../hooks/useResumeAnalysis';
import { useWelcomeToast } from '../hooks/useWelcomeToast';
import { ProfileHeader } from '../components/ProfileHeader';
import { MetricCard } from '../components/MetricCard';
import { SkillRadar } from '../components/SkillRadar';
import { ListCard } from '../components/ListCard';
import { MarketInsights } from '../components/MarketInsights';
import { EnhancementTimeline } from '../components/EnhancementTimeline';
import { RoleComparison } from '../components/RoleComparison';
import { IndustryAlignment } from '../components/IndustryAlignment';
import { ExperienceTimeline } from '../components/ExperienceTimeline';
import { KeywordCloud } from '../components/KeywordCloud';
import { Toast } from '../components/Toast';

const METRIC_ICONS = {
  "Technical Skills": Code2,
  "Industry Knowledge": Building2,
  "Innovation": Lightbulb,
  "Communication": MessageSquare
};

export function AnalysisPage() {
  const { selectedRole, metrics } = useResumeAnalysis();
  const { data: roleData, name: roleName, profile } = selectedRole;
  const { showToast, setShowToast } = useWelcomeToast();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-4 md:p-6">
      <Toast
        message="Please check back after a few minutes for your curated jobs and in-depth analysis!"
        isVisible={showToast}
        onClose={() => setShowToast(false)}
      />

      {/* Rest of the component remains the same */}
    </div>
  );
}
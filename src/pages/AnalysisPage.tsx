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

      <div className="max-w-7xl mx-auto space-y-6 md:space-y-8">
      <ProfileHeader 
        name={profile.name}
        email={profile.email}
        role={roleName}
      />

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
      >
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Resume Analysis Dashboard</h1>
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="flex items-center gap-2 bg-white/80 backdrop-blur-lg rounded-xl px-4 py-2 shadow-lg"
        >
          <span className="text-gray-600">Overall ATS Score:</span>
          <span className="text-2xl font-bold text-blue-600">{roleData.ats_score.overall}%</span>
        </motion.div>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {metrics.map((metric, index) => (
          <motion.div
            key={metric.title}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <MetricCard 
              {...metric} 
              icon={METRIC_ICONS[metric.title as keyof typeof METRIC_ICONS]} 
            />
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-2 space-y-6 md:space-y-8"
        >
          <div className="grid grid-cols-1 gap-4 md:gap-6">
            <ListCard title="Key Strengths" items={roleData.strengths} />
            <ListCard title="Areas for Improvement" items={roleData.weaknesses} />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <ExperienceTimeline timeline={roleData.infographic_data.experience_timeline} />
            <KeywordCloud keywords={roleData.infographic_data.keyword_cloud} />
          </div>
          
          <RoleComparison roles={roleData.infographic_data.role_comparison} />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <ListCard title="Suitable Roles" items={roleData.suitable_roles} />
            <ListCard title="Top Keywords" items={roleData.top_keywords} />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-6 md:space-y-8"
        >
          <SkillRadar skills={roleData.infographic_data.skill_radar} />
          <IndustryAlignment alignment={roleData.infographic_data.industry_alignment} />
          <MarketInsights insights={roleData.market_insights} />
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <EnhancementTimeline items={roleData.enhancement_tips} />
      </motion.div>
    </div>
        </div>
  );
}
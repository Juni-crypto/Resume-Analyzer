import React from 'react';
import { TrendingUp, DollarSign, Award } from 'lucide-react';

interface MarketInsightsProps {
  insights: {
    demand_score: number;
    salary_range: {
      min: number;
      max: number;
      currency: string;
    };
    growth_potential: number;
    required_certifications: string[];
    emerging_skills: string[];
  };
}

export function MarketInsights({ insights }: MarketInsightsProps) {
  const formatCurrency = (amount: number) => 
    new Intl.NumberFormat('en-US', { style: 'currency', currency: insights.salary_range.currency })
      .format(amount);

  return (
    <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-lg border border-white/20">
      <h3 className="text-lg font-semibold mb-6">Market Insights</h3>
      <div className="grid gap-6">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-green-100 rounded-xl">
            <TrendingUp className="w-6 h-6 text-green-600" />
          </div>
          <div>
            <p className="text-sm text-gray-600">Demand Score</p>
            <p className="text-2xl font-bold text-green-600">{insights.demand_score}%</p>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="p-3 bg-yellow-100 rounded-xl">
            <DollarSign className="w-6 h-6 text-yellow-600" />
          </div>
          <div>
            <p className="text-sm text-gray-600">Salary Range</p>
            <p className="text-xl font-bold text-gray-800">
              {formatCurrency(insights.salary_range.min)} - {formatCurrency(insights.salary_range.max)}
            </p>
          </div>
        </div>

        <div>
          <h4 className="text-sm font-medium text-gray-600 mb-2">Required Certifications</h4>
          <div className="flex flex-wrap gap-2">
            {insights.required_certifications.map((cert) => (
              <span key={cert} className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">
                {cert}
              </span>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-sm font-medium text-gray-600 mb-2">Emerging Skills</h4>
          <div className="flex flex-wrap gap-2">
            {insights.emerging_skills.map((skill) => (
              <span key={skill} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
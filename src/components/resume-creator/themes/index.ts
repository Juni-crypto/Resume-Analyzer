import { Professional } from './Professional';
import { Executive } from './Executive';
import { Technical } from './Technical';
import { Compact } from './Compact';
import { Modern } from './Modern';
import { ProfessionalPreview } from './ProfessionalPreview';
import { ExecutivePreview } from './ExecutivePreview';
import { TechnicalPreview } from './TechnicalPreview';
import { CompactPreview } from './CompactPreview';
import { ModernPreview } from './ModernPreview';
import { Minimal } from './Minimal';
import { MinimalPreview } from './MinimalPreview';

export const resumeThemes = {
  modern: {
    name: 'Modern',
    component: Modern,
    description: 'Contemporary and ATS-friendly design',
    preview: '/previews/modern.png',
    previewComponent: ModernPreview,
  },
  professional: {
    name: 'Professional',
    component: Professional,
    description: 'Clean, traditional layout perfect for ATS systems',
    preview: '/previews/professional.png',
    previewComponent: ProfessionalPreview,
  },
  executive: {
    name: 'Executive',
    component: Executive,
    description: 'Elegant design for senior and leadership roles',
    preview: '/previews/executive.png',
    previewComponent: ExecutivePreview,
  },
  technical: {
    name: 'Technical',
    component: Technical,
    description: 'Optimized for tech roles with focus on skills and projects',
    preview: '/previews/technical.png',
    previewComponent: TechnicalPreview,
  },
  compact: {
    name: 'Compact',
    component: Compact,
    description: 'Maximizes space while maintaining perfect readability',
    preview: '/previews/compact.png',
    previewComponent: CompactPreview,
  },
  minimal: {
    name: 'Minimal',
    component: Minimal,
    description: 'Simple and clean design with perfect typography',
    preview: '/previews/minimal.png',
    previewComponent: MinimalPreview,
  }
} as const;

export type ThemeName = keyof typeof resumeThemes;
// Service Type Definition for IGrid Technology

export interface Service {
  id: string;
  title: string;
  slug: string;
  shortDescription: string;
  overview: string;
  serviceScope: string[];
  keyComponents: string[];
  technicalFeatures: string[];
  industriesServed: string[];
  benefits: string[];
  processSteps: ProcessStep[];
  deliverables: string[];
  safetyAndStandards: string;
  maintenanceSupport: string;
  relatedProducts: string[];
  estimatedProjectFactors: string[];
  icon: string;
  imagePlaceholder: string;
  ctaText: string;
}

export interface ProcessStep {
  step: number;
  title: string;
  description: string;
}

export interface ServiceFormData {
  serviceRequired: string;
  customerName: string;
  companyName?: string;
  email: string;
  phone?: string;
  country?: string;
  industryType?: string;
  budgetRange?: string;
  message?: string;
}

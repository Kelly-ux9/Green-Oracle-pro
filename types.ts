
export interface DiagnosisResult {
  diseaseName: string;
  status: 'Healthy' | 'Diseased' | 'Unknown';
  confidence: number;
  description: string;
  treatmentOptions: string[];
  preventionMeasures: string[];
}

export type View = 'home' | 'diagnostic' | 'about';

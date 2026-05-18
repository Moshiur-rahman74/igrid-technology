import { Product } from './product';

export type IndustryType =
  | 'CNC Machining'
  | 'Textile Industry'
  | 'Food Processing'
  | 'Packaging Industry'
  | 'Manufacturing Plant'
  | 'Robotics Automation'
  | 'Assembly Line'
  | 'Welding Automation'
  | 'Pharmaceutical Production';

export type MachineType =
  | 'CNC Machine'
  | 'Conveyor System'
  | 'Packaging Machine'
  | 'Robotic Cell'
  | 'Production Line'
  | 'Pump Control System'
  | 'Motor Control System'
  | 'Material Handling System'
  | 'Custom Automation System';

export type AutomationLevel =
  | 'Basic Automation'
  | 'Semi-Automation'
  | 'Full Automation'
  | 'Smart/SCADA Automation';

export type BudgetRange = 'Economy' | 'Balanced' | 'Premium';

export type ConfiguratorStep =
  | 'industry'
  | 'machine'
  | 'automation'
  | 'budget'
  | 'recommendations'
  | 'plc'
  | 'hmi'
  | 'sensors'
  | 'motors'
  | 'safety'
  | 'panel'
  | 'review';

export interface ConfiguratorState {
  currentStep: ConfiguratorStep;
  industry: IndustryType | null;
  machine: MachineType | null;
  automationLevel: AutomationLevel | null;
  budgetRange: BudgetRange | null;
  selectedProducts: Product[];
}

export interface CompatibilityWarning {
  productId: string;
  message: string;
  severity: 'warning' | 'error';
}

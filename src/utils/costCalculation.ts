import { Product } from '@/types/product';

export interface CostBreakdown {
  hardwareCost: number;
  installationCost: number;
  engineeringCost: number;
  controlPanelCost: number;
  wiringAccessoriesCost: number;
  maintenanceEstimate: number;
  totalProjectCost: number;
}

export interface CostSummary {
  breakdown: CostBreakdown;
  productCount: number;
  averageProductCost: number;
}

/**
 * Calculate the total hardware cost from selected products
 */
export function calculateHardwareCost(products: Product[]): number {
  return products.reduce((total, product) => total + product.price, 0);
}

/**
 * Calculate installation cost (15% of hardware cost)
 */
export function calculateInstallationCost(hardwareCost: number): number {
  return Math.round(hardwareCost * 0.15);
}

/**
 * Calculate engineering/programming cost (20% of hardware cost)
 */
export function calculateEngineeringCost(hardwareCost: number): number {
  return Math.round(hardwareCost * 0.20);
}

/**
 * Calculate control panel cost (10% of hardware cost)
 */
export function calculateControlPanelCost(hardwareCost: number): number {
  return Math.round(hardwareCost * 0.10);
}

/**
 * Calculate wiring/accessories cost (8% of hardware cost)
 */
export function calculateWiringAccessoriesCost(hardwareCost: number): number {
  return Math.round(hardwareCost * 0.08);
}

/**
 * Calculate maintenance estimate (5% of hardware cost)
 */
export function calculateMaintenanceEstimate(hardwareCost: number): number {
  return Math.round(hardwareCost * 0.05);
}

/**
 * Calculate total project cost
 */
export function calculateTotalProjectCost(breakdown: CostBreakdown): number {
  return (
    breakdown.hardwareCost +
    breakdown.installationCost +
    breakdown.engineeringCost +
    breakdown.controlPanelCost +
    breakdown.wiringAccessoriesCost +
    breakdown.maintenanceEstimate
  );
}

/**
 * Calculate complete cost breakdown for selected products
 */
export function calculateCostBreakdown(products: Product[]): CostSummary {
  const hardwareCost = calculateHardwareCost(products);
  const installationCost = calculateInstallationCost(hardwareCost);
  const engineeringCost = calculateEngineeringCost(hardwareCost);
  const controlPanelCost = calculateControlPanelCost(hardwareCost);
  const wiringAccessoriesCost = calculateWiringAccessoriesCost(hardwareCost);
  const maintenanceEstimate = calculateMaintenanceEstimate(hardwareCost);

  const breakdown: CostBreakdown = {
    hardwareCost,
    installationCost,
    engineeringCost,
    controlPanelCost,
    wiringAccessoriesCost,
    maintenanceEstimate,
    totalProjectCost: 0,
  };

  breakdown.totalProjectCost = calculateTotalProjectCost(breakdown);

  const averageProductCost = products.length > 0 
    ? Math.round(hardwareCost / products.length) 
    : 0;

  return {
    breakdown,
    productCount: products.length,
    averageProductCost,
  };
}

/**
 * Format currency for display
 */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Get cost breakdown as percentage of total
 */
export function getCostPercentages(breakdown: CostBreakdown): Record<string, number> {
  const total = breakdown.totalProjectCost;
  if (total === 0) return {};

  return {
    hardware: Math.round((breakdown.hardwareCost / total) * 100),
    installation: Math.round((breakdown.installationCost / total) * 100),
    engineering: Math.round((breakdown.engineeringCost / total) * 100),
    controlPanel: Math.round((breakdown.controlPanelCost / total) * 100),
    wiring: Math.round((breakdown.wiringAccessoriesCost / total) * 100),
    maintenance: Math.round((breakdown.maintenanceEstimate / total) * 100),
  };
}

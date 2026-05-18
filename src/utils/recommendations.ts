import { Product } from '@/types/product';
import { IndustryType, MachineType, AutomationLevel, BudgetRange } from '@/types/configurator';
import { products } from '@/data/products';
import { getProductsByCategory } from '@/lib/data';

export type BuildType = 'economy' | 'balanced' | 'premium';

export interface RecommendedBuild {
  buildType: BuildType;
  name: string;
  description: string;
  bestUseCase: string;
  recommendedProducts: Product[];
  estimatedCost: number;
  reason: string;
}

/**
 * Get products by budget level
 */
function getProductsByBudget(products: Product[], budgetLevel: string): Product[] {
  const budgetMap: Record<string, string[]> = {
    'Economy': ['Budget'],
    'Balanced': ['Budget', 'Mid-Range'],
    'Premium': ['Mid-Range', 'Premium'],
  };
  
  const allowedBudgets = budgetMap[budgetLevel] || ['Budget', 'Mid-Range', 'Premium'];
  return products.filter(p => allowedBudgets.includes(p.budgetLevel));
}

/**
 * Get best product from category based on budget and brand preference
 */
function getBestProduct(
  category: string,
  budgetRange: BudgetRange,
  preferredBrands?: string[]
): Product | null {
  const categoryProducts = getProductsByCategory(category, products);
  const budgetProducts = getProductsByBudget(categoryProducts, budgetRange);

  if (budgetProducts.length === 0) return null;

  // If preferred brands specified, try to get from those brands first
  if (preferredBrands && preferredBrands.length > 0) {
    const preferredProduct = budgetProducts.find(p =>
      preferredBrands.includes(p.brand)
    );
    if (preferredProduct) return preferredProduct;
  }

  // Otherwise, get the first available product (could be enhanced with scoring logic)
  return budgetProducts[0];
}

/**
 * Get multiple products from a category
 */
function getProductsFromCategories(
  categories: string[],
  budgetRange: BudgetRange,
  limit: number = 2
): Product[] {
  const allProducts: Product[] = [];

  for (const category of categories) {
    const categoryProducts = getProductsByCategory(category, products);
    const budgetProducts = getProductsByBudget(categoryProducts, budgetRange);
    allProducts.push(...budgetProducts.slice(0, limit));
  }

  return allProducts.slice(0, limit);
}

/**
 * Generate Economy Build recommendation
 */
function generateEconomyBuild(
  industry: IndustryType,
  machine: MachineType,
  automationLevel: AutomationLevel
): RecommendedBuild {
  const recommendedProducts: Product[] = [];
  
  // Economy brands: Delta, LS Electric, Autonics, Generic
  const economyBrands = ['Delta', 'LS Electric', 'Autonics', 'Generic / Cost Efficient Brand'];
  
  // PLC - Basic, cost-effective
  const plc = getBestProduct('PLC', 'Economy', economyBrands);
  if (plc) recommendedProducts.push(plc);
  
  // HMI - Basic or skip for economy
  if (automationLevel !== 'Basic Automation') {
    const hmi = getBestProduct('HMI', 'Economy', economyBrands);
    if (hmi) recommendedProducts.push(hmi);
  }
  
  // Sensors - Basic proximity sensors
  const sensors = getProductsFromCategories(['Proximity Sensor', 'Limit Switch'], 'Economy', 2);
  recommendedProducts.push(...sensors);
  
  // Motors - Basic stepper motors or VFDs
  if (machine.includes('Motor') || machine.includes('Pump')) {
    const motor = getBestProduct('Stepper Motor', 'Economy', economyBrands);
    if (motor) recommendedProducts.push(motor);
  }
  
  // Safety - Emergency stop (required)
  const emergencyStop = getBestProduct('Emergency Stop', 'Economy');
  if (emergencyStop) recommendedProducts.push(emergencyStop);
  
  // Power supply
  const powerSupply = getBestProduct('Power Supply', 'Economy');
  if (powerSupply) recommendedProducts.push(powerSupply);
  
  const estimatedCost = recommendedProducts.reduce((sum, p) => sum + p.price, 0);
  
  return {
    buildType: 'economy',
    name: 'Economy Build',
    description: 'Cost-effective solution for basic automation needs',
    bestUseCase: 'Small machines, basic automation, budget-conscious projects',
    recommendedProducts,
    estimatedCost,
    reason: `Optimized for ${industry} with ${automationLevel} requirements using cost-efficient components from trusted economy brands.`,
  };
}

/**
 * Generate Balanced Build recommendation
 */
function generateBalancedBuild(
  industry: IndustryType,
  machine: MachineType,
  automationLevel: AutomationLevel
): RecommendedBuild {
  const recommendedProducts: Product[] = [];
  
  // Balanced brands: Siemens, Schneider, Mitsubishi, Omron (Mid-range)
  const balancedBrands = ['Siemens', 'Schneider Electric', 'Mitsubishi', 'Omron', 'Delta'];
  
  // PLC - Reliable mid-range
  const plc = getBestProduct('PLC', 'Balanced', balancedBrands);
  if (plc) recommendedProducts.push(plc);
  
  // HMI - Standard HMI
  const hmi = getBestProduct('HMI', 'Balanced', balancedBrands);
  if (hmi) recommendedProducts.push(hmi);
  
  // Sensors - Mix of sensor types
  const sensors = getProductsFromCategories(['Sensors', 'Proximity Sensor', 'Encoder'], 'Balanced', 3);
  recommendedProducts.push(...sensors);
  
  // Motors/Drives - Servo or VFD based on machine type
  if (machine.includes('Motor') || machine.includes('Pump') || machine.includes('Conveyor')) {
    const vfd = getBestProduct('VFD', 'Balanced', balancedBrands);
    if (vfd) recommendedProducts.push(vfd);
    
    const servo = getBestProduct('Servo Motor', 'Balanced', balancedBrands);
    if (servo) recommendedProducts.push(servo);
  }
  
  // Safety - Emergency stop and safety relay
  const emergencyStop = getBestProduct('Emergency Stop', 'Balanced');
  if (emergencyStop) recommendedProducts.push(emergencyStop);
  
  const safetyRelay = getBestProduct('Safety Devices', 'Balanced');
  if (safetyRelay) recommendedProducts.push(safetyRelay);
  
  // Power supply
  const powerSupply = getBestProduct('Power Supply', 'Balanced');
  if (powerSupply) recommendedProducts.push(powerSupply);
  
  // I/O Modules
  const ioModule = getBestProduct('I/O Modules', 'Balanced', balancedBrands);
  if (ioModule) recommendedProducts.push(ioModule);
  
  const estimatedCost = recommendedProducts.reduce((sum, p) => sum + p.price, 0);
  
  return {
    buildType: 'balanced',
    name: 'Balanced Build',
    description: 'Reliable industrial automation with trusted components',
    bestUseCase: 'Medium-scale industrial automation, production lines, manufacturing',
    recommendedProducts,
    estimatedCost,
    reason: `Balanced configuration for ${industry} ${machine} with ${automationLevel} using reliable mid-range components from industry-leading brands.`,
  };
}

/**
 * Generate Premium Build recommendation
 */
function generatePremiumBuild(
  industry: IndustryType,
  machine: MachineType,
  automationLevel: AutomationLevel
): RecommendedBuild {
  const recommendedProducts: Product[] = [];
  
  // Premium brands: Siemens, Schneider, ABB, Allen-Bradley, Keyence
  const premiumBrands = ['Siemens', 'Schneider Electric', 'ABB', 'Allen-Bradley', 'Keyence', 'Mitsubishi'];
  
  // PLC - Advanced, high-performance
  const plc = getBestProduct('PLC', 'Premium', premiumBrands);
  if (plc) recommendedProducts.push(plc);
  
  // HMI - Advanced HMI with SCADA capability
  const hmi = getBestProduct('HMI', 'Premium', premiumBrands);
  if (hmi) recommendedProducts.push(hmi);
  
  // SCADA System if smart automation
  if (automationLevel === 'Smart/SCADA Automation') {
    const scada = getBestProduct('SCADA / Monitoring System', 'Premium', premiumBrands);
    if (scada) recommendedProducts.push(scada);
  }
  
  // Sensors - Advanced sensors with encoders
  const sensors = getProductsFromCategories(['Sensors', 'Proximity Sensor', 'Encoder', 'Limit Switch'], 'Premium', 4);
  recommendedProducts.push(...sensors);
  
  // Motors/Drives - High-performance servo systems
  const servo = getBestProduct('Servo Motor', 'Premium', premiumBrands);
  if (servo) recommendedProducts.push(servo);
  
  const vfd = getBestProduct('VFD', 'Premium', premiumBrands);
  if (vfd) recommendedProducts.push(vfd);
  
  // Safety - Complete safety system
  const emergencyStop = getBestProduct('Emergency Stop', 'Premium');
  if (emergencyStop) recommendedProducts.push(emergencyStop);
  
  const safetyRelay = getBestProduct('Safety Devices', 'Premium');
  if (safetyRelay) recommendedProducts.push(safetyRelay);
  
  // Power supply - Redundant/High capacity
  const powerSupply = getBestProduct('Power Supply', 'Premium');
  if (powerSupply) recommendedProducts.push(powerSupply);
  
  // I/O Modules - Advanced
  const ioModule = getBestProduct('I/O Modules', 'Premium', premiumBrands);
  if (ioModule) recommendedProducts.push(ioModule);
  
  // Control Panel
  const controlPanel = getBestProduct('Control Panel / Enclosure', 'Premium');
  if (controlPanel) recommendedProducts.push(controlPanel);
  
  // Industrial Communication
  const commModule = getBestProduct('Industrial Communication Modules', 'Premium', premiumBrands);
  if (commModule) recommendedProducts.push(commModule);
  
  const estimatedCost = recommendedProducts.reduce((sum, p) => sum + p.price, 0);
  
  return {
    buildType: 'premium',
    name: 'Premium Build',
    description: 'High-performance factory automation with advanced features',
    bestUseCase: 'High-performance factory automation, SCADA systems, complex manufacturing',
    recommendedProducts,
    estimatedCost,
    reason: `Premium configuration for ${industry} ${machine} with ${automationLevel} using top-tier components for maximum performance and reliability.`,
  };
}

/**
 * Generate all build recommendations based on user inputs
 */
export function generateRecommendations(
  industry: IndustryType | null,
  machine: MachineType | null,
  automationLevel: AutomationLevel | null,
  budgetRange: BudgetRange | null
): RecommendedBuild[] {
  const recommendations: RecommendedBuild[] = [];
  
  // Use default values if not provided
  const defaultIndustry: IndustryType = industry || 'Manufacturing Plant';
  const defaultMachine: MachineType = machine || 'Production Line';
  const defaultAutomation: AutomationLevel = automationLevel || 'Semi-Automation';
  
  // Always generate all three builds
  recommendations.push(generateEconomyBuild(defaultIndustry, defaultMachine, defaultAutomation));
  recommendations.push(generateBalancedBuild(defaultIndustry, defaultMachine, defaultAutomation));
  recommendations.push(generatePremiumBuild(defaultIndustry, defaultMachine, defaultAutomation));
  
  // Highlight the build that matches the user's budget preference
  if (budgetRange) {
    const buildIndex = budgetRange === 'Economy' ? 0 : budgetRange === 'Balanced' ? 1 : 2;
    recommendations[buildIndex].reason += ' (Recommended based on your budget)';
  }
  
  return recommendations;
}

/**
 * Get recommended build based on budget range
 */
export function getRecommendedBuild(
  budgetRange: BudgetRange,
  recommendations: RecommendedBuild[]
): RecommendedBuild {
  const buildIndex = budgetRange === 'Economy' ? 0 : budgetRange === 'Balanced' ? 1 : 2;
  return recommendations[buildIndex];
}

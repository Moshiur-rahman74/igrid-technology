export type ProductCategory =
  | 'PLC'
  | 'HMI'
  | 'Sensors'
  | 'Servo Motor'
  | 'Stepper Motor'
  | 'VFD'
  | 'Industrial Motor'
  | 'I/O Modules'
  | 'Power Supply'
  | 'Relays'
  | 'Contactors'
  | 'Circuit Protection'
  | 'Safety Devices'
  | 'Emergency Stop'
  | 'Limit Switch'
  | 'Proximity Sensor'
  | 'Encoder'
  | 'Pneumatic Components'
  | 'Hydraulic Components'
  | 'Industrial Communication Modules'
  | 'SCADA / Monitoring System'
  | 'Control Panel / Enclosure'
  | 'Cables and Connectors'
  | 'Cooling / Ventilation';

export type ProductBrand =
  | 'Siemens'
  | 'Schneider Electric'
  | 'Mitsubishi'
  | 'Omron'
  | 'Delta'
  | 'ABB'
  | 'Allen-Bradley'
  | 'Panasonic'
  | 'Festo'
  | 'SMC'
  | 'Keyence'
  | 'Autonics'
  | 'LS Electric'
  | 'Weidmuller'
  | 'Phoenix Contact'
  | 'Generic / Cost Efficient Brand';

export type BudgetLevel = 'Budget' | 'Mid-Range' | 'Premium';

export type StockStatus = 'In Stock' | 'Low Stock' | 'Out of Stock' | 'Pre-Order';

export interface Product {
  id: string;
  name: string;
  brand: ProductBrand;
  category: ProductCategory;
  model: string;
  price: number;
  image: string;
  description: string;
  voltage: string;
  powerRating: string;
  communicationProtocol: string;
  inputOutputCount: string;
  compatibilityNotes: string;
  warranty: string;
  recommendedFor: string[];
  budgetLevel: BudgetLevel;
  stockStatus: StockStatus;
}

export interface ProductFilter {
  category?: ProductCategory;
  brand?: ProductBrand;
  budgetLevel?: BudgetLevel;
  minPrice?: number;
  maxPrice?: number;
  inStockOnly?: boolean;
}

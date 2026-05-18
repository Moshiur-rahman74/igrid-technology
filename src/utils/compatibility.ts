import { Product } from '@/types/product';

export type CompatibilityStatus = 'compatible' | 'warning' | 'incompatible';

export interface CompatibilityIssue {
  productId: string;
  productName: string;
  status: CompatibilityStatus;
  issue: string;
  explanation: string;
  suggestedFix: string;
}

export interface CompatibilityResult {
  overallStatus: CompatibilityStatus;
  issues: CompatibilityIssue[];
  isCompatible: boolean;
}

/**
 * Check if two communication protocols are compatible
 */
function areProtocolsCompatible(protocol1: string, protocol2: string): boolean {
  if (protocol1 === protocol2) return true;
  
  // Check for protocol families
  const ethercatFamily = ['EtherCAT', 'EtherNet/IP', 'Ethernet'];
  const modbusFamily = ['Modbus TCP', 'Modbus RTU', 'Modbus'];
  const profinetFamily = ['PROFINET', 'Profibus'];
  
  const p1Lower = protocol1.toLowerCase();
  const p2Lower = protocol2.toLowerCase();
  
  // Check if one contains the other (for partial matches)
  if (p1Lower.includes(p2Lower) || p2Lower.includes(p1Lower)) return true;
  
  // Check protocol families
  if (ethercatFamily.some(p => p1Lower.includes(p.toLowerCase())) && 
      ethercatFamily.some(p => p2Lower.includes(p.toLowerCase()))) return true;
  
  if (modbusFamily.some(p => p1Lower.includes(p.toLowerCase())) && 
      modbusFamily.some(p => p2Lower.includes(p.toLowerCase()))) return true;
  
  if (profinetFamily.some(p => p1Lower.includes(p.toLowerCase())) && 
      profinetFamily.some(p => p2Lower.includes(p.toLowerCase()))) return true;
  
  return false;
}

/**
 * Extract voltage value from voltage string (e.g., "24V DC" -> 24)
 */
function extractVoltage(voltage: string): number {
  const match = voltage.match(/(\d+)/);
  return match ? parseInt(match[1]) : 0;
}

/**
 * Extract power rating from power string (e.g., "1.2kW" -> 1.2)
 */
function extractPowerRating(power: string): number {
  const match = power.match(/([\d.]+)/);
  return match ? parseFloat(match[1]) : 0;
}

/**
 * Check PLC and HMI communication protocol compatibility
 */
function checkPLCHMICompatibility(plc: Product, hmi: Product): CompatibilityIssue | null {
  if (!areProtocolsCompatible(plc.communicationProtocol, hmi.communicationProtocol)) {
    return {
      productId: hmi.id,
      productName: hmi.name,
      status: 'incompatible',
      issue: 'PLC and HMI communication protocol mismatch',
      explanation: `Your selected HMI uses ${hmi.communicationProtocol}, but the selected PLC supports ${plc.communicationProtocol}.`,
      suggestedFix: 'Choose an HMI with matching protocol or add a communication gateway.',
    };
  }
  return null;
}

/**
 * Check PLC and I/O module compatibility
 */
function checkPLCIOModuleCompatibility(plc: Product, ioModule: Product): CompatibilityIssue | null {
  // Check brand compatibility (same brand is preferred)
  if (plc.brand !== ioModule.brand) {
    return {
      productId: ioModule.id,
      productName: ioModule.name,
      status: 'warning',
      issue: 'PLC and I/O module brand mismatch',
      explanation: `Your selected I/O module is from ${ioModule.brand}, but the PLC is from ${plc.brand}.`,
      suggestedFix: 'Consider using I/O modules from the same brand as the PLC for optimal compatibility.',
    };
  }
  return null;
}

/**
 * Check sensor voltage compatibility with power supply
 */
function checkSensorVoltageCompatibility(sensor: Product, powerSupply: Product): CompatibilityIssue | null {
  const sensorVoltage = extractVoltage(sensor.voltage);
  const supplyVoltage = extractVoltage(powerSupply.voltage);
  
  if (sensorVoltage !== 0 && supplyVoltage !== 0 && sensorVoltage > supplyVoltage) {
    return {
      productId: sensor.id,
      productName: sensor.name,
      status: 'incompatible',
      issue: 'Sensor voltage exceeds power supply voltage',
      explanation: `Your selected sensor requires ${sensor.voltage}, but the power supply provides ${powerSupply.voltage}.`,
      suggestedFix: 'Choose a sensor with lower voltage requirement or upgrade the power supply.',
    };
  }
  
  if (sensorVoltage !== 0 && supplyVoltage !== 0 && sensorVoltage < supplyVoltage * 0.5) {
    return {
      productId: sensor.id,
      productName: sensor.name,
      status: 'warning',
      issue: 'Sensor voltage significantly lower than power supply',
      explanation: `Your selected sensor requires ${sensor.voltage}, but the power supply provides ${powerSupply.voltage}.`,
      suggestedFix: 'Consider adding a voltage regulator or choosing a matching power supply.',
    };
  }
  
  return null;
}

/**
 * Check motor and drive compatibility
 */
function checkMotorDriveCompatibility(motor: Product, drive: Product): CompatibilityIssue | null {
  // Check brand compatibility
  if (motor.brand !== drive.brand) {
    return {
      productId: drive.id,
      productName: drive.name,
      status: 'warning',
      issue: 'Motor and drive brand mismatch',
      explanation: `Your selected drive is from ${drive.brand}, but the motor is from ${motor.brand}.`,
      suggestedFix: 'Consider using drives from the same brand as the motor for optimal performance.',
    };
  }
  return null;
}

/**
 * Check VFD and motor power rating compatibility
 */
function checkVFDMotorPowerCompatibility(vfd: Product, motor: Product): CompatibilityIssue | null {
  const vfdPower = extractPowerRating(vfd.powerRating);
  const motorPower = extractPowerRating(motor.powerRating);
  
  if (vfdPower !== 0 && motorPower !== 0 && vfdPower < motorPower * 0.8) {
    return {
      productId: vfd.id,
      productName: vfd.name,
      status: 'incompatible',
      issue: 'VFD power rating insufficient for motor',
      explanation: `Your selected VFD has ${vfd.powerRating}, but the motor requires ${motor.powerRating}.`,
      suggestedFix: 'Choose a VFD with higher power rating or select a smaller motor.',
    };
  }
  
  if (vfdPower !== 0 && motorPower !== 0 && vfdPower > motorPower * 2) {
    return {
      productId: vfd.id,
      productName: vfd.name,
      status: 'warning',
      issue: 'VFD power rating significantly higher than motor',
      explanation: `Your selected VFD has ${vfd.powerRating}, but the motor requires ${motor.powerRating}.`,
      suggestedFix: 'Consider a more appropriately sized VFD to reduce costs.',
    };
  }
  
  return null;
}

/**
 * Check if industrial machine has required safety components
 */
function checkSafetyComponents(products: Product[]): CompatibilityIssue | null {
  const hasEmergencyStop = products.some(p => p.category === 'Emergency Stop');
  const hasSafetyRelay = products.some(p => p.category === 'Safety Devices');
  
  if (!hasEmergencyStop) {
    return {
      productId: '',
      productName: 'Safety Components',
      status: 'incompatible',
      issue: 'Missing emergency stop',
      explanation: 'Industrial machines must include an emergency stop for safety compliance.',
      suggestedFix: 'Add an emergency stop button to your configuration.',
    };
  }
  
  if (!hasSafetyRelay) {
    return {
      productId: '',
      productName: 'Safety Components',
      status: 'incompatible',
      issue: 'Missing safety relay',
      explanation: 'Industrial machines must include a safety relay for proper emergency stop functionality.',
      suggestedFix: 'Add a safety relay to your configuration.',
    };
  }
  
  return null;
}

/**
 * Check power supply capacity
 */
function checkPowerSupplyCapacity(products: Product[]): CompatibilityIssue | null {
  const powerSupplies = products.filter(p => p.category === 'Power Supply');
  const totalPower = products.reduce((sum, p) => {
    const power = extractPowerRating(p.powerRating);
    return sum + power;
  }, 0);
  
  const supplyCapacity = powerSupplies.reduce((sum, ps) => {
    const power = extractPowerRating(ps.powerRating);
    return sum + power;
  }, 0);
  
  if (supplyCapacity > 0 && totalPower > supplyCapacity * 0.8) {
    return {
      productId: '',
      productName: 'Power Supply',
      status: 'warning',
      issue: 'Power supply capacity near limit',
      explanation: `Total power requirement (${totalPower}W) is close to power supply capacity (${supplyCapacity}W).`,
      suggestedFix: 'Consider adding an additional power supply or reducing power consumption.',
    };
  }
  
  if (supplyCapacity > 0 && totalPower > supplyCapacity) {
    return {
      productId: '',
      productName: 'Power Supply',
      status: 'incompatible',
      issue: 'Power supply capacity exceeded',
      explanation: `Total power requirement (${totalPower}W) exceeds power supply capacity (${supplyCapacity}W).`,
      suggestedFix: 'Add an additional power supply or select higher capacity power supplies.',
    };
  }
  
  return null;
}

/**
 * Check control panel space (based on number of components)
 */
function checkControlPanelSpace(products: Product[]): CompatibilityIssue | null {
  const panelComponents = products.filter(p => 
    ['PLC', 'HMI', 'I/O Modules', 'Power Supply', 'Relays', 'Contactors'].includes(p.category)
  );
  
  const enclosures = products.filter(p => p.category === 'Control Panel / Enclosure');
  
  if (panelComponents.length > 15 && enclosures.length === 0) {
    return {
      productId: '',
      productName: 'Control Panel',
      status: 'warning',
      issue: 'Control panel space may be insufficient',
      explanation: `You have ${panelComponents.length} components but no enclosure selected.`,
      suggestedFix: 'Add a control panel enclosure to accommodate all components.',
    };
  }
  
  if (panelComponents.length > 20 && enclosures.length < 2) {
    return {
      productId: '',
      productName: 'Control Panel',
      status: 'warning',
      issue: 'Control panel space may be insufficient',
      explanation: `You have ${panelComponents.length} components which may require multiple enclosures.`,
      suggestedFix: 'Consider adding additional enclosures for better organization.',
    };
  }
  
  return null;
}

/**
 * Main compatibility check function
 */
export function checkCompatibility(products: Product[]): CompatibilityResult {
  const issues: CompatibilityIssue[] = [];
  
  if (products.length === 0) {
    return {
      overallStatus: 'compatible',
      issues: [],
      isCompatible: true,
    };
  }
  
  // Group products by category
  const plcs = products.filter(p => p.category === 'PLC');
  const hmis = products.filter(p => p.category === 'HMI');
  const ioModules = products.filter(p => p.category === 'I/O Modules');
  const sensors = products.filter(p => 
    ['Sensors', 'Proximity Sensor', 'Limit Switch', 'Encoder'].includes(p.category)
  );
  const motors = products.filter(p => ['Servo Motor', 'Stepper Motor'].includes(p.category));
  const drives = products.filter(p => p.category === 'VFD');
  const powerSupplies = products.filter(p => p.category === 'Power Supply');
  
  // Check PLC-HMI compatibility
  if (plcs.length > 0 && hmis.length > 0) {
    for (const plc of plcs) {
      for (const hmi of hmis) {
        const issue = checkPLCHMICompatibility(plc, hmi);
        if (issue) issues.push(issue);
      }
    }
  }
  
  // Check PLC-I/O module compatibility
  if (plcs.length > 0 && ioModules.length > 0) {
    for (const plc of plcs) {
      for (const ioModule of ioModules) {
        const issue = checkPLCIOModuleCompatibility(plc, ioModule);
        if (issue) issues.push(issue);
      }
    }
  }
  
  // Check sensor voltage compatibility
  if (sensors.length > 0 && powerSupplies.length > 0) {
    for (const sensor of sensors) {
      for (const powerSupply of powerSupplies) {
        const issue = checkSensorVoltageCompatibility(sensor, powerSupply);
        if (issue) issues.push(issue);
      }
    }
  }
  
  // Check motor-drive compatibility
  if (motors.length > 0 && drives.length > 0) {
    for (const motor of motors) {
      for (const drive of drives) {
        const issue = checkMotorDriveCompatibility(motor, drive);
        if (issue) issues.push(issue);
      }
    }
  }
  
  // Check VFD-motor power compatibility
  if (drives.length > 0 && motors.length > 0) {
    for (const vfd of drives) {
      for (const motor of motors) {
        const issue = checkVFDMotorPowerCompatibility(vfd, motor);
        if (issue) issues.push(issue);
      }
    }
  }
  
  // Check safety components
  const safetyIssue = checkSafetyComponents(products);
  if (safetyIssue) issues.push(safetyIssue);
  
  // Check power supply capacity
  const powerIssue = checkPowerSupplyCapacity(products);
  if (powerIssue) issues.push(powerIssue);
  
  // Check control panel space
  const spaceIssue = checkControlPanelSpace(products);
  if (spaceIssue) issues.push(spaceIssue);
  
  // Determine overall status
  const hasIncompatible = issues.some(i => i.status === 'incompatible');
  const hasWarning = issues.some(i => i.status === 'warning');
  
  const overallStatus: CompatibilityStatus = hasIncompatible 
    ? 'incompatible' 
    : hasWarning 
    ? 'warning' 
    : 'compatible';
  
  return {
    overallStatus,
    issues,
    isCompatible: overallStatus === 'compatible',
  };
}

/**
 * Get compatibility status color class
 */
export function getCompatibilityStatusColor(status: CompatibilityStatus): string {
  switch (status) {
    case 'compatible':
      return 'text-green-600 bg-green-50 border-green-200';
    case 'warning':
      return 'text-orange-600 bg-orange-50 border-orange-200';
    case 'incompatible':
      return 'text-red-600 bg-red-50 border-red-200';
  }
}

/**
 * Get compatibility status icon
 */
export function getCompatibilityStatusIcon(status: CompatibilityStatus): string {
  switch (status) {
    case 'compatible':
      return '✓';
    case 'warning':
      return '⚠';
    case 'incompatible':
      return '✗';
  }
}

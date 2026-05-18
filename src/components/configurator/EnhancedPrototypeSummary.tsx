import { useState } from 'react';
import { ConfiguratorState } from '@/types/configurator';
import Button from '@/components/ui/Button';
import { calculateCostBreakdown, formatCurrency } from '@/utils/costCalculation';
import { checkCompatibility, getCompatibilityStatusColor, getCompatibilityStatusIcon } from '@/utils/compatibility';

interface EnhancedPrototypeSummaryProps {
  configuratorState: ConfiguratorState;
  onEdit: () => void;
  onRequestQuote: () => void;
  onSave: () => void;
  onDownloadPDF: () => void;
}

export default function EnhancedPrototypeSummary({
  configuratorState,
  onEdit,
  onRequestQuote,
  onSave,
  onDownloadPDF,
}: EnhancedPrototypeSummaryProps) {
  const costSummary = calculateCostBreakdown(configuratorState.selectedProducts);
  const compatibilityResult = checkCompatibility(configuratorState.selectedProducts);
  const [referenceNumber] = useState(() => `IGRID-${Date.now().toString().slice(-8)}`);

  const getBrandBreakdown = () => {
    const brands: Record<string, { count: number; totalCost: number }> = {};
    configuratorState.selectedProducts.forEach(product => {
      if (!brands[product.brand]) {
        brands[product.brand] = { count: 0, totalCost: 0 };
      }
      brands[product.brand].count++;
      brands[product.brand].totalCost += product.price;
    });
    return brands;
  };

  const getCategoryBreakdown = () => {
    const categories: Record<string, { count: number; totalCost: number }> = {};
    configuratorState.selectedProducts.forEach(product => {
      if (!categories[product.category]) {
        categories[product.category] = { count: 0, totalCost: 0 };
      }
      categories[product.category].count++;
      categories[product.category].totalCost += product.price;
    });
    return categories;
  };

  const generateEngineeringRecommendation = () => {
    const recommendations: string[] = [];
    
    if (compatibilityResult.issues.length > 0) {
      recommendations.push('Address compatibility issues before implementation to ensure smooth operation.');
    }
    
    if (configuratorState.automationLevel === 'Smart/SCADA Automation') {
      recommendations.push('Consider implementing redundant power supplies for critical SCADA components.');
      recommendations.push('Plan for network infrastructure to support industrial communication protocols.');
    }
    
    if (configuratorState.selectedProducts.length > 15) {
      recommendations.push('Consider using multiple control panels for better organization and maintenance.');
    }
    
    if (costSummary.breakdown.totalProjectCost > 50000) {
      recommendations.push('For projects of this scale, consider phased implementation to manage risk and budget.');
    }
    
    const hasServo = configuratorState.selectedProducts.some(p => p.category === 'Servo Motor');
    if (hasServo) {
      recommendations.push('Ensure proper mechanical coupling and alignment for servo motor installations.');
    }
    
    if (recommendations.length === 0) {
      recommendations.push('Configuration is well-balanced. Proceed with standard implementation procedures.');
    }
    
    return recommendations;
  };

  const getSuggestedAlternatives = () => {
    const alternatives: string[] = [];
    
    const budgetBrands = configuratorState.selectedProducts.filter(p => p.budgetLevel === 'Budget').length;
    const premiumBrands = configuratorState.selectedProducts.filter(p => p.budgetLevel === 'Premium').length;
    
    if (budgetBrands > configuratorState.selectedProducts.length * 0.7) {
      alternatives.push('Consider upgrading critical components (PLC, HMI) to mid-range brands for improved reliability.');
    }
    
    if (premiumBrands > configuratorState.selectedProducts.length * 0.8 && configuratorState.budgetRange === 'Balanced') {
      alternatives.push('Consider selecting more cost-effective alternatives for non-critical components to better match budget.');
    }
    
    const hasEmergencyStop = configuratorState.selectedProducts.some(p => p.category === 'Emergency Stop');
    const hasSafetyRelay = configuratorState.selectedProducts.some(p => p.category === 'Safety Devices');
    
    if (!hasEmergencyStop || !hasSafetyRelay) {
      alternatives.push('Add emergency stop and safety relay for compliance with industrial safety standards.');
    }
    
    if (alternatives.length === 0) {
      alternatives.push('Current configuration is optimal for the specified requirements.');
    }
    
    return alternatives;
  };

  const brandBreakdown = getBrandBreakdown();
  const categoryBreakdown = getCategoryBreakdown();
  const engineeringRecommendations = generateEngineeringRecommendation();
  const suggestedAlternatives = getSuggestedAlternatives();

  return (
    <div className="bg-white rounded-lg shadow-lg max-w-6xl mx-auto">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#0a192f] to-[#1e3a5f] text-white p-8">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold mb-2">Automation Prototype Summary</h1>
            <p className="text-gray-300">IGrid Technology Configurator</p>
            <p className="text-sm text-gray-400 mt-2">Generated: {new Date().toLocaleDateString()}</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-300 mb-1">Reference ID</p>
            <p className="text-2xl font-bold text-[#00d4ff]">{referenceNumber}</p>
          </div>
        </div>
      </div>

      <div className="p-8 space-y-8">
        {/* Configuration Overview */}
        <div className="bg-gray-50 rounded-lg p-6">
          <h2 className="text-xl font-bold text-[#0a192f] mb-4">Configuration Overview</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white p-4 rounded-md border">
              <p className="text-sm text-gray-500 mb-1">Industry</p>
              <p className="font-semibold text-[#0a192f]">{configuratorState.industry}</p>
            </div>
            <div className="bg-white p-4 rounded-md border">
              <p className="text-sm text-gray-500 mb-1">Machine Type</p>
              <p className="font-semibold text-[#0a192f]">{configuratorState.machine}</p>
            </div>
            <div className="bg-white p-4 rounded-md border">
              <p className="text-sm text-gray-500 mb-1">Automation Level</p>
              <p className="font-semibold text-[#0a192f]">{configuratorState.automationLevel}</p>
            </div>
            <div className="bg-white p-4 rounded-md border">
              <p className="text-sm text-gray-500 mb-1">Budget Range</p>
              <p className="font-semibold text-[#0a192f]">{configuratorState.budgetRange}</p>
            </div>
          </div>
        </div>

        {/* Bill of Materials */}
        <div className="bg-gray-50 rounded-lg p-6">
          <h2 className="text-xl font-bold text-[#0a192f] mb-4">Bill of Materials</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#0a192f] text-white">
                <tr>
                  <th className="text-left px-4 py-3 text-sm font-semibold">#</th>
                  <th className="text-left px-4 py-3 text-sm font-semibold">Product</th>
                  <th className="text-left px-4 py-3 text-sm font-semibold">Brand</th>
                  <th className="text-left px-4 py-3 text-sm font-semibold">Model</th>
                  <th className="text-left px-4 py-3 text-sm font-semibold">Category</th>
                  <th className="text-right px-4 py-3 text-sm font-semibold">Unit Cost</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {configuratorState.selectedProducts.map((product, index) => (
                  <tr key={product.id} className="bg-white hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm text-gray-600">{index + 1}</td>
                    <td className="px-4 py-3 text-sm font-medium text-[#0a192f]">{product.name}</td>
                    <td className="px-4 py-3 text-sm text-gray-700">{product.brand}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{product.model}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{product.category}</td>
                    <td className="px-4 py-3 text-sm text-right font-semibold text-[#0a192f]">
                      {formatCurrency(product.price)}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot className="bg-gray-100">
                <tr>
                  <td colSpan={5} className="px-4 py-3 text-sm font-semibold text-[#0a192f]">
                    Total Hardware Cost
                  </td>
                  <td className="px-4 py-3 text-sm text-right font-bold text-[#00d4ff] text-lg">
                    {formatCurrency(costSummary.breakdown.hardwareCost)}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>

        {/* Brand Breakdown */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-50 rounded-lg p-6">
            <h2 className="text-lg font-bold text-[#0a192f] mb-4">Brand Distribution</h2>
            <div className="space-y-3">
              {Object.entries(brandBreakdown).map(([brand, data]) => (
                <div key={brand} className="flex justify-between items-center bg-white p-3 rounded-md border">
                  <div>
                    <p className="font-medium text-[#0a192f]">{brand}</p>
                    <p className="text-xs text-gray-500">{data.count} components</p>
                  </div>
                  <p className="font-semibold text-[#0a192f]">{formatCurrency(data.totalCost)}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-6">
            <h2 className="text-lg font-bold text-[#0a192f] mb-4">Category Distribution</h2>
            <div className="space-y-3">
              {Object.entries(categoryBreakdown).map(([category, data]) => (
                <div key={category} className="flex justify-between items-center bg-white p-3 rounded-md border">
                  <div>
                    <p className="font-medium text-[#0a192f]">{category}</p>
                    <p className="text-xs text-gray-500">{data.count} components</p>
                  </div>
                  <p className="font-semibold text-[#0a192f]">{formatCurrency(data.totalCost)}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Cost Breakdown */}
        <div className="bg-gray-50 rounded-lg p-6">
          <h2 className="text-xl font-bold text-[#0a192f] mb-4">Cost Breakdown</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <div className="flex justify-between items-center bg-white p-3 rounded-md border">
                <span className="text-gray-700">Hardware Cost</span>
                <span className="font-semibold text-[#0a192f]">{formatCurrency(costSummary.breakdown.hardwareCost)}</span>
              </div>
              <div className="flex justify-between items-center bg-white p-3 rounded-md border">
                <span className="text-gray-700">Installation (15%)</span>
                <span className="font-semibold text-[#0a192f]">{formatCurrency(costSummary.breakdown.installationCost)}</span>
              </div>
              <div className="flex justify-between items-center bg-white p-3 rounded-md border">
                <span className="text-gray-700">Engineering/Programming (20%)</span>
                <span className="font-semibold text-[#0a192f]">{formatCurrency(costSummary.breakdown.engineeringCost)}</span>
              </div>
              <div className="flex justify-between items-center bg-white p-3 rounded-md border">
                <span className="text-gray-700">Control Panel (10%)</span>
                <span className="font-semibold text-[#0a192f]">{formatCurrency(costSummary.breakdown.controlPanelCost)}</span>
              </div>
              <div className="flex justify-between items-center bg-white p-3 rounded-md border">
                <span className="text-gray-700">Wiring/Accessories (8%)</span>
                <span className="font-semibold text-[#0a192f]">{formatCurrency(costSummary.breakdown.wiringAccessoriesCost)}</span>
              </div>
              <div className="flex justify-between items-center bg-white p-3 rounded-md border">
                <span className="text-gray-700">Maintenance Estimate (5%)</span>
                <span className="font-semibold text-[#0a192f]">{formatCurrency(costSummary.breakdown.maintenanceEstimate)}</span>
              </div>
            </div>
            <div className="bg-gradient-to-br from-[#0a192f] to-[#1e3a5f] rounded-lg p-6 text-white flex flex-col justify-center">
              <p className="text-gray-300 mb-2">Final Estimated Project Cost</p>
              <p className="text-4xl font-bold text-[#00d4ff] mb-2">
                {formatCurrency(costSummary.breakdown.totalProjectCost)}
              </p>
              <p className="text-sm text-gray-400">
                Based on {costSummary.productCount} selected products
              </p>
              <p className="text-xs text-gray-500 mt-4">
                * This is an estimate for planning purposes. Final pricing may vary after engineering review.
              </p>
            </div>
          </div>
        </div>

        {/* Compatibility Status */}
        <div className="bg-gray-50 rounded-lg p-6">
          <h2 className="text-xl font-bold text-[#0a192f] mb-4">Compatibility Status</h2>
          <div className={`p-4 rounded-lg border mb-4 ${getCompatibilityStatusColor(compatibilityResult.overallStatus)}`}>
            <div className="flex items-center gap-3">
              <span className="text-3xl">{getCompatibilityStatusIcon(compatibilityResult.overallStatus)}</span>
              <div>
                <p className="text-lg font-bold">
                  {compatibilityResult.overallStatus === 'compatible' ? 'System Compatible' :
                   compatibilityResult.overallStatus === 'warning' ? 'Compatibility Warnings' :
                   'Compatibility Issues Found'}
                </p>
                <p className="text-sm">
                  {compatibilityResult.issues.length} {compatibilityResult.issues.length === 1 ? 'issue' : 'issues'} detected
                </p>
              </div>
            </div>
          </div>

          {compatibilityResult.issues.length > 0 && (
            <div className="space-y-3">
              <h3 className="font-semibold text-[#0a192f]">Issues and Warnings</h3>
              {compatibilityResult.issues.map((issue, index) => (
                <div key={index} className={`p-4 rounded-md border ${
                  issue.status === 'incompatible' ? 'bg-red-50 border-red-200' :
                  issue.status === 'warning' ? 'bg-orange-50 border-orange-200' :
                  'bg-green-50 border-green-200'
                }`}>
                  <div className="flex items-start gap-2 mb-2">
                    <span className="text-lg">
                      {issue.status === 'incompatible' ? '✗' :
                       issue.status === 'warning' ? '⚠' : '✓'}
                    </span>
                    <div className="flex-1">
                      <p className="font-semibold text-[#0a192f]">{issue.issue}</p>
                      {issue.productName && (
                        <p className="text-sm text-gray-500">Affected: {issue.productName}</p>
                      )}
                    </div>
                  </div>
                  <p className="text-sm text-gray-700 mb-2">{issue.explanation}</p>
                  <p className="text-sm text-gray-600 italic bg-white/50 p-2 rounded">
                    <strong>Suggested Fix:</strong> {issue.suggestedFix}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Engineering Recommendations */}
        <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
          <h2 className="text-xl font-bold text-[#0a192f] mb-4">Engineering Recommendations</h2>
          <ul className="space-y-2">
            {engineeringRecommendations.map((rec, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="text-[#00d4ff] mt-1">•</span>
                <span className="text-gray-700">{rec}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Suggested Alternatives */}
        <div className="bg-yellow-50 rounded-lg p-6 border border-yellow-200">
          <h2 className="text-xl font-bold text-[#0a192f] mb-4">Suggested Alternatives</h2>
          <ul className="space-y-2">
            {suggestedAlternatives.map((alt, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="text-yellow-600 mt-1">•</span>
                <span className="text-gray-700">{alt}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4 justify-center pt-4">
          <Button onClick={onDownloadPDF} variant="primary" size="lg">
            Download Summary as PDF
          </Button>
          <Button onClick={onRequestQuote} variant="secondary" size="lg">
            Request Quotation
          </Button>
          <Button onClick={onSave} variant="outline" size="lg">
            Save Prototype
          </Button>
          <Button onClick={onEdit} variant="outline" size="lg">
            Edit Prototype
          </Button>
        </div>

        {/* Disclaimer */}
        <div className="bg-gray-100 rounded-lg p-4 text-center">
          <p className="text-xs text-gray-500">
            This prototype summary is generated for planning and quotation purposes only. 
            Final specifications and pricing may vary after detailed engineering review. 
            IGrid Technology reserves the right to modify recommendations based on technical feasibility.
          </p>
        </div>
      </div>
    </div>
  );
}

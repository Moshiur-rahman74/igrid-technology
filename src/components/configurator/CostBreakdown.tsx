import { Product } from '@/types/product';
import { calculateCostBreakdown, formatCurrency, getCostPercentages } from '@/utils/costCalculation';

interface CostBreakdownProps {
  products: Product[];
}

export default function CostBreakdown({ products }: CostBreakdownProps) {
  const costSummary = calculateCostBreakdown(products);
  const percentages = getCostPercentages(costSummary.breakdown);

  if (products.length === 0) {
    return (
      <div className="bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200 rounded-2xl p-8 shadow-premium">
        <p className="text-gray-500 text-center font-medium">Select products to see cost breakdown</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        <div className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-premium transition-shadow">
          <p className="text-sm text-gray-500 mb-2 font-medium">Hardware Cost</p>
          <p className="text-2xl font-bold text-[#0a192f]">{formatCurrency(costSummary.breakdown.hardwareCost)}</p>
          <p className="text-xs text-gray-400 mt-1">{percentages.hardware}% of total</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-premium transition-shadow">
          <p className="text-sm text-gray-500 mb-2 font-medium">Installation</p>
          <p className="text-2xl font-bold text-[#0a192f]">{formatCurrency(costSummary.breakdown.installationCost)}</p>
          <p className="text-xs text-gray-400 mt-1">{percentages.installation}% of total</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-premium transition-shadow">
          <p className="text-sm text-gray-500 mb-2 font-medium">Engineering</p>
          <p className="text-2xl font-bold text-[#0a192f]">{formatCurrency(costSummary.breakdown.engineeringCost)}</p>
          <p className="text-xs text-gray-400 mt-1">{percentages.engineering}% of total</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-premium transition-shadow">
          <p className="text-sm text-gray-500 mb-2 font-medium">Control Panel</p>
          <p className="text-2xl font-bold text-[#0a192f]">{formatCurrency(costSummary.breakdown.controlPanelCost)}</p>
          <p className="text-xs text-gray-400 mt-1">{percentages.controlPanel}% of total</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-premium transition-shadow">
          <p className="text-sm text-gray-500 mb-2 font-medium">Wiring & Accessories</p>
          <p className="text-2xl font-bold text-[#0a192f]">{formatCurrency(costSummary.breakdown.wiringAccessoriesCost)}</p>
          <p className="text-xs text-gray-400 mt-1">{percentages.wiring}% of total</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-premium transition-shadow">
          <p className="text-sm text-gray-500 mb-2 font-medium">Maintenance (Est.)</p>
          <p className="text-2xl font-bold text-[#0a192f]">{formatCurrency(costSummary.breakdown.maintenanceEstimate)}</p>
          <p className="text-xs text-gray-400 mt-1">{percentages.maintenance}% of total</p>
        </div>
      </div>

      {/* Cost Table */}
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-premium">
        <table className="w-full">
          <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
            <tr>
              <th className="text-left px-6 py-4 text-sm font-bold text-[#0a192f]">Cost Component</th>
              <th className="text-right px-6 py-4 text-sm font-bold text-[#0a192f]">Amount</th>
              <th className="text-right px-6 py-4 text-sm font-bold text-[#0a192f]">Percentage</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            <tr className="hover:bg-gray-50 transition-colors">
              <td className="px-6 py-4 text-sm text-gray-700 font-medium">Hardware Cost</td>
              <td className="px-6 py-4 text-sm text-right font-bold text-[#0a192f]">
                {formatCurrency(costSummary.breakdown.hardwareCost)}
              </td>
              <td className="px-6 py-4 text-sm text-right text-gray-600">{percentages.hardware}%</td>
            </tr>
            <tr className="hover:bg-gray-50 transition-colors">
              <td className="px-6 py-4 text-sm text-gray-700 font-medium">Installation Cost (15%)</td>
              <td className="px-6 py-4 text-sm text-right font-bold text-[#0a192f]">
                {formatCurrency(costSummary.breakdown.installationCost)}
              </td>
              <td className="px-6 py-4 text-sm text-right text-gray-600">{percentages.installation}%</td>
            </tr>
            <tr className="hover:bg-gray-50 transition-colors">
              <td className="px-6 py-4 text-sm text-gray-700 font-medium">Engineering/Programming (20%)</td>
              <td className="px-6 py-4 text-sm text-right font-bold text-[#0a192f]">
                {formatCurrency(costSummary.breakdown.engineeringCost)}
              </td>
              <td className="px-6 py-4 text-sm text-right text-gray-600">{percentages.engineering}%</td>
            </tr>
            <tr className="hover:bg-gray-50 transition-colors">
              <td className="px-6 py-4 text-sm text-gray-700 font-medium">Control Panel (10%)</td>
              <td className="px-6 py-4 text-sm text-right font-bold text-[#0a192f]">
                {formatCurrency(costSummary.breakdown.controlPanelCost)}
              </td>
              <td className="px-6 py-4 text-sm text-right text-gray-600">{percentages.controlPanel}%</td>
            </tr>
            <tr className="hover:bg-gray-50 transition-colors">
              <td className="px-6 py-4 text-sm text-gray-700 font-medium">Wiring/Accessories (8%)</td>
              <td className="px-6 py-4 text-sm text-right font-bold text-[#0a192f]">
                {formatCurrency(costSummary.breakdown.wiringAccessoriesCost)}
              </td>
              <td className="px-6 py-4 text-sm text-right text-gray-600">{percentages.wiring}%</td>
            </tr>
            <tr className="hover:bg-gray-50 transition-colors">
              <td className="px-6 py-4 text-sm text-gray-700 font-medium">Maintenance Estimate (5%)</td>
              <td className="px-6 py-4 text-sm text-right font-bold text-[#0a192f]">
                {formatCurrency(costSummary.breakdown.maintenanceEstimate)}
              </td>
              <td className="px-6 py-4 text-sm text-right text-gray-600">{percentages.maintenance}%</td>
            </tr>
          </tbody>
          <tfoot className="bg-gradient-to-r from-[#0a192f] to-[#1e3a5f]">
            <tr>
              <td className="px-6 py-5 text-sm font-bold text-white">Total Project Cost</td>
              <td className="px-6 py-5 text-sm text-right font-bold text-[#00d4ff] text-2xl">
                {formatCurrency(costSummary.breakdown.totalProjectCost)}
              </td>
              <td className="px-6 py-5 text-sm text-right text-white font-semibold">100%</td>
            </tr>
          </tfoot>
        </table>
      </div>

      {/* Final Estimated Cost Section */}
      <div className="bg-gradient-to-r from-[#0a192f] to-[#1e3a5f] border-2 border-[#1e3a5f] rounded-2xl p-8 shadow-premium-lg">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h3 className="text-2xl font-bold text-white mb-2 tracking-tight">Final Estimated Project Cost</h3>
            <p className="text-sm text-gray-300">Based on {costSummary.productCount} selected products</p>
          </div>
          <div className="text-right">
            <p className="text-4xl font-bold text-[#00d4ff]">
              {formatCurrency(costSummary.breakdown.totalProjectCost)}
            </p>
            <p className="text-xs text-gray-400 mt-1">Avg: {formatCurrency(costSummary.averageProductCost)}/product</p>
          </div>
        </div>
        
        {/* Professional Note */}
        <div className="mt-6 pt-6 border-t border-[#1e3a5f]">
          <p className="text-sm text-gray-400 italic leading-relaxed">
            ⚠️ The generated cost estimation is for planning and quotation purposes only. 
            Final price may vary after engineering review.
          </p>
        </div>
      </div>
    </div>
  );
}

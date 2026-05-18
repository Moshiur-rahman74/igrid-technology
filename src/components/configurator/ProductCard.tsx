import { Product } from '@/types/product';
import Button from '@/components/ui/Button';
import { CompatibilityStatus } from '@/utils/compatibility';

interface ProductCardProps {
  product: Product;
  isSelected: boolean;
  onAdd: () => void;
  onCompare: () => void;
  compatibilityStatus?: CompatibilityStatus;
}

export default function ProductCard({ product, isSelected, onAdd, onCompare, compatibilityStatus }: ProductCardProps) {
  const getStatusColor = () => {
    switch (compatibilityStatus) {
      case 'compatible':
        return 'bg-[#d1fae5] border-[#10b981] text-[#059669]';
      case 'warning':
        return 'bg-[#fef3c7] border-[#f59e0b] text-[#d97706]';
      case 'incompatible':
        return 'bg-[#fee2e2] border-[#ef4444] text-[#dc2626]';
      default:
        return '';
    }
  };

  const getStatusIcon = () => {
    switch (compatibilityStatus) {
      case 'compatible':
        return '✓';
      case 'warning':
        return '⚠';
      case 'incompatible':
        return '✗';
      default:
        return '';
    }
  };

  return (
    <div className={`bg-white border rounded-xl p-5 hover:shadow-premium-lg transition-all duration-300 hover-lift ${isSelected ? 'border-[#00d4ff] ring-2 ring-[#00d4ff] ring-offset-2' : 'border-gray-200'}`}>
      <div className="mb-4">
        {compatibilityStatus && (
          <div className={`mb-3 px-3 py-1.5 rounded-lg text-xs font-semibold border ${getStatusColor()}`}>
            {getStatusIcon()} {compatibilityStatus.charAt(0).toUpperCase() + compatibilityStatus.slice(1)}
          </div>
        )}
        <div className="h-40 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl flex items-center justify-center mb-4 border border-gray-200">
          <span className="text-gray-400 text-sm font-medium">Product Image</span>
        </div>
        <h3 className="font-bold text-[#0a192f] text-xl mb-2 tracking-tight">{product.name}</h3>
        <p className="text-sm text-gray-500 mb-2 font-medium">{product.brand}</p>
        <p className="text-xs text-gray-400 mb-3">Model: {product.model}</p>
      </div>

      <div className="space-y-2 mb-4 text-sm">
        <div className="flex justify-between py-1 border-b border-gray-100">
          <span className="text-gray-500">Price:</span>
          <span className="font-bold text-[#0a192f]">${product.price}</span>
        </div>
        <div className="flex justify-between py-1 border-b border-gray-100">
          <span className="text-gray-500">Voltage:</span>
          <span className="text-gray-700 font-medium">{product.voltage}</span>
        </div>
        <div className="flex justify-between py-1 border-b border-gray-100">
          <span className="text-gray-500">Protocol:</span>
          <span className="text-gray-700 font-medium">{product.communicationProtocol}</span>
        </div>
        <div className="flex justify-between py-1">
          <span className="text-gray-500">Budget:</span>
          <span className={`text-xs px-3 py-1 rounded-lg font-semibold ${
            product.budgetLevel === 'Budget' ? 'bg-[#d1fae5] text-[#059669]' :
            product.budgetLevel === 'Mid-Range' ? 'bg-[#fef3c7] text-[#d97706]' :
            'bg-[#f3e8ff] text-[#9333ea]'
          }`}>
            {product.budgetLevel}
          </span>
        </div>
      </div>

      <div className="mb-4">
        <p className="text-xs text-gray-500 mb-2 font-medium">Recommended for:</p>
        <div className="flex flex-wrap gap-2">
          {product.recommendedFor.slice(0, 2).map((rec, index) => (
            <span key={index} className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-lg font-medium">
              {rec}
            </span>
          ))}
        </div>
      </div>

      <div className="flex gap-3">
        <Button
          onClick={onAdd}
          variant={isSelected ? 'secondary' : 'primary'}
          size="sm"
          className="flex-1"
        >
          {isSelected ? 'Added' : 'Add to Prototype'}
        </Button>
        <Button
          onClick={onCompare}
          variant="outline"
          size="sm"
        >
          Compare
        </Button>
      </div>
    </div>
  );
}

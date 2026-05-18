import { Product } from '@/types/product';
import Button from '@/components/ui/Button';
import { RecommendedBuild, BuildType } from '@/utils/recommendations';
import { formatCurrency } from '@/utils/costCalculation';

interface SmartRecommendationsProps {
  recommendations: RecommendedBuild[];
  onApplyBuild: (build: RecommendedBuild) => void;
  selectedProducts: Product[];
}

export default function SmartRecommendations({
  recommendations,
  onApplyBuild,
  selectedProducts,
}: SmartRecommendationsProps) {
  const getBuildColor = (buildType: BuildType) => {
    switch (buildType) {
      case 'economy':
        return 'border-green-300 bg-green-50 hover:bg-green-100';
      case 'balanced':
        return 'border-blue-300 bg-blue-50 hover:bg-blue-100';
      case 'premium':
        return 'border-purple-300 bg-purple-50 hover:bg-purple-100';
    }
  };

  const getBuildBadgeColor = (buildType: BuildType) => {
    switch (buildType) {
      case 'economy':
        return 'bg-green-600 text-white';
      case 'balanced':
        return 'bg-blue-600 text-white';
      case 'premium':
        return 'bg-purple-600 text-white';
    }
  };

  const getProductCountByCategory = (products: Product[], category: string): number => {
    return products.filter(p => p.category === category).length;
  };

  const isBuildApplied = (build: RecommendedBuild): boolean => {
    if (build.recommendedProducts.length === 0) return false;
    const selectedProductIds = new Set(selectedProducts.map(p => p.id));
    
    // Check if at least 80% of recommended products are selected
    const matchCount = build.recommendedProducts.filter(p => selectedProductIds.has(p.id)).length;
    return matchCount / build.recommendedProducts.length >= 0.8;
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-[#0a192f] mb-2">Smart Recommendation System</h2>
        <p className="text-gray-600">
          AI-powered recommendations based on your industry, machine type, and automation level
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {recommendations.map((build) => (
          <div
            key={build.buildType}
            className={`border-2 rounded-lg p-6 transition-all ${getBuildColor(build.buildType)} ${
              isBuildApplied(build) ? 'ring-2 ring-[#00d4ff]' : ''
            }`}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-[#0a192f]">{build.name}</h3>
              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getBuildBadgeColor(build.buildType)}`}>
                {build.buildType.toUpperCase()}
              </span>
            </div>

            <p className="text-sm text-gray-700 mb-3">{build.description}</p>

            <div className="bg-white/60 rounded-md p-3 mb-4">
              <p className="text-xs text-gray-500 mb-1">Best Use Case</p>
              <p className="text-sm font-medium text-[#0a192f]">{build.bestUseCase}</p>
            </div>

            <div className="space-y-2 mb-4">
              <h4 className="text-sm font-semibold text-[#0a192f] mb-2">Recommended Components</h4>
              
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-gray-600">PLC:</span>
                  <span className="font-medium">{getProductCountByCategory(build.recommendedProducts, 'PLC')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">HMI:</span>
                  <span className="font-medium">{getProductCountByCategory(build.recommendedProducts, 'HMI')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Sensors:</span>
                  <span className="font-medium">
                    {getProductCountByCategory(build.recommendedProducts, 'Sensors') +
                     getProductCountByCategory(build.recommendedProducts, 'Proximity Sensor') +
                     getProductCountByCategory(build.recommendedProducts, 'Encoder')}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Motors/Drives:</span>
                  <span className="font-medium">
                    {getProductCountByCategory(build.recommendedProducts, 'Servo Motor') +
                     getProductCountByCategory(build.recommendedProducts, 'VFD')}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Safety:</span>
                  <span className="font-medium">
                    {getProductCountByCategory(build.recommendedProducts, 'Emergency Stop') +
                     getProductCountByCategory(build.recommendedProducts, 'Safety Devices')}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Power Supply:</span>
                  <span className="font-medium">{getProductCountByCategory(build.recommendedProducts, 'Power Supply')}</span>
                </div>
              </div>

              <div className="mt-3 pt-3 border-t border-gray-300">
                <p className="text-xs text-gray-500 mb-1">Total Products</p>
                <p className="text-sm font-semibold text-[#0a192f]">{build.recommendedProducts.length} components</p>
              </div>
            </div>

            <div className="bg-white/80 rounded-md p-3 mb-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-600">Estimated Cost</span>
                <span className="text-xl font-bold text-[#00d4ff]">{formatCurrency(build.estimatedCost)}</span>
              </div>
              <p className="text-xs text-gray-500 italic">{build.reason}</p>
            </div>

            <Button
              onClick={() => onApplyBuild(build)}
              variant={isBuildApplied(build) ? 'secondary' : 'primary'}
              size="md"
              className="w-full"
              disabled={isBuildApplied(build)}
            >
              {isBuildApplied(build) ? 'Build Applied' : 'Apply This Build'}
            </Button>
          </div>
        ))}
      </div>

      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <p className="text-sm text-yellow-800">
          <strong>Note:</strong> These are AI-generated recommendations based on your configuration. 
          You can still manually select or modify products after applying a build. 
          The recommendations serve as a starting point for your automation project.
        </p>
      </div>
    </div>
  );
}

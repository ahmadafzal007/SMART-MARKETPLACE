import { X, ChevronDown } from "lucide-react"

const ProductFilters = ({
  filters,
  handleFilterChange,
  clearFilter,
  clearAllFilters,
  categories,
  australianStates,
  citiesByState,
  listingTypes,
  rentTypes,
  sortOptions,
  availableSubcategories,
  isFilterApplied,
}) => {
  return (
    <div className="lg:w-64 flex-shrink-0">
      <div className="lg:sticky lg:top-24 bg-white rounded-lg border border-gray-200 shadow-sm p-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-semibold text-gray-800">Filters</h3>
          {isFilterApplied && (
            <button
              onClick={clearAllFilters}
              className="text-xs bg-gray-900 text-white px-3 py-1.5 rounded-md hover:bg-gray-800 transition-colors"
            >
              Clear all
            </button>
          )}
        </div>

        {/* Category filter */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
          <div className="relative">
            <select
              value={filters.category}
              onChange={(e) => handleFilterChange("category", e.target.value)}
              className="block w-full rounded-md border border-gray-300 py-2 pl-3 pr-10 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="">All Categories</option>
              {Object.keys(categories).map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Subcategory filter */}
        {filters.category && availableSubcategories.length > 0 && (
          <div className="mb-4">
            <div className="flex justify-between items-center mb-1">
              <label className="block text-sm font-medium text-gray-700">Subcategory</label>
              {filters.subcategory && (
                <button onClick={() => clearFilter("subcategory")} className="text-xs text-gray-500 hover:text-gray-700">
                  Clear
                </button>
              )}
            </div>
            <div className="relative">
              <select
                value={filters.subcategory}
                onChange={(e) => handleFilterChange("subcategory", e.target.value)}
                className="block w-full rounded-md border border-gray-300 py-2 pl-3 pr-10 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                <option value="">All Subcategories</option>
                {availableSubcategories.map((subcat) => (
                  <option key={subcat} value={subcat}>
                    {subcat}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}

        {/* State filter */}
        <div className="mb-4">
          <div className="flex justify-between items-center mb-1">
            <label className="block text-sm font-medium text-gray-700">State</label>
            {filters.state && (
              <button onClick={() => clearFilter("state")} className="text-xs text-gray-500 hover:text-gray-700">
                Clear
              </button>
            )}
          </div>
          <div className="relative">
            <select
              value={filters.state}
              onChange={(e) => handleFilterChange("state", e.target.value)}
              className="block w-full rounded-md border border-gray-300 py-2 pl-3 pr-10 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="">All States</option>
              {australianStates.map((state) => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* City filter */}
        {filters.state && (
          <div className="mb-4">
            <div className="flex justify-between items-center mb-1">
              <label className="block text-sm font-medium text-gray-700">City</label>
              {filters.city && (
                <button onClick={() => clearFilter("city")} className="text-xs text-gray-500 hover:text-gray-700">
                  Clear
                </button>
              )}
            </div>
            <div className="relative">
              <select
                value={filters.city}
                onChange={(e) => handleFilterChange("city", e.target.value)}
                className="block w-full rounded-md border border-gray-300 py-2 pl-3 pr-10 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                <option value="">All Cities</option>
                {citiesByState[filters.state]?.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}

        {/* Price range */}
        <div className="mb-4">
          <div className="flex justify-between items-center mb-1">
            <label className="block text-sm font-medium text-gray-700">Price Range</label>
            {(filters.minPrice || filters.maxPrice) && (
              <button
                onClick={() => {
                  clearFilter("minPrice")
                  clearFilter("maxPrice")
                }}
                className="text-xs text-gray-500 hover:text-gray-700"
              >
                Clear
              </button>
            )}
          </div>
          <div className="flex items-center gap-2">
            <input
              type="number"
              value={filters.minPrice}
              onChange={(e) => handleFilterChange("minPrice", e.target.value)}
              placeholder="Min"
              className="block w-full rounded-md border border-gray-300 py-2 px-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            <span className="text-gray-500">-</span>
            <input
              type="number"
              value={filters.maxPrice}
              onChange={(e) => handleFilterChange("maxPrice", e.target.value)}
              placeholder="Max"
              className="block w-full rounded-md border border-gray-300 py-2 px-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Listing Type */}
        {filters.category !== "Home Decor" && filters.category !== "Electronics" && (
          <div className="mb-4">
            <div className="flex justify-between items-center mb-1">
              <label className="block text-sm font-medium text-gray-700">Listing Type</label>
              {filters.listingType.length > 0 && (
                <button onClick={() => clearFilter("listingType")} className="text-xs text-gray-500 hover:text-gray-700">
                  Clear
                </button>
              )}
            </div>
            <div className="space-y-2">
              {listingTypes.map((type) => (
                <label key={type} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={filters.listingType.includes(type)}
                    onChange={() => handleFilterChange("listingType", type)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 h-4 w-4"
                  />
                  <span className="ml-2 text-sm text-gray-700">{type}</span>
                </label>
              ))}
            </div>
          </div>
        )}

        {/* Rent Type */}
        {filters.listingType.includes("rent") && filters.category !== "Home Decor" && filters.category !== "Electronics" && (
          <div className="mb-4">
            <div className="flex justify-between items-center mb-1">
              <label className="block text-sm font-medium text-gray-700">Rent Type</label>
              {filters.rentType.length > 0 && (
                <button onClick={() => clearFilter("rentType")} className="text-xs text-gray-500 hover:text-gray-700">
                  Clear
                </button>
              )}
            </div>
            <div className="space-y-2">
              {rentTypes.map((type) => (
                <label key={type} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={filters.rentType.includes(type)}
                    onChange={() => handleFilterChange("rentType", type)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 h-4 w-4"
                  />
                  <span className="ml-2 text-sm text-gray-700">{type}</span>
                </label>
              ))}
            </div>
          </div>
        )}

        {/* Sort options - Desktop only */}
        <div className="hidden lg:block">
          <label className="block text-sm font-medium text-gray-700 mb-1">Sort By</label>
          <div className="relative">
            <select
              value={filters.sort}
              onChange={(e) => handleFilterChange("sort", e.target.value)}
              className="block w-full rounded-md border border-gray-300 py-2 pl-3 pr-10 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductFilters
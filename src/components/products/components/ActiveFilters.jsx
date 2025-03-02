import { X } from "lucide-react"

const ActiveFilters = ({ filters, clearFilter, clearAllFilters, sortOptions, isFilterApplied }) => {
  return (
    isFilterApplied && (
      <div className="mb-4 flex flex-wrap gap-2 items-center">
        <span className="text-sm text-gray-500">Active filters:</span>

        {filters.subcategory && (
          <div className="inline-flex items-center bg-gray-100 rounded-full px-3 py-1 text-sm">
            <span className="mr-1">Subcategory: {filters.subcategory}</span>
            <button onClick={() => clearFilter("subcategory")} className="text-gray-500 hover:text-gray-700">
              <X className="w-3 h-3" />
            </button>
          </div>
        )}

        {filters.state && (
          <div className="inline-flex items-center bg-gray-100 rounded-full px-3 py-1 text-sm">
            <span className="mr-1">State: {filters.state}</span>
            <button onClick={() => clearFilter("state")} className="text-gray-500 hover:text-gray-700">
              <X className="w-3 h-3" />
            </button>
          </div>
        )}

        {filters.city && (
          <div className="inline-flex items-center bg-gray-100 rounded-full px-3 py-1 text-sm">
            <span className="mr-1">City: {filters.city}</span>
            <button onClick={() => clearFilter("city")} className="text-gray-500 hover:text-gray-700">
              <X className="w-3 h-3" />
            </button>
          </div>
        )}

        {filters.location && (
          <div className="inline-flex items-center bg-gray-100 rounded-full px-3 py-1 text-sm">
            <span className="mr-1">Location: {filters.location}</span>
            <button onClick={() => clearFilter("location")} className="text-gray-500 hover:text-gray-700">
              <X className="w-3 h-3" />
            </button>
          </div>
        )}

        {(filters.minPrice || filters.maxPrice) && (
          <div className="inline-flex items-center bg-gray-100 rounded-full px-3 py-1 text-sm">
            <span className="mr-1">
              Price: {filters.minPrice ? `$${filters.minPrice}` : "$0"} -{" "}
              {filters.maxPrice ? `$${filters.maxPrice}` : "Any"}
            </span>
            <button
              onClick={() => {
                clearFilter("minPrice")
                clearFilter("maxPrice")
              }}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        )}

        {filters.listingType.length > 0 && (
          <div className="inline-flex items-center bg-gray-100 rounded-full px-3 py-1 text-sm">
            <span className="mr-1">Listing: {filters.listingType.join(", ")}</span>
            <button onClick={() => clearFilter("listingType")} className="text-gray-500 hover:text-gray-700">
              <X className="w-3 h-3" />
            </button>
          </div>
        )}

        {filters.rentType.length > 0 && (
          <div className="inline-flex items-center bg-gray-100 rounded-full px-3 py-1 text-sm">
            <span className="mr-1">Rent Type: {filters.rentType.join(", ")}</span>
            <button onClick={() => clearFilter("rentType")} className="text-gray-500 hover:text-gray-700">
              <X className="w-3 h-3" />
            </button>
          </div>
        )}

        {filters.sort !== "newest" && (
          <div className="inline-flex items-center bg-gray-100 rounded-full px-3 py-1 text-sm">
            <span className="mr-1">
              Sort: {sortOptions.find((opt) => opt.value === filters.sort)?.label || filters.sort}
            </span>
            <button onClick={() => clearFilter("sort")} className="text-gray-500 hover:text-gray-700">
              <X className="w-3 h-3" />
            </button>
          </div>
        )}

        <button
          onClick={clearAllFilters}
          className="text-sm bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors"
        >
          Clear all filters
        </button>
      </div>
    )
  )
}

export default ActiveFilters 
import { useState, useEffect } from "react"
import {
  Search,
  X,
  Layers,
  ChevronRight,
  Cpu,
  Truck,
  Home,
  Paintbrush,
} from "lucide-react"
import Navbar from "./nav"
import CategoryModal from "./category-model"

const CategoryItem = ({ icon: Icon, title, onClick }) => {
  return (
    <div
      onClick={() => onClick(title)}
      className="group cursor-pointer rounded-sm border border-gray-100 bg-white p-2 transition-all hover:border-gray-300 hover:shadow-md"
    >
      <div className="flex flex-col items-center">
        <div className="mb-2 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
          <Icon className="h-8 w-8 transition-transform duration-500 group-hover:scale-110 group-hover:animate-bounce" />
        </div>
        <h3 className="text-center text-xs font-medium text-gray-800">{title}</h3>
      </div>
    </div>
  )
}

const HeroBackground = () => (
  <div className="absolute inset-0 overflow-hidden">
    <div className="absolute -mr-16 -mt-16 h-32 w-32 rounded-full bg-gray-800 opacity-40"></div>
    <div className="absolute -mb-16 -ml-16 h-24 w-24 rounded-full bg-gray-800 opacity-30"></div>
    <div className="absolute left-1/4 top-1/2 h-12 w-12 rounded-full bg-gray-700 opacity-20"></div>
    <div className="absolute bottom-1/4 right-1/3 h-20 w-20 rounded-full bg-gray-800 opacity-15"></div>
    <div className="absolute right-1/4 top-1/3 h-10 w-10 rounded-full bg-gray-700 opacity-25"></div>
    <div className="absolute left-1/3 top-1/4 h-6 w-6 rounded-full bg-gray-600 opacity-20"></div>
    <div className="absolute bottom-1/3 right-1/5 h-12 w-12 rounded-full bg-gray-700 opacity-15"></div>
  </div>
)

const EmptyState = ({ onReset }) => (
  <div className="border border-gray-200 bg-gray-50 py-8 text-center rounded-sm">
    <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-sm">
      <Layers className="h-6 w-6 text-gray-400" />
    </div>
    <h3 className="mb-1 text-sm font-semibold text-gray-800">No categories found</h3>
    <p className="mb-4 text-xs text-gray-500">
      We couldn't find any categories matching your search criteria.
    </p>
    <button
      onClick={onReset}
      className="inline-flex items-center rounded-lg bg-black px-3 py-1 text-xs font-medium text-white transition-colors hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
    >
      Clear filter
    </button>
  </div>
)

const SectionHeader = ({ title, icon, className = "" }) => (
  <div className={`flex items-center ${className}`}>
    {icon && <span className="mr-2 text-gray-600">{icon}</span>}
    <h2 className="flex items-center text-base font-bold text-gray-900">
      <span className="mr-2 h-4 w-1 rounded-full bg-black"></span>
      {title}
    </h2>
  </div>
)

const CategorySkeleton = () => (
  <div className="animate-pulse rounded-sm border border-gray-100 bg-white p-2">
    <div className="flex flex-col items-center">
      <div className="mb-2 h-16 w-16 rounded-full bg-gray-200"></div>
      <div className="h-3 w-20 rounded bg-gray-200"></div>
    </div>
  </div>
)

const CategoryPage = () => {
  const [activeFilter, setActiveFilter] = useState("All")
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState(null)

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, 800)
    return () => clearTimeout(timer)
  }, [])

  const categories = [
    {
      icon: Cpu,
      title: "Electronics",
      popular: true,
    },
    {
      icon: Truck,
      title: "Vehicles",
      popular: true,
    },
    {
      icon: Home,
      title: "Property",
      popular: true,
    },
    {
      icon: Paintbrush,
      title: "Home Decor",
      popular: false,
    },
  ]

  const filteredCategories = categories
    .filter((cat) => activeFilter === "All" || cat.type === activeFilter)
    .filter(
      (cat) =>
        searchTerm === "" ||
        cat.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (cat.type && cat.type.toLowerCase().includes(searchTerm.toLowerCase()))
    )

  const handleSearch = (e) => {
    setSearchTerm(e.target.value)
  }

  const resetFilters = () => {
    setActiveFilter("All")
    setSearchTerm("")
  }

  const handleCategoryClick = (title) => {
    setSelectedCategory(title)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="container mx-auto max-w-6xl px-4 py-8">
        <div className="relative mb-4 overflow-hidden rounded-sm bg-black p-4 shadow-lg">
          <HeroBackground />

          <div className="relative z-10 text-center">
            <h1 className="mb-2 text-xl font-extrabold tracking-tight text-white sm:text-2xl">
              POST YOUR AD
            </h1>
            <p className="mx-auto max-w-md text-xs font-medium leading-relaxed text-gray-300">
              Get millions of potential buyers for your product with our professional listing service
            </p>
            <button className="mt-4 inline-flex items-center rounded-lg bg-white px-3 py-1 text-xs font-medium text-black transition-all hover:bg-gray-100">
              Get Started <ChevronRight className="ml-1 h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="mb-4 rounded-sm border border-gray-100 bg-white p-2 shadow-sm">
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full rounded-lg border border-gray-200 py-2 pl-10 pr-10 text-xs font-medium placeholder-gray-500 focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
              placeholder="Search categories..."
              value={searchTerm}
              onChange={handleSearch}
            />
            {searchTerm && (
              <button
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
                onClick={() => setSearchTerm("")}
                aria-label="Clear search"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>

        <div className="rounded-sm border border-gray-100 bg-white p-4 shadow-md">
          <div className="mb-4 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <SectionHeader title="Choose a category" />

            <div className="flex items-center space-x-2 text-xs">
              <span className="text-gray-500">Popular categories available</span>
              <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-800">
                {categories.filter((c) => c.popular).length}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
            {loading ? (
              Array(10)
                .fill()
                .map((_, index) => <CategorySkeleton key={index} />)
            ) : filteredCategories.length > 0 ? (
              filteredCategories.map((category, index) => (
                <CategoryItem
                  key={index}
                  icon={category.icon}
                  title={category.title}
                  onClick={handleCategoryClick}
                />
              ))
            ) : (
              <div className="col-span-full">
                <EmptyState onReset={resetFilters} />
              </div>
            )}
          </div>
        </div>

        <div className="mt-4 rounded-sm border border-gray-100 bg-white p-4 shadow-md">
          <SectionHeader title="Featured Categories" className="mb-6" />

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {categories
              .filter((c) => c.popular)
              .slice(0, 3)
              .map((category, index) => (
                <div
                  key={index}
                  className="group flex cursor-pointer items-center gap-2 rounded-lg border border-gray-100 p-2 transition-all hover:border-gray-300 hover:shadow-md"
                  onClick={() => handleCategoryClick(category.title)}
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gray-100">
                    <category.icon className="h-6 w-6 transition-transform duration-500 group-hover:scale-110 group-hover:animate-bounce" />
                  </div>
                  <div>
                    <h3 className="text-xs font-medium text-gray-900">{category.title}</h3>
                    <p className="text-xs text-gray-500">Popular choice</p>
                  </div>
                  <ChevronRight className="ml-auto h-4 w-4 text-gray-400 transition-transform group-hover:translate-x-1" />
                </div>
              ))}
          </div>
        </div>
      </main>

      <CategoryModal isOpen={isModalOpen} onClose={closeModal} categories={categories} />

      <footer className="mt-6 border-t border-gray-200 bg-white py-4 text-center text-xs text-gray-500">
        <div className="container mx-auto">
          <p>© {new Date().getFullYear()} Category Marketplace. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

export default CategoryPage

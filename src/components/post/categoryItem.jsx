const CategoryItem = ({ image, title, onClick }) => {
  return (
    <div
      onClick={() => onClick(title)}
      className="group cursor-pointer rounded-xl border border-gray-100 bg-white p-4 transition-all hover:border-gray-300 hover:shadow-md"
    >
      <div className="flex flex-col items-center">
        <div className="mb-4 h-20 w-20 overflow-hidden rounded-full">
          <img
            src={image || "/placeholder.svg"}
            alt={title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </div>
        <h3 className="text-center text-sm font-medium text-gray-800">{title}</h3>
      </div>
    </div>
  )
}

export default CategoryItem


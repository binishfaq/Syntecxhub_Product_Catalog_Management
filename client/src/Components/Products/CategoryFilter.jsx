export default function CategoryFilter({
  categories,
  selectedCategory,
  setSelectedCategory,
}) {
  return (
    <div className="mb-10">
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-800">
          Browse by Category
        </h2>
      </div>

      <div className="flex flex-wrap gap-3">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`rounded-full px-5 py-3 text-sm font-semibold transition-all duration-300 ${
              selectedCategory === category
                ? "bg-blue-600 text-white shadow-lg"
                : "border border-gray-300 bg-white text-slate-700 hover:border-blue-600 hover:text-blue-600"
            }`}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
}
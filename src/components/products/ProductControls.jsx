function ProductControls({
  search,
  setSearch,
  categories,
  selectedCategories,
  setSelectedCategories,
  sort,
  setSort,
}) {
  return (
    <div>
      <div className="product-controls">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) =>
            setSearch(
              e.target.value
            )
          }
        />

        <select
          value={sort}
          onChange={(e) =>
            setSort(
              e.target.value
            )
          }
        >
          <option value="">
            Sort By
          </option>

          <option value="name">
            Name
          </option>

          <option value="price">
            Price
          </option>

          <option value="rating">
            Rating
          </option>
        </select>
      </div>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "10px",
          marginBottom: "20px",
        }}
      >
        {categories.map(
          (category) => (
            <label
              key={category}
            >
              <input
                type="checkbox"
                checked={selectedCategories.includes(
                  category
                )}
                onChange={() =>
                  setSelectedCategories(
                    category
                  )
                }
              />

              {" "}
              {category}
            </label>
          )
        )}
      </div>
    </div>
  );
}

export default ProductControls;
import {
  useState,
  useMemo,
  useEffect,
  useCallback,
} from "react";
import { useSearchParams } from "react-router-dom";

import DashboardLayout from "../../layouts/DashboardLayout";
import ProductTable from "../../components/products/ProductTable";
import ProductControls from "../../components/products/ProductControls";

import { useProducts } from "../../hooks/useProducts";
import useDebounce from "../../hooks/useDebounce";

import useAuthStore from "../../store/authStore";
import useProductStore from "../../store/productStore";
import { Helmet } from "react-helmet-async";

function Products() {
  const { data, isLoading, isError } =
    useProducts();

  const role = useAuthStore(
    (state) => state.role
  );

  const publishMap = useProductStore(
    (state) => state.publishMap
  );

  const [searchParams, setSearchParams] =
    useSearchParams();

  const [search, setSearch] = useState(
    searchParams.get("search") || ""
  );

  const [selectedCategories, setSelectedCategories] =
  useState(
    searchParams.get("categories")
      ? searchParams
          .get("categories")
          .split(",")
      : []
  );

  const [sort, setSort] = useState(
    searchParams.get("sort") || ""
  );

  const [currentPage, setCurrentPage] =
    useState(1);

  const productsPerPage = 10;

  const debouncedSearch =
    useDebounce(search, 500);

  const handleSearchChange =
    useCallback((value) => {
      setSearch(value);
    }, []);

  const handleCategoryChange =
  useCallback((category) => {
    setSelectedCategories(
      (prev) =>
        prev.includes(category)
          ? prev.filter(
              (c) => c !== category
            )
          : [...prev, category]
    );
  }, []);

  const handleSortChange =
    useCallback((value) => {
      setSort(value);
    }, []);

  useEffect(() => {
    const params = {};

    if (search) params.search = search;
    if (selectedCategories.length) {
  params.categories =
    selectedCategories.join(",");
}
    if (sort) params.sort = sort;

    setSearchParams(params);
  }, [
    search,
    selectedCategories,
    sort,
    setSearchParams,
  ]);

  useEffect(() => {
    setCurrentPage(1);
  }, [
    debouncedSearch,
    selectedCategories,
    sort,
  ]);

  const products = (data || []).map(
    (product) => ({
      ...product,
      published:
        publishMap[product.id] ??
        product.published,
    })
  );

  const categories = [
    ...new Set(
      products.map(
        (product) => product.category
      )
    ),
  ];

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (role === "user") {
      result = result.filter(
        (product) =>
          product.published
      );
    }

    if (debouncedSearch) {
      result = result.filter((product) =>
        product.title
          .toLowerCase()
          .includes(
            debouncedSearch.toLowerCase()
          )
      );
    }

    if (selectedCategories.length) {
  result = result.filter(
    (product) =>
      selectedCategories.includes(
        product.category
      )
  );
}

    if (sort === "name") {
      result.sort((a, b) =>
        a.title.localeCompare(b.title)
      );
    }

    if (sort === "price") {
      result.sort(
        (a, b) => a.price - b.price
      );
    }

    if (sort === "rating") {
      result.sort(
        (a, b) =>
          b.rating - a.rating
      );
    }

    return result;
  }, [
    products,
    role,
    debouncedSearch,
    selectedCategories,
    sort,
  ]);

  const totalPages = Math.ceil(
    filteredProducts.length /
      productsPerPage
  );

  const startIndex =
    (currentPage - 1) *
    productsPerPage;

  const paginatedProducts =
    filteredProducts.slice(
      startIndex,
      startIndex +
        productsPerPage
    );

  if (isLoading) {
    return (
      <DashboardLayout>
        <h2>Loading Products...</h2>
      </DashboardLayout>
    );
  }

  if (isError) {
    return (
      <DashboardLayout>
        <h2>Failed to load products</h2>
      </DashboardLayout>
    );
  }

  return (
    
    <DashboardLayout>
        <Helmet>
  <title>Products | Alpha Dashboard</title>
</Helmet>
      <h1>Products</h1>

      <ProductControls
        search={search}
        setSearch={
          handleSearchChange
        }
        categories={categories}
        selectedCategories={
  selectedCategories
}
setSelectedCategories={
  handleCategoryChange
}
        sort={sort}
        setSort={handleSortChange}
      />

      <ProductTable
        products={paginatedProducts}
      />

      <div className="pagination">
        <button
          disabled={currentPage === 1}
          onClick={() =>
            setCurrentPage(
              currentPage - 1
            )
          }
        >
          Previous
        </button>

        <span>
          Page {currentPage} of{" "}
          {totalPages || 1}
        </span>

        <button
          disabled={
            currentPage === totalPages ||
            totalPages === 0
          }
          onClick={() =>
            setCurrentPage(
              currentPage + 1
            )
          }
        >
          Next
        </button>
      </div>
    </DashboardLayout>
  );
}

export default Products;
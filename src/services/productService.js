export async function getProducts() {
  const response = await fetch(
    "https://dummyjson.com/products?limit=100"
  );

  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  const data = await response.json();

  return data.products.map((product) => ({
    ...product,
    published: product.id % 2 === 0,
  }));
}

export async function getProductById(id) {
  const response = await fetch(
    `https://dummyjson.com/products/${id}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch product");
  }

  return response.json();
}
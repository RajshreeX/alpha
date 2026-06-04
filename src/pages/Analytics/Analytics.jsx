import DashboardLayout from "../../layouts/DashboardLayout";
import { useProducts } from "../../hooks/useProducts";

function Analytics() {
  const { data, isLoading, isError } =
    useProducts();

  if (isLoading) {
    return (
      <DashboardLayout>
        <h2>Loading Analytics...</h2>
      </DashboardLayout>
    );
  }

  if (isError) {
    return (
      <DashboardLayout>
        <h2>Failed to load analytics</h2>
      </DashboardLayout>
    );
  }

  const totalProducts = data.length;

  const averageRating =
    (
      data.reduce(
        (sum, product) =>
          sum + product.rating,
        0
      ) / totalProducts
    ).toFixed(2);

  const totalInventoryValue =
    data.reduce(
      (sum, product) =>
        sum +
        product.price * product.stock,
      0
    );

  const categoryDistribution =
    data.reduce(
      (acc, product) => {
        acc[product.category] =
          (acc[product.category] || 0) +
          1;

        return acc;
      },
      {}
    );

  const topCategory =
    Object.entries(
      categoryDistribution
    ).sort(
      (a, b) => b[1] - a[1]
    )[0];

  return (
    <DashboardLayout>
        
      <h1>Analytics Dashboard</h1>

      <div className="analytics-grid">
        <div className="analytics-card">
          <h3>Total Products</h3>
          <h2>{totalProducts}</h2>
        </div>

        <div className="analytics-card">
          <h3>Average Rating</h3>
          <h2>{averageRating}</h2>
        </div>

        <div className="analytics-card">
          <h3>Inventory Value</h3>
          <h2>
            $
            {totalInventoryValue.toLocaleString()}
          </h2>
        </div>

        <div className="analytics-card">
          <h3>Top Category</h3>
          <h2>
            {topCategory?.[0]}
          </h2>
        </div>
      </div>

      <div className="analytics-card">
        <h3>
          Category Distribution
        </h3>

        <table
          className="product-table"
          style={{
            marginTop: "15px",
          }}
        >
          <thead>
            <tr>
              <th>Category</th>
              <th>Products</th>
            </tr>
          </thead>

          <tbody>
            {Object.entries(
              categoryDistribution
            ).map(
              ([category, count]) => (
                <tr key={category}>
                  <td>{category}</td>
                  <td>{count}</td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  );
}

export default Analytics;
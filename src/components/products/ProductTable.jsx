import { useNavigate } from "react-router-dom";

import useAuthStore from "../../store/authStore";
import useProductStore from "../../store/productStore";

import {memo} from "react";

function ProductTable({ products }) {
  const navigate = useNavigate();

  const role = useAuthStore(
    (state) => state.role
  );

  const togglePublished =
    useProductStore(
      (state) =>
        state.togglePublished
    );

  return (
    <table className="product-table">
      <thead>
        <tr>
          <th>Image</th>
          <th>Name</th>
          <th>Category</th>
          <th>Price</th>
          <th>Stock</th>
          <th>Rating</th>
          <th>Published</th>

          {role === "admin" && (
            <th>Action</th>
          )}
        </tr>
      </thead>

      <tbody>
        {products.map((product) => (
          <tr
            key={product.id}
            onClick={() =>
              navigate(
                `/products/${product.id}`
              )
            }
            style={{
              cursor: "pointer",
            }}
          >
            <td>
              <img
                src={product.thumbnail}
                alt={product.title}
                width="60"
              />
            </td>

            <td>{product.title}</td>

            <td>{product.category}</td>

            <td>${product.price}</td>

            <td>{product.stock}</td>

            <td>{product.rating}</td>

            <td>
              {product.published
                ? "Published"
                : "Hidden"}
            </td>

            {role === "admin" && (
              <td>
                <button
                  onClick={(e) => {
                    e.stopPropagation();

                    togglePublished(
                      product.id
                    );
                  }}
                >
                  {product.published
                    ? "Hide"
                    : "Publish"}
                </button>
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default memo(ProductTable);
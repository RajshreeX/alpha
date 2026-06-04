import { useState } from "react";
import { useParams } from "react-router-dom";

import DashboardLayout from "../../layouts/DashboardLayout";
import { useProduct } from "../../hooks/useProduct";

function ProductDetail() {
  const { id } = useParams();

  const [currentImage, setCurrentImage] =
    useState(0);

  const { data, isLoading, isError } =
    useProduct(id);

  if (isLoading) {
    return (
      <DashboardLayout>
        <h2>Loading Product...</h2>
      </DashboardLayout>
    );
  }

  if (isError) {
    return (
      <DashboardLayout>
        <h2>Failed to load product</h2>
      </DashboardLayout>
    );
  }

  const nextImage = () => {
    setCurrentImage(
      (prev) =>
        (prev + 1) %
        data.images.length
    );
  };

  const previousImage = () => {
    setCurrentImage(
      (prev) =>
        prev === 0
          ? data.images.length - 1
          : prev - 1
    );
  };

  return (
    <DashboardLayout>
      <h1>{data.title}</h1>

      <div className="carousel">
  <button onClick={previousImage}>
    ←
  </button>

  <div className="carousel-content">
    <img
      src={
        data.images[currentImage]
      }
      alt={data.title}
      className="carousel-image"
    />

    <div className="carousel-indicators">
      {data.images.map(
        (_, index) => (
          <span
            key={index}
            className={
              index === currentImage
                ? "indicator active"
                : "indicator"
            }
            onClick={() =>
              setCurrentImage(index)
            }
          />
        )
      )}
    </div>
     <p>
  {currentImage + 1} /{" "}
  {data.images.length}
</p>
  </div>

  <button onClick={nextImage}>
    →
  </button>
</div>
     

      <br />

      <p>
        <strong>Description:</strong>{" "}
        {data.description}
      </p>

      <p>
        <strong>Category:</strong>{" "}
        {data.category}
      </p>

      <p>
        <strong>Price:</strong> $
        {data.price}
      </p>

      <p>
        <strong>Rating:</strong>{" "}
        {data.rating}
      </p>

      <p>
        <strong>Stock:</strong>{" "}
        {data.stock}
      </p>
    </DashboardLayout>
  );
}

export default ProductDetail;
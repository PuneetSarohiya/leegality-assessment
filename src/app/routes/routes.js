import React, { lazy } from "react";
import { Routes, Route } from "react-router-dom";
import NotFoundPage from "../../components/NotFoundPage/NotFoundPage";

const ProductListing = lazy(() =>
  import("../../pages/ProductListing/ProductListing")
);

const ProductDetail = lazy(() =>
  import("../../pages/ProductDetail/ProductDetail")
);

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<ProductListing />} />

      <Route
        path="/product/:id"
        element={<ProductDetail />}
      />

      <Route
        path="*"
        element={<NotFoundPage />}
      />
    </Routes>
  );
};

export default AppRoutes;
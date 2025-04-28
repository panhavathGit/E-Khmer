import React from "react";
import { usePage } from "@inertiajs/react";
import Layout from '../../Layouts/Layout'

const Index = () => {
  const { products } = usePage().props;

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-blue-600 mb-8">All Products</h1>

      {products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="border rounded-lg shadow p-4 hover:shadow-lg transition"
            >
              <h2 className="text-xl font-semibold">{product.name}</h2>
              <p className="text-gray-600 mt-2">${product.price.toFixed(2)}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No products available.</p>
      )}
    </div>
  );
}
Index.layout = page => <Layout children={page} title="Welcome" />
export default Index
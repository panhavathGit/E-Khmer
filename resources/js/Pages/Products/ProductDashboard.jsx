import React from "react";
import { usePage, router } from "@inertiajs/react";
import Layout from "../../Layouts/Layout";
import ModalDelete from "../../Components/DeleteProductModal";
import AddProductModal from "../../Components/AddProductModal"; 
import EditProductModal from "../../Components/EditProductModal"; 
const Dashboard = () => {
    const { products } = usePage().props;

    const handleEdit = (product) => {
        setEditingProduct(product); // If you implement edit later
    };

    return (
        <div className="p-8">
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-3xl font-bold text-blue-600">
                    All Products
                </h1>
                <AddProductModal id="add_product" />
            </div>

            {products.length > 0 ? (
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border border-gray-200">
                        <thead>
                            <tr>
                                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 border-b">
                                    ID
                                </th>
                                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 border-b">
                                    Name
                                </th>
                                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 border-b">
                                    Price
                                </th>
                                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 border-b">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product) => (
                                <tr
                                    key={product.id}
                                    className="hover:bg-gray-100"
                                >
                                    <td className="px-6 py-4 text-sm text-gray-900 border-b">
                                        {product.id}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-900 border-b">
                                        {product.name}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-900 border-b">
                                        ${product.price.toFixed(2)}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-900 border-b space-x-2">
                                        <div className="flex gap-3">
                                            {/* Correct the id and props */}
                                            <EditProductModal
                                                id={`edit_modal_${product.id}`}
                                                product = {product}
                                            />
                                            <ModalDelete
                                                id={`delete_modal_${product.id}`}
                                                product={product}
                                            />
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <p className="text-gray-500">No products available.</p>
            )}
        </div>
    );
};

Dashboard.layout = (page) => <Layout children={page} title="All Products" />;
export default Dashboard;

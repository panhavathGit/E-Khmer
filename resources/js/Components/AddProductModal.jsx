import { useForm } from "@inertiajs/react";

export default function AddProductModal({ id }) {
    const { data, setData, post, processing, reset, errors } = useForm({
        name: "",
        price: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        
        post("/products/create", {
            onSuccess: () => {
                reset();
                document.getElementById(id).close();
            },
        });
    };

    return (
        <>
            <button
                onClick={() => document.getElementById(id).showModal()}
                className="inline-flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 focus:ring-4 focus:ring-green-400 focus:outline-none rounded-md font-semibold text-sm text-white uppercase tracking-wider transition"
            >
            Add Product
            </button>

            <dialog id={id} className="modal">
                <div className="modal-box bg-white p-6 rounded-lg shadow-xl max-w-md w-full">
                    {/* Modal Title */}
                    <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                        Add New Product
                    </h2>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Product Name */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">
                                Product Name
                            </label>
                            <input
                                type="text"
                                value={data.name}
                                onChange={(e) => setData("name", e.target.value)}
                                className="w-full rounded-md border border-gray-300 p-2 focus:ring-2 focus:ring-green-400 focus:outline-none"
                                placeholder="Enter product name"
                                required
                            />
                            {errors.name && (
                                <p className="text-xs text-red-500 mt-1">{errors.name}</p>
                            )}
                        </div>

                        {/* Price */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">
                                Price ($)
                            </label>
                            <input
                                type="number"
                                step="0.01"
                                value={data.price}
                                onChange={(e) => setData("price", e.target.value)}
                                className="w-full rounded-md border border-gray-300 p-2 focus:ring-2 focus:ring-green-400 focus:outline-none"
                                placeholder="Enter product price"
                                required
                            />
                            {errors.price && (
                                <p className="text-xs text-red-500 mt-1">{errors.price}</p>
                            )}
                        </div>

                        {/* Buttons */}
                        <div className="flex justify-end gap-3 pt-4">
                            <button
                                type="button"
                                className="px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold"
                                onClick={() => {
                                    reset();
                                    document.getElementById(id).close();
                                }}
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="px-4 py-2 rounded-md bg-green-600 hover:bg-green-700 text-white font-semibold"
                                disabled={processing}
                            >
                                {processing ? "Saving..." : "Save"}
                            </button>
                        </div>
                    </form>
                </div>
            </dialog>
        </>
    );
}

import { useForm } from "@inertiajs/react";
import { Inertia } from "@inertiajs/inertia";

export default function ModalDeleteProduct({ id, product }) {
    const { processing, reset } = useForm();

    const handleSubmit = (e) => {
        e.preventDefault();
        Inertia.post(`/products/delete/${product.id}`, {
            _method: "delete",
        });
    };

    const closeModal = () => {
        document.getElementById(id).close();
        reset();
    };

    return (
        <>
            {/* Open Button */}
            <button
                onClick={() => document.getElementById(id).showModal()}
                className="inline-flex items-center px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded text-sm font-medium transition"
            >
                Delete
            </button>

            {/* Modal */}
            <dialog id={id} className="modal">
                <div className="modal-box bg-white rounded-lg p-6 shadow-xl">
                    {/* Modal Title */}
                    <h3 className="text-lg font-semibold text-gray-900">
                        Confirm Delete
                    </h3>

                    {/* Modal Content */}
                    <p className="mt-2 text-gray-600">
                        Are you sure you want to delete <strong>{product.name}</strong>?
                    </p>
                    <p className="text-gray-500 text-sm">Price: ${product.price.toFixed(2)}</p>

                    {/* Actions */}
                    <div className="mt-6 flex justify-end gap-4">
                        <button
                            type="button"
                            onClick={closeModal}
                            className="px-4 py-2 text-gray-700 bg-gray-200 rounded hover:bg-gray-300 transition"
                        >
                            Cancel
                        </button>
                        <form onSubmit={handleSubmit}>
                            <button
                                type="submit"
                                disabled={processing}
                                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
                            >
                                {processing ? "Deleting..." : "Confirm Delete"}
                            </button>
                        </form>
                    </div>
                </div>
            </dialog>
        </>
    );
}

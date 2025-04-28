// import { useForm } from "@inertiajs/react";
// import { Inertia } from "@inertiajs/inertia";

// export default function ModalDeleteProduct({ id, product }) {
//     const {
//         data: deleteData,
//         setData: setDeleteData,
//         processing,
//         reset,
//     } = useForm({
//         name: product.name,
//         price: product.price,
//     });

//     const handleSubmit = (e) => {
//         e.preventDefault();

//         Inertia.post(`/products/${product.id}`, {
//             _method: "delete",
//             ...deleteData,
//         });
//     };

//     return (
//         <>
//             <button
//                 onClick={() =>
//                     document.getElementById(`delete_modal_${product.id}`).showModal()
//                 }
//                 className="inline-flex items-center px-4 py-2 bg-red-600 hover:bg-red-700 focus:bg-red-800 active:bg-red-900 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest focus:outline-none focus:ring-2 focus:ring-offset-2 transition ease-in-out duration-150"
//             >
//                 Delete
//             </button>
//             <dialog id={id} className="modal">
//                 <div className="modal-box bg-slate-50">
//                     <div className="modal-header">
//                         <form method="dialog">
//                             <button
//                                 className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
//                                 onClick={() => reset()}
//                             >
//                                 ✕
//                             </button>
//                         </form>
//                     </div>
//                     <div className="modal-body">
//                         <h3 className="font-bold text-lg">
//                             Are you sure you want to delete <strong>{deleteData.name}</strong>?
//                             <small className="block">Price: ${deleteData.price}</small>
//                         </h3>
//                         <form
//                             onSubmit={handleSubmit}
//                             className="mt-6 space-y-6"
//                         >
//                             <button
//                                 className="w-full text-center items-center px-4 py-2 bg-red-600 hover:bg-red-700 focus:bg-red-800 active:bg-red-900 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest focus:outline-none focus:ring-2 focus:ring-offset-2 transition ease-in-out duration-150"
//                                 disabled={processing}
//                             >
//                                 Confirm Delete
//                             </button>
//                         </form>
//                     </div>
//                     <div className="modal-action">
//                         <form method="dialog">
//                             <button
//                                 className="btn text-black border-0 bg-gray-300 hover:bg-gray-400"
//                                 onClick={() => reset()}
//                             >
//                                 Close
//                             </button>
//                         </form>
//                     </div>
//                 </div>
//                 <form method="dialog" className="modal-backdrop">
//                     <button onClick={() => reset()}></button>
//                 </form>
//             </dialog>
//         </>
//     );
// }
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

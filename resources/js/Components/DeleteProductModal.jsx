import React from "react";
import Swal from "sweetalert2";
import { router } from "@inertiajs/react";
import { FaRegTrashAlt } from "react-icons/fa";

export default function ModalDelete({ id, product }) {
    const handleDelete = () => {
        Swal.fire({
            title: "Are you sure?",
            // text: `Delete product "${product.name}"?`,
            html: `Delete product <span style="color: red;">"${product.name}"</span>?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.isConfirmed) {
                router.delete(`/products/delete/${product.id}`, {
                    onSuccess: () => {
                        Swal.fire(
                            "Deleted!",
                            "The product has been deleted.",
                            "success"
                        );
                    },
                    onError: () => {
                        Swal.fire(
                            "Error!",
                            "Something went wrong while deleting.",
                            "error"
                        );
                    },
                });
            }
        });
    };

    return (
        <button
            onClick={handleDelete}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md text-sm font-semibold"
        >
           <FaRegTrashAlt/>
        </button>
    );
}

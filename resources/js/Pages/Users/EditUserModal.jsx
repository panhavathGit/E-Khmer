import { useForm } from "@inertiajs/react";

const EditUserModal = ({ user, roles, onClose }) => {
    const { data, setData, put, processing, errors } = useForm({
        name: user.name,
        email: user.email,
        roles: user.roles.map((r) => r.name), // roles should be passed from backend
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(`/users/${user.id}`, {
            onSuccess: () => onClose(),
        });
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-xl font-bold mb-4">Edit User</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block mb-1">Name</label>
                        <input
                            type="text"
                            className="w-full border rounded p-2"
                            value={data.name}
                            onChange={(e) => setData("name", e.target.value)}
                        />
                        {errors.name && <div className="text-red-500">{errors.name}</div>}
                    </div>

                    <div className="mb-4">
                        <label className="block mb-1">Email</label>
                        <input
                            type="email"
                            className="w-full border rounded p-2"
                            value={data.email}
                            onChange={(e) => setData("email", e.target.value)}
                        />
                        {errors.email && <div className="text-red-500">{errors.email}</div>}
                    </div>

                    <div className="mb-4">
                        <label className="block mb-1">Role</label>
                        <select
                            className="w-full border rounded p-2"
                            value={data.roles[0]}
                            onChange={(e) => setData("roles", [e.target.value])}
                        >
                            <option value="">Select role</option>
                            {Object.keys(roles).map((role) => (
                                <option key={role} value={role}>
                                    {role}
                                </option>
                            ))}
                        </select>
                        {errors.roles && <div className="text-red-500">{errors.roles}</div>}
                    </div>

                    <div className="flex justify-end gap-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 bg-gray-300 rounded"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={processing}
                            className="px-4 py-2 bg-blue-600 text-white rounded"
                        >
                            Update
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditUserModal;

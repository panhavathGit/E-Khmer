import {useState} from "react";
import { router } from '@inertiajs/react'
import CreatePermission from "./create-permission.jsx";
import Layout from '@/Layouts/Layout.jsx';

const ListPermissions = ({permissions}) => {

    const [showModal, setShowModal] = useState(undefined);

    const handleDelete = (id) => {
        if(confirm("Are you sure you want to delete?")) {
            router.delete(`/permissions/${id}`);
        }
    }

    return (
           <div className="mx-5">
                <div className="flex justify-between my-6">
                    <h2 className="text-2xl">
                        All Permissions
                    </h2>
                    <button type="button" onClick={() => setShowModal(true)} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none">Create Permission</button>
                </div>
                <div className="relative">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                        <tr>
                            <th className="px-6 py-3">#</th>
                            <th className="px-6 py-3">Name</th>
                            <th className="px-6 py-3">Guard</th>
                            <th className="px-6 py-3">Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            permissions.data.map(permission => {
                                return (
                                    <tr key={permission.id} className="bg-white border-b">
                                        <td className="px-6 py-4">{permission.id}</td>
                                        <td className="px-6 py-4">{permission.name}</td>
                                        <td className="px-6 py-4">{permission.guard_name}</td>
                                        <td className="px-6 py-4">
                                            <a href="#" onClick={event => { event.preventDefault(); setShowModal(permission) } } className="bg-green-400 text-white rounded-lg hover:bg-green-800 focus:ring-4 font-medium px-2 py-1 mx-2" >Edit</a>
                                            <a href="#" onClick={event => {event.preventDefault(); handleDelete(permission.id)} } className="bg-red-400 text-white rounded-lg hover:bg-red-800 focus:ring-4 font-medium px-2 py-1 mx-2">Delete</a>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                        </tbody>
                    </table>

                </div>

                {
                    showModal !== undefined && <CreatePermission onClose={() => setShowModal(undefined)} permission={showModal} />
                }

            </div>
        
    )
}
ListPermissions.layout = page => <Layout children={page} title="Welcome" />
export default ListPermissions;
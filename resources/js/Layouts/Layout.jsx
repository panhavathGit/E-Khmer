import { Link } from "@inertiajs/react";
import { router } from '@inertiajs/react';

export default function Layout({ children }) {
    return (
        <main className="min-h-screen bg-gray-100">
            <header className="bg-white shadow">
                <div className="container mx-auto flex items-center justify-between p-4">
                    <div className="text-xl font-bold text-blue-600">
                        E-Khmer
                    </div>
                    <nav className="space-x-6">
                        <Link
                            href="/products"
                            className="text-gray-700 hover:text-blue-500"
                        >
                            Home
                        </Link>
                        <Link
                            href="/products/dashboard"
                            className="text-gray-700 hover:text-blue-500"
                        >
                            Dashboard
                        </Link>
                        {/* <Link href="/about" className="text-gray-700 hover:text-blue-500">About</Link>
            <Link href="/contact" className="text-gray-700 hover:text-blue-500">Contact</Link> */}
                        <Link
                            href="/users/dashboard"
                            className="text-gray-700 hover:text-blue-500"
                        >
                            User
                        </Link>
                        <Link
                            href="/roles/dashboard"
                            className="text-gray-700 hover:text-blue-500"
                        >
                            Role
                        </Link>
                        <Link
                            href="/permissions/dashboard"
                            className="text-gray-700 hover:text-blue-500"
                        >
                            Permission
                        </Link>
                        {/* <Link
                            href="/logout"
                            className="text-gray-700 hover:text-blue-500"
                        >
                            Logout
                        </Link> */}
                        <button onClick={() => router.post("/logout")}>
                            Logout
                        </button>
                    </nav>
                </div>
            </header>
            <article className="p-4">{children}</article>
        </main>
    );
}

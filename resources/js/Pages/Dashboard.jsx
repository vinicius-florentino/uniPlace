import React, { useState } from "react";
import { router } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";

export default function Dashboard({ auth, status }) {
    
    const { data, setData, post, processing, errors } = useForm({});

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Início" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

import React, { useState } from "react";
import { router } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";

export default function Dashboard({ auth, status }) {
    
    const { data, setData, post, processing, errors } = useForm({});

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Início" />

            
        </AuthenticatedLayout>
    );
}

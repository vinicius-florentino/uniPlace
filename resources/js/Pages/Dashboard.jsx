import React, { useState } from "react";
import { router } from "@inertiajs/react";
import NavigationLayout from "@/Layouts/NavigationLayout";
import { Head, useForm } from "@inertiajs/react";

export default function Dashboard({ auth, status }) {
    
    const { data, setData, post, processing, errors } = useForm({});

    return (
        <NavigationLayout user={auth.user}>
            <Head title="Início" />
        </NavigationLayout>
    );
}

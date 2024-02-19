import React from "react";
import NavigationLayout from "@/Layouts/NavigationLayout";
import { Head, useForm } from "@inertiajs/react";

export default function Dashboard({ auth, status }) {
    
    const { data, setData, post, processing, errors } = useForm({});

    return (
        <NavigationLayout user={auth.user}>
            <Head title="Página inicial" />
        </NavigationLayout>
    );
}

import React from "react";
import Header from "./NavigationLayout/Components/Header";

export default function DashboardLayout({ user, children }) {
    return (
        <>
            <header>
                <Header user={user} />
            </header>

            <main style={{ padding: "32px 0px" }}>
                {children}
            </main>

            <footer>
                
            </footer>
        </>
    );
}

import React from "react";
import Header from "./NavigationLayout/Components/Header";
import Footer from "./NavigationLayout/Components/Footer";

export default function DashboardLayout({ user, children }) {
    return (
        <>
            <header>
                <Header user={user} />
            </header>

            <main style={{ padding: "0px 0px" }}>
                {children}
            </main>

            <footer>
                {/* <Footer/> */}
            </footer>
        </>
    );
}

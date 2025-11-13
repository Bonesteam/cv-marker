import "./globals.css";
import {authWrapper} from "@/utils/authWrapper";
import {AlertProvider} from "@/context/AlertContext";
import PageWrapper from "@/components/layout/page-wrapper/PageWrapper";
import Header from "@/components/layout/header/Header";
import Footer from "@/components/layout/footer/Footer";
import ProtectedRoute from "@/components/features/protected-route/ProtectedRoute";
import {currentFont} from "@/resources/styles-config";
import ProvidersWrapper from "@/components/providers/ProvidersWrapper";

function Layout({children}: { children: React.ReactNode }) {
    return (
        <html lang="en">
        <head>
            <link rel="preconnect" href="https://fonts.googleapis.com"/>
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous"/>
            <link href={currentFont.url} rel="stylesheet"/>
            <style>{`:root { --font-family: ${currentFont.css}; }`}</style>
        </head>
        <body>
        <ProvidersWrapper>
            <Header />
            <ProtectedRoute>
                <PageWrapper>
                    {children}
                </PageWrapper>
            </ProtectedRoute>
            <Footer />
        </ProvidersWrapper>
        </body>
        </html>
    );
}

export default authWrapper(Layout);
import "./globals.css";
import {authWrapper} from "@/utils/authWrapper";
import {AlertProvider} from "@/context/AlertContext";
import PageWrapper from "@/components/layout/page-wrapper/PageWrapper";
import Header from "@/components/layout/header/Header";
import Footer from "@/components/layout/footer/Footer";
import ProtectedRoute from "@/components/features/protected-route/ProtectedRoute";
import {currentFont} from "@/resources/styles-config";
import ProvidersWrapper from "@/components/providers/ProvidersWrapper";
import ClientGuards from "@/components/providers/ClientGuards";

function Layout({children}: { children: React.ReactNode }) {
    return (
        <html lang="en">
        <head>
            <link rel="preconnect" href="https://fonts.googleapis.com"/>
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous"/>
            <link href={currentFont.url} rel="stylesheet"/>
            <style>{`:root { --font-family: ${currentFont.css}; }`}</style>
                        <script dangerouslySetInnerHTML={{ __html: `
                            // Early inline guard: wrap Object.defineProperty to ignore attempts
                            // to redefine window.ethereum from extensions or injected scripts.
                            (function(){
                                try{
                                    var _origDef = Object.defineProperty;
                                    Object.defineProperty = function(obj, prop, descriptor){
                                        try{
                                            if (prop === 'ethereum' && obj === window){
                                                var ex = Object.getOwnPropertyDescriptor(window, 'ethereum');
                                                if (ex) {
                                                    // already present — skip redefinition to avoid TypeError
                                                    console.warn('early-guard: skipping redefine of window.ethereum');
                                                    return window;
                                                }
                                            }
                                            return _origDef.call(Object, obj, prop, descriptor);
                                        }catch(e){
                                            // swallow errors to avoid breaking page scripts
                                            try{ console.warn('early-guard: defineProperty suppressed', String(prop), e); }catch(_){}
                                            return obj;
                                        }
                                    };
                                }catch(e){}
                            })();
                        ` }} />
        </head>
        <body>
        <ClientGuards />
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
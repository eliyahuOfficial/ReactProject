
import { Outlet } from "react-router-dom";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Fotter";


const Root = () => {

    return (
        <div className="flex flex-col min-h-screen ">
            <Header />
            <main className="flex-1 ">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};

export default Root;
import About from "../components/About/About"
import "./Home.scss"


const Home = () => {
    return (
        <div>
            <h1 className="text-center">Bussiness Web Appliction</h1>
            <h2 className="text-center text-4xl"> Ready To <span>Get Access</span> </h2>

            <About />

        </div>
    )
}

export default Home
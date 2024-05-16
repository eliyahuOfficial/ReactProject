import "./Footer.scss";
import { FaLinkedin, FaFacebookSquare, FaInstagramSquare } from "react-icons/fa";


function Footer() {



    return (
        <footer className="bg-stone-200  dark:bg-slate-500 p-3 text-black  dark:text-gray-100 text-center rounded-t-lg flex row gap-3 justify-center items-center mt-4 footer-style">


            Copyright © 2024 <a href="https://eliyahuportfolioupdate.netlify.app/" className="color-footer ">Eliyahu Levi</a> . All Rights Reserved.
            <a href="https://www.linkedin.com/in/eliyahuofficial/"><FaLinkedin className="color-footer " /></a>
            <a href="https://www.facebook.com/eliyahuofficial"><FaFacebookSquare className="color-footer " /></a>
            <a href="https://www.instagram.com/eliyahu_official_music/"><FaInstagramSquare className="color-footer " /></a>

        </footer>
    );
}

export default Footer;
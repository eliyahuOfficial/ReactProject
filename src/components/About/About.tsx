
import { AiOutlineLogin } from "react-icons/ai"
import "./About.scss"
const About = () => {
  return (
    <div >
      <div className="main-about-sections ">
        <div className="about-section dark:bg-slate-500 dark:text-white drop-shadow-md p-5 rounded-md">
          <h4>Introduction:</h4>
          <p>
            Welcome to our business platform! We specialize in providing business card application services, focusing on crafting professional business cards and enhancing global exposure for your business among potential customers.
          </p>
        </div>
        <div className="about-section dark:bg-slate-500 dark:text-white drop-shadow-md p-5 rounded-md">
          <h4>Features and Functionality:</h4>
          <p>
            With our intuitive interface, you can easily input and edit all the necessary information for your business cards, ensuring that they reflect the most accurate and up-to-date details. From contact information to branding elements, customization options abound to perfectly tailor your cards to your needs.
          </p>
        </div>
        <div className="about-section dark:bg-slate-500 dark:text-white drop-shadow-md p-5 rounded-md">
          <h4>Benefits and Value Proposition:</h4>
          <p>
            But that's not all we understand the importance of flexibility in managing your business card inventory. That's why we offer seamless options for updating details for your esteemed clientele. Whether it's a change in position, phone number, or address, you can effortlessly keep your business relationships current.
          </p>
        </div>

      </div>
      <div className="flex flex-col justify-center items-center mt-8">
        <AiOutlineLogin
          className="mx-auto w-auto size-36 slide-in-fwd-center mt-3" />

        <p className=" text-center text-sm text-gray-500  dark:text-white">
          Not a member?{' '}
          <a href="/register" className="trial-free-log">
            Start a 14 day free trial
          </a>
        </p>
      </div>
    </div>
  )
}

export default About
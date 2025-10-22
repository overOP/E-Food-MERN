import { FaInstagram, FaGithub, FaLinkedin } from "react-icons/fa";
const Footer = () => {
  return (
    <footer className="mt-20 font-sans bg-yellow-50 dark:bg-gray-900">
      <div className="container px-6 py-12 mx-auto">
        <div className="sm:flex sm:items-center sm:justify-between">
          <div className="flex flex-1 gap-4 hover:cursor-pointer">
            <img
              src="https://www.svgrepo.com/show/303139/google-play-badge-logo.svg"
              width="130"
              height="110"
              alt="google play"
            />
            <img
              src="https://www.svgrepo.com/show/303128/download-on-the-app-store-apple-logo.svg"
              width="130"
              height="110"
              alt="app store"
            />
          </div>

          <div className="flex gap-4 hover:cursor-pointer">
            <FaInstagram className=" text-red-500 hover:text-red-400 w-8 h-8"/>
            <FaGithub className=" text-gray-500 hover:text-gray-400 w-8 h-8"/>
            <FaLinkedin className=" text-blue-500 hover:text-blue-400 w-8 h-8"/>
          </div>
        </div>
        <p className="p-8 font-sans text-start md:text-center md:text-lg md:p-4 text-white">
          &copy;{" "}
          {
            new Date().getFullYear()
          }{" "}
          All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;

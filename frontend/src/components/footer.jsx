/**
 * @param color_scheme either "LIGHT" or "DARK" to indicate if the text should be white or black. Default is "DARK"
 */
const Footer = ({ color_scheme }) => {
    return (
        <footer className="py-6 px-site-standard bg-white rounded-lg shadow flex items-center justify-between dark:bg-gray-800 mt-12">
            <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
                © 2023{" "}
                <a href="localhost:3000/" className="hover:underline">
                    Company Name™
                </a>
            </span>
            <span className="flex text-sm text-gray-500 sm:mt-0 sm:justify-center dark:text-gray-400">
                <p>All Rights Reserved.</p>
            </span>
            {/* <span className="flex flex-wrap items-center mt-3 text-sm text-gray-500 dark:text-gray-400 sm:mt-0">
                <p className="mr-4 md:mr-6 ">Designed and Created by Kesav Kosana and Varun Kumar</p>
            </span> */}
        </footer>
    );
};

export default Footer;

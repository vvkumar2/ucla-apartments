/**
 * @param color_scheme either "LIGHT" or "DARK" to indicate if the text should be white or black. Default is "DARK"
 */
const Footer = ({ color_scheme }) => {
  return (
    <footer className="mt-12 flex items-center justify-between rounded-lg bg-white py-6 px-site-standard shadow dark:bg-gray-800">
      <span className="text-sm text-gray-500 dark:text-gray-400 sm:text-center">
        © 2023{' '}
        <a href="localhost:3000/" className="hover:underline">
          Company Name™
        </a>
      </span>
      <span className="flex text-sm text-gray-500 dark:text-gray-400 sm:mt-0 sm:justify-center">
        <p>All Rights Reserved.</p>
      </span>
      {/* <span className="flex flex-wrap items-center mt-3 text-sm text-gray-500 dark:text-gray-400 sm:mt-0">
                <p className="mr-4 md:mr-6 ">Designed and Created by Kesav Kosana and Varun Kumar</p>
            </span> */}
    </footer>
  );
};

export default Footer;

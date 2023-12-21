import BreadCrumb from "./BreadCrumb";
import "./SubBar.css";
import { useSelector } from "react-redux";

const SubBar = ({
  setIsCreatedFolderModalOpen,
  setIsCreatedFileModalOpen,
  setIsFileUploadModalOpen,
}) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white lg:px-5 mt-2">
      <div className="w-full lg:flex lg:items-center lg:justify-between lg:px-24">
        <div className="flex items-center">
          <div className="flex item-center">
            <div>
              <p className="small text-gray-800 text-md mb-3 pl-4 pr-2 ">
                Directory :
              </p>
            </div>
            <div className="text-gray-800 text-md font-semibold">
              <BreadCrumb />
            </div>
          </div>
        </div>

        <div className="ml-4 lg:ml-0">
          <ul className="flex items-center space-x-3 mx-auto">
            <li className="lg:mx-2">
              <button
                type="button"
                className="relative inline-flex items-center rounded-md px-4 border border-transparent lg:bg-gray-800 lg:px-1 py-2 text-sm font-sm text-black lg:text-white shadow-md lg:shadow-sm hover:bg-black focus:outline-none focus:ring-2 focus:ring-gray-800 focus:ring-offset-2 focus:ring-offset-gray-800"
                onClick={() => setIsFileUploadModalOpen(true)}
              >
                <div className="flex items-center justify-between">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1"
                    stroke="currentColor"
                    class="w-6 h-6"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M9 8.25H7.5a2.25 2.25 0 00-2.25 2.25v9a2.25 2.25 0 002.25 2.25h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25H15m0-3l-3-3m0 0l-3 3m3-3V15"
                    />
                  </svg>

                  <span className="lg:block hidden mx-1">Upload Files</span>
                </div>
              </button>
            </li>
            <li className="lg:mx-2">
              <button
                type="button"
                className="relative inline-flex items-center rounded-md px-4 border border-transparent lg:bg-gray-800 lg:px-1 py-2 text-sm font-sm text-black lg:text-white shadow-md lg:shadow-sm hover:bg-black focus:outline-none focus:ring-2 focus:ring-gray-800 focus:ring-offset-2 focus:ring-offset-gray-800"
                onClick={() => setIsCreatedFileModalOpen(true)}
              >
                <div className="flex items-center justify-between">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1"
                    stroke="currentColor"
                    class="w-6 h-6"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                    />
                  </svg>

                  <span className="lg:block hidden mx-1">Add File</span>
                </div>
              </button>
            </li>
            <li className="mx-2">
              <button
                type="button"
                className="relative inline-flex items-center rounded-md px-4 border border-transparent lg:bg-gray-800 lg:px-1 py-2 text-sm font-sm text-black lg:text-white shadow-md lg:shadow-sm hover:bg-black focus:outline-none focus:ring-2 focus:ring-gray-800 focus:ring-offset-2 focus:ring-offset-gray-800"
                onClick={() => setIsCreatedFolderModalOpen(true)}
              >
                <div className="flex items-center justify-between">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1"
                    stroke="currentColor"
                    class="w-6 h-6"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M12 10.5v6m3-3H9m4.06-7.19l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z"
                    />
                  </svg>

                  <span className="lg:block hidden"> Add Folder </span>
                </div>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default SubBar;

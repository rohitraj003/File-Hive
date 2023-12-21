import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateFileData } from "../../../redux/actioncCreators/fileFolderActionCreator";

const Header = ({ fileName, fileData, prevFileData, fileId }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-white px-5 mt-2">
        <div className="w-full flex items-center justify-between px-24">
          <div className="flex items-center">
            <p className="text-grey-800 text-md"> filename :</p>
            <p className="text-grey-800 fw-semi-bold ms-1 text-xl">
              {fileName}
            </p>
            {fileData !== prevFileData && (
              <h5 className="text-green-600 fw-semi-bold ms-1"> *[modified]</h5>
            )}
          </div>
          <div>
            <ul className="navbar-nav mx-auto">
              <li className="nav-item mx-2">
                {fileData === prevFileData ? (
                  <button
                    type="button"
                    className="relative inline-flex items-center rounded-md border border-transparent bg-white px-1 py-2 text-sm font-sm text-grey-800 shadow-sm hover:bg-black focus:outline-none focus:ring-2 focus:ring-gray-800 focus:ring-offset-2 focus:ring-offset-gray-800"
                    disabled={fileData === prevFileData}
                    style={{ cursor: "not-allowed" }}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <i class="fa fa-floppy-o fa-lg" aria-hidden="true"></i>
                      </div>
                      <div>
                        <span className="mx-1">Save</span>
                      </div>
                    </div>
                  </button>
                ) : (
                  <button
                    type="button"
                    className="relative inline-flex items-center rounded-md border border-transparent bg-white px-1 py-2 text-sm font-sm text-grey-800 shadow-sm hover:bg-black focus:outline-none focus:ring-2 focus:ring-gray-800 focus:ring-offset-2 focus:ring-offset-gray-800"
                    disabled={fileData === prevFileData}
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      dispatch(updateFileData(fileId, fileData));
                    }}
                  >
                    {" "}
                    <div className="flex items-center justify-between">
                      <div>
                        <i class="fa fa-floppy-o fa-lg" aria-hidden="true"></i>
                      </div>
                      <div>
                        <span className="mx-1">Save</span>
                      </div>
                    </div>
                  </button>
                )}
              </li>
              <li onClick={() => navigate(-1)} className="nav-item mx-2">
                <button
                  type="button"
                  className="relative inline-flex items-center rounded-md border border-transparent bg-white px-1 py-2 text-sm font-sm text-grey-800 shadow-sm hover:bg-black focus:outline-none focus:ring-2 focus:ring-gray-800 focus:ring-offset-2 focus:ring-offset-gray-800"
                  //moves one step back in stack
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <i
                        class="fa fa-chevron-circle-left fa-lg"
                        aria-hidden="true"
                      ></i>
                    </div>
                    <div>
                      <span className="mx-1">Go Back</span>
                    </div>
                  </div>
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;

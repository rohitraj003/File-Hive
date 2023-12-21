import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "./Header";
import { shallowEqual, useSelector } from "react-redux";
import CodeEditor from "./CodeEditor";

const FileComponent = () => {
  const { fileId } = useParams();
  const [fileData, setFileData] = useState("");
  const [prevFileData, setPrevFileData] = useState("");
  const navigate = useNavigate();

  const { currentFile, isAuthenticated } = useSelector(
    (state) => ({
      currentFile: state.fileFolders.userFiles.find(
        (file) => file.docId === fileId
      ),
      isAuthenticated: state.auth.isAuthenticated,
    }),
    shallowEqual
  );
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
    }
  }, []);
  useEffect(() => {
    if (currentFile) {
      setFileData(currentFile.data.data);
      setPrevFileData(currentFile.data.data);
    }
  }, [currentFile, currentFile?.data.data]);

  const downloadFile = () => {
    const element = document.createElement("a");
    element.setAttribute("href", currentFile.data.url);
    element.setAttribute("download", currentFile.data.name);
    element.setAttribute("target", "_blank");
    element.style.display = "none";
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
  };
  return (
    <div>
      {fileData !== null ? (
        <>
          <Header
            fileName={currentFile?.data.name}
            fileData={fileData}
            prevFileData={prevFileData}
            fileId={fileId}
          />
          {/* FileComponent = {JSON.stringify(currentFile)}; */}
          <CodeEditor
            fileName={currentFile?.data.name}
            data={fileData}
            setData={setFileData}
          />
        </>
      ) : (
        <>
          <div className="position-fixed left-0 top-0 w-100 h-100 bg-black text-white">
            {/* sub menu bar  */}
            <div className="flex py-4 mt-2 px-5 justify-between items-center">
              <p className="my-0">
                {currentFile?.data.name.length > 40
                  ? currentFile?.data.name.slice(0, 40) +
                    "..." +
                    currentFile?.data.extension
                  : currentFile.data.name}
              </p>
              <div className="flex items-center me-5">
                <button
                  type="button"
                  className="relative inline-flex items-center rounded-md border border-transparent bg-white px-1 py-2 text-sm font-sm text-black shadow-sm hover:bg-black focus:outline-none focus:ring-2 focus:ring-gray-800 focus:ring-offset-2 focus:ring-offset-gray-800 me-2"
                  onClick={() => navigate(-1)} //moves one step back in stack
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
                <button
                  type="button"
                  className="relative inline-flex items-center rounded-md border border-transparent bg-white px-1 py-2 text-sm font-sm text-black shadow-sm hover:bg-black focus:outline-none focus:ring-2 focus:ring-gray-800 focus:ring-offset-2 focus:ring-offset-gray-800"
                  onClick={() => downloadFile()} //moves one step back in stack
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <i
                        class="fa fa-cloud-download fa-lg"
                        aria-hidden="true"
                      ></i>
                    </div>
                    <div>
                      <span className="mx-1">Download</span>
                    </div>
                  </div>
                </button>
              </div>
            </div>
            <div className="w-100 mt-4" style={{ height: "650px" }}>
              {currentFile?.data.extension.includes("png") ||
              currentFile?.data.extension.includes("jpg") ||
              currentFile?.data.extension.includes("jpeg") ||
              currentFile?.data.extension.includes("gif") ? (
                <img
                  src={currentFile?.data.url}
                  alt={currentFile?.data.name}
                  className="w-100 h-100 img-fluid"
                />
              ) : (
                <div className="w-100 h-80 flex justify-center items-center">
                  <p className="text-3xl text-center">
                    File type not supported. Please download the file to view
                    it.
                  </p>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default FileComponent;

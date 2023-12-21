import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { uploadFile } from "../../../redux/actioncCreators/fileFolderActionCreator";
// import { createFile } from "../../../redux/actioncCreators/fileFolderActionCreator";
import { toast } from "react-toastify";
import { RotatingLines } from "react-loader-spinner";

const UploadFile = ({ isFileUploadModalOpen, setIsFileUploadModalOpen }) => {
  const { folderLoader } = useSelector((state) => ({
    folderLoader: state.fileFolders.folderLoader,
  }));
  const [show, setShow] = useState(false);
  const [file, setFile] = useState(null);
  const [success, setSuccess] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (success) {
      setFile("");
      setSuccess(false);
      setIsFileUploadModalOpen(false);
    }
  }, []);

  const { userFiles, user, currentFolder, currentFolderData } = useSelector(
    (state) => ({
      userFiles: state.fileFolders.userFiles,
      user: state.auth.user,
      currentFolder: state.fileFolders.currentFolder,
      currentFolderData: state.fileFolders.userFolders.find(
        (folder) => folder.docId === state.fileFolders.currentFolder
      ),
    }),
    shallowEqual
  );
  const checkExistingFile = (name) => {
    const existingFile = userFiles
      .filter((file) => file.data.parent === currentFolder)
      .find((folder) => folder.data.name === name);

    if (existingFile) {
      return true;
    } else {
      return false;
    }
  };
  const handleClose = () => setShow(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (file) {
      console.log(file);

      if (!checkExistingFile(file.name)) {
        const data = {
          createdAt: new Date(),
          name: file.name,
          userId: user.uid,
          createdBy: user.displayName,
          path:
            currentFolder === "root"
              ? []
              : [...currentFolderData?.data.path, currentFolder],
          parent: currentFolder,
          lastAccesed: null,
          updateAt: new Date(),
          extension: file.name.split(".")[1],
          data: null,
          url: "",
        };
        dispatch(uploadFile(file, data, setSuccess, setIsFileUploadModalOpen));
        // setIsFileUploadModalOpen(false);
        console.log("data", data);
      } else {
        toast.warning(`${file.name} already exists.`);
      }
    } else {
      toast.warning("File name cannot be empty");
    }
  };

  return (
    <>
      <Modal
        show={isFileUploadModalOpen}
        onHide={() => setIsFileUploadModalOpen(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Upload File</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control
              type="file"
              id="file"
              onChange={(e) => setFile(e.target.files[0])}
            />
            <Form.Text className="text-muted">
              Upload your files here.
            </Form.Text>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button
            className="border-1 bg-dark text-white d-flex align-items-center justify-content-between rounded-2"
            variant="outline-dark"
            onClick={handleSubmit}
          >
            {folderLoader ? (
              <span className="">
                <RotatingLines
                  strokeColor="white"
                  strokeWidth="5"
                  animationDuration="0.75"
                  width="24"
                  visible={true}
                />{" "}
              </span>
            ) : (
              <span> Upload File </span>
            )}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default UploadFile;

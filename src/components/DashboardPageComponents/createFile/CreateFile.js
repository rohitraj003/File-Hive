import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { createFile } from "../../../redux/actioncCreators/fileFolderActionCreator";
import { toast } from "react-toastify";
import { RotatingLines } from "react-loader-spinner";

const CreateFile = ({ isCreatedFileModalOpen, setIsCreatedFileModalOpen }) => {
  const { folderLoader } = useSelector((state) => ({
    folderLoader: state.fileFolders.folderLoader,
  }));
  const [show, setShow] = useState(false);
  const [fileName, setFileName] = useState("");
  const [success, setSuccess] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (success) {
      setFileName("");
      setSuccess(false);
      setIsCreatedFileModalOpen(false);
    }
  }, []);

  const { userFiles, user, currentFolder, currentFolderData, isLoading } =
    useSelector(
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
  const checkExistingFile = (name, ext) => {
    if (!ext) {
      name = name + ".txt";
    }
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
    if (fileName) {
      if (fileName.length >= 3) {
        // check file extension
        let extension = false;
        if (fileName.split(".").length > 1) {
          extension = true;
        }
        if (!checkExistingFile(fileName, extension)) {
          const data = {
            createdAt: new Date(),
            name: extension ? fileName : `${fileName}.txt`,
            userId: user.uid,
            createdBy: user.displayName,
            path:
              currentFolder === "root"
                ? []
                : [...currentFolderData?.data.path, currentFolder],
            parent: currentFolder,
            lastAccesed: null,
            updateAt: new Date(),
            extension: extension ? fileName.split(".")[1] : "txt",
            data: "",
            url: null,
          };

          dispatch(createFile(data, setSuccess, setIsCreatedFileModalOpen));
        } else {
          toast.warning(`${fileName} already exists.`);
        }
      } else {
        toast.warning("File name must be of atleast 3 characters.");
      }
    } else {
      toast.warning("File name cannot be empty.");
    }
  };
  return (
    <>
      <Modal
        show={isCreatedFileModalOpen}
        onHide={() => setIsCreatedFileModalOpen(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Create File</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>File Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Write File Name e.g file.txt, index.html"
              value={fileName}
              onChange={(e) => setFileName(e.target.value)}
            />
            <Form.Text className="text-muted">
              We'll create a file with the name you provide above.
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
              <span>Create File</span>
            )}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default CreateFile;

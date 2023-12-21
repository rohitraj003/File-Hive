import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { createFolder } from "../../../redux/actioncCreators/fileFolderActionCreator";
import { toast } from "react-toastify";
import { RotatingLines } from "react-loader-spinner";

const CreateFolder = ({
  isCreatedFolderModalOpen,
  setIsCreatedFolderModalOpen,
}) => {
  const { folderLoader } = useSelector((state) => ({
    folderLoader: state.fileFolders.folderLoader,
  }));
  const [show, setShow] = useState(false);
  const [folderName, setFolderName] = useState("");
  const dispatch = useDispatch();

  const { userFolders, user, currentFolder, currentFolderData } = useSelector(
    (state) => ({
      userFolders: state.fileFolders.userFolders,
      user: state.auth.user,
      currentFolder: state.fileFolders.currentFolder,
      currentFolderData: state.fileFolders.userFolders.find(
        (folder) => folder.docId === state.fileFolders.currentFolder
      ),
    }),
    shallowEqual
  );
  const checkExistingFolder = (name) => {
    const existingFolder = userFolders
      .filter((folder) => folder.data.parent === currentFolder)
      .find((folder) => folder.data.name === name);

    if (existingFolder) {
      return true;
    } else {
      return false;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (folderName) {
      if (folderName.length >= 3) {
        if (!checkExistingFolder(folderName)) {
          const data = {
            createdAt: new Date(),
            name: folderName,
            userId: user.uid,
            createdBy: user.displayName,
            path:
              currentFolder === "root"
                ? []
                : [...currentFolderData?.data.path, currentFolder],
            parent: currentFolder,
            lastAccessed: null,
            updatedAt: new Date(),
          };
          dispatch(createFolder(data, setIsCreatedFolderModalOpen));
        } else {
          toast.warning(`${folderName} already exists.`);
        }
      } else {
        toast.warning("Folder name must be of atleast 3 characters.");
      }
    } else {
      toast.warning("Folder name cannot be empty.");
    }
  };
  return (
    <>
      <Modal
        show={isCreatedFolderModalOpen}
        onHide={() => setIsCreatedFolderModalOpen(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Create Folder</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Folder Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Create Folder Name"
              value={folderName}
              onChange={(e) => setFolderName(e.target.value)}
            />
            <Form.Text className="text-muted">
              We'll create a folder with the name you provide above.
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
              <span> Add Folder </span>
            )}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default CreateFolder;

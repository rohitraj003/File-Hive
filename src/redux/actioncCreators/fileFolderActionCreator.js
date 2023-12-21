import * as types from "../actionsTypes/fileFolderActionTypes";
import fire from "../../config/firebase";
import { toast } from "react-toastify";
// actions

// function to add one folder
const addFolder = (payload) => ({
  type: types.CREATE_FOLDER,
  payload,
});

//function to add all the folders

const addFolders = (payload) => ({
  type: types.ADD_FOLDERS,
  payload,
});

const setLoading = (payload) => ({
  type: types.SET_LOADING,
  payload,
});
const setChangeFolder = (payload) => ({
  type: types.CHANGE_FOLDER,
  payload,
});
const setFolderLoading = (payload) => ({
  type: types.FOLDER_LOADING,
  payload,
});

// files

const addFiles = (payload) => ({
  type: types.ADD_FILES,
  payload,
});

const addFile = (payload) => ({
  type: types.CREATE_FILE,
  payload,
});

const setFileData = (payload) => ({
  type: types.SET_FILE_DATA,
  payload,
});
//action creators

export const createFolder =
  (data, setIsCreatedFolderModalOpen) => (dispatch) => {
    dispatch(setFolderLoading(true));
    fire
      .firestore()
      .collection("folders")
      .add(data)
      .then(async (folder) => {
        const folderData = await (await folder.get()).data();
        const folderId = folder.id;
        dispatch(setFolderLoading(false));
        dispatch(addFolder({ data: folderData, docId: folderId }));

        toast.success("Folder created succesfully");
        setIsCreatedFolderModalOpen(false);
      });
  };

export const getFolders = (userId) => (dispatch) => {
  dispatch(setLoading(true));
  fire
    .firestore()
    .collection("folders")
    .where("userId", "==", userId)
    .get()
    .then(async (folders) => {
      const foldersData = await folders.docs.map((folder) => ({
        data: folder.data(),
        docId: folder.id,
      }));
      dispatch(addFolders(foldersData));
      dispatch(setLoading(false));
    });
};

export const changeFolder = (folderId) => (dispatch) => {
  dispatch(setChangeFolder(folderId));
};

// files

export const getFiles = (userId) => (dispatch) => {
  fire
    .firestore()
    .collection("files")
    .where("userId", "==", userId)
    .get()
    .then(async (files) => {
      const filesData = await files.docs.map((folder) => ({
        data: folder.data(),
        docId: folder.id,
      }));
      dispatch(addFiles(filesData));
    });
};

export const createFile =
  (data, setSuccess, setIsCreatedFileModalOpen) => (dispatch) => {
    dispatch(setFolderLoading(true));
    fire
      .firestore()
      .collection("files")
      .add(data)
      .then(async (file) => {
        const fileData = await (await file.get()).data();
        const fileId = file.id;

        dispatch(addFile({ data: fileData, docId: fileId }));
        dispatch(setFolderLoading(false));
        toast.success("File created successfully!");
        setIsCreatedFileModalOpen(false);
        setSuccess(true);
      })
      .catch((e) => {
        setSuccess(false);
        console.log(e);
      });
  };

export const updateFileData = (fileId, data) => (dispatch) => {
  fire
    .firestore()
    .collection("files")
    .doc(fileId)
    .update({ data })
    .then(() => {
      dispatch(setFileData({ fileId, data }));

      toast.success("file saved successfully!");
    })
    .catch(() => {
      toast.error("Something went wrong!");
    });
};

export const uploadFile =
  (file, data, setSuccess, setIsFileUploadModalOpen) => (dispatch) => {
    dispatch(setFolderLoading(true));
    const uploadFileRef = fire
      .storage()
      .ref(`files/${data.userId}/${data.name}`);

    uploadFileRef.put(file).on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        console.log("uploading" + progress + "%");
      },
      (error) => {
        console.log(error);
      },
      async () => {
        const fileUrl = await uploadFileRef.getDownloadURL();
        const fullData = { ...data, url: fileUrl };
        fire
          .firestore()
          .collection("files")
          .add(fullData)
          .then(async (file) => {
            const fileData = await (await file.get()).data();
            const fileId = file.id;
            dispatch(addFile({ data: fileData, docId: fileId }));
            dispatch(setFolderLoading(false));
            toast.success("File uploaded successfully!");
            setSuccess(true);
            setIsFileUploadModalOpen(false);
          })
          .catch(() => {
            setSuccess(false);
          });
      }
    );
  };

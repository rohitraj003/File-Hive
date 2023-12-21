import { shallowEqual, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ShowItems from "../ShowItems/ShowItems";

const FolderComponent = () => {
  const { folderId } = useParams();
  const { currentFolderData, childFolders, childFiles } = useSelector(
    (state) => ({
      currentFolderData: state.fileFolders.userFolders.find(
        (folder) => folder.docId === folderId
      )?.data,
      childFolders: state.fileFolders.userFolders.filter(
        (folder) => folder.data.parent === folderId
      ),
      childFiles: state.fileFolders.userFiles.filter(
        (file) => file.data.parent === folderId
      ),
    }),
    shallowEqual
  );
  const createdFiles =
    childFiles && childFiles.filter((file) => file.data.url === null);
  const uploadedFiles =
    childFiles && childFiles.filter((file) => file.data.data === null);
  return (
    <>
      {childFolders.length > 0 || childFiles.length > 0 ? (
        <>
          {childFolders.length > 0 && (
            <ShowItems
              title={"Created Folders"}
              items={childFolders}
              Type="folder"
            />
          )}

          {createdFiles && createdFiles.length > 0 && (
            <ShowItems
              title={"Created Files"}
              Type="file"
              items={createdFiles}
            />
          )}
          {uploadedFiles && uploadedFiles.length > 0 && (
            <ShowItems
              title={"Uploaded Files"}
              Type="file"
              items={uploadedFiles}
            />
          )}
        </>
      ) : (
        <p className="text-center my-3 text-grey-800"> This Folder is empty.</p>
      )}
    </>
  );
};

export default FolderComponent;

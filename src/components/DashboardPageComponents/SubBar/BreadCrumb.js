import Breadcrumb from "react-bootstrap/Breadcrumb";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { changeFolder } from "../../../redux/actioncCreators/fileFolderActionCreator";

function BreadCrumb() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { currentFolder, currentFolderData, userFolders } = useSelector(
    (state) => ({
      currentFolder: state.fileFolders.currentFolder,
      currentFolderData: state.fileFolders.userFolders.find(
        (folder) => folder.docId === state.fileFolders.currentFolder
      ),
      userFolders: state.fileFolders.userFolders,
    }),
    shallowEqual
  );

  const handleNavigate = (link, id) => {
    navigate(link);

    dispatch(changeFolder(id));
  };
  return (
    <Breadcrumb>
      {currentFolder !== "root" ? (
        <>
          <Breadcrumb.Item active>
            <p
              style={{
                cursor: "pointer",
              }}
              onClick={() => handleNavigate("/dashboard", "root")}
            >
              {" "}
              root
            </p>
          </Breadcrumb.Item>
          {currentFolderData?.data.path.map((folder, index) => (
            <Breadcrumb.Item active>
              <p
                style={{
                  cursor: "pointer",
                  // width : "100%"
                }}
                key={index}
                onClick={() =>
                  handleNavigate(
                    `/dashboard/folder/${
                      userFolders.find((fldr) => folder === fldr.docId).docId
                    }`,
                    userFolders.find((fldr) => folder === fldr.docId).docId
                  )
                }
              >
                {userFolders.find((fldr) => folder === fldr.docId).data.name}
              </p>
            </Breadcrumb.Item>
          ))}
          <Breadcrumb.Item>{currentFolderData?.data.name}</Breadcrumb.Item>
        </>
      ) : (
        <Breadcrumb.Item active>
          <p
            style={{
              cursor: "pointer",
            }}
            onClick={() => handleNavigate("/dashboard", "root")}
          >
            {" "}
            root
          </p>
        </Breadcrumb.Item>
      )}
    </Breadcrumb>
  );
}

export default BreadCrumb;

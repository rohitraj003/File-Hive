import React, { useState } from "react";
import { shallowEqual, useSelector } from "react-redux";
import ShowItems from "../ShowItems/ShowItems";
import { BallTriangle } from "react-loader-spinner";
import bg from "./bg-icon.jpg";

const Home = () => {
  const { isLoading, userFolders, userFiles } = useSelector(
    (state) => ({
      isLoading: state.fileFolders.isLoading,
      userFolders: state.fileFolders.userFolders.filter(
        (folder) => folder.data.parent === "root"
      ),
      userFiles: state.fileFolders.userFiles.filter(
        (file) => file.data.parent === "root"
      ),
    }),
    shallowEqual
  );

  const createdFiles =
    userFiles && userFiles.filter((file) => file.data.url === null);
  const uploadedFiles =
    userFiles && userFiles.filter((file) => file.data.data === null);

  return (
    <>
      {isLoading ? (
        <>
          <div className="flex align-items-center justify-center mt-5">
            <BallTriangle
              height={100}
              width={100}
              radius={5}
              color="#2F58CD"
              ariaLabel="ball-triangle-loading"
              wrapperClass={{}}
              wrapperStyle=""
              visible={true}
            />
          </div>
        </>
      ) : (
        <>
          {createdFiles.length == 0 &&
            userFolders.length == 0 &&
            uploadedFiles.length == 0 && (
              <div className="w-full flex justify-center items-center">
                <img className="w-[500px]" src={bg} />
              </div>
            )}
          <div className="col-md-12 w-100">
            <>
              {userFolders.length > 0 && (
                <ShowItems
                  title={"Created Folders"}
                  items={userFolders}
                  Type="folder"
                />
              )}

              {createdFiles.length > 0 && (
                <ShowItems
                  title={"Created Files"}
                  Type="file"
                  items={userFiles.filter((file) => file.data.url === null)}
                />
              )}

              {uploadedFiles.length > 0 && (
                <ShowItems
                  title={"Uploaded Files"}
                  Type="file"
                  items={userFiles.filter((file) => file.data.data === null)}
                />
              )}
            </>
          </div>
        </>
      )}
    </>
  );
};

export default Home;

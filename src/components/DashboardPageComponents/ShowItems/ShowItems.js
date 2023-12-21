import "./ShowItems.css";
import { getBgColor } from "../../logics/config";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { changeFolder } from "../../../redux/actioncCreators/fileFolderActionCreator";

const ShowItems = ({ title, items, Type }) => {
  console.log(items);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleDoubleClick = (itemId) => {
    if (Type === "folder") {
      dispatch(changeFolder(itemId));
      navigate(`/dashboard/folder/${itemId}`);
    } else {
      navigate(`/dashboard/file/${itemId}`);
    }
  };
  return (
    <div className="w-100 p-3 ">
      <h4 className="text-center border-bottom pb-2 text-gray-800 font-medium">
        {title}
      </h4>
      <div className="flex justify-evenly mt-4 flex-wrap gap-3">
        {items.map((item, index, color) => {
          return (
            <>
              <div key={index * 55} className="text-center text-gray-800">
                <i
                  style={{
                    color: `${getBgColor()}`,
                    cursor: "pointer",
                  }}
                  className={`fa fa-${Type} text-7xl`}
                  aria-hidden="true"
                  onDoubleClick={() => handleDoubleClick(item.docId)}
                ></i>
                <p className="text-xs">{item.data?.name}</p>
              </div>
            </>
          );
        })}
      </div>
    </div>
  );
};

export default ShowItems;

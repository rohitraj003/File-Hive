import { combineReducers } from "redux";

import authReducer from "./authReducer";
import fileFoldersReducers from "./fileFoldersReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  fileFolders: fileFoldersReducers,
});

export default rootReducer;

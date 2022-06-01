import { Route, Routes } from "react-router-dom";
import ListCategory from "./ListCategory";
import Details from "./CategoryDetails";
import Add from "./CategoryAdd";
import Edit from "./CategoryEdit";

let category = () => {
  return (
    <>
      <div className="container">
        <Routes>
          <Route index element={<ListCategory />} />
          <Route path="/add" element={<Add />} />
          <Route path="/details/:id" element={<Details />} />
          <Route path="/edit/:id" element={<Edit />} />
        </Routes>
      </div>
    </>
  );
};

export default category;

import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import GeneratePDF from "./pages/GeneratePDF";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<Home />} />
        <Route path="/generate-pdf" element={<GeneratePDF />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;

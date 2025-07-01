import { useState } from "react";

import { useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Layouts from "./layouts/Layouts";
function App() {
  return (
    <div className="app-container">
      <Layouts />
    </div>
  );
}

export default App;

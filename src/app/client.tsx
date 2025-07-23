import React from "react";
import { createRoot } from "react-dom/client";

import { Page } from "../pages/Page/Page";

const container = document.getElementById("app") as Element;
const root = createRoot(container);

root.render(<Page />);

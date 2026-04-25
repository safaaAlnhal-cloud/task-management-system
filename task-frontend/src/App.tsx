import { BrowserRouter, Routes, Route ,Navigate} from "react-router-dom";
import { TasksPage } from "./pages/TasksPage";
import { CreateTaskPage } from "./pages/CreateTaskPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<Navigate to="/tasks" />} />
        <Route path="/tasks" element={<TasksPage />} />
        <Route path="/create" element={<CreateTaskPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
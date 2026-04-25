import { BrowserRouter, Routes, Route ,Navigate} from "react-router-dom";
import { TasksPage } from "./pages/TasksPage";
import { CreateTaskPage } from "./pages/CreateTaskPage";
import { EditTaskPage } from "./pages/EditTaskPage";
import { TaskDetailsPage } from "./pages/TaskDetailsPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<Navigate to="/tasks" />} />
        <Route path="/tasks" element={<TasksPage />} />
        <Route path="/create" element={<CreateTaskPage />} />
        <Route path="/edit/:id" element={<EditTaskPage />} />
        <Route path="/tasks/:id" element={<TaskDetailsPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Contact from "./pages/Contact";
import Tutorials from "./Tutorials/Tutorials";
import TutorialTopics from "./Tutorials/TutorialTopics";
import TopicView from "./Tutorials/TopicView";
import { AuthProvider } from "./context/AuthContext";
import Blogs from "./blogs/Blogs";
import SingleBlog from "./blogs/SingleBlog";
import Languages from "./codes/Languages";
import Topics from "./codes/Topics";
import CodeTopics from "./codes/CodeTopics";
import Codes from "./codes/Codes";
import SignIn from "./pages/SignIn";
import Dashboard from "./user/Dashboard"
import YourBlogs from "./user/YourBlogs"
import Todo from "./user/Todo"
import PrivateRoute from './utils/PrivateRoute'
import SignUp from "./pages/SignUp";
import BlogPost from "./user/BlogPost";
import TestLanguages from "./Tests/TestLanguages";
import TestTopics from "./Tests/TestTopics";
import Test from "./Tests/Test";
import Shorts from "./blogs/Shorts";


function App() {
  return (
    <div>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route element={<Index />} path="/" />
            <Route element={<Contact />} path="/contact" />
            <Route element={<Tutorials />} path="/tutorials" />
            <Route element={<TutorialTopics />} path="tutorials/:id/" />
            <Route element={<TopicView />} path="tutorials/posts/:id/" />
            <Route element={<Blogs />} path="/blogs" />
            <Route element={<SingleBlog />} path="blogs/:id/" />
            <Route element={<Languages />} path="/languages" />
            <Route element={<Topics />} path="/topics/:id/" />
            <Route element={<CodeTopics />} path="languages/:id/codes" />
            <Route element={<Codes />} path="languages/codes/:id/" />
            <Route element={<SignIn />} path="signin" />
            <Route element={<SignUp />} path="signup" />
            <Route element={<Shorts />} path="shorts" />
            <Route element={<PrivateRoute />}>
              <Route element={<Dashboard />} path="dashboard" />
              <Route element={<YourBlogs />} path="your_blogs" />
              <Route element={<Todo />} path="todo" />           
              <Route element={<BlogPost />} path="postBlog" />     
              <Route element={<TestLanguages/>} path="tests"/>     
              <Route element={<TestTopics/>} path="testtopics/:id/"/>  
              <Route element={<Test/>} path="test/:id/"/> 
            </Route>
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;

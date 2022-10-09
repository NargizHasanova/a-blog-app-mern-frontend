import Container from "@mui/material/Container";
import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { Header } from "./components/Header/Header";
import { Home, FullPost } from "./pages";
import { Login } from './pages/Login/Login.jsx';
import { Registration } from './pages/Registration/Registration';
import { useDispatch } from 'react-redux';
import { fetchMe } from "./redux/slices/userSlice";
import { AddPost } from './pages/AddPost/AddPost';

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchMe())
  }, [])

  return (
    <>
      <Header />
      <Container maxWidth="lg">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/posts/:id" element={<FullPost />} />
          <Route path="/posts/:id/edit" element={<AddPost />} />
          <Route path="/add-post" element={<AddPost />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Registration />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;

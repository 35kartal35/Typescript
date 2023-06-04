


import { useState } from "react";
import Header from "./components/header";
import Footer from "./components/footer";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainPage from "./pages/main-page";
import TodoPage from "./pages/todo-page";
import JsonPlaceholderPage from "./pages/json-placeholder-page";
import JsonPlaceholderUserDetailPage from "./pages/json-placeholder-user-detail-page";
import JsonPlaceholderAlbumDetailPage from "./pages/json-placeholder-album-detail-page";
import JsonPlaceholderPostDetailPage from "./pages/json-placeholder-post-detail-page";
import useApi from "./hooks/useApi";
import axios from "axios";

function App() {
  /*
  Adres yapımız şu şekilde olacak:
    /jsonplaceholder
    /jsonplaceholder/user/[userId]/
    /jsonplaceholder/user/[userId]/albums/[albumId]
    /jsonplaceholder/user/[userId]/posts/[postId]
  */

  return (
    <BrowserRouter>
      <div className="container py-3">
        <Header />

        <Routes>
          <Route index element={<MainPage />} />
          <Route path="todo" element={<TodoPage />} />

          <Route path="jsonplaceholder">
            <Route index element={<JsonPlaceholderPage />} />

            <Route path="user/:userId">
              <Route index element={<JsonPlaceholderUserDetailPage />} />

              <Route
                path="albums/:albumId"
                element={<JsonPlaceholderAlbumDetailPage />}
              />

              <Route
                path="posts/:postId"
                element={<JsonPlaceholderPostDetailPage />}
              />
            </Route>
          </Route>
        </Routes>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
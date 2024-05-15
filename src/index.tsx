import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./index.css";
import theme from "./flowbite-theme";
import { Flowbite } from "flowbite-react";
import { Routes, Route, useNavigate } from "react-router";
import { BrowserRouter } from "react-router-dom";
import SignInPage from "./pages/authentication/sign-in";
import SignUpPage from "./pages/authentication/sign-up";
import EcommerceProductsPage from "./pages/e-commerce/products";
import BedrockConfigurationPage from "./pages/bedrock/configuration";
import ChatPage from "./pages/chatbot/chat";
import UserListPage from "./pages/users/list";
import PrivateRoute from "./private-route";
import isAuthenticated from "./auth";

import { setupInterceptorsTo } from "./Interceptors";
import axios from "axios";

setupInterceptorsTo(axios);

const container = document.getElementById("root");

if (!container) {
  throw new Error("React root element doesn't exist!");
}

const root = createRoot(container);
const isAuth = isAuthenticated();

root.render(
  <StrictMode>
    <Flowbite theme={{ theme }}>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <PrivateRoute
                isAuthenticated={isAuth}
                authenticationPath="/authentication/sign-in"
              >
                <ChatPage />
              </PrivateRoute>
            }
          />
          {/* <Route path="/" element={<ChatPage />} index /> */}
          <Route path="/authentication/sign-in" element={<SignInPage />} />
          <Route path="/authentication/sign-up" element={<SignUpPage />} />
          <Route
            path="/e-commerce/products"
            element={
              <PrivateRoute
                isAuthenticated={isAuth}
                authenticationPath="/authentication/sign-in"
              >
                <EcommerceProductsPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/bedrock/chat"
            element={
              <PrivateRoute
                isAuthenticated={isAuth}
                authenticationPath="/authentication/sign-in"
              >
                <ChatPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/bedrock/configure"
            element={
              <PrivateRoute
                isAuthenticated={isAuth}
                authenticationPath="/authentication/sign-in"
              >
                <BedrockConfigurationPage />
              </PrivateRoute>
            }
          />
          <Route path="/users/list" element={<UserListPage />} />
        </Routes>
      </BrowserRouter>
    </Flowbite>
  </StrictMode>
);

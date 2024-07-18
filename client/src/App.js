import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import NavBar from "./components/NavBar";
import Login from "./Pages/Login";
import Home from "./Pages/Home";
import Register from "./Pages/Register";
import Test from "./Pages/Test";
import Error from "./Pages/Error";
import Footer from "./components/Footer";
import GamePage from "./Pages/GamePage";
import Library from "./Pages/Library";
import SearchList from "./Pages/SearchList";
import Cart from "./Pages/Cart";
import { GameProvider } from "./utils/GlobalState";

// Initialize Apollo Client
const client = new ApolloClient({
  uri:
    process.env.NODE_ENV === "production"
      ? "/graphql"
      : "http://localhost:3001/graphql",
  cache: new InMemoryCache(),
});

// add the apollo middleware that adds the id_token to every request's authorization header

function App() {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <div className="flex flex-col min-h-screen">
          <NavBar />
          <main className="main-content-container">
            <div className="main-content-gradient">
              <GameProvider>
                <Routes>
                  <Route index element={<Home />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/home" element={<Home />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/test" element={<Test />} />
                  <Route path="/games/:gameID" element={<GamePage />} />
                  <Route path="/library" element={<Library />} />
                  <Route path="/search" element={<SearchList />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="*" element={<Error />} />
                </Routes>
              </GameProvider>
            </div>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </ApolloProvider>
  );
}

export default App;

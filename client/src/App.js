import NavBar from "./components/NavBar";
import Login from "./Pages/Login";
import Home from "./Pages/Home";
import Register from "./Pages/Register";
import Test from "./Pages/Test";
import Error from "./Pages/Error";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import {React, useState} from 'react';
import GamePage from "./Pages/GamePage";

const client = new ApolloClient({
  uri:
    process.env.NODE_ENV === "production"
      ? "/graphql"
      : "http://localhost:3001/graphql",
  cache: new InMemoryCache(),
});

function App() {
  return (
    
    <ApolloProvider client={client}>
      <main>
        <NavBar />
        <div className="p-5">
          <BrowserRouter>
            <Routes>
              <Route index element={<Home />} />
              <Route path="/Login" element={<Login />} />
              <Route path="/Home" element={<Home />} />
              <Route path="/Register" element={<Register />} />
              <Route path="/test" element={<Test />} />
              <Route path="*" element={<Error/>} />
              <Route path="/games/:gameID" element={<GamePage />} />
             
            </Routes>
          </BrowserRouter>
        </div>
      </main>
    </ApolloProvider>
  );
}

export default App;

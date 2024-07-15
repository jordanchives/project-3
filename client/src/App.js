import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import NavBar from './components/NavBar';
import Login from './Pages/Login';
import Home from './Pages/Home';
import Register from './Pages/Register';
import Test from './Pages/Test';
import Error from './Pages/Error';
import Footer from './components/Footer';
import GamePage from './Pages/GamePage';
import SearchList from './Pages/SearchList';

// Initialize Apollo Client
const client = new ApolloClient({
  uri:
    process.env.NODE_ENV === 'production'
      ? '/graphql'
      : 'http://localhost:3001/graphql',
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <NavBar />
        <main>
          <div className="p-5">
            <Routes>
              <Route index element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/home" element={<Home />} />
              <Route path="/register" element={<Register />} />
              <Route path="/test" element={<Test />} />
              <Route path="/games/:gameID" element={<GamePage />} />
              <Route path="/search" element={<SearchList />} />
              <Route path="*" element={<Error />} />
            </Routes>
          </div>
        </main>
        <Footer />
      </BrowserRouter>
    </ApolloProvider>
  );
}

export default App;

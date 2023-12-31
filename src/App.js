import { Route, Routes } from "react-router-dom";
import { Urls } from "./utils/Constants";
import UserLibraryPage from "pages/userLibraryPage";
import HomePage from "pages/homePage";
import Layout from "layout/Layout";

// import css file
import "./App.css";

const App = () => {
  return (
    <div className="App">
      <Layout>
        <Routes>
          <Route path={Urls.Home} element={<HomePage />} />
          <Route path={Urls.Browse} element={<UserLibraryPage />} />
        </Routes>
      </Layout>
    </div>
  );
};

export default App;

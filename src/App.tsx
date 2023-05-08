import Charts from "pages/Charts";
import Contact from "pages/Contact";
import { Routes, Route } from "react-router-dom";
import SideBar from "components/SideBar";
import CreateContact from "pages/CreateContact";
import Header from "components/Header";
import LocalStorage from "pages/LocalStorage";
import Edit from "pages/EditContact";

function App() {
  return (
    <main className="grid min-h-screen grid-rows-[auto_1fr]">
      <Header />
      <LocalStorage />
      <div className="flex ">
        <SideBar />
        <section className="flex-1">
          <Routes>
            <Route path="/" element={<Contact />} />
            <Route path="/add" element={<CreateContact />} />
            <Route path="/charts" element={<Charts />} />
            <Route path="/edit/:id" element={<Edit />} />
          </Routes>
        </section>
      </div>
    </main>
  );
}

export default App;

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import AboutUs from "./pages/AboutUs";
import Blog from "./pages/Blog";
import BodyDoubling from "./pages/BodyDoubling";
import Tools from "./pages/Tools";
import ForOrganisations from "./pages/ForOrganisations";
import Contact from "./pages/Contact";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import BlogPost from "./pages/BlogPost";
import Neuroflow from "./pages/Neuroflow";
import NeuroflowHowToUse from "./pages/NeuroflowHowToUse";
import Pricing from "./pages/Pricing";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="body-doubling" element={<BodyDoubling />} />
          <Route path="tools" element={<Tools />} />
          <Route path="pricing" element={<Pricing />} />
          <Route path="for-organisations" element={<ForOrganisations />} />
          <Route path="about" element={<AboutUs />} />
          <Route path="contact" element={<Contact />} />
          <Route path="blog" element={<Blog />} />
          <Route path="privacy-policy" element={<PrivacyPolicy />} />
          <Route path="blog/:slug" element={<BlogPost />} />
          <Route path="neuroflow" element={<Neuroflow />} />
          <Route path="neuroflow/how-to-use" element={<NeuroflowHowToUse />} />
          <Route path="individuals" element={<Navigate to="/tools" replace />} />
          <Route path="organisations" element={<Navigate to="/for-organisations" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

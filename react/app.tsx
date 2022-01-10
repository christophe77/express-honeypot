const React = require("react");
const ReactDOM = require("react-dom");
const { BrowserRouter, Routes, Route } = require("react-router-dom");
const Pot = require("./Pot").default;
const Home = require("./Home").default;

const App = () => {
  return (
    <main style={{ padding: "1rem 0" }}>
      <BrowserRouter>
        <h1>Express Honeypot</h1>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pot" element={<Pot />} />
          <Route path="pot" element={<Pot />} />
        </Routes>
      </BrowserRouter>
    </main>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));

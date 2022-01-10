declare const require: any;

const React = require("react");
const { Link } = require("react-router-dom");

export default function Home() {
    return (
      <main style={{ padding: "1rem 0" }}>
        <h2>Home</h2>
        <nav
        style={{
          borderBottom: "solid 1px",
          paddingBottom: "1rem"
        }}
      >
        <Link to="/pot">Pot</Link>
      </nav>
      </main>
    );
  }
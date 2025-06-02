import ListGroup from "./components/ListGroup";

function App() {
  const items = [
    "Cras justo odio",
    "Dapibus ac facilisis in",
    "Morbi leo risus",
    "Porta ac consectetur ac",
    "Vestibulum at eros",
  ];
  const heading = "My List";
  return (
    <div>
      <ListGroup items={items} heading={heading} />
    </div>
  );
}

export default App;

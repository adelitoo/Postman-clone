import { useApp } from "./hooks/useApp";
import HTTPClient from "./components/HTTPClient";

function App() {
  const appInstance1 = useApp();
  const appInstance2 = useApp();

  return (
    <>
      <HTTPClient {...appInstance1} />
      <HTTPClient {...appInstance2} sidebarVisible={false} />
    </>
  );
}

export default App;

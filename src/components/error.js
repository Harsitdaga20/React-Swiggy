import { useRouteError } from "react-router-dom";
const Error = () => {
  const error = useRouteError();
  console.log(error);
  return (
    <div className="Error-message">
      <h1>Oops Something went wrong</h1>
      <h2>{"Error: " + error.status + " : " + error.statusText}</h2>
    </div>
  );
};

export default Error;

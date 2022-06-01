import { Link } from "react-router-dom";
import { Result } from "antd";

let NoMatchPage = () => {
  return (
    <Result
      className=" pt-3"
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      extra={
        <Link className="btn btn-primary" to={"/"}>
          Back Home
        </Link>
      }
    />
  );
};

export default NoMatchPage;

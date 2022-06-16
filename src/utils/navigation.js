import { useNavigate, useParams } from "react-router-dom";

export const withRouter = (Component) => {
  const Wrapper = (props) => {
    const navigate = useNavigate();
    const params = useParams();

    // <Component value="TESTING" value2="TESTING2" value3="TESTING3" navigate={navigate} params={params} />
    return <Component {...props} navigate={navigate} params={params} />;
  };

  return Wrapper;
};

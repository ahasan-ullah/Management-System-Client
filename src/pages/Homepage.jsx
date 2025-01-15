import { Helmet } from "react-helmet-async";
import Banner from "../components/Banner";

const Homepage = () => {
  return (
    <div>
      <Helmet>
        <title>Home</title>
      </Helmet>
      <Banner></Banner>
    </div>
  );
};

export default Homepage;

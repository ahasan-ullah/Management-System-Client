import { Helmet } from "react-helmet-async";
import Banner from "../components/Banner";
import Services from "../components/Services";
import Testimonials from "../components/Testimonials";
import Faqs from "../components/Faqs";
import OurStory from "../components/OurStory";

const Homepage = () => {
  return (
    <div>
      <Helmet>
        <title>Home</title>
      </Helmet>
      <Banner></Banner>
      <Services></Services>
      <Testimonials></Testimonials>
      <OurStory></OurStory>
      <Faqs></Faqs>
    </div>
  );
};

export default Homepage;

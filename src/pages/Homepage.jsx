import { Helmet } from "react-helmet-async";
import Banner from "../components/Banner";
import Services from "../components/Services";
import Testimonials from "../components/Testimonials";
import Faqs from "../components/Faqs";
import OurStory from "../components/OurStory";
import LatestNews from "../components/Blog";
import Newsletter from "../components/Newsletter";
import OurTeam from "../components/OurTeam";

const Homepage = () => {
  return (
    <div>
      <Helmet>
        <title>Home</title>
      </Helmet>
      <Banner></Banner>
      <Services></Services>
      <LatestNews></LatestNews>
      <OurTeam></OurTeam>
      <Testimonials></Testimonials>
      <OurStory></OurStory>
      <Faqs></Faqs>
      <Newsletter></Newsletter>
    </div>
  );
};

export default Homepage;

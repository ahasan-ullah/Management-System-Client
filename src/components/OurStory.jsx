import storyImage from "../assets/our-story.jpg";
const OurStory = () => {
  return (
    <div className="my-5">
      <p className="text-center text-blue-400">Our Story</p>
      <h2 className="text-center text-4xl font-bold">
        Behind The Success
      </h2>
      <div className="hero">
        <div className="hero-content flex-col lg:flex-row">
          <div className="space-y-5 md:w-1/2">
            <img src={storyImage} className="rounded-lg" />
          </div>
          <div className="md:w-1/2">
            <h1 className="text-xl font-semibold">
              Empower Your Team, Streamline Workflows, Achieve Success
            </h1>
            <p className="py-6">
              Our journey is built on a foundation of innovation, efficiency,
              and commitment to people. From addressing the simplest HR tasks to
              optimizing complex workforce management, we've developed a system
              designed to empower businesses and employees alike. Together, we
              strive to enhance productivity, foster engagement, and unlock the
              potential of every individual. This is not just a product—it's a
              vision to transform the way you manage your workforce and achieve
              new heights of success.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurStory;

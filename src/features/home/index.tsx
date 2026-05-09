import Blogs from "./components/blogs";
import Favorites from "./components/favorites";
import Tutors from "./components/tutors";

function HomePageTemplate() {
  return (
    <div className="flex flex-col">
      <Favorites />
      <Tutors />
      <Blogs />
    </div>
  );
}

export default HomePageTemplate;

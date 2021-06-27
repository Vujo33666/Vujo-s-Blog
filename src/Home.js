import BlogList from "./BlogList";
import useFetch from "./useFetch";

const Home = () => {

 const {data : blogs,loading,error} = useFetch("http://localhost:5555/blogs");

  return (
    <div className="home">
      {error && <p>{error}</p>}
      {loading === true 
        ? <div>Loading blogs...</div>
        : null}
      {blogs && <BlogList blogs={blogs}/>}
    </div>
  );
}
 
export default Home;

import { useEffect, useState } from "react";
import medic from "./../../assets/medic.jpg"; // Ensure this path is correct
import "./home.css";
import { FaLocationDot } from "react-icons/fa6";
import { useFormik,  } from "formik";

function Home  ()  {
  const [recentJobs, setRecentJobs] = useState([]);
const[search,setSearch]=useState([])
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:4002/job");
        const data = await response.json();

        setRecentJobs(data.jobs.slice(-6));
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const formik = useFormik({
    initialValues: {
      input: "",
    },
    onSubmit: async (values) => {
      try {
        const response = await fetch("http://localhost:4002/job", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        });
        const data = await response.json();
        setSearch(data.jobs);
        console.log(data)
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    },
  });

  return (
    <div>
      <div className="form">
        <form onSubmit={formik.handleSubmit}>
          <input
            className="input"
            type="text"
            placeholder="search"
            name="input"
            value={formik.values.input}
            onChange={formik.handleChange}
          />
          <button className="button" type="submit">
            search
          </button>
          <p>{search}</p>
        </form>
        <div className="search-results">
  <h2>Search Results</h2>
  <div className="recent">
    {search.map((job, index) => (
      <div className="recentjob" key={index}>
        <div className="description">
          <h3>{job.jobTitle}</h3>
          <p>wanted</p>
        </div>
        <div className="description">
          <p>Company Name</p>
          <p>{job.companyName}</p>
        </div>
        <div className="description">
          <h4>Job Description</h4>
          <p>{job.jobDescription}</p>
        </div>
        <div className="description">
          <p>Salary: {job.salary}</p>
          <p>Job Type: {job.jobType}</p>
          <p>
            <FaLocationDot />
            {job.location}
          </p>
        </div>
        <div className="description">
          <button className="applybtn" type="button">
            Apply
          </button>
        </div>
      </div>
    ))}
  </div>
</div>

      </div>
      <div className="fieldsearch">
        <h2 className="searchbyfield">Search by Field</h2>
        <div className="fields">
          {recentJobs.map((job, index) => (
            <div className="field" key={index}>
              <img src={medic} alt="" className="icon" />
              <h4>{job.field}</h4>
            </div>
          ))}
        </div>
      </div>
      <div className="recentdiv">
        <h2 className="recpost">Recently Posted</h2>
        <div className="recent">
          {recentJobs.map((job, index) => (
            <div className="recentjob" key={index}>
              <div className="description">
                <h3>{job.jobTitle}</h3>
                <p>wanted</p>
              </div>
              <div className="description">
                <p>Company Name</p>
                <p>{job.companyName}</p>
              </div>
              <div className="description">
                <h4>Job Description</h4>
                <p>{job.jobDescription}</p>
              </div>
              <div className="description">
                <p>Salary: {job.salary}</p>
                <p>Job Type: {job.jobType}</p>
                <p>
                  <FaLocationDot />
                  {job.location}
                </p>
              </div>
              <div className="description">
                <button className="applybtn" type="button">
                  Apply
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="subscribe">
        <h2 className="sub">Subscribe to receive job alerts</h2>
        <form>
          <input className="inputsub" type="text" placeholder="enter email" />
          <div className="buttonsub">
            <button className="button" type="button">
              subscribe
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Home;

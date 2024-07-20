/* eslint-disable no-undef */
import { useEffect, useState } from "react";
import medic from "./../../assets/medic.jpg";
import finance from "./../../assets/finance.jpg";
import construction from "./../../assets/construction.jpg";
import engineering from "./../../assets/engineering.jpg";
import realestate from "./../../assets/real-estate.jpg"
import "./home.css";
import { FaLocationDot } from "react-icons/fa6";
import { useFormik } from "formik";
import {  useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  const [recentJobs, setRecentJobs] = useState([]);
  const [search, setSearch] = useState([]);
const [searchbtn, setSearchBtn]=useState()
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
      field: "",
    },
    onSubmit: async (values) => {
      console.log(values);
      try {
        const response = await fetch(`http://localhost:4002/job/:field`,{
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        });
        console.log(values);
        const data = await response.json();
        // (data.getJob || null);
        console.log(data.getJob);

        if (data.success === true) {
          setSearch(data.getJob);
        } else {
          console.log("error.message");
        }
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    },
  });

  const apply = async () => {
    try {
      const response = await fetch("http://localhost:4002/job/:apply");
      const data = await response.json();
  if(data.success==true){
    setSearchBtn("application successful we will get back to you")
  }
  else{
navigate("/register")
  }
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };

  return (
    <div>
      <div className="form">
        <form onSubmit={formik.handleSubmit}>
          <input
            className="input"
            type="text"
            placeholder="search"
            name="field"
            value={formik.values.field}
            onChange={formik.handleChange}
          />
          <button className="button" type="submit">
            search
          </button>
        </form>
      </div>
      
        <div className="search1">
          <h2 className="search-results-heading">Search Results</h2>
          <div className="search">
            {search.map((job) => (
              <div className="searched" key={job.id}>
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
                   
                    <button className="applybtn" type="button" onClick={apply}>
                      Apply
                    </button>
                    <p>{searchbtn}</p>
                  
                </div>
              </div>
            ))}
          </div>
        </div>
     

      <div className="fieldsearch">
        <h2 className="searchbyfield">Search by Field</h2>
        <div className="fields">
          
            <div className="field">
              <img src={medic} alt="" className="icon" />
              <h4>medicine</h4>
              <p></p>
              <button className="btn" type="button"   onChange={formik.handleChange}  onClick={formik.handleSubmit}>
                search
              </button>
            </div>
            <div className="field">
              <img src={engineering} alt="" className="icon"  />
              <h4>engineering</h4>
              <p></p>
              <button className="btn" type="button"    onChange={formik.handleChange}  onClick={formik.handleSubmit} >
                search
              </button>
            </div>
            <div className="field">
              <img src={construction} alt="" className="icon" />
              <h4>construction</h4>
              <p></p>
              <button className="btn" type="button"      onChange={formik.handleChange}  onClick={formik.handleSubmit}>
                search
              </button>
            </div>
            <div className="field">
              <img src={realestate} alt="" className="icon" />
              <h4>realestate</h4>
              <p></p>
              <button className="btn" type="button"     onChange={formik.handleChange}  onClick={formik.handleSubmit} >
                search
              </button>
            </div>
            <div className="field">
              <img src={finance} alt="" className="icon" />
              <h4>finance</h4>
              <p></p>
              <button className="btn" type="button"    onChange={formik.handleChange}  onClick={formik.handleSubmit} >
                search
              </button>
            </div>
         
         
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
              <button className="applybtn" type="button" onClick={apply}>
                      Apply
                    </button>
                    {/* alert{searchbtn} */}
                  
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

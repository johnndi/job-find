import { useFormik } from "formik";
import * as Yup from "yup";
import "./post.css";
import { useState } from "react";

function Post() {
  const validate = Yup.object({
    jobTitle: Yup.string().required("Enter a title"),
    companyName: Yup.string().required("Enter your company name"),
    location: Yup.string().required("Enter a location"),
    jobType: Yup.string().required("Enter a type"),
    field: Yup.string().required("Enter a field"),
    salary: Yup.string().required("Enter a salary"),
    jobDescription: Yup.string().required("Enter a description"),
  });

  const [error, setError] = useState(false);
  const [message, setMessage] = useState(null);

  const handleSubmit = async (post) => {
    try {
      const response = await fetch("http://localhost:4002/job", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(post),
      });
      console.log(post);
      const data = await response.json();

      if (data.success === true) {
        setMessage("Your job has been posted");
        console.log("everything is ok");
      } else {
        setError(data.message || "Error occurred");
      }
    } catch (error) {
      setError("Error occurred while posting the job");
      console.log(error);
    }
  };

  const formik = useFormik({
    initialValues: {
      jobTitle: "",
      companyName: "",
      location: "",
      jobType: "",
      field: "",
      salary: "",
      jobDescription: "",
    },
    onSubmit: handleSubmit,
    validationSchema: validate,
  });

  return (
    <div className="postp">
      <form onSubmit={formik.handleSubmit} className="postform">
        <h2>Post a Job</h2>
        <div className="post">
          <label htmlFor="jobTitle">Job Title</label>
          <input
            type="text"
            className="postinput"
            id="jobTitle"
            name="jobTitle"
            value={formik.values.jobTitle}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.jobTitle && formik.errors.jobTitle && (
            <p>{formik.errors.jobTitle}</p>
          )}
        </div>
        <div className="post">
          <label htmlFor="companyName">Company Name</label>
          <input
            type="text"
            className="postinput"
            id="companyName"
            name="companyName"
            value={formik.values.companyName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.companyName && formik.errors.companyName && (
            <p>{formik.errors.companyName}</p>
          )}
        </div>
        <div className="post">
          <label htmlFor="location">Location</label>
          <input
            type="text"
            className="postinput"
            id="location"
            name="location"
            value={formik.values.location}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.location && formik.errors.location && (
            <p>{formik.errors.location}</p>
          )}
        </div>
        <div className="post">
          <label htmlFor="jobType">Job Type</label>
          <input
            type="text"
            className="postinput"
            id="jobType"
            name="jobType"
            value={formik.values.jobType}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.jobType && formik.errors.jobType && (
            <p>{formik.errors.jobType}</p>
          )}
        </div>
        <div className="post">
          <label htmlFor="field">Field</label>
          <input
            type="text"
            id="field"
            className="postinput"
            name="field"
            value={formik.values.field}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.field && formik.errors.field && (
            <p>{formik.errors.field}</p>
          )}
        </div>
        <div className="post">
          <label htmlFor="salary">Salary</label>
          <input
            type="number"
            id="salary"
            className="postinput"
            name="salary"
            value={formik.values.salary}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.salary && formik.errors.salary && (
            <p>{formik.errors.salary}</p>
          )}
        </div>
        <div className="post">
          <label htmlFor="jobDescription">Job Description</label>
          <textarea
            className="postinputdes"
            id="jobDescription"
            name="jobDescription"
            value={formik.values.jobDescription}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          ></textarea>
          {formik.touched.jobDescription && formik.errors.jobDescription && (
            <p>{formik.errors.jobDescription}</p>
          )}
        </div>
        <button type="submit" className="post-btn">
          Post
        </button>
      </form>
      {error && <p>{error}</p>}
      {message && <p>{message}</p>}
    </div>
  );
}

export default Post;

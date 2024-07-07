import { useFormik } from "formik";
import * as Yup from "yup";
import "./post.css"
import { useState } from "react";
function Post() {
  const validate = Yup.object({
    title: Yup.string().required("enter a title"),
    companyName: Yup.string().required("enter your company name"),
    location: Yup.string().required("enter a location"),
    type: Yup.string().required("enter a type"),
    salary: Yup.string().required("enter a salary"),
    description: Yup.string().required("enter a description"),
  });
  const[error,setError]=useState(false)
  const[message, setMessage]=useState([null])
  const handlePost = async (post) => {
   
    const apiEndpoint =   "http://localhost:4002/job";

    try {
     
      const response = await fetch(apiEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(post),
      });
      const data= await response.json();
      if(data.success===true){
        setMessage("your job has been posted")
      }else{
setError(data.message)
      }
   
    } catch (error) {
      console.log(error);
    }
  };

  
  const formik = useFormik({
    initialValues: {
      title: "",
      companyName: "",
      location: "",
      type: "",
      field:"",
      salary: "",
      description: "",
    },
   onSubmit:handlePost,
   
    validationSchema: validate
  });
  // const myHandleSubmit = e => {
  //   e.preventDefault();
  //   console.log("Dooing a handle submit")
  // }
//   console.log(formik)
  return (
    <div className="postp">
      <form onSubmit={formik.handleSubmit} className="postform">
      <h2> post a job</h2>
        <div className="post">
          <label htmlFor="job title">job title</label>
          <input
            type="text"
            className="postinput"
            id="title"
            name="title"
            value={formik.values.title}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.title && formik.errors.title && (
            <p>{formik.errors.title}</p>
          )}
        </div>
        <div className="post">
          <label htmlFor="job type">job type</label>
          <input
            type="text"
            className="postinput"
            id="type"
            name="type"
            value={formik.values.type}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched && formik.errors.type && <p>{formik.errors.type}</p>}
        </div>
        <div className="post">
          <label htmlFor="job title">company name</label>
          <input
            type="text"
            className="postinput"
            id="companyName"
            name="companyName"
            value={formik.values.companyName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched && formik.errors.companyName && (
            <p>{formik.errors.companyName}</p>
          )}
        </div>
        <div className="post">
          <label htmlFor="job location">job location</label>
          <input
            type="text"
            className="postinput"
            name="location"
            id="location"
            value={formik.values.location}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched && formik.errors.location && (
            <p>{formik.errors.location}</p>
          )}
        </div>
        <div className="post">
          <label htmlFor="field">field</label>
          <input
            type="char"
            id="salary"
            className="postinput"
            name="field"
            value={formik.values.field}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched && formik.errors.field && (
            <p>{formik.errors.field}</p>
          )}
          </div>
        <div className="post">
          <label htmlFor="job salary">salary</label>
          <input
            type="char"
            id="salary"
            className="postinput"
            name="salary"
            value={formik.values.salary}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched && formik.errors.salary && (
            <p>{formik.errors.salary}</p>
          )}
        </div>
        <div className="post">
          <label htmlFor="job description">job description</label>
          <textarea
            type="text"
            className="postinputdes"
            id="description"
            name="description"
            value={formik.values.description}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          ></textarea>
          {formik.touched && formik.errors.description && (
            <p>{formik.errors.description}</p>
          )}
        </div>
        <button type="submit" className="post-btn">
          post
        </button>
      </form>
      <p>{error}</p>
      <p>{message}</p>
    </div>
  );
}
export default Post;

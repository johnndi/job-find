import { useFormik } from "formik";
import * as Yup from "yup";
import "./register.css";
import { Link,useNavigate } from "react-router-dom";
import {useState} from "react"
function Register() {
  const validate = Yup.object({
    option: Yup.string().required("Please select one option"),
    fullName: Yup.string().required("Enter your name"),
    email: Yup.string()
      .required("Enter an email")
      .email("Please enter a valid email"),
    phone: Yup.string().required("Please enter a phone number"),
    password: Yup.string().required("Set a password"),
  });
  const [loading, setLoading]=useState(false)
const [error, setError]=useState(false)
const navigate = useNavigate();
  const handlePost = async (formstate) => {
    const { option, ...dataToPost } = formstate;
    const apiEndpoint = option === "employer" ? "http://localhost:4002/employer" : "http://localhost:4002/employee";

    try {
     
      const response = await fetch(apiEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToPost),
      });
      const data= await response.json();
      if(data.success===true){
        navigate("/login")
      }else{
setError(data.message)
      }
   
    } catch (error) {
      console.log(error);
    }finally{
      setLoading(false)
      setError(false)
    }
  };

  const formik = useFormik({
    initialValues: {
      option: "",
      fullName: "",
      email: "",
      phone: "",
      password: "",
    },
    onSubmit: handlePost,
    
    validationSchema: validate,
  });

  return (
    <div>
      <div className="register">
        <form className="regform" onSubmit={formik.handleSubmit}>
          <div className="options">
            <div className="employer">
              <input
                type="radio"
                id="employer"
                name="option"
                value="employer"
                onChange={formik.handleChange}
                checked={formik.values.option === "employer"}
                onBlur={formik.handleBlur}
              />
              <label htmlFor="employer">Employer</label>
            </div>
            <div className="jobSeek">
              <input
                type="radio"
                id="jobseeker"
                name="option"
                value="jobseeker"
                onChange={formik.handleChange}
                checked={formik.values.option === "jobseeker"}
                onBlur={formik.handleBlur}
              />
              <label htmlFor="jobseeker">Job Seeker</label>
            </div>
            {formik.touched.option && formik.errors.option && (
              <p>{formik.errors.option}</p>
            )}
          </div>
          <div className="regform">
            <label htmlFor="fullName">Full Name</label>
            <input
              type="text"
              id="fullName"
              className="regforminput"
              placeholder="Full Name"
              name="fullName"
              value={formik.values.fullName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.fullName && formik.errors.fullName && (
              <p>{formik.errors.fullName}</p>
            )}
          </div>
          <div className="regform">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              className="regforminput"
              placeholder="Email Address"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.email && formik.errors.email && (
              <p>{formik.errors.email}</p>
            )}
          </div>
          <div className="regform">
            <label htmlFor="phone">Phone Number</label>
            <input
              type="number"
              id="phone"
              className="regforminput"
              placeholder="Phone Number"
              value={formik.values.phone}
              name="phone"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.phone && formik.errors.phone && (
              <p>{formik.errors.phone}</p>
            )}
          </div>
          <div className="regform">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              className="regforminput"
              placeholder="Password"
              value={formik.values.password}
              name="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.password && formik.errors.password && (
              <p>{formik.errors.password}</p>
            )}
          </div>
          <p>
            Already have an account? <Link to="/Login">Log in</Link>{" "}
          </p>
          <button type="submit" className="submit-btn">
            Sign Up
          </button>
        </form>
        <p>{error}</p>
      </div>
    </div>
  );
}

export default Register;



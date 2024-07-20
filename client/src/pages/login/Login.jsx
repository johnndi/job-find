import "./login.css";
import { Formik, useFormik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import {useState} from "react"
function Login() {
  const validate = Yup.object({
    email: Yup.string().email("invalid email").required("input email"),
    password: Yup.string().required("input password"),
  });
  const navigate = useNavigate();
  const[load, setLoading]=useState([false])
  const handlelogin = async (formState) => {
    try {
      setLoading(true)
      const response = await fetch("http://localhost:4002/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formState),
        credentials: "include",
      });
      const data = await response.json();
      if (data.success === true) {
        navigate("/");
        
      } else {
        data.message;
      }
    } catch (error) {
      error.message;
      setLoading(false)
    }
  };
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: handlelogin,
    validationSchema: validate,
  });

  return (
    <div className="log">
      <h2>log in</h2>
      <Formik>
        {({ isSubmitting }) => (
          <form onSubmit={formik.handleSubmit} className="form2">
            <div className="loginform">
              <label htmlFor="email">email address</label>
              <input
                type="email"
                id="email"
                className="loginforminput"
                placeholder="email address"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched && formik.errors.email && (
                <p>{formik.errors.email}</p>
              )}
            </div>
            <div className="loginform">
              <label htmlFor="password">password</label>
              <input
                type="password"
                id="password"
                className="loginforminput"
                placeholder="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched && formik.errors.password && (
                <p>{formik.errors.password}</p>
              )}
            </div>
            <p>
              don`t have an account <Link to="/Register"> sign up</Link>{" "}
            </p>
            <button
              type="submit"
              className="submit-btn"
              disabled={isSubmitting}
            >
              log in
            </button>
            {
              load && <p>loading please wait....</p>
            }
      
          </form>
        )}
      </Formik>
    </div>
  );
}
export default Login;

import React, { useState } from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { postFetchData } from "../../api/Api";
import { Store } from "../../context/Data";
import { toast } from "react-toastify";
import "./Login.css";
const Login = () => {
  const notify = (data) => toast(data);
  const navigate = useNavigate();
  const { setIsLogin } = useContext(Store);
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setData({ ...data, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await postFetchData(
        "http://localhost:8081/api/v1/signin",
        data
      );

      if (res.success === false) {
        notify(res?.message);
      }

      if (res.success === true) {
        localStorage.setItem("token", res.token);
        localStorage.setItem("userData", JSON.stringify(res?.user));
        notify("user login successfully");
        setIsLogin(true);
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const move = () => {
    navigate("/signup");
  };
  return (
    <section
      className="h-100 gradient-form"
      style={{ backgroundColor: "#eee" }}
    >
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-xl-10">
            <div className="card rounded-3 text-black">
              <div className="row g-0">
                <div className="col-lg-6">
                  <div className="card-body p-md-5 mx-md-4">
                    <div className="text-center">
                      <img
                        src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/lotus.webp"
                        style={{ width: "185px" }}
                        alt="logo"
                      />
                      <h4 className="mt-1 mb-5 pb-1">We are The Lotus Team</h4>
                    </div>
                    <form onSubmit={handleSubmit}>
                      <p>Please login to your account</p>
                      <div className="form-outline mb-4">
                        <input
                          type="email"
                          id="form2Example11"
                          name="email"
                          value={data.email}
                          onChange={handleChange}
                          className="form-control"
                          placeholder="Phone number or email address"
                          required
                        />
                        <label className="form-label" htmlFor="form2Example11">
                          Username
                        </label>
                      </div>
                      <div className="form-outline mb-4">
                        <input
                          type="password"
                          id="form2Example22"
                          name="password"
                          value={data.password}
                          onChange={handleChange}
                          className="form-control"
                          required
                        />
                        <label className="form-label" htmlFor="form2Example22">
                          Password
                        </label>
                      </div>
                      <div className="text-center pt-1 mb-5 pb-1">
                        <button
                          className="btn btn-primary btn-block fa-lg gradient-custom-2 mb-3"
                          type="submit"
                        >
                          Log in
                        </button>
                        <p className="text-muted">Forgot password?</p>
                      </div>

                      <div className="d-flex align-items-center justify-content-center pb-4">
                        <p className="mb-0 me-2">Don't have an account?</p>
                        <button
                          type="button"
                          className="btn btn-outline-danger"
                          onClick={() => move()}
                        >
                          Create new
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
                <div className="col-lg-6 d-flex align-items-center gradient-custom-2">
                  <div className="text-white px-3 py-4 p-md-5 mx-md-4">
                    <h4 className="mb-4">We are more than just a company</h4>
                    <p className="small mb-0">
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                      ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;

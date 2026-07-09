import { Link, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import Swal from "sweetalert2";
import { API } from "../api/ApiConstants";

const Login = () => {

    const navigate = useNavigate();

    const initialValues = {
        userName: "",
        password: ""
    };

    const validationSchema = Yup.object({

        userName: Yup.string()
            .email("Enter a valid email address")
            .required("Email is required"),

        password: Yup.string()
            .required("Password is required")

    });

    const handleSubmit = async (values, { setSubmitting }) => {

        try {

            const payload = {
                username: values.userName,
                password: values.password
            };

            const response = await axios.post(
                API?.LOGIN,
                payload
            );

            localStorage.setItem("token", response.data.token);

            localStorage.setItem(
                "user",
                JSON.stringify(response.data)
            );

            await Swal.fire({
                icon: "success",
                title: "Login Successful",
                text: response.data.detail,
                confirmButtonColor: "#0F766E"
            });

            navigate("/dashboard");

        } catch (error) {

            if (error.response) {

                await Swal.fire({
                    icon: "question",
                    title: error.response.data.detail || "Login Failed",
                    text: error.response.data.description || "Invalid Username or Password",
                    confirmButtonColor: "#dc3545"
                });

            } else {

                await Swal.fire({
                    icon: "warning",
                    title: "Connection Error",
                    text: "Unable to connect to the server.",
                    confirmButtonColor: "#ffc107"
                });

            }

        } finally {

            setSubmitting(false);

        }

    };
    return (

        <div
            style={{
                minHeight: "100vh",
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                fontFamily: "'Segoe UI', sans-serif"
            }}
        >

            {/* Left Panel */}

            <div
                style={{
                    background: "linear-gradient(135deg,#0F766E,#115E59)",
                    color: "#fff",
                    padding: "60px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between"
                }}
            >

                <div>

                    <h2
                        style={{
                            fontSize: "32px",
                            fontWeight: "700"
                        }}
                    >
                        🩺 MyKare Healthcare
                    </h2>

                    <p
                        style={{
                            marginTop: "20px",
                            fontSize: "18px",
                            lineHeight: "30px"
                        }}
                    >
                        Secure Healthcare Appointment
                        Management Platform built using
                        Spring Boot, React, PostgreSQL,
                        Kafka & Python.
                    </p>

                </div>

                <div>

                    <h1
                        style={{
                            fontSize: "42px",
                            lineHeight: "58px",
                            fontWeight: "700"
                        }}
                    >
                        Welcome Back
                        <br />
                        Login &
                        Book Your
                        Appointment
                    </h1>

                    <p
                        style={{
                            marginTop: "25px",
                            opacity: ".8",
                            lineHeight: "28px"
                        }}
                    >
                        Manage appointments,
                        receive instant notifications,
                        and securely access your
                        healthcare dashboard.
                    </p>

                </div>

                <small
                    style={{
                        opacity: ".7"
                    }}
                >
                    © 2026 MyKare Healthcare
                </small>

            </div>

            {/* Right Panel */}

            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    background: "#F4F8FB"
                }}
            >

                <div
                    style={{
                        width: "430px",
                        background: "#fff",
                        borderRadius: "15px",
                        padding: "40px",
                        boxShadow: "0 12px 30px rgba(0,0,0,.10)"
                    }}
                >

                    <h2
                        style={{
                            textAlign: "center",
                            marginBottom: "10px"
                        }}
                    >
                        Sign In
                    </h2>

                    <p
                        style={{
                            textAlign: "center",
                            color: "#64748B",
                            marginBottom: "35px"
                        }}
                    >
                        Login to continue
                    </p>

                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                    >

                        {({ isSubmitting, status }) => (

                            <Form>

                                <div className="mb-3">

                                    <label className="form-label">
                                        Email Address
                                    </label>

                                    <Field
                                        type="email"
                                        name="userName"
                                        className="form-control"
                                        placeholder="Enter Email"
                                    />

                                    <ErrorMessage
                                        name="userName"
                                        component="small"
                                        className="text-danger"
                                    />

                                </div>

                                <div className="mb-3">

                                    <label className="form-label">
                                        Password
                                    </label>

                                    <Field
                                        type="password"
                                        name="password"
                                        className="form-control"
                                        placeholder="Enter Password"
                                    />

                                    <ErrorMessage
                                        name="password"
                                        component="small"
                                        className="text-danger"
                                    />

                                </div>

                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        marginBottom: "20px"
                                    }}
                                >

                                    <div>

                                        <input
                                            type="checkbox"
                                        />

                                        <span
                                            style={{
                                                marginLeft: "8px",
                                                fontSize: "14px"
                                            }}
                                        >
                                            Remember Me
                                        </span>

                                    </div>

                                    <a
                                        href="/"
                                        style={{
                                            textDecoration: "none",
                                            fontSize: "14px"
                                        }}
                                    >
                                        Forgot Password?
                                    </a>

                                </div>

                                {

                                    status &&

                                    <div
                                        className="alert alert-danger"
                                    >
                                        {status}
                                    </div>

                                }

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="btn btn-success w-100"
                                    style={{
                                        height: "48px",
                                        fontWeight: "600"
                                    }}
                                >

                                    {

                                        isSubmitting

                                            ? "Signing In..."

                                            : "Login"

                                    }

                                </button>

                            </Form>

                        )}

                    </Formik>

                    <div
                        style={{
                            marginTop: "25px",
                            textAlign: "center"
                        }}
                    >

                        Don't have an account?

                        <Link
                            to="/register"
                            style={{
                                textDecoration: "none",
                                marginLeft: "6px",
                                fontWeight: "600"
                            }}
                        >
                            Register
                        </Link>

                    </div>

                </div>

            </div>

        </div>

    );

};

export default Login;
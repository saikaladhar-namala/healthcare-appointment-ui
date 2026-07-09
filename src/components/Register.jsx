import { Link, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import Swal from "sweetalert2";

const Register = () => {

    const navigate = useNavigate();

    const initialValues = {
        fullName: "",
        email: "",
        password: "",
        confirmPassword: ""
    };
    const validationSchema = Yup.object({

        fullName: Yup.string()
            .required("Full Name is required"),

        email: Yup.string()
            .email("Enter valid email")
            .required("Email is required"),

        password: Yup.string()
            .min(6, "Password must contain at least 6 characters")
            .required("Password is required"),

        confirmPassword: Yup.string()
            .oneOf([Yup.ref("password")], "Passwords do not match")
            .required("Confirm Password is required")

    });

    const handleSubmit = async (values, { setSubmitting }) => {

        try {

            const payload = {

                employeeName: values.fullName,

                designation: "PATIENT",

                userName: values.email,

                password: values.password,

                roleId: 2,

                isActive: true

            };

            const response = await axios.post(
                "http://localhost:8999/healthcare-api/auth/signup",
                payload
            );

            console.log(response.data);

            await Swal.fire({
                icon: "success",
                title: "Registration Successful",
                text: response.data.description || "Welcome to MyKare Healthcare",
                confirmButtonColor: "#0F766E"
            });

            navigate("/");

        } catch (error) {

            if (error.response) {

                await Swal.fire({
                    icon: "error",
                    title: error.response.data.detail || "Registration Failed",
                    text:
                        error.response.data.description ||
                        error.response.data.errorMessage ||
                        "Unable to register user.",
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
                fontFamily: "'Segoe UI',sans-serif"
            }}
        >

            {/* LEFT PANEL */}

            <div
                style={{
                    background: "#0F766E",
                    color: "#fff",
                    padding: "60px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between"
                }}
            >

                <div>

                    <h2>🩺 MyKare Healthcare</h2>

                    <p
                        style={{
                            marginTop: "20px",
                            lineHeight: 1.7
                        }}
                    >
                        Join MyKare and manage all your healthcare appointments
                        from one secure platform.
                    </p>

                </div>

                <div>

                    <h1
                        style={{
                            fontSize: "38px",
                            lineHeight: 1.5
                        }}
                    >
                        Your Health,
                        <br />
                        Our Priority.
                    </h1>

                    <p
                        style={{
                            marginTop: "20px",
                            opacity: .8
                        }}
                    >
                        Register today and start booking appointments
                        with your preferred doctors.
                    </p>

                </div>

                <small
                    style={{
                        opacity: .6
                    }}
                >
                    MyKare Healthcare Platform
                </small>

            </div>

            {/* RIGHT PANEL */}

            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    background: "#F8FAFC"
                }}
            >

                <div
                    style={{
                        width: "520px",
                        background: "#fff",
                        padding: "40px",
                        borderRadius: "15px",
                        boxShadow: "0 10px 30px rgba(0,0,0,.1)"
                    }}
                >

                    <h2
                        style={{
                            textAlign: "center"
                        }}
                    >
                        Create Account
                    </h2>

                    <p
                        style={{
                            textAlign: "center",
                            color: "#64748B",
                            marginBottom: "30px"
                        }}
                    >
                        Register to continue
                    </p>

                    <Formik

                        initialValues={initialValues}

                        validationSchema={validationSchema}

                        onSubmit={handleSubmit}

                    >

                        {({ isSubmitting, status }) => (

                            <Form>

                                <div className="mb-3">

                                    <label>Full Name</label>

                                    <Field
                                        name="fullName"
                                        className="form-control"
                                        placeholder="Enter Full Name"
                                    />

                                    <ErrorMessage
                                        name="fullName"
                                        component="small"
                                        className="text-danger"
                                    />

                                </div>

                                <div className="mb-3">

                                    <label>Email Address</label>

                                    <Field
                                        type="email"
                                        name="email"
                                        className="form-control"
                                        placeholder="Enter Email"
                                    />

                                    <ErrorMessage
                                        name="email"
                                        component="small"
                                        className="text-danger"
                                    />

                                </div>

                                <div className="mb-3">

                                    <label>Password</label>

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

                                <div className="mb-4">

                                    <label>Confirm Password</label>

                                    <Field
                                        type="password"
                                        name="confirmPassword"
                                        className="form-control"
                                        placeholder="Confirm Password"
                                    />

                                    <ErrorMessage
                                        name="confirmPassword"
                                        component="small"
                                        className="text-danger"
                                    />

                                </div>

                                {

                                    status &&

                                    <div className="alert alert-danger">

                                        {status}

                                    </div>

                                }

                                <button
                                    type="submit"
                                    className="btn btn-success w-100"
                                    disabled={isSubmitting}
                                >

                                    {

                                        isSubmitting

                                            ? "Creating Account..."

                                            : "Create Account"

                                    }

                                </button>

                            </Form>

                        )}

                    </Formik>

                    <div
                        style={{
                            textAlign: "center",
                            marginTop: "20px"
                        }}
                    >

                        Already have an account?

                        <Link
                            to="/"
                            style={{
                                marginLeft: "5px",
                                textDecoration: "none",
                                fontWeight: "600"
                            }}
                        >
                            Login
                        </Link>

                    </div>

                </div>

            </div>

        </div>

    );

};

export default Register;
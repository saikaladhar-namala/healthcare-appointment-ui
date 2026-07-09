import { useNavigate } from "react-router-dom";

const Dashboard = () => {

    const navigate = useNavigate();

    const logout = () => {

        localStorage.removeItem("token");
        localStorage.removeItem("user");

        navigate("/");

    };

    return (

        <div
            style={{
                minHeight: "100vh",
                background: "#F4F8FB",
                padding: "40px",
                fontFamily: "'Segoe UI', sans-serif"
            }}
        >

            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "40px"
                }}
            >

                <div>

                    <h2 style={{ color: "#0F766E" }}>
                        🩺 MyKare Healthcare
                    </h2>

                    <p>
                        Welcome to Appointment Management System
                    </p>

                </div>

                <button
                    className="btn btn-danger"
                    onClick={logout}
                >
                    Logout
                </button>

            </div>

            <div className="row g-4">

                <div className="col-md-6">

                    <div
                        className="card shadow-sm p-4"
                        style={{ cursor: "pointer" }}
                        onClick={() => navigate("/book-appointment")}
                    >

                        <h4>📅 Create Appointment</h4>

                        <p>
                            Book a new healthcare appointment.
                        </p>

                    </div>

                </div>

                <div className="col-md-6">

                    <div
                        className="card shadow-sm p-4"
                        style={{ cursor: "pointer" }}
                        onClick={() => navigate("/available-slots")}
                    >

                        <h4>⏰ Available Slots</h4>

                        <p>
                            View available appointment slots.
                        </p>

                    </div>

                </div>

                <div className="col-md-6">

                    <div
                        className="card shadow-sm p-4"
                        style={{ cursor: "pointer" }}
                        onClick={() => navigate("/appointments")}
                    >

                        <h4>📋 My Appointments</h4>

                        <p>
                            View your booked appointments.
                        </p>

                    </div>

                </div>

                <div className="col-md-6">

                    <div
                        className="card shadow-sm p-4"
                        style={{ cursor: "pointer" }}
                        onClick={() => navigate("/appointments")}
                    >

                        <h4>❌ Cancel Appointment</h4>

                        <p>
                            Cancel an existing appointment.
                        </p>

                    </div>

                </div>

            </div>

        </div>

    );

};

export default Dashboard;
import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const MyAppointments = () => {

    const navigate = useNavigate();

    const [appointments, setAppointments] = useState([]);

    const [loading, setLoading] = useState(true);

    const user = JSON.parse(localStorage.getItem("user"));

    const token = localStorage.getItem("token");

    const config = {

        headers: {

            Authorization: `Bearer ${token}`

        }

    };

    useEffect(() => {

        loadAppointments();

    }, []);

    const loadAppointments = async () => {

        try {

            const response = await axios.get(
                `http://localhost:8999/healthcare-api/appointments/user`,
                config

            );
            setAppointments(response.data);
        } catch (error) {

            Swal.fire({
                icon: "error",
                title: "Error",
                text:
                    error.response?.data?.description ||
                    "Unable to fetch appointments."

            });

        } finally {
            setLoading(false);
        }

    };

    const cancelAppointment = async (appointmentId) => {

        const result = await Swal.fire({
            title: "Cancel Appointment?",
            text: "Do you really want to cancel this appointment?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes",
            cancelButtonText: "No",
            confirmButtonColor: "#d33"

        });

        if (!result.isConfirmed) {
            return;
        }

        try {

            const response = await axios.put(`http://localhost:8999/healthcare-api/appointments/${appointmentId}/cancel`,
                {},
                config

            );

            await Swal.fire({
                icon: "success",
                title: "Success",
                text: response.data.description
            });

            loadAppointments();
        } catch (error) {

            Swal.fire({
                icon: "error",
                title: "Error",
                text:
                    error.response?.data ||
                    "Unable to cancel appointment."
            });

        }

    };

    return (

        <div className="container mt-5">
            <div className="card shadow">
                <div
                    className="card-header text-white d-flex justify-content-between align-items-center"
                    style={{ background: "#0F766E" }}
                >

                    <h3 className="mb-0">
                        📋 My Appointments
                    </h3>

                    <button
                        className="btn btn-light"
                        onClick={() => navigate("/dashboard")}
                    >
                        Back
                    </button>

                </div>

                <div className="card-body">
                    {
                        loading ?
                            <div className="text-center">
                                <div className="spinner-border text-success" />
                            </div>
                            :
                            <table className="table table-bordered table-hover">
                                <thead className="table-success">
                                    <tr>
                                        <th>Doctor</th>

                                        <th>Specialization</th>

                                        <th>Date</th>

                                        <th>Time</th>

                                        <th>Status</th>

                                        <th>Action</th>

                                    </tr>

                                </thead>
                                <tbody>

                                    {

                                        appointments.length > 0 ?

                                            appointments.map((appointment) => (

                                                <tr key={appointment.appointment_id}>

                                                    <td>
                                                        {appointment.doctor_name}
                                                    </td>
                                                    <td>
                                                        {appointment.specialization}
                                                    </td>
                                                    <td>
                                                        {appointment.appointment_date}
                                                    </td>
                                                    <td>
                                                        {appointment.slot_name}

                                                    </td>
                                                    <td>
                                                        <span
                                                            className={
                                                                appointment.appointment_status === "BOOKED"
                                                                    ? "badge bg-success"
                                                                    : "badge bg-danger"
                                                            }
                                                        >
                                                            {appointment.appointment_status}
                                                        </span>
                                                    </td>

                                                    <td>
                                                        {
                                                            appointment.appointment_status === "BOOKED" && (
                                                                <button
                                                                    className="btn btn-danger btn-sm"
                                                                    onClick={() =>
                                                                        cancelAppointment(
                                                                            appointment?.appointment_id
                                                                        )
                                                                    }
                                                                >
                                                                    Cancel
                                                                </button>
                                                            )
                                                        }
                                                    </td>
                                                </tr>
                                            ))
                                            :
                                            <tr>
                                                <td
                                                    colSpan="5"
                                                    className="text-center text-muted"
                                                >
                                                    No Appointments Found
                                                </td>
                                            </tr>
                                    }

                                </tbody>

                            </table>

                    }

                </div>

            </div>

        </div>

    );

};

export default MyAppointments;
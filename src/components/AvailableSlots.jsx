import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const AvailableSlots = () => {

    const navigate = useNavigate();

    const [slots, setSlots] = useState([]);

    const [loading, setLoading] = useState(true);

    const token = localStorage.getItem("token");

    const [doctorFilter, setDoctorFilter] = useState("");
    const [specializationFilter, setSpecializationFilter] = useState("");

    const config = {

        headers: {

            Authorization: `Bearer ${token}`

        }

    };

    useEffect(() => {

        loadAvailableSlots();

    }, []);

    const loadAvailableSlots = async () => {

        try {

            const response = await axios.get(

                "http://localhost:8999/healthcare-api/slots",

                config

            );

            setSlots(response.data);

        }

        catch (error) {

            Swal.fire({

                icon: "error",

                title: "Error",

                text:
                    error.response?.data?.description ||
                    "Unable to load available slots."

            });

        }

        finally {

            setLoading(false);

        }

    };

    const filteredSlots = slots.filter((slot) => {

        const doctorMatch =
            doctorFilter === "" ||
            slot.doctorName === doctorFilter;

        const specializationMatch =
            specializationFilter === "" ||
            slot.specialization === specializationFilter;

        return doctorMatch && specializationMatch;

    });

    return (

        <div
            className="container mt-5"
        >

            <div className="card shadow">

                <div
                    className="card-header d-flex justify-content-between align-items-center text-white"
                    style={{
                        background: "#0F766E"
                    }}
                >

                    <h3 className="mb-0">

                        ⏰ Available Slots

                    </h3>

                    <button
                        className="btn btn-light"
                        onClick={() => navigate("/dashboard")}
                    >

                        Back

                    </button>

                </div>

                <div className="card-body">
                    <div className="row mb-4">

                        <div className="col-md-5">

                            <label className="form-label">

                                Doctor

                            </label>

                            <select
                                className="form-select"
                                value={doctorFilter}
                                onChange={(e) => setDoctorFilter(e.target.value)}
                            >

                                <option value="">

                                    All Doctors

                                </option>

                                {

                                    [...new Set(slots.map(slot => slot.doctorName))]
                                        .map((doctor) => (

                                            <option
                                                key={doctor}
                                                value={doctor}
                                            >

                                                {doctor}

                                            </option>

                                        ))

                                }

                            </select>

                        </div>

                        <div className="col-md-5">

                            <label className="form-label">

                                Specialization

                            </label>

                            <select
                                className="form-select"
                                value={specializationFilter}
                                onChange={(e) => setSpecializationFilter(e.target.value)}
                            >

                                <option value="">

                                    All Specializations

                                </option>

                                {

                                    [...new Set(slots.map(slot => slot.specialization))]
                                        .map((specialization) => (

                                            <option
                                                key={specialization}
                                                value={specialization}
                                            >

                                                {specialization}

                                            </option>

                                        ))

                                }

                            </select>

                        </div>

                        <div className="col-md-2 d-flex align-items-end">

                            <button
                                className="btn btn-outline-secondary w-100"
                                onClick={() => {

                                    setDoctorFilter("");
                                    setSpecializationFilter("");

                                }}
                            >

                                Reset

                            </button>

                        </div>

                    </div>
                    {

                        loading ?

                            <div
                                className="text-center p-5"
                            >

                                <div
                                    className="spinner-border text-success"
                                />

                            </div>

                            :


                            <table
                                className="table table-bordered table-hover"
                            >

                                <thead
                                    className="table-success"
                                >

                                    <tr>

                                        <th>Doctor</th>

                                        <th>Specialization</th>

                                        <th>Date</th>

                                        <th>Time</th>

                                        <th>Status</th>

                                    </tr>

                                </thead>

                                <tbody>                                    {

                                    filteredSlots?.length > 0 ?

                                        filteredSlots?.map((slot) => (

                                            <tr
                                                key={slot.slotId}
                                            >
                                                <td>
                                                    {slot.doctorName}
                                                </td>
                                                <td>
                                                    {slot.specialization}
                                                </td>
                                                <td>
                                                    {slot.appointmentDate}
                                                </td>
                                                <td>
                                                    {slot.startTime}
                                                    {" - "}
                                                    {slot.endTime}
                                                </td>
                                                <td>
                                                    <span
                                                        className="badge bg-success"
                                                    >
                                                        {slot.slotStatus}

                                                    </span>

                                                </td>

                                            </tr>

                                        ))

                                        :

                                        <tr>

                                            <td
                                                colSpan="5"
                                                className="text-center text-muted"
                                            >

                                                No Available Slots

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

export default AvailableSlots;
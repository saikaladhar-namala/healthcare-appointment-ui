import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const CreateAppointment = () => {

    const navigate = useNavigate();

    const [doctors, setDoctors] = useState([]);
    const [slots, setSlots] = useState([]);

    const user = JSON.parse(localStorage.getItem("user"));

    const token = localStorage.getItem("token");

    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };

    useEffect(() => {
        loadDoctors();
    }, []);

    const loadDoctors = async () => {

        try {
            const response = await axios.get(
                "http://localhost:8999/healthcare-api/doctors",
                config
            );
            setDoctors(response.data);

        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Unable to load doctors."
            });

        }

    };

    const loadSlots = async (doctorId) => {

        if (!doctorId) {
            setSlots([]);
            return;
        }
        try {

            const response = await axios.get(
                `http://localhost:8999/healthcare-api/slots/doctor/${doctorId}`, config
            );

            setSlots(response.data);

        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Unable to fetch slots."
            });

        }

    };

    const initialValues = {
        doctorId: "",
        slotId: "",
        remarks: ""

    };

    const validationSchema = Yup.object({

        doctorId: Yup.string()
            .required("Please select doctor"),
        slotId: Yup.string()
            .required("Please select appointment slot"),
        remarks: Yup.string()
            .required("Please enter remarks")

    });

    const handleSubmit = async (values, { setSubmitting }) => {

        try {

            const payload = {
                doctorId: Number(values.doctorId),
                slotId: Number(values.slotId),
                remarks: values.remarks
            };

            const response = await axios.post(
                "http://localhost:8999/healthcare-api/appointments",
                payload,
                config
            );

            await Swal.fire({
                icon: "success",
                title: "Success",
                text:
                    response.data.description ||
                    "Appointment booked successfully.",
                confirmButtonColor: "#0F766E"

            });
            navigate("/dashboard");

        } catch (error) {
            await Swal.fire({
                icon: "error",
                title: error.response?.data,
                text:
                    error.response?.data?.description ||
                    "Unable to create appointment."

            });

        } finally {
            setSubmitting(false);
        }

    };

    return (

        <div
            className="container mt-5"
            style={{ maxWidth: "750px" }}
        >

            <div className="card shadow">

                <div
                    className="card-header text-white"
                    style={{
                        background: "#0F766E"
                    }}
                >

                    <h3 className="mb-0">

                        📅 Create Appointment

                    </h3>

                </div>

                <div className="card-body">

                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                    >

                        {({
                            isSubmitting,
                            setFieldValue
                        }) => (

                            <Form>
                                <div className="mb-3">

                                    <label className="form-label">
                                        Select Doctor
                                    </label>

                                    <Field
                                        as="select"
                                        name="doctorId"
                                        className="form-select"
                                        onChange={(e) => {

                                            setFieldValue("doctorId", e.target.value);
                                            setFieldValue("slotId", "");

                                            loadSlots(e.target.value);

                                        }}
                                    >

                                        <option value="">
                                            -- Select Doctor --
                                        </option>

                                        {

                                            doctors.map((doctor) => (

                                                <option
                                                    key={doctor.doctorId}
                                                    value={doctor.doctorId}
                                                >

                                                    {doctor.doctorName}
                                                    {" - "}
                                                    {doctor.specialization}

                                                </option>

                                            ))

                                        }

                                    </Field>

                                    <ErrorMessage
                                        name="doctorId"
                                        component="small"
                                        className="text-danger"
                                    />

                                </div>

                                <div className="mb-3">

                                    <label className="form-label">
                                        Available Slots
                                    </label>

                                    <Field
                                        as="select"
                                        name="slotId"
                                        className="form-select"
                                    >

                                        <option value="">
                                            -- Select Slot --
                                        </option>

                                        {

                                            slots.map((slot) => (

                                                <option
                                                    key={slot.slotId}
                                                    value={slot.slotId}
                                                >

                                                    {slot.appointmentDate}
                                                    {" | "}
                                                    {slot.startTime}
                                                    {" - "}
                                                    {slot.endTime}

                                                </option>

                                            ))

                                        }

                                    </Field>

                                    <ErrorMessage
                                        name="slotId"
                                        component="small"
                                        className="text-danger"
                                    />

                                </div>

                                <div className="mb-4">

                                    <label className="form-label">
                                        Remarks
                                    </label>

                                    <Field
                                        as="textarea"
                                        rows="4"
                                        name="remarks"
                                        className="form-control"
                                        placeholder="Enter Remarks"
                                    />

                                    <ErrorMessage
                                        name="remarks"
                                        component="small"
                                        className="text-danger"
                                    />

                                </div>

                                <div className="d-flex justify-content-between">

                                    <button
                                        type="button"
                                        className="btn btn-secondary"
                                        onClick={() => navigate("/dashboard")}
                                    >
                                        Back
                                    </button>

                                    <button
                                        type="submit"
                                        className="btn btn-success"
                                        disabled={isSubmitting}
                                    >

                                        {

                                            isSubmitting

                                                ? "Booking..."

                                                : "Book Appointment"

                                        }

                                    </button>

                                </div>

                            </Form>

                        )}

                    </Formik>

                </div>

            </div>

        </div>

    );

};

export default CreateAppointment;
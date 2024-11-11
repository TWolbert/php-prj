import { PageProps } from "@/types";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { DoctorType, IncidentenType, PatientType, RoomType } from "./types";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { toast,ToastContainer, ToastOptions } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function Patientinfo({
    auth,
    patient,
    doctors,
    rooms,
    incidents,
    isArchived
}: PageProps<{
    patient: PatientType;
    doctors: DoctorType[];
    rooms: RoomType[];
    incidents: IncidentenType[];
    isArchived: boolean;
}>) {
    const [id, setId] = useState(patient.id);
    const [firstname, setFirstName] = useState(patient.firstname);
    const [lastname, setLastName] = useState(patient.lastname);
    const [birthdate, setBirthDate] = useState(patient.birth_date);
    const [doctorId, setDoctorId] = useState(patient.doctor_id);
    const [addressId, setAddressId] = useState(patient.address_id);
    const [roomId, setRoomId] = useState(patient.room_id);

    const [editable, setEditable] = useState(false);

    const toastOptions:ToastOptions = {
        position: "top-right",
        autoClose: 3000,
        closeOnClick:true,
        theme:"light",
    }

    const changePatientinfo = async () => {
        try {
            const updateData = {
                firstname,
                lastname,
                birth_date: birthdate,
                doctor_id: doctorId,
                room_id: roomId,
            };
            const changeResponse = await axios.patch(
                `/patient/${id}`,
                updateData
            );
            console.log(changeResponse.data);
            toast.success("update gelukt",toastOptions);
        } catch (error) {
            console.log("error", error);
            toast.error("er is een fout opgetreden",toastOptions);
        }
    };

    const toggleEdit = () => {
        setEditable(!editable);
    };

    const archivePatient = async () => { 
        // Ask for confirmation
        const confirmation = window.confirm("Weet je zeker dat je deze patient wilt archiveren?");

        // If not confirmed, return
        if (!confirmation) {
            return;
        }

        // Prompt user if patient is dead
        const isDead = window.confirm("Is the patient deceased?");

        // Post to /patient/archive with patient id
        axios.post(`/patients/archive`, {
            id: id,
            isDead: isDead
        }).then((response) => {
            console.log(response.data);
            toast.success("Patient gearchiveerd",toastOptions);
        }).catch((error) => {
            console.log("error", error);
            toast.error("er is een fout opgetreden");
        });
    }
        

    const standardInputClassName = "p-2 min-w-[300px] w-full border border-gray-300 rounded-md ";
    const standardButtonClassName = "rounded-md shadow-md bg-blue-400 text-black p-2 ";

    return (
        <div>
            <AuthenticatedLayout
                user={auth.user}
                header={
                    <h2 className="text-xl font-semibold leading-tight text-gray-800 ">
                        Patient info
                    </h2>
                }
            >
                <ToastContainer/>
                {/* info van patient terugzien in een form format */}
                <form className="p-4 mx-auto mt-5 mb-4 bg-white rounded-md shadow-md w-fit ">
                    <div className="mb-4">
                        <label className="block" htmlFor="firstname">
                            Voornaam
                        </label>
                        <input
                            className={editable ? standardInputClassName + "bg-white" : standardInputClassName + "bg-gray-200"}
                            id="firstname"
                            type="text"
                            value={firstname}
                            disabled={!editable}
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block" htmlFor="lastname">
                            Achternaam
                        </label>
                        <input
                            className={editable ? standardInputClassName + "bg-white" : standardInputClassName + "bg-gray-200"}
                            id="lastname"
                            type="text"
                            value={lastname}
                            disabled={!editable}
                            onChange={(e) => setLastName(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block" htmlFor="birthdate">
                            Geboortedatum
                        </label>
                        <input
                            className={editable ? standardInputClassName + "bg-white" : standardInputClassName + "bg-gray-200"}
                            id="birthdate"
                            type="date"
                            value={birthdate}
                            disabled={!editable}
                            onChange={(e) => setBirthDate(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block" htmlFor="doctorId">
                            Doctor
                        </label>
                        <select
                            className={editable ? standardInputClassName + "bg-white" : standardInputClassName + "bg-gray-200"}
                            id="doctorId"
                            value={doctorId}
                            disabled={!editable}
                            onChange={(e) =>
                                setDoctorId(parseInt(e.target.value))
                            }
                        >
                            {doctors.map((doctor) => (
                                <option key={doctor.id} value={doctor.id}>
                                    {doctor.firstname} {doctor.lastname}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="mb-4">
                        <label className="block" htmlFor="roomId">
                            Kamer
                        </label>
                        <select
                            className={editable ? standardInputClassName + "bg-white" : standardInputClassName + "bg-gray-200"}
                            id="roomId"
                            value={roomId}
                            disabled={!editable}
                            onChange={(e) =>
                                setRoomId(parseInt(e.target.value))
                            }
                        >
                            {rooms.map((room) => (
                                <option key={room.id} value={room.id}>
                                    {room.number}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="flex justify-between w-full gap-2 mx-auto mt-4">
                        <button
                            className={
                                !editable
                                    ? standardButtonClassName + "p-4 bg-blue-400"
                                    : standardButtonClassName + "p-4 bg-gray-200"
                            }
                            onClick={(e) => {
                                e.preventDefault();
                                toggleEdit();
                            }}
                        >
                            Klik hier om de gegevens te veranderen
                        </button>

                        <button
                            className={
                                editable
                                    ? standardButtonClassName + "p-4 bg-blue-400"
                                    : standardButtonClassName + "p-4 bg-gray-200"
                            }
                            disabled={!editable}
                            onClick={changePatientinfo}
                        >
                            Klik hier om de gegevens op te slaan
                        </button>

                        <button
                            className={
                                isArchived
                                    ? standardButtonClassName + "p-4 bg-gray-200"
                                    : standardButtonClassName + "p-4 bg-red-400"
                            }
                            disabled={isArchived}
                            onClick={(e) => {
                                e.preventDefault();
                                archivePatient();
                            }}
                        >
                            {
                                isArchived
                                    ? "Patient is al gearchiveerd"
                                    : "Patient archiveren"
                            }
                        </button>
                    </div>
                </form>

                <div className="p-4 mx-auto mt-5 mb-4 bg-white rounded-md shadow-md w-fit min-w-[300px]">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800 ">
                        Incidenten van {firstname} {lastname}
                    </h2>
                    <ul>
                        {incidents.map((incident) => (
                            <li key={incident.id}>
                                <div>
                                    <h3 className="text-lg font-bold">{incident.sort_injury}</h3>
                                    <p className="text-gray-400">{new Date(incident.date).toLocaleDateString()}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </AuthenticatedLayout>
        </div>
    );
}

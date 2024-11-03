import { PageProps } from "@/types";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { DoctorType, PatientType, RoomType } from "./types";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

export default function Patientinfo({
    auth,
    patient,
    doctors,
    rooms,
}: PageProps<{
    patient: PatientType;
    doctors: DoctorType[];
    rooms: RoomType[];
}>) {
    const [id, setId] = useState(patient.id);
    const [firstname, setFirstName] = useState(patient.firstname);
    const [lastname, setLastName] = useState(patient.lastname);
    const [birthdate, setBirthDate] = useState(patient.birth_date);
    const [doctorId, setDoctorId] = useState(patient.doctor_id);
    const [addressId, setAddressId] = useState(patient.address_id);
    const [roomId, setRoomId] = useState(patient.room_id);

    const [editable, setEditable] = useState(false);

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
            alert("update gelukt");
        } catch (error) {
            console.log("error", error);
            alert("er is een fout opgetreden");
        }
    };

    const toggleEdit = () => {
        setEditable(!editable);
    };

    const standardInputClassName = "p-2 min-w-[300px] w-full border border-gray-300 rounded-md ";
    const standardButtonClassName = "rounded-md shadow-md bg-blue-400 text-black p-2 ";

    return (
        <div>
            <AuthenticatedLayout
                user={auth.user}
                header={
                    <h2 className="text-xl font-semibold leading-tight text-gray-800 ">
                        Patient creëren
                    </h2>
                }
            >
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
                    <div className="justify-between mt-4 ">
                        <button
                            className={
                                !editable
                                    ? standardButtonClassName + "p-4 bg-blue-400 mr-4"
                                    : standardButtonClassName + "p-4 bg-gray-200 mr-4"
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
                                    ? standardButtonClassName + "p-4 bg-blue-400 mr-4"
                                    : standardButtonClassName + "p-4 bg-gray-200 mr-4"
                            }
                            disabled={!editable}
                            onClick={changePatientinfo}
                        >
                            Klik hier om de gegevens op te slaan
                        </button>
                    </div>
                </form>
            </AuthenticatedLayout>
        </div>
    );
}

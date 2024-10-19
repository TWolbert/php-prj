import React, { useState } from "react";
import axios from "axios";
export default function Voorvallen() {
    const [id,setId] = useState('');
    const [date,setDate] = useState('');
    const [sortInjury,setSortInjury] = useState('');
    const [patientId,setPatientId] = useState('');

    const getIncidents = async() =>{
        try {
            const response = await axios.get('')
            console.log(response.data);
        } catch (error) {
            console.log("error",error)
            alert("er is een fout opgetreden")
        }
    }
    return(
        <div>

        </div>
    );
}
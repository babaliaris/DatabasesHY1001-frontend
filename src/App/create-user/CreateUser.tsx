
import SmartForm from "../../core/components/SmartForm";

import * as yup from "yup";
import { useCallback } from "react";


const validator = yup.object({
    name: yup.string().max(40, "Δεν μπορείτε να δώσετε πάνω από 40 χαρακτήρες.").required("Το πεδίο είναι υποχρεωτικό."),
    surname: yup.string().max(40, "Δεν μπορείτε να δώσετε πάνω από 40 χαρακτήρες.").required("Το πεδίο είναι υποχρεωτικό."),
    street: yup.string().max(40, "Δεν μπορείτε να δώσετε πάνω από 40 χαρακτήρες."),
    city: yup.string().max(40, "Δεν μπορείτε να δώσετε πάνω από 40 χαρακτήρες."),
    zip: yup.string().max(40, "Δεν μπορείτε να δώσετε πάνω από 40 χαρακτήρες.")
});


const placeholders = [
    "Πχ Πέτρος",
    "Πχ Καραγιάνης",
    "Πχ Αγίου Ονουφρίου 41",
    "Πχ Κουνουπιδιανά",
    "Πχ 63200"
];


const names = [
    "Όνομα",
    "Επώνυμο",
    "Οδός",
    "Πόλη",
    "ΤΚ"
];

function CreateUser()
{

    const onUserCreated = useCallback((values: any)=>
    {
        console.log(values);

    }, []);

    return (
        <>
            <SmartForm 
            validator={validator}
            fieldNames={names}
            title="Δημιουργία Χρήστη"
            submitName="Δημιουργία"
            placeholders={placeholders}
            onSubmit={onUserCreated}
            style={{marginTop: "1rem"}}
            />
        </>
    )
}

export default CreateUser;

import SmartForm from "../../core/components/smart-form/SmartForm";
import { useCallback } from "react";
import * as yup from "yup";

import { UserModel } from "../../core/models/types.models";
import { apiAddUser } from "../../core/api";
import { getRandomID } from "../../core/unilities";



const validator = yup.object({
    name: yup.string().max(40, "Δεν μπορείτε να δώσετε πάνω από 40 χαρακτήρες.").required("Το πεδίο είναι υποχρεωτικό."),
    surname: yup.string().max(40, "Δεν μπορείτε να δώσετε πάνω από 40 χαρακτήρες.").required("Το πεδίο είναι υποχρεωτικό."),
    street: yup.string().max(40, "Δεν μπορείτε να δώσετε πάνω από 40 χαρακτήρες."),
    city: yup.string().max(40, "Δεν μπορείτε να δώσετε πάνω από 40 χαρακτήρες."),
    zip: yup.string().max(40, "Δεν μπορείτε να δώσετε πάνω από 40 χαρακτήρες."),
    isBuyer: yup.bool()
});


const placeholders = [
    "Πχ Πέτρος",
    "Πχ Καραγιάνης",
    "Πχ Αγίου Ονουφρίου 41",
    "Πχ Κουνουπιδιανά",
    "Πχ 63200",
];


const names = [
    "Όνομα",
    "Επώνυμο",
    "Οδός",
    "Πόλη",
    "ΤΚ",
    "Είναι Αγοραστής"
];

function CreateUser() {

    const onUserCreated = useCallback((values: UserModel) => {
        let new_user: UserModel = {
            userID: import.meta.env.VITE_MOCK_API ? getRandomID() : -1,
            name: values.name,
            surname: values.surname,
            street: values.street,
            city: values.city,
            zip: values.zip,
            isBuyer: values.isBuyer
        };

        apiAddUser(new_user).then((value)=>
        {
            if (!value) console.log("Backend failed to create the user");

            else
            {
                window.alert("Ο χρήστης δημιουργήθηκε με επιτυχία!");
            }

        }).catch((err)=>
        {
            console.log(err);
        });

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
                style={{ marginTop: "1rem" }}
            />
        </>
    )
}

export default CreateUser;

import SmartForm from "../../core/components/smart-form/SmartForm";
import { useCallback, useContext } from "react";
import { FakeContext } from "../../core/contex/FakeContext";
import * as yup from "yup";

import { UserModel } from "../../core/models/types.models";



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

function CreateUser()
{
    const fakeContext = useContext(FakeContext)

    const onUserCreated = useCallback((values: UserModel)=>
    {
        fakeContext.users.push({
            userID: -1,
            name: values.name,
            surname: values.surname,
            street: values.street,
            city: values.city,
            zip: values.zip,
            isBuyer: values.isBuyer
        });

        fakeContext.setContext({...fakeContext});

    }, []);

    console.log(fakeContext.users);

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
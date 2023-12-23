import { memo, useCallback } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import styles from "./CreateUser.module.css";


type UserType = {
    name: string,
    surname: string,
    street: string,
    city: string,
    zip: string
};

const validator = yup.object({
    name: yup.string().max(40, "Δεν μπορείτε να δώσετε πάνω από 40 χαρακτήρες.").required("Το πεδίο είναι υποχρεωτικό."),
    surname: yup.string().max(40, "Δεν μπορείτε να δώσετε πάνω από 40 χαρακτήρες.").required("Το πεδίο είναι υποχρεωτικό."),
    street: yup.string().max(40, "Δεν μπορείτε να δώσετε πάνω από 40 χαρακτήρες."),
    city: yup.string().max(40, "Δεν μπορείτε να δώσετε πάνω από 40 χαρακτήρες."),
    zip: yup.string().max(40, "Δεν μπορείτε να δώσετε πάνω από 40 χαρακτήρες.")
});

function CreateUser()
{
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm({mode: "onChange", resolver: yupResolver(validator)});


    const OnUserCreate = useCallback((user: any)=>
    {
        console.log(user);

    }, []);

    console.log("CreateUser Run!!!");


    return (
    <form className={styles.form_container} onSubmit={handleSubmit(OnUserCreate)}>

        <div className={styles.form_title}>
            <label className={styles.title}>Δημιουργία Χρήστη</label>
        </div>

        <div className={styles.input_column}>
            <label htmlFor="create_user_input_name" className={`form-label ${styles.input_label}`}>Όνομα</label>
            <input {...register("name")} type="text" className="form-control" id="create_user_input_name" placeholder="π.χ Πέτρος"/>
            {errors.name && <label className={`${styles.error_label} text-danger`}>{errors.name.message}</label>}
        </div>

        <div className={styles.input_column}>
        <label htmlFor="create_user_input_surname" className={`form-label ${styles.input_label}`}>Επώνυμο</label>
            <input {...register("surname")} type="text" className="form-control" id="create_user_input_surname" placeholder="π.χ Γεωργακόπουλος"/>
            {errors.surname && <label className={`${styles.error_label} text-danger`}>{errors.surname.message}</label>}
        </div>

        <div className={styles.input_column}>
        <label htmlFor="create_user_input_street" className={`form-label ${styles.input_label}`}>Οδός</label>
            <input {...register("street")} type="text" className="form-control" id="create_user_input_street" placeholder="π.χ Αγίου ονουφρίου 41"/>
            {errors.street && <label className={`${styles.error_label} text-danger`}>{errors.street.message}</label>}
        </div>

        <div className={styles.input_column}>
        <label htmlFor="create_user_input_city" className={`form-label ${styles.input_label}`}>Πόλη</label>
            <input {...register("city")} type="text" className="form-control" id="create_user_input_city" placeholder="π.χ Χανιά"/>
            {errors.city && <label className={`${styles.error_label} text-danger`}>{errors.city.message}</label>}
        </div>

        <div className={styles.input_column}>
        <label htmlFor="create_user_input_zip" className={`form-label ${styles.input_label}`}>ΤΚ</label>
            <input {...register("zip")} type="text" className="form-control" id="create_user_input_zip" placeholder="π.χ 63200"/>
            {errors.zip && <label className={`${styles.error_label} text-danger`}>{errors.zip.message}</label>}
        </div>

        <button className="btn btn-primary" type="submit">Δημιουργία</button>

    </form>
    )
}

export default CreateUser;
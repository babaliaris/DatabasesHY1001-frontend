import styles from "./SmartForm.module.css";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";



export type SmartFormProps = {
    validator: yup.AnyObjectSchema,
    placeholders: Array<string>,
    fieldNames: Array<string>,
    title: string,
    submitName: string,
    onSubmit: (values: any)=>void,
    style?: React.CSSProperties
};


type FieldsType = {
    field: any,
    id: number,
    fieldName: string
};


function SmartForm(props: SmartFormProps) 
{
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm({mode: "onChange", resolver: yupResolver(props.validator)});


    const [fields, SetFields] = useState<Array<FieldsType>>([]);


    useEffect(()=>{

        let f: Array<FieldsType> = [];

        Object.keys(props.validator.fields).forEach((key: string, index: number)=>
        {
            f.push( {field: props.validator.fields[key], id: index, fieldName: key} );
        });

        if ( props.placeholders.length > f.length)
        {
            console.warn("<SmartForm/> props.placeholder must have less or equal elements as the props.validator");
        }

        if (f.length !== props.fieldNames.length)
        {
            console.warn("<SmartForm/> props.validator and props.fieldNames must have the same number of elements");
        }

        SetFields(f);

    }, []);


    return (
        <form className={styles.form_container} onSubmit={handleSubmit(props.onSubmit)} style={props.style}>

        <div className={styles.form_title}>
            <label className={styles.title}>Δημιουργία Χρήστη</label>
        </div>
        
        {
            fields.map((field: FieldsType, index: number)=>
            {
                let htmlForId = `${props.title}_${props.submitName}_${field.fieldName}_${field.id}`;

                let errmsg: string | undefined = errors[field.fieldName]?.message?.toString();

                let htmlType = "";

                switch(field.field.type)
                {
                    case "string":
                        htmlType = "text";
                        break;

                    case "boolean":
                        htmlType = "checkbox";
                        break;

                    case "bool":
                        htmlType = "checkbox";
                        break;

                    default:
                        htmlType = field.field.type;
                        break;
                }

                return (
                    <div className={styles.input_column} key={field.id}>
                        <label
                        htmlFor={htmlForId}
                        className={`${htmlType === "checkbox" ? "form-check-label" : "form-label"} 
                                    ${styles.input_label} ${htmlType === "checkbox" ? `${styles.input_label_checkbox}` : ""} ${styles.input_label}`}>
                            {props.fieldNames[index]}
                        </label>

                        <input
                        {...register(field.fieldName)}
                        type={htmlType}
                        className={`${htmlType === "checkbox" ? "form-check-input" : "form-control"}`}
                        id={htmlForId}
                        placeholder={props.placeholders[index]}/>

                        {errors[field.fieldName] && <label className={`${styles.error_label} text-danger`}>{errmsg}</label>}
                    </div>
                );
            })
        }

        <button className="btn btn-primary" type="submit">Δημιουργία</button>

    </form>
    );
}

export default SmartForm;
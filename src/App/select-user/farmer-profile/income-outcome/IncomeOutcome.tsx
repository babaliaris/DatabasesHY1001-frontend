import { useCallback, useContext, useEffect, useState } from "react";
import SmartForm from "../../../../core/components/smart-form/SmartForm";
import SmartList from "../../../../core/components/smart-list/SmartList";
import * as yup from "yup";
import styles from "./IncomeOutcome.module.css";
import { GlobalContext } from "../../../../core/contex/GlobalContext";
import { fontawesomeIcons } from "../../../../core/fontawesome.icons";
import Modal from "../../../../core/components/modal/Modal";
import { IncomeModel, OutcomeModel, valueTypes } from "../../../../core/models/types.models";

const validator = yup.object({
    name: yup.string().max(40, "Δεν μπορείτε να δώσετε πάνω από 40 χαρακτήρες.").required("Το πεδίο είναι υποχρεωτικό."),
    value: yup.number().required("Το πεδίο είναι υποχρεωτικό.").typeError("Πρέπει να δώσετε έναν αριθμό."),
    valueType: yup.string()
});


const inputNames = [
    "Όνομα",
    "Τιμή",
    "Είδος",
];

const incomePlaceholders = [
    "Πχ Χρηματικό ποσό 100kg ελιάς",
    "Πχ 20.000",
    "Πχ CURRENCY",
];

const outcomePlaceholders = [
    "Πχ Πετρέλαιο",
    "Πχ 200",
    "Πχ CURRENCY",
];




function IncomeOutcome()
{
    const globalCtx = useContext(GlobalContext);

    const [openIncomesModal, setOpenIncomesModal] = useState<boolean>(false);
    const [openOutcomesModal, setOpenOutcomesModal] = useState<boolean>(false);


    const onIncomeCreated = useCallback((newIncome: IncomeModel)=>
    {
        setOpenIncomesModal(false);
        console.log(newIncome);

    }, [setOpenIncomesModal]);


    const onOutcomeCreated = useCallback((newOutcome: OutcomeModel)=>
    {
        setOpenOutcomesModal(false);
        console.log(newOutcome);

    }, [setOpenOutcomesModal]);


    useEffect(()=>
    {
        globalCtx.toolbarBtns = [
            {text: "Νέο Έσοδο", icon: fontawesomeIcons.income, onClick: ()=>setOpenIncomesModal(true)},
            {text: "Νέο Έξοδο", icon: fontawesomeIcons.outcome, onClick: ()=>setOpenOutcomesModal(true)}
        ];

        globalCtx.setContext({...globalCtx});

        return (()=>
        {
            globalCtx.toolbarBtns = [];
            globalCtx.setContext({...globalCtx});
        }); 

    }, []);

    return (
        <div
        className={`${styles.container}`}
        >
            IncomeOutcome Works!

            {openIncomesModal &&
                <Modal title="Νέο Έσοδο" closeBtn="Κλείσιμο" onClose={()=>{setOpenIncomesModal(false);setOpenOutcomesModal(false)}}>
                    <SmartForm
                        validator={validator}
                        fieldNames={inputNames}
                        submitName="Δημιουργία"
                        placeholders={incomePlaceholders}
                        selectValues={valueTypes}
                        selectPosition={2}
                        onSubmit={onIncomeCreated}
                    />
                </Modal>
            }


            {openOutcomesModal &&
                <Modal title="Νέο Έξοδο" closeBtn="Κλείσιμο" onClose={()=>{setOpenIncomesModal(false);setOpenOutcomesModal(false)}}>
                    <SmartForm
                        validator={validator}
                        fieldNames={inputNames}
                        submitName="Δημιουργία"
                        placeholders={outcomePlaceholders}
                        selectValues={valueTypes}
                        selectPosition={2}
                        onSubmit={onOutcomeCreated}
                    />
                </Modal>
            }

        </div>
    );
}


export default IncomeOutcome;
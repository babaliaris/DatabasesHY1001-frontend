import { useCallback, useContext, useEffect, useState } from "react";
import SmartForm from "../../../../core/components/smart-form/SmartForm";
import SmartList from "../../../../core/components/smart-list/SmartList";
import * as yup from "yup";
import styles from "./IncomeOutcome.module.css";
import { GlobalContext } from "../../../../core/contex/GlobalContext";
import { fontawesomeIcons } from "../../../../core/fontawesome.icons";
import Modal from "../../../../core/components/modal/Modal";
import { IncomeModel, LandModel, OutcomeModel, ProductionModel, UserModel, valueTypes } from "../../../../core/models/types.models";
import { useParams } from "react-router-dom";
import { apiAddIncome, apiAddOutcome, apiDeleteIncome, apiDeleteOutcome, apiGetIncomes, apiGetLands, apiGetOutcomess, apiGetProduction, apiGetUser } from "../../../../core/api";
import { getRandomID } from "../../../../core/unilities";
import FarmerTitle from "../../../../core/components/farmer-title/FarmerTitle";

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

    const {id, prodId} = useParams();

    const [user, setUser] = useState<UserModel>();
    const [production, setProduction] = useState<ProductionModel>();
    const [landId, setLandId] = useState<number>(-1);

    const [openIncomesModal, setOpenIncomesModal] = useState<boolean>(false);
    const [openOutcomesModal, setOpenOutcomesModal] = useState<boolean>(false);

    const [incomes, setIncomes] = useState<Array<IncomeModel>>([]);
    const [outcomes, setOutcomes] = useState<Array<OutcomeModel>>([]);
    const [lands, setLands] = useState<Array<LandModel>>([]);


    const onIncomeCreated = useCallback((newIncome: IncomeModel)=>
    {
        setOpenIncomesModal(false);

        newIncome.id = getRandomID();
        
        apiAddIncome(Number.parseInt(id as string), landId, Number.parseInt(prodId as string), newIncome).then((value)=>
        {
            if (!value) console.error("Failed to add an Income.");

            else
            {
                setIncomes((prevState)=>
                {
                    const new_incomes = [...prevState];

                    new_incomes.push(newIncome);

                    return new_incomes;
                });
            }

        }).catch((err)=>
        {
            console.error(err);
        });

    }, [setOpenIncomesModal, setIncomes, id, landId, prodId]);


    const onOutcomeCreated = useCallback((newOutcome: OutcomeModel)=>
    {
        setOpenOutcomesModal(false);

        newOutcome.id = getRandomID();

        apiAddOutcome(Number.parseInt(id as string), landId, Number.parseInt(prodId as string), newOutcome).then((value)=>
        {
            if (!value) console.error("Failed to add an Outcome.");

            else
            {
                setOutcomes((prevState)=>
                {
                    const new_outcomes = [...prevState];

                    prevState.push(newOutcome);

                    return new_outcomes;
                });
            }

        }).catch((err)=>
        {
            console.error(err);
        });

    }, [setOpenOutcomesModal, setOutcomes, id, landId, prodId]);


    const onIncomeDelete = useCallback((income: IncomeModel, index: number)=>
    {
        apiDeleteIncome(income).then((value)=>
        {
            if (!value) console.error("Failed to delete the Income.");

            else
            {
                setIncomes((prevState)=>
                {
                    const new_incomes = [...prevState];

                    new_incomes.splice(index, 1);

                    return new_incomes;
                });
            }


        }).catch((err)=>
        {
            console.error(err);
        })

    }, [setIncomes, id, prodId]);

    const onOutcomeDelete = useCallback((outcome: OutcomeModel, index: number)=>
    {
        apiDeleteOutcome(outcome).then((value)=>
        {
            if (!value) console.error("Failed to delete the Outcome.");

            else
            {
                setOutcomes((prevState)=>
                {
                    const new_outcomes = [...prevState];

                    new_outcomes.splice(index, 1);

                    return new_outcomes;
                });
            }


        }).catch((err)=>
        {
            console.error(err);
        })
        
    }, [setOutcomes, id, prodId]);


    const onFieldSelect = useCallback((event: any)=>
    {
        setLandId(event.target.value as number);
    }, [setLandId]);


    useEffect(()=>
    {
        const ctx = {...globalCtx};

        ctx.toolbarBtns = [
            {text: "Νέο Έσοδο", icon: fontawesomeIcons.income, onClick: ()=>setOpenIncomesModal(true)},
            {text: "Νέο Έξοδο", icon: fontawesomeIcons.outcome, onClick: ()=>setOpenOutcomesModal(true)}
        ];

        globalCtx.setContext(ctx);

        apiGetUser(Number.parseInt(id as string)).then((value)=>
        {
            setUser(value);

        }).catch((err)=>
        {
            console.error(err);
        })


        apiGetProduction( Number.parseInt(prodId as string) ).then((value)=>
        {
            setProduction(value);

        }).catch((err)=>
        {
            console.error(err);
        });


        apiGetLands(Number.parseInt(id as string)).then((value)=>
        {
            setLands(value);
            setLandId(value[0].id);

        }).catch((err)=>
        {
            console.error(err);
        });

        return (()=>
        {
            const ctx = {...globalCtx};
            ctx.toolbarBtns = [];
            globalCtx.setContext(ctx);
        }); 

    }, []);



    useEffect(()=>
    {
        apiGetIncomes(landId, Number.parseInt(prodId as string)).then((value)=>
        {
            setIncomes(value);
        }).catch((err)=>
        {
            console.error(err);
        });


        apiGetOutcomess(landId, Number.parseInt(prodId as string)).then((value)=>
        {
            setOutcomes(value);

        }).catch((err)=>
        {
            console.error(err);
        });

    }, [landId]);

    return (
        <div
        className={`${styles.container}`}
        >
            <FarmerTitle
            title={`Χρήστης: ${user?.name} ${user?.surname} , Παραγωγή: ${production?.name} ${production?.year}`}
            style={{marginTop: "0.5rem", marginLeft: "0.5rem"}}
            />

            <div
            className={styles.field_selector}
            >

                <label
                className={styles.field_selector_label}
                >
                    Επιλογή Οικοπέδου:
                </label>

                <select
                className="form-select"
                onChange={(event)=>onFieldSelect(event)}
                >
                    {
                        lands.map((land: LandModel)=>{
                            return (
                                <option key={land.id} value={land.id}>{`${land.name}`}</option>
                            );
                        })
                    }
                </select>

            </div>

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

            <SmartList
            data={incomes}
            getText={(value: IncomeModel)=>JSON.stringify(value)}
            getLogo={()=>fontawesomeIcons.income}
            getId={(value: IncomeModel)=>value.id}
            onDelete={onIncomeDelete}
            />

            <SmartList
            data={outcomes}
            getText={(value: OutcomeModel)=>JSON.stringify(value)}
            getLogo={()=>fontawesomeIcons.outcome}
            getId={(value: OutcomeModel)=>value.id}
            onDelete={onOutcomeDelete}
            />

        </div>
    );
}


export default IncomeOutcome;
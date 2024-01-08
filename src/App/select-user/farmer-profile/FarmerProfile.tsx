import styles from "./FarmerProfile.module.css";
import { useCallback, useContext, useEffect, useState } from "react";
import * as yup from "yup";

import { GlobalContext } from "../../../core/contex/GlobalContext";
import { fontawesomeIcons } from "../../../core/fontawesome.icons";
import { getRandomID } from "../../../core/unilities";
import { apiAddProduction, apiGetProductions, apiDeleteProduction,
         apiAddLand, apiGetLands, apiDeleteLand, apiGetUser} from "../../../core/api";
import SmartForm from "../../../core/components/smart-form/SmartForm";
import Modal from "../../../core/components/modal/Modal";

import { LandModel, ProductionModel, UserModel, seedTypes } from "../../../core/models/types.models";
import SmartList from "../../../core/components/smart-list/SmartList";
import FarmerTitle from "../../../core/components/farmer-title/FarmerTitle";
import { useNavigate, useParams } from "react-router-dom";

const productionValidator = yup.object({
    name: yup.string().max(40, "Δεν μπορείτε να δώσετε πάνω από 40 χαρακτήρες.").required("Το πεδίο είναι υποχρεωτικό."),
    year: yup.number().integer("Πρέπει να δώσετε έναν ακέραιο αριθμό.").required("Το πεδίο είναι υποχρεωτικό.").typeError("Πρέπει να δώσετε έναν ακέραιο αριθμό.")
});


const productionPlaceholders = [
    "Πχ Παραγωγή 2020",
    "Πχ 2020"
];


const productionNames = [
    "Όνομα",
    "Χρονιά"
];




const landValidator = yup.object({
    name: yup.string().max(40, "Δεν μπορείτε να δώσετε πάνω από 40 χαρακτήρες.").required("Το πεδίο είναι υποχρεωτικό."),
    seedType: yup.string(),
    latitude: yup.number().typeError("Πρέπει να δώσετε έναν πραγματικό αριθμό."),
    longitude: yup.number().typeError("Πρέπει να δώσετε έναν πραγματικό αριθμό.")
});


const landPlaceholders = [
    "Πχ Αντάς",
    "Πχ Ελιά",
    "Πχ 1235.123",
    "Πχ 23341.123"
];


const landNames = [
    "Όνομα",
    "Είδος Καλλιέργειας",
    "Γεωγραφικό Μήκος",
    "Γεωγραφικό Πλάτος"
];




function FarmerProfile()
{
    const {id} = useParams();

    const navigate = useNavigate();

    const globalCtx = useContext(GlobalContext);

    const [user, setUser] = useState<UserModel>();

    const [productionModalB, setProductionModalB] = useState(false);
    const [landModalB, setLandModalB] = useState(false);

    const[productions, setProductions] = useState<Array<ProductionModel>>([]);
    const[lands, setLands] = useState<Array<LandModel>>([]);

    const onNewProduction = useCallback(()=>
    {
        setProductionModalB(true);

    }, [setProductionModalB]);

    const onNewLand = useCallback(()=>
    {
        setLandModalB(true);

    }, [setLandModalB]);

    const onProductionCreated = useCallback((newProduction: ProductionModel)=>
    {
        newProduction.id = getRandomID();

        apiAddProduction(Number.parseInt( id as string), newProduction).then((val)=>
        {
            if (!val) console.error("Failed to create a new production!");

            else
            {
                setProductions((prevState)=>
                {
                    const new_productions = [...prevState];

                    new_productions.push(newProduction);

                    return new_productions;
                });
            }

        }).catch((err)=>
        {
            console.error(err);
        });

        setProductionModalB(false);

    }, [setProductions, setProductionModalB, id]);

    const onLandCreated =useCallback ((newLand: LandModel)=>
    {
        newLand.id = getRandomID();

        apiAddLand(Number.parseInt( id as string), newLand).then((val)=>
        {
            if (!val) console.error("Failed to create a new land!");

            else
            {
                setLands((prevState)=>
                {
                    const new_lands = [...prevState];

                    new_lands.push(newLand);

                    return new_lands;
                });
            }

        }).catch((err)=>
        {
            console.error(err);
        });

        setLandModalB(false);
        
    }, [setLands, setLandModalB, id]);


    const onProductionDelete = useCallback((prod: ProductionModel, index: number)=>
    {
        apiDeleteProduction(Number.parseInt( id as string), prod).then((val)=>
        {
            if (!val) console.error("Failed to delete a production!");

            else
            {
                setProductions((prevState)=>
                {
                    const new_productions = [...prevState];

                    new_productions.splice(index, 1);

                    return new_productions;
                });
            }

        }).catch((err)=>
        {
            console.error(err);
        });

    }, [setProductions, id]);


    const onProductionSelected = useCallback((prod: ProductionModel)=>
    {
        navigate(`incomes-outcomes/${prod.id}`);

    }, [navigate]);



    const onLandDelete = useCallback((land: LandModel, index: number)=>
    {
        apiDeleteLand(Number.parseInt( id as string), land).then((val)=>
        {
            if (!val) console.error("Failed to delete a land!");

            else
            {
                setLands((prevState)=>
                {
                    const new_lands = [...prevState];

                    new_lands.splice(index, 1);

                    return new_lands;
                });
            }

        }).catch((err)=>
        {
            console.error(err);
        });

    }, [setLands, id]);


    const onModalClose = useCallback(()=>
    {
        setProductionModalB(false);
        setLandModalB(false);

    }, [setProductionModalB, setLandModalB]);

    useEffect(()=>
    {
        globalCtx.toolbarBtns = [
            {text: "Νέα Παραγωγή", icon: fontawesomeIcons.production, onClick:onNewProduction},
            {text: "Νέο Οικόπεδο", icon: fontawesomeIcons.land, onClick:onNewLand},
        ];

        globalCtx.setContext({...globalCtx});

        apiGetProductions(Number.parseInt( id as string)).then((val)=>
        {
            setProductions(val);

        }).catch((err)=>
        {
            console.error(err);
        });


        apiGetLands(Number.parseInt( id as string)).then((val)=>
        {
            setLands(val);

        }).catch((err)=>
        {
            console.error(err);
        });


        //Get the user.
        if (id)
        {
            apiGetUser(Number.parseInt(id)).then((user: UserModel)=>
            {
                setUser(user);

            }).catch((err)=>
            {
                console.log(err);
            })
        }

        return (()=>
        {
            globalCtx.toolbarBtns = [];
            globalCtx.setContext(globalCtx);
        });

    }, []);

    return(
        <div
        className={`${styles.container}`}
        >
            {productionModalB &&
                <Modal title="Νέα Παραγωγή" closeBtn="Κλείσιμο" onClose={onModalClose}>
                    <SmartForm
                        validator={productionValidator}
                        fieldNames={productionNames}
                        submitName="Δημιουργία"
                        placeholders={productionPlaceholders}
                        onSubmit={onProductionCreated}
                    />
                </Modal>
            }

            {landModalB &&
                <Modal title="Νέο Οικόπεδο" closeBtn="Κλείσιμο" onClose={onModalClose}>
                    <SmartForm
                        validator={landValidator}
                        fieldNames={landNames}
                        submitName="Δημιουργία"
                        placeholders={landPlaceholders}
                        selectValues={seedTypes}
                        selectPosition={1}
                        onSubmit={onLandCreated}
                    />
                </Modal>
            }

            <FarmerTitle
            title={`Χρήστης: ${user?.name} ${user?.surname}`}
            style={{marginLeft: "1rem", marginTop: "1rem"}}
            />

            
            <div
            className={styles.lists_container}
            >

                <div
                className={styles.productions_list}
                >
                    <SmartList
                    data={productions}
                    getId={(value: ProductionModel)=>value.id}
                    getLogo={()=>fontawesomeIcons.production}
                    getText={(value: ProductionModel)=>JSON.stringify(value)}
                    onDelete={onProductionDelete}
                    onSelect={onProductionSelected}
                    />

                </div>


                <div
                className={styles.lands_list}
                >
                    <SmartList
                    data={lands}
                    getId={(value: LandModel)=>value.id}
                    getLogo={()=>fontawesomeIcons.land}
                    getText={(value: LandModel)=>JSON.stringify(value)}
                    onDelete={onLandDelete}
                    />
                </div>

            </div>

        </div>
    );
}

export default FarmerProfile;
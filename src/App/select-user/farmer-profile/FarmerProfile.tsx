import styles from "./FarmerProfile.module.css";
import { useCallback, useContext, useEffect, useState } from "react";
import * as yup from "yup";

import { GlobalContext } from "../../../core/contex/GlobalContext";
import { fontawesomeIcons } from "../../../core/fontawesome.icons";
import { getRandomID } from "../../../core/unilities";
import { apiAddProduction, apiGetProductions, apiDeleteProduction,
         apiAddLand, apiGetLands, apiDeleteLand} from "../../../core/api";
import SmartForm from "../../../core/components/smart-form/SmartForm";
import Modal from "../../../core/components/modal/Modal";

import { LandModel, ProductionModel } from "../../../core/models/types.models";
import SmartList from "../../../core/components/smart-list/SmartList";

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
    logitude: yup.number().typeError("Πρέπει να δώσετε έναν πραγματικό αριθμό.")
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
    const globalCtx = useContext(GlobalContext);

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

        apiAddProduction(newProduction).then((val)=>
        {
            if (!val) console.error("Failed to create a new production!");

        }).catch((err)=>
        {
            console.error(err);
        });

        setProductions((prevState)=>
        {
            prevState.push(newProduction);

            return [...prevState];
        })

        setProductionModalB(false);

    }, [setProductions, setProductionModalB]);

    const onLandCreated =useCallback ((newLand: LandModel)=>
    {
        newLand.id = getRandomID();

        apiAddLand(newLand).then((val)=>
        {
            if (!val) console.error("Failed to create a new land!");

        }).catch((err)=>
        {
            console.error(err);
        });

        setLands((prevState)=>
        {
            prevState.push(newLand);

            return [...prevState];
        })

        setLandModalB(false);
        
    }, [setLands, setLandModalB]);

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

        apiGetProductions().then((val)=>
        {
            setProductions(val);

        }).catch((err)=>
        {
            console.error(err);
        });


        apiGetLands().then((val)=>
        {
            setLands(val);

        }).catch((err)=>
        {
            console.error(err);
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
                        onSubmit={onLandCreated}
                    />
                </Modal>
            }


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
                    getText={(value: ProductionModel)=>`${value.name} ${value.year}`}
                    />

                </div>


                <div
                className={styles.lands_list}
                >
                    <SmartList
                    data={lands}
                    getId={(value: LandModel)=>value.id}
                    getLogo={()=>fontawesomeIcons.land}
                    getText={(value: LandModel)=>value.name}
                    />
                </div>

            </div>

        </div>
    );
}

export default FarmerProfile;
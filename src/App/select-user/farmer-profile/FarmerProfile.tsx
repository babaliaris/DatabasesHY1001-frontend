import styles from "./FarmerProfile.module.css";
import { useCallback, useContext, useEffect } from "react";

import { GlobalContext } from "../../../core/contex/GlobalContext";
import { fontawesomeIcons } from "../../../core/fontawesome.icons";



function FarmerProfile()
{
    const globalCtx = useContext(GlobalContext);

    const onNewProduction = useCallback(()=>
    {
        console.log("FarmerProfile.onNewProduction()");
    }, []);

    const onNewLand = useCallback(()=>
    {
        console.log("FarmerProfile.onNewLand()");
    }, []);

    useEffect(()=>
    {
        globalCtx.toolbarBtns = [
            {text: "Νέα Παραγωγή", icon: fontawesomeIcons.production, onClick:onNewProduction},
            {text: "Νέο Οικόπεδο", icon: fontawesomeIcons.land, onClick:onNewLand},
        ];

        globalCtx.setContext({...globalCtx});

    }, []);

    return(
        <div
        className={`${styles.container}`}
        >
            Farmer Profile Works!
        </div>
    );
}

export default FarmerProfile;
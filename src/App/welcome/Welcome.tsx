import styles from "./Welcome.module.css";

function Welcome()
{
    return (
        <div className={`${styles.container}`}>
            <p>
                Καλωσορίσατε στην frontend εφαρμογη Agro Trade!
                Η συγκεκριμένη εφαρμογή έχει σχεδιαστεί για την δοκιμή της
                βάσης δεδομένων
                
                
                <a
                className={`${styles.link}`}
                href="https://github.com/babaliaris/DatabasesHY1001-mysql"
                target="_blank"
                >
                    Agro Trade
                </a>
                
                
                στα πλαίσια του μαθήματας


                <a
                className={`${styles.link}`}
                href="https://qa.auth.gr/el/class/1/600058019"
                target="_blank"
                >
                    ΗΥ1001
                </a>

                του

                <a
                className={`${styles.link}`}
                href="https://www.auth.gr/"
                target="_blank"
                >
                    Aριστοτελείου Πανεπιστημίου Θεσσαλονίκης
                </a>
                .

                Για να ξεκινήσετε, πατήστε "Δημιουργία Χρήστη" ή "Επιλογή Χρήστη" από το top bar της εφαρμογής.

            </p>


            <label style={{color:"red", fontWeight: "bold", fontSize: "x-large"}}>Τι δεν έχω υλοποιήση στην εφαρμογή:</label>
            <ul>
                <li>[Αγοραστές]: Εισαγωγή Παραγγελιών</li>
                <li>[Αγοραστές]: Διαγραφή/Επεξεργασία στα πάντα</li>
                <li>[Αγρότες]: Εισαγωγή Εργαλείων</li>
                <li>[Αγρότες]: Εισαγωγή Συντήρησης</li>
                <li>[Αγρότες]: Διαγραφή/Επεξεργασία στα πάντα</li>
            </ul>

        </div>
    ); 
}

export default Welcome;
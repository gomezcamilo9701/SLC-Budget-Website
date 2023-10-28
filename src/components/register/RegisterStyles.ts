export const useStyles = {

    bodyContainer: {
        height: '100vh',
        width: '100vw',
        display: 'flex',
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(69deg, #060606 11.65%, #0D3231 66.81%, #0A0C0C 103.36%)",
    },
    rightContent: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
    },
    logo: {
        padding: "18px",
        width: "25rem",
    },
    bodyH2: {
        color: "white",
        padding: "20px",
        fontSize: "1.2rem",
        fontWeight: 100,
        textAlign: "center",
        lineHeight: "1.7"
    },


    paper: {
        height: "90%",
        display: "flex",
        borderRadius: "10px",
        background: "rgba(217, 217, 217, 0.10)",
     },
    boxPaper: {
        color: "white",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        margin: "70px",
    },
    textField: {
        borderRadius: "10px",
        border: "1px solid #8e8adb",
        background: "white ",
        margin: "6px",
    },
    button: {
        mt: 5,
        mb: 2,
        color: "white",
        backgroundColor: "#000",
        border: '2px solid',
        borderImage: 'linear-gradient(to right, #77EBEB, #9A40E0)',
        borderImageSlice: 1,
        borderImageSource: 'linear-gradient(to right, #77EBEB, #9A40E0)',
        padding: '10px',
        boxShadow: "0px 4px 61px 0px rgba(77, 71, 195, 0.60)",
        '&:hover': {
            backgroundColor: "#211f42"
        }
    },



};
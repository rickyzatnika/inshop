
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
    navbar: {
       
        backgroundColor: '#222',
        '& a': {
            color: '#fff',
            marginLeft: 10,
            textDecoration: 'none',
            padding: '0 5px',
        },
        brand: {
            fontWeight: 'bold',
            fontSize: '3rem',
        },
        grow: {
            flexGrow: 1,
        }
    },
    toolbar: {
        justifyContent: 'space-between',
      },
    main: { 
        marginTop: '3rem',
        marginBottom: '2rem',
        padding: '0 6%',
        minHeight: '80vh',
    },

    footer: {
        marginTop: '5rem',
        padding: '1rem',
        textAlign: 'center',
        backgroundColor: '#222',
        color: '#ededed',
    },
    section: {
       marginTop: 10,
       marginBottom: 10,
    },
    form: {
        maxWidth: '500px',
        margin: '0 auto',
    },
    navbarButton: {
        color: '#fff',
        textTransform: 'initial',
    },
    transparentBG: {
        backgroundColor: 'transparent',
    },
    error: {
        color: 'red',
    },
    

})


export default useStyles;
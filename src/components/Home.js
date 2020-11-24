import { Avatar, Button, Paper, Typography, withStyles } from '@material-ui/core'
import { LockOutlined } from '@material-ui/icons'
import React from 'react'
import { Link } from 'react-router-dom'

import firebase from '../firebaseService'

const styles = (theme) => ({
    main: {
        maxWidth: 320,
        margin: `${theme.spacing(3)}px auto`
    },
    paper: {
        padding: theme.spacing(3),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    avatar: {
        backgroundColor: theme.palette.primary.main
    },
    btn: {
        marginTop: theme.spacing(2)
    }
})

const Home = (props) => {
    const {classes} = props

    const handleLogout = async () => {
        await firebase.logout()
        props.history.replace('/')
    }

    return (
        <div className={classes.main}>
            <Paper className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlined/>
                </Avatar>
                <Typography variant='h5'>
                    Hello {firebase.getCurrentUserName()}
                </Typography>
                    {!firebase.getCurrentUserName() &&
                    <>
                        <Button
                            className={classes.btn}
                            variant='contained'
                            color='primary'
                            fullWidth
                            component={Link}
                            to='/login'
                        >
                            Login
                        </Button>
                        <Button
                            className={classes.btn}
                            variant='contained'
                            color='secondary'
                            fullWidth
                            component={Link}
                            to='/register'
                        >
                            Register
                        </Button>
                    </>
                    }
                    {firebase.getCurrentUserName() &&
                    <Button
                        className={classes.btn}
                        variant='contained'
                        color='secondary'
                        fullWidth
                        onClick={handleLogout}
                    >
                        Logout
                    </Button>
                    }
            </Paper>
        </div>
    )
}

export default withStyles(styles)(Home)

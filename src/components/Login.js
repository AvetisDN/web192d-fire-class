import { Avatar, Button, Paper, TextField, withStyles } from '@material-ui/core'
import { LockOutlined } from '@material-ui/icons'
import React, {useState} from 'react'
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
    form: {
        width: '100%'
    },
    btn: {
        marginTop: theme.spacing(2)
    },
    input: {
        marginTop: theme.spacing(2)
    }
})

const Login = (props) => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const {classes} = props

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await firebase.login(email, password)
            props.history.replace('/')
        }catch(err) {
            console.error(err.message);
        }
    }

    return (
        <div className={classes.main}>
            <Paper className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlined/>
                </Avatar>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <TextField
                            type='email'
                            required
                            fullWidth
                            name='email'
                            label='E-Mail'
                            value={email}
                            onChange={(e) => {setEmail(e.target.value)}}
                        />
                    <TextField
                        type='password'
                        required
                        fullWidth
                        name='password'
                        label='Password'
                        value={password}
                        onChange={(e) => {setPassword(e.target.value)}}
                    />
                    <Button
                        className={classes.btn}
                        variant='contained'
                        color='primary'
                        fullWidth
                        type='submit'
                    >
                        Login
                    </Button>
                </form>
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
            </Paper>
        </div>
    )
}

export default withStyles(styles)(Login)

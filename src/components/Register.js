import { Avatar, Button, Paper, TextField, withStyles } from '@material-ui/core'
import { LockOutlined } from '@material-ui/icons'
import { Alert } from '@material-ui/lab'
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
        backgroundColor: theme.palette.secondary.main
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

const Register = (props) => {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirm, setConfirm] = useState('')
    const [secret, setSecret] = useState('')
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState(false)

    const {classes} = props

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError(false)
        setSuccess(false)
        if(password === confirm) {
            try {
                await firebase.register(email,password, name)
                await firebase.addAnimal(secret)
                //setSuccess(true)
                props.history.replace('/')
            }
            catch(err) {
                setError(err.message)
            }
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
                        type='text'
                        required
                        fullWidth
                        name='name'
                        label='Your Name'
                        value={name}
                        onChange={(e) => {setName(e.target.value)}}
                    />
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
                    <TextField
                        type='password'
                        required
                        fullWidth
                        name='confirm'
                        label='Confirm Password'
                        value={confirm}
                        onChange={(e) => {setConfirm(e.target.value)}}
                    />
                    <TextField
                        type='text'
                        required
                        fullWidth
                        name='secret'
                        label='Your Tothem Animal'
                        value={secret}
                        onChange={(e) => {setSecret(e.target.value)}}
                    />
                    <Button
                        type='submit'
                        className={classes.btn}
                        variant='contained'
                        color='secondary'
                        fullWidth
                    >
                        Register
                    </Button>
                </form>
                {error &&
                    <Alert severity='error'>
                        {error}
                    </Alert>
                }
                {success &&
                    <Alert severity='success'>
                        Success!
                    </Alert>
                }
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
            </Paper>
        </div>
    )
}

export default withStyles(styles)(Register)

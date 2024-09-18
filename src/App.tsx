import React from 'react'
import classes from './App.module.css'

const query = {
    me: {
        resource: 'me',
    },
}

const MyApp = () => (
    <div className={classes.container}>
        <h3>Hello world</h3>
    </div>
)

export default MyApp

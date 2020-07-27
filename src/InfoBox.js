import React from 'react'
import {Card,CardContent, Typography} from '@material-ui/core'
import './InfoBox.css'

function InfoBox({title, cases, active, total, ...props }) {
    return (
        <Card 
        onClick={props.onClick}
        className={`infoBox ${active && `infoBox--${title}`}`}
        >
            <CardContent>
                <Typography color="textSecondary" className="infoBox__title">
                    {title}
                </Typography>
                <h2 className={`infoBox__cases  
                ${active && `infoBox__cases--${title}`}
                `}>
                    {cases}
                </h2>
                <Typography color="textSecondary" className="infoBox__total">
                    {total} Total
                </Typography>
            </CardContent>
        </Card>
    )
}

export default InfoBox

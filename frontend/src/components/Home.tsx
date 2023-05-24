import {Car} from "../model/Car";
import './Home.css';
import StreetviewIcon from '@mui/icons-material/Streetview';
import LocalParkingIcon from '@mui/icons-material/LocalParking';
import EvStationIcon from '@mui/icons-material/EvStation';
import TimeToLeaveIcon from '@mui/icons-material/TimeToLeave';
import {User} from "../model/User";
import moment from "moment";
import React from "react";
import {Link} from "react-router-dom";
import {styled, Tooltip, tooltipClasses, TooltipProps} from "@mui/material";

type Props = {
    user: string | undefined
    cars: Car[]
    userDetails: User | undefined
}

export default function Home(props: Props) {

    function countCars(status: string): number {
        return status ? props.cars.filter((car) => car.status.toLowerCase() === status.toLowerCase()).length : props.cars.length;
    }

    const lastLogin = moment(props.userDetails?.lastLogin);
    const relativeTime = lastLogin.fromNow();
    const convertTime = lastLogin.format('HH:mm');
    let day = moment(lastLogin, 'day');
    let today = moment().startOf('day');
    let yesterday = moment().subtract(1, 'day').startOf('day');
    let dayOutput;

    if (day.isSame(today, 'day') || day.isSame(yesterday, 'day')) {
        if (day.isSame(today, 'day')) {
            dayOutput = "Today";
        } else if (day.isSame(yesterday, 'day')) {
            dayOutput = "Yesterday";
        }
        dayOutput += " at " + convertTime;
    } else {
        dayOutput = lastLogin.format('DD.MM.YYYY [at] HH:mm');
    }

    const HtmlTooltip = styled(({className, ...props}: TooltipProps) => (
        <Tooltip {...props} classes={{popper: className}}/>
    ))(({theme}) => ({
        [`& .${tooltipClasses.tooltip}`]: {
            backgroundColor: '#253332',
            color: '#FFFFFF',
            maxWidth: 220,
            fontSize: theme.typography.pxToRem(14),
            fontFamily: 'Inter',
            boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px'
        },
    }));

    return (
        <>
            <h1>Hi {props.userDetails?.firstname} {props.userDetails?.lastname}!</h1>
            {props.userDetails?.lastLogin ? (
                <p>Your last login was
                    <HtmlTooltip
                        title={
                            <React.Fragment>
                                {dayOutput}
                            </React.Fragment>
                        }
                    >
                        <Link to="#" className="relativeTime"> {relativeTime}</Link>
                    </HtmlTooltip>
                    .</p>
            ) : null
            }
            <div className="stats">
                <div className="stat">
                    <div className="icon">
                        <StreetviewIcon/>
                    </div>
                    <div className="text">
                        <h2>On the way</h2>
                        <span className="number"><Link to="/cars?status=otw">{countCars("OTW")}</Link></span>
                    </div>
                </div>
                <div className="stat">
                    <div className="icon">
                        <LocalParkingIcon/>
                    </div>
                    <div className="text">
                        <h2>Parked</h2>
                        <span className="number"><Link to="/cars?status=parked">{countCars("Parked")}</Link></span>
                    </div>
                </div>
                <div className="stat">
                    <div className="icon">
                        <EvStationIcon/>
                    </div>
                    <div className="text">
                        <h2>Charging</h2>
                        <span className="number"><Link to="/cars?status=charging">{countCars("Charging")}</Link></span>
                    </div>
                </div>
                <div className="stat">
                    <div className="icon">
                        <TimeToLeaveIcon/>
                    </div>
                    <div className="text">
                        <h2>In Total</h2>
                        <span className="number"><Link to="/cars">{countCars("")}</Link></span>
                    </div>
                </div>
            </div>
        </>
    )
}
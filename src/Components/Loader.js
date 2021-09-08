import { CircularProgress } from '@material-ui/core';
import './Loader.css';
import React from 'react';

export default function Loader() {
    return (
        <div className="loader">
            <CircularProgress />
        </div>
    )
}

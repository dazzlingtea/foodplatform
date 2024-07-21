import React from 'react';
import {Outlet} from "react-router-dom";

const CustomerMyPageOutlet = () => {
    return (
        <>
            <div>customer page</div>
            <Outlet/>
        </>
    );
};

export default CustomerMyPageOutlet;
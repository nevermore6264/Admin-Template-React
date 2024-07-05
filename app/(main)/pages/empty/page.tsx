'use client';

import { Calendar } from 'primereact/calendar';
import React, { useState } from 'react';
import { Nullable } from 'primereact/ts-helpers';

const EmptyPage = () => {
    const [date, setDate] = useState<Nullable<Date>>(null);

    return (
        <div className="grid">
            <div className="col-12">
                <div className="card">
                    <h5>Empty Page</h5>
                    <p>Use this page to start from scratch and place your custom content.</p>
                </div>
            </div>
            <Calendar value={date} onChange={(e) => setDate(e.value)} />
            <h2>{date?.toLocaleDateString() ?? 'xxx'}</h2>
        </div>
    );
};

export default EmptyPage;

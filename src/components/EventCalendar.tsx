import React, {FC} from 'react';
import {Badge, BadgeProps, Calendar} from "antd";
import {IEvent} from "../models/IEvent";
import {Moment} from "moment";
import {formatDate} from "../utils/date";

interface EventCalendarProps {
    events: IEvent[]
}

const EventCalendar: FC<EventCalendarProps> = ({events}) => {

    const dateCellRender = (value: Moment) => {
        const formatedDate = formatDate(value.toDate());
        const currentDayEvent = events.filter(e => e.date === formatedDate)
        return (
           <div>
               {currentDayEvent.map((e, index) =>
                   <div key={index}>{e.description}</div>
               )}
           </div>
        );
    };

    return (
        <Calendar
            dateCellRender={dateCellRender}
        />
    );
};

export default EventCalendar;

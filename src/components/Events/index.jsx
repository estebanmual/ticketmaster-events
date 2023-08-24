import { memo } from "react";
import { useNavigate } from "react-router-dom";

import EvenItem from "./components/EventItem";

const Events = (props) => {
    const { searchTerm, events } = props;
    const navigate = useNavigate()


    const handleEventItemClick = id => {
        navigate(`/detail/${id}`)
    };

    const renderEvents = () => {
        let eventsFiltered = events;

        if (searchTerm.length > 0) {
            eventsFiltered = eventsFiltered.filter( item => item.name.toLowerCase().includes(searchTerm))
        }

        return eventsFiltered.map(eventItem => (
            <EvenItem
                key={`event-item-${eventItem.id}`}
                id={eventItem.id}
                name={eventItem.name}
                info={eventItem.info}
                image={eventItem.images[0].url}
                onEventClick={handleEventItemClick}
            />
        ))
    }

    return (
        <div>
            Eventos
            {renderEvents()}
        </div>
    )
};

export default memo(Events);
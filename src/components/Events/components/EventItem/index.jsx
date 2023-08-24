import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';

import styles from './EventItem.module.css';
import useLikeEvents from '../../../../hooks/useLikeEvents';

const EvenItem = (props) => {
    const { id, info, name, image, onEventClick } = props;

    const { isEventLiked, toggleLikeEvent } = useLikeEvents(id)

    const handleSeeMoreClick = event => {
        event.stopPropagation();
        onEventClick(id);
    };

    const handleHeartClick = () => {
        toggleLikeEvent();
    };

    return (
        <div className={styles.eventItemContainer}>
            <div className={styles.imageContainer}>
                { isEventLiked ? (
                    <AiFillHeart className={styles.heartIcon} onClick={handleHeartClick}/>
                ) : ( 
                    <AiOutlineHeart className={styles.heartIcon} onClick={handleHeartClick}/>
                )}
                <img src={image} alt={name} width={200} height={200} />
            </div>
            <div className={styles.eventInfoContainer}>
                <h4 className={styles.eventName}>{name}</h4>
                <p className={styles.eventInfo}>{info}</p>
                <button onClick={handleSeeMoreClick} className={styles.seeMoreBtn}>
                    Ver más
                </button>
            </div>
        </div>
    );
};

export default EvenItem;
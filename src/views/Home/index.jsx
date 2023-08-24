import { useState, useRef, useEffect, useCallback, useMemo} from 'react';
import ReactPaginate from 'react-paginate';

import useEventsResults from '../../state/events-results';

import Navbar from '../../components/Navbar';
import Events from '../../components/Events';
import styles from './Home.module.css'


const Home = () => {
    const { data, isLoading, error, fetchEvents } = useEventsResults();
    const [searchTerm, setSearchTerm] = useState('');
    const containerRef = useRef();

    const events = useMemo(() => data?._embedded?.events || [], [data?._embedded?.events]);
    const page = useMemo(() => data?.page || {}, [data?.page]);
    const fetchMyEventsRef = useRef();

    fetchMyEventsRef.current = fetchEvents;

    useEffect(() => {
        fetchMyEventsRef.current()
    }, []);

    const handleNavbarSearh = term => {
        setSearchTerm(term);
        fetchEvents(`&keyword=${term}`);
    };

    const handlePageClick = useCallback(({ selected }) => {
        fetchEvents(`&keyword=${searchTerm}&page=${selected}`)
    }, [searchTerm, fetchEvents]);

    const renderEvents = () => {
        if ( isLoading ) {
            return <div>Cargando...</div> 
        }

        if (error) {
            return error && <div>Ha ocurrido un error</div>
        }

        return (
            <>
                <Events searchTerm={searchTerm} events={events} />
                <ReactPaginate
                    className={styles.pagination}
                    nextClassName={styles.next}
                    previousClassName={styles.previous}
                    pageClassName={styles.page}
                    activeClassName={styles.activePage}
                    disabledClassName={styles.disabledPage}
                    breakLabel="..."
                    nextLabel=">"
                    previousLabel="<"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={5}
                    pageCount={page.totalPages}
                    renderOnZeroPageCount={null}
                />
            </>
        )
    };

    return (
        <>
            <Navbar onSearch={handleNavbarSearh} ref={containerRef} />
            { renderEvents() }
        </>
    )
}

export default Home;
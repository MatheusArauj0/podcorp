import {Episodespage} from "../../types/episodes";
import styles from './pagination.module.scss';

type props={
    page: Episodespage;
    onPageChange: Function;
}

function Pagination({page, onPageChange}: props) {
    return (
        <div>
            <nav>
                <ul className={styles.pagination}>
                    
                        <button disabled={page.first} onClick={()=> onPageChange(page.number - 1)}>Anterior</button>
                    
                    
                        <span>{page.number + 1} de {page.totalPages}</span>
                    
                    
                        <button disabled={page.last} onClick={()=> onPageChange(page.number + 1)}>Próxima</button>
                    
                </ul>
            </nav>
        </div>
    );

}

export default Pagination;
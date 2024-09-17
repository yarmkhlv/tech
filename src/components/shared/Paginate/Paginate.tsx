import ReactPaginate from 'react-paginate';

import { useContext } from 'react';
import { AdsListPageContext } from '../../../pages/AdsListPage';

import styles from './paginate.module.scss';

interface IPropsPaginate {
    onPageChange: (selectedItem: { selected: number }) => void;
}

export function Paginate({ onPageChange }: IPropsPaginate) {
    const { currentPage, countPagesForPagination } =
        useContext(AdsListPageContext);
    if (!countPagesForPagination || countPagesForPagination === 1) return null;
    return (
        <ReactPaginate
            className={styles.pagination}
            pageLinkClassName={styles.page}
            activeLinkClassName={styles.pageActive}
            nextLinkClassName={styles.pageNext}
            previousLinkClassName={styles.pagePrevious}
            disabledLinkClassName={styles.pageDisabled}
            breakLabel="..."
            nextLabel=">"
            onPageChange={onPageChange}
            pageRangeDisplayed={5}
            pageCount={countPagesForPagination}
            previousLabel="<"
            renderOnZeroPageCount={null}
            forcePage={currentPage}
        />
    );
}

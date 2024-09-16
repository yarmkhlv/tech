import ReactPaginate from 'react-paginate';

import styles from './paginate.module.scss';

interface IPropsPaginate {
    onPageChange: (selectedItem: { selected: number }) => void;
    pageCount: number;
    currentPage: number;
}

export function Paginate({
    onPageChange,
    pageCount,
    currentPage,
}: IPropsPaginate) {
    if (!pageCount || pageCount === 1) return null;
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
            pageCount={pageCount}
            previousLabel="<"
            renderOnZeroPageCount={null}
            forcePage={currentPage}
        />
    );
}

import React, {useState} from 'react';

const TansPagination = ({table, style}) => {
  const pages = table.getPageCount()+1;


  return (
    <div className={style}>
      { pages > 1 &&
        <button
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          {'‹'}
        </button>
      }
      { pages > 0 &&
        <div>
          {table.getPageCount() > 0 ?
            table.getState().pagination.pageIndex + 1 + '  /  ' + table.getPageCount()
            : undefined}
        </div>
      }
      { pages > 1 &&
        <button
          disabled={!table.getCanNextPage()}
          onClick={() => table.nextPage()}
        >
          {'›'}
        </button>
      }

    </div>
  );
};

export default TansPagination;
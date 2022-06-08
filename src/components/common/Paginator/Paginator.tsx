import cn from 'classnames'
import React, { useState } from 'react'
import style from './Paginator.module.scss'


type PropsType = {
    pageSize: number
    totalItemsCount: number
    currentPage: number
    portionSize?: number
    onChangePage: (pageNumber: number) => void
}

export const Paginator: React.FC<PropsType> = React.memo(({
    pageSize,
    totalItemsCount,
    onChangePage = (x: any) => x,
    currentPage = 1,
    portionSize = 10,
}) => {

    const totalPagesCount = Math.ceil(totalItemsCount / pageSize)
    //console.log(totalPagesCount);

    let pagesArray: number[] = [];

    for (let i = 1; i <= totalPagesCount; i++) {
        pagesArray = [...pagesArray, i]
    }
    //console.log(pagesArray);

    const portionCount = Math.ceil(totalPagesCount / portionSize)
    const actualGroup = Math.ceil(currentPage / portionSize)
    const [portionGroup, setPortionGroup] = useState(actualGroup)
    const leftBorder = (portionGroup - 1) * portionSize + 1
    const rightBorder = portionGroup * portionSize

    return <div className={style.paginator}>
        {portionGroup > 1 &&
            <button onClick={() => setPortionGroup(portionGroup - 1)}
                className={style.changeBtn}>prev</button>}
        {pagesArray.filter(p => p >= leftBorder && p <= rightBorder).map(p => <span key={p}
            className={cn(style.page, { [style.activePage]: currentPage === p })}
            onClick={() => onChangePage(p)}>{p}</span>)}
        {portionGroup < portionCount &&
            <button onClick={() => setPortionGroup(portionGroup + 1)}
                className={style.changeBtn}>next</button>}
    </div>
})
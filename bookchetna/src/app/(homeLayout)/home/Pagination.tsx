"use client"
import PaginationWrapper from '@/components/PaginationWrapper'

interface PaginationProps {
    pageNumber: number;
    totalPages: number;
    roomId?: string | null;
    search?: string;
    category?: string;
}

function Pagination({ pageNumber, totalPages = 3, roomId, search, category }: PaginationProps) {

    console.log(totalPages)
    // const {page}=useParams<{page:string}>()

    // console.log( "this is pagition ",page.replace("page%3D","") )
    // const PageNumber:number=parseInt(page.replace("page%3D",""))
    return (
        <>
            <PaginationWrapper totalPages={totalPages} currentPage={pageNumber} roomId={roomId} search={search} category={category} />
        </>
    )
}

export default Pagination

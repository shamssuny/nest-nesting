export function Paginate<T>(
    data : T[],
    page : number,
    limit : number,
    total : number
){
    const totalPages = Math.ceil(total / limit);

    return {
        data,
        pagination: {
            totalItems: total,
            totalPages,
            currentPage: page,
            perPage: limit,
            hasNextPage: page < totalPages,
            hasPreviousPage: page > 1,
            nextPage: page < totalPages ? page + 1 : null,
            previousPage: page > 1 ? page - 1 : null,
        },              
    };
}

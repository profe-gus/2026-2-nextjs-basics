type Searchable = {
    name: string;
    nickname: string;
    id: string
}

export function filterStudents<T extends Searchable>(students: T[], term=""): T[]{
    const value = term.trim().toLowerCase();
    if(!value) return students;
    return students.filter((student) =>
    [student.id, student.name, student.nickname]
    .some((field)=> 
        field.toLowerCase().includes(value)))
}

export function paginate<T>(students: T[], page: number, pageSize: number){
    const totalPages:number = Math.max(1, Math.ceil(students.length/pageSize));
    const current: number = Math.min(Math.max(1, page), totalPages);
    const start: number = (current - 1) * pageSize;
    return { 
        students : students.slice(
            start, start + pageSize), 
        current, 
        totalPages,
        total: students.length
    }
}

export function getPageNumbers(current: number, total: number): (number | "...")[]{
    if(total <= 5) return Array.from({length : total}, (_, i) => i+1);
    const pages = [... new Set([1, current - 1, current, current+1, total])]
                .filter((page) => page >= 1 && page <= total)
                .sort((a,b) => a - b);
    return pages.flatMap((page, i): (number | "...")[] =>
                i>0 && pages[i -1] > 1 ? ["...", page]: [page]);
}
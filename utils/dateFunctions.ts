import { formatDistanceToNow } from 'date-fns'
import { es } from 'date-fns/locale'


export const dateFormat = (date: number) => {

    const dateFormated = formatDistanceToNow(date, { locale: es });

    return `Hace ${dateFormated}`;

}
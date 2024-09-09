import { formatCurrency } from '../../../helpers/formatCurrency';

import { TAdvertisment } from '../../../../types';

interface IPropsAdInfo {
    advertisement: TAdvertisment;
    setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
}

export function AdInfo({ advertisement, setIsEditing }: IPropsAdInfo) {
    const { name, description, price, views, likes, imageUrl } = advertisement;
    return (
        <div>
            <img src={imageUrl} alt={`image of ${name}`} />
            <h1>{name}</h1>
            {description && <p>Описание: {description}</p>}
            <p>Price: {formatCurrency(price)}</p>
            <p>Views: {views}</p>
            <p>Likes: {likes}</p>
            <button onClick={() => setIsEditing(true)}>Edit</button>
        </div>
    );
}

import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { FormEdit } from '../components/AdDetailsModes/FormEdit/FormEdit';
import { Loader } from '../components/Loader';

import { formatCurrency } from '../helpers/formatCurrency';

import { TAdvertisment } from '../../types';

export function AdDetailsPage() {
    const { id } = useParams<{ id: string }>();
    const [advertisement, setAdvertisement] = useState<TAdvertisment | null>(
        null,
    );
    const [loading, setLoading] = useState(true);
    const [errorAfterFetching, setErrorAfterFetching] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        if (isEditing) return;
        const fetchAdvertisement = async () => {
            if (id) {
                try {
                    const response = await fetch(
                        `http://localhost:3000/advertisements/${id}`,
                    );
                    if (response.ok) {
                        const data: TAdvertisment = await response.json();
                        setAdvertisement(data);
                    }
                } catch (error) {
                    console.error('Ошибка в получении объявления', error);
                    setErrorAfterFetching(true);
                } finally {
                    setLoading(false);
                }
            }
        };

        fetchAdvertisement();
    }, [id, isEditing]);

    if (errorAfterFetching)
        return (
            <p>
                Извините, не удалось получить данные, попробуйте перезагрузить
                страницу.
            </p>
        );
    if (!advertisement || loading) return <Loader />;

    if (isEditing && id)
        return (
            <FormEdit
                advertisement={advertisement}
                setAdvertisement={setAdvertisement}
                closeForm={() => setIsEditing(false)}
            />
        );

    return (
        <div>
            <img src={advertisement.imageUrl} alt={advertisement.name} />
            <h1>{advertisement.name}</h1>
            {advertisement.description && (
                <p>Описание: {advertisement.description}</p>
            )}
            <p>Price: {formatCurrency(advertisement.price)}</p>
            <p>Views: {advertisement.views}</p>
            <p>Likes: {advertisement.likes}</p>
            <button onClick={() => setIsEditing(true)}>Edit</button>
        </div>
    );
}

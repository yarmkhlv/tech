import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { Loader } from '../components/Loader';

import { Advertisment } from '../components/Card/types';

export function AdDetailsPage() {
    const { id } = useParams<{ id: string }>();
    const [advertisement, setAdvertisement] = useState<Advertisment | null>(
        null,
    );
    const [loading, setLoading] = useState(true);
    const [errorAfterFetching, setErrorAfterFetching] = useState(false);

    useEffect(() => {
        const fetchAdvertisement = async () => {
            if (id) {
                try {
                    const response = await fetch(
                        `http://localhost:3000/advertisements/${id}`,
                    );
                    if (response.ok) {
                        const data = await response.json();
                        setAdvertisement(data);
                    } else {
                        console.error(
                            'Failed to fetch advertisement:',
                            response.statusText,
                        );
                        setErrorAfterFetching(true);
                    }
                } catch (error) {
                    console.error('Error fetching advertisement:', error);
                    setErrorAfterFetching(true);
                } finally {
                    setLoading(false);
                }
            }
        };

        fetchAdvertisement();
    }, [id]);

    if (errorAfterFetching)
        return (
            <p>
                Извините, не удалось получить данные, попробуйте перезагрузить
                страницу.
            </p>
        );
    if (!advertisement || loading) return <Loader />;

    return (
        <div>
            <img src={advertisement.imageUrl} alt={advertisement.name} />
            <h1>{advertisement.name}</h1>
            {advertisement.description && (
                <p>Описание: {advertisement.description}</p>
            )}
            <p>Price: {advertisement.price}</p>
            <p>Views: {advertisement.views}</p>
            <p>Likes: {advertisement.likes}</p>
        </div>
    );
}

import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { AdInfo } from '../components/AdDetailsModes/AdInfo/AdInfo.';
import { FormEdit } from '../components/AdDetailsModes/FormEdit/FormEdit';
import { Loader } from '../components/Loader';

import { TAdvertisment } from '../../types';

const API_URL = import.meta.env.VITE_API_URL;

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
                        `${API_URL}/advertisements/${id}`,
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

    return <AdInfo advertisement={advertisement} setIsEditing={setIsEditing} />;
}

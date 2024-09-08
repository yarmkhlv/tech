import { useEffect, useState } from 'react';
import clsx from 'clsx';
import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import { Loader } from '../components/Loader';

import { formatCurrency } from '../components/Card/helpers/formatCurrency';

import { Advertisment } from '../components/Card/types';

import styles from './adDetailsPage.module.scss';
import { CrossIcon } from './Cross';

export function AdDetailsPage() {
    const { id } = useParams<{ id: string }>();
    const [advertisement, setAdvertisement] = useState<Advertisment | null>(
        null,
    );
    const [loading, setLoading] = useState(true);
    const [errorAfterFetching, setErrorAfterFetching] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        resetField,
        formState: { errors },
    } = useForm<Partial<Advertisment>>();

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
                        reset(data);
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
    }, [id, reset]);

    const onSubmit = async (data: Partial<Advertisment>) => {
        if (id) {
            try {
                const response = await fetch(
                    `http://localhost:3000/advertisements/${id}`,
                    {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(data),
                    },
                );
                if (response.ok) {
                    const updatedData = await response.json();
                    setAdvertisement(updatedData);
                    setIsEditing(false);
                } else {
                    console.error(
                        'Failed to update advertisement:',
                        response.statusText,
                    );
                }
            } catch (error) {
                console.error('Error updating advertisement:', error);
            }
        }
    };

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
            {isEditing ? (
                <div className={styles.formContainer}>
                    <h1 className={styles.title}>Редактирование объявления</h1>
                    <form
                        className={styles.form}
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        <div className={styles.inputGroup}>
                            <label className={styles.label} htmlFor="name">
                                Название объявления
                            </label>
                            <input
                                className={styles.input}
                                type="text"
                                id="name"
                                {...register('name', { required: true })}
                            />
                            <button
                                type="button"
                                className={styles.clearBtn}
                                onClick={() => resetField('name')}
                            >
                                <CrossIcon />
                            </button>

                            {errors.name && <span>Name is required</span>}
                        </div>
                        <div className={styles.inputGroup}>
                            <label
                                className={styles.label}
                                htmlFor="description"
                            >
                                Описание объявления
                            </label>
                            <textarea
                                className={clsx(styles.input, styles.textArea)}
                                id="description"
                                {...register('description')}
                            />
                            <button
                                type="button"
                                className={styles.clearBtn}
                                onClick={() => resetField('description')}
                            >
                                <CrossIcon />
                            </button>
                        </div>
                        <div className={styles.inputGroup}>
                            <label className={styles.label} htmlFor="imageUrl">
                                Картинка
                            </label>
                            <input
                                className={styles.input}
                                type="text"
                                id="imageUrl"
                                {...register('imageUrl', { required: true })}
                            />
                            <button
                                type="button"
                                className={styles.clearBtn}
                                onClick={() => resetField('imageUrl')}
                            >
                                <CrossIcon />
                            </button>
                            {errors.imageUrl && (
                                <span>Image URL is required</span>
                            )}
                        </div>
                        <div className={styles.inputGroup}>
                            <label className={styles.label} htmlFor="price">
                                Цена
                            </label>
                            <input
                                className={styles.input}
                                type="number"
                                min={1}
                                id="price"
                                {...register('price', { required: true })}
                            />
                            <button
                                type="button"
                                className={styles.clearBtn}
                                onClick={() => resetField('price')}
                            >
                                <CrossIcon />
                            </button>
                            {errors.price && <span>Price is required</span>}
                        </div>

                        <button className={styles.submitButton} type="submit">
                            Save
                        </button>
                    </form>
                </div>
            ) : (
                <>
                    <img
                        src={advertisement.imageUrl}
                        alt={advertisement.name}
                    />
                    <h1>{advertisement.name}</h1>
                    {advertisement.description && (
                        <p>Описание: {advertisement.description}</p>
                    )}
                    <p>Price: {formatCurrency(advertisement.price)}</p>
                    <p>Views: {advertisement.views}</p>
                    <p>Likes: {advertisement.likes}</p>
                    <button onClick={() => setIsEditing(true)}>Edit</button>
                </>
            )}
        </div>
    );
}

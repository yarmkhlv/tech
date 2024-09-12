import clsx from 'clsx';
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';

import { ClearBtn } from '../../../shared/Buttons/ClearBtn';
import { ReturnBtn } from '../../../shared/Buttons/ReturnBtn';
import { SubmitBtn } from '../../../shared/Buttons/SubmitBtn';

import { TAdvertisment } from '../../../../../types';

import styles from './formEdit.module.scss';

type FormField = 'name' | 'description' | 'price' | 'imageUrl';

interface IPropsFormEdit {
    advertisement: TAdvertisment;
    setAdvertisement: (
        value: React.SetStateAction<TAdvertisment | null>,
    ) => void;
    closeForm: () => void;
}

const API_URL = import.meta.env.VITE_API_URL;

export function FormEdit({
    advertisement,
    setAdvertisement,
    closeForm,
}: IPropsFormEdit) {
    const {
        register,
        handleSubmit,
        setValue,
        reset,
        formState: { errors },
    } = useForm<Partial<TAdvertisment>>();
    const { id, name, description, imageUrl, price } = advertisement;
    const onSubmit = async (data: Partial<TAdvertisment>) => {
        if (id) {
            try {
                const response = await fetch(
                    `${API_URL}/advertisements/${id}`,
                    {
                        method: 'PATCH',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(data),
                    },
                );
                if (response.ok) {
                    const updatedData: TAdvertisment = await response.json();
                    setAdvertisement(updatedData);
                    closeForm();
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

    const handleClickResetField = (name: FormField) => {
        setValue(name, '');
    };

    useEffect(() => reset({ id, name, description, imageUrl, price }), []);

    return (
        <div className={styles.formContainer}>
            <div className={styles.titleAndBtnContainer}>
                <ReturnBtn onClick={closeForm} className={styles.closeBtn} />
                <h1 className={styles.title}>Редактирование объявления</h1>
            </div>
            <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
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
                    <ClearBtn
                        className={styles.clearBtn}
                        onClick={() => handleClickResetField('name')}
                    />

                    {errors.name && (
                        <span>Название объявления обязательно</span>
                    )}
                </div>
                <div className={styles.inputGroup}>
                    <label className={styles.label} htmlFor="description">
                        Описание объявления
                    </label>
                    <textarea
                        className={clsx(styles.input, styles.textArea)}
                        id="description"
                        {...register('description')}
                    />
                    <ClearBtn
                        className={styles.clearBtn}
                        onClick={() => handleClickResetField('description')}
                    />
                </div>
                <div className={styles.inputGroup}>
                    <label className={styles.label} htmlFor="imageUrl">
                        Изображение
                    </label>
                    <input
                        className={styles.input}
                        type="text"
                        id="imageUrl"
                        {...register('imageUrl', { required: true })}
                    />
                    <ClearBtn
                        className={styles.clearBtn}
                        onClick={() => handleClickResetField('imageUrl')}
                    />
                    {errors.imageUrl && <span>Изображение обязательно</span>}
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
                    <ClearBtn
                        className={styles.clearBtn}
                        onClick={() => handleClickResetField('price')}
                    />
                    {errors.price && <span>Цена обязательна</span>}
                </div>
                <SubmitBtn text="Сохранить" />
            </form>
        </div>
    );
}

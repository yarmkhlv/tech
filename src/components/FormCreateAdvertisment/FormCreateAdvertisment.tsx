import { useForm } from 'react-hook-form';
import clsx from 'clsx';

import { ClearBtn } from '../ClearBtn';
import { ReturnBtn } from '../ReturnBtn';
import { SubmitBtn } from '../SubmitBtn';

import { TAdvertisment } from '../../../types';

import styles from './formCreateAdvertisment.module.scss';

type FormField = 'name' | 'description' | 'price' | 'imageUrl';

interface IPropsFormCreate {
    closeForm: () => void;
}

export function FormCreateAdvertisment({ closeForm }: IPropsFormCreate) {
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<Partial<TAdvertisment>>();

    const onSubmit = async (data: Partial<TAdvertisment>) => {
        try {
            const response = await fetch(
                'http://localhost:3000/advertisements',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                },
            );
            if (response.ok) {
                closeForm();
            } else {
                console.error(
                    'Failed to create advertisement:',
                    response.statusText,
                );
            }
        } catch (error) {
            console.error('Error creating advertisement:', error);
        }
    };

    const handleClickResetField = (name: FormField) => {
        setValue(name, '');
    };

    return (
        <div className={styles.formContainer}>
            <div className={styles.titleAndBtnContainer}>
                <ReturnBtn onClick={closeForm} className={styles.closeBtn} />
                <h1 className={styles.title}>Создание нового объявления</h1>
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
                <SubmitBtn text="Создать" />
            </form>
        </div>
    );
}

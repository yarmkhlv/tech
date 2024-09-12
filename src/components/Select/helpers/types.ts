import { OrderStatus } from '../../../../types';

export interface Option {
    value: number;
    label: string;
}

export type TOptionSelect = {
    label: keyof typeof OrderStatus;
    value: (typeof OrderStatus)[keyof typeof OrderStatus];
};

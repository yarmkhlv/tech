interface IPropsClearBtn {
    onClick: () => void;
    className?: string;
}

export function ClearBtn({ onClick, className }: IPropsClearBtn) {
    return (
        <button type="button" className={className} onClick={onClick}>
            <svg
                width="100%"
                height="100%"
                data-icon="close"
                name="close"
                viewBox="0 0 12 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M11.58.42a.83.83 0 0 0-1.18 0L6 4.82 1.57.43A.83.83 0 1 0 .4 1.59l4.41 4.42-4.4 4.4a.83.83 0 1 0 1.17 1.18L6 7.2l4.41 4.4a.83.83 0 0 0 1.18-1.17L7.18 6l4.4-4.42a.83.83 0 0 0 0-1.17Z"
                    fill="currentColor"
                ></path>
            </svg>
        </button>
    );
}

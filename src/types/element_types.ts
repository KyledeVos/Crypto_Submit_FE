export type customToastType = {
    toastType: 'alert' | 'info'| 'success';
    message: string;
    showToast: boolean;
    onClose: () => void
}

export type dataDisplayTableType = {
    headings: string[];
    data: object[];
}
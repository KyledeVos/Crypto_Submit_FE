export type customToastType = {
    toastType: 'alert' | 'info' | 'success';
    message: string;
    showToast: boolean;
    onClose: () => void
}

export type dataDisplayTableType = {
    tableHeading?: string;
    headings: string[];
    data: object[];
    onRowSelect: (symbol: string) => void
    clickableRow?:boolean
}
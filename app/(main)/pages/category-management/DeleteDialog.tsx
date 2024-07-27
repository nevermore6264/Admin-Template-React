import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import React from 'react';

interface DeleteDialogProps {
    visible: boolean;
    onHide: () => void;
    onDelete: () => void;
    categoryName: string;
}

const DeleteDialog: React.FC<DeleteDialogProps> = ({ visible, onHide, onDelete, categoryName }) => {
    const footer = (
        <div>
            <Button label="Hủy" icon="pi pi-times" className="p-button-default" onClick={onHide} />
            <Button label="Xóa" icon="pi pi-check" className="p-button-danger" onClick={onDelete} />
        </div>
    );

    return (
        <Dialog visible={visible} style={{ width: '450px' }} header="Xóa loại sản phẩm" modal footer={footer} onHide={onHide}>
            <p>Bạn có chắc chắn muốn xóa loại sản phẩm `{categoryName}`?</p>
        </Dialog>
    );
};

export default DeleteDialog;

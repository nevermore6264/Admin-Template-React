import React from 'react';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';

interface DeleteDialogProps {
    visible: boolean;
    onHide: () => void;
    onDelete: () => void;
    categoryName: string;
}

const DeleteDialog: React.FC<DeleteDialogProps> = ({ visible, onHide, onDelete, categoryName }) => {
    return (
        <Dialog visible={visible} style={{ width: '450px' }} header="Xóa loại sản phẩm" modal footer={
            <div className="p-dialog-footer">
                <Button label="Hủy" icon="pi pi-times" className="p-button-text" onClick={onHide} />
                <Button label="Xóa" icon="pi pi-check" className="p-button-danger" onClick={onDelete} />
            </div>
        } onHide={onHide}>
            <div className="confirmation-content">
                <span>Bạn có chắc chắn muốn xóa loại sản phẩm <b>{categoryName}</b> không?</span>
            </div>
        </Dialog>
    );
};

export default DeleteDialog;

import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import React from 'react';

interface EditDialogProps {
    visible: boolean;
    onHide: () => void;
    onSave: () => void;
    category: any;
    setCategory: (category: any) => void;
}

const EditDialog: React.FC<EditDialogProps> = ({ visible, onHide, onSave, category, setCategory }) => {
    const footer = (
        <div>
            <Button label="Hủy" icon="pi pi-times" className="p-button-default" onClick={onHide} />
            <Button label="Lưu" icon="pi pi-check" className="p-button-success" onClick={onSave} />
        </div>
    );

    return (
        <Dialog visible={visible} style={{ width: '450px' }} header="Chỉnh sửa loại sản phẩm" modal footer={footer} onHide={onHide}>
            <div className="field">
                <label htmlFor="name">Tên loại sản phẩm</label>
                <InputText id="name" value={category?.name || ''} onChange={(e) => setCategory({ ...category, name: e.target.value })} />
            </div>
            <div className="field">
                <label htmlFor="description">Mô tả</label>
                <InputText id="description" value={category?.description || ''} onChange={(e) => setCategory({ ...category, description: e.target.value })} />
            </div>
        </Dialog>
    );
};

export default EditDialog;

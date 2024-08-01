import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import React from 'react';

interface CreateDialogProps {
    visible: boolean;
    onHide: () => void;
    onSave: () => void;
    newCategory: any;
    setNewCategory: (category: any) => void;
}

const CreateDialog: React.FC<CreateDialogProps> = ({ visible, onHide, onSave, newCategory, setNewCategory }) => {
    const footer = (
        <div>
            <Button label="Hủy" icon="pi pi-times" className="p-button-default" onClick={onHide} />
            <Button label="Lưu" icon="pi pi-check" className="p-button-success" onClick={onSave} />
        </div>
    );

    return (
        <Dialog visible={visible} style={{ width: '450px' }} header="Thêm mới loại sản phẩm" modal footer={footer} onHide={onHide}>
            <div className="field grid">
                <label htmlFor="name" className="col-12 mb-2 md:col-2 md:mb-0">
                    Tên
                </label>
                <div className="col-12 md:col-10">
                    <InputText id="name" value={newCategory.name} onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })} />
                </div>
            </div>
            <div className="field grid">
                <label htmlFor="description" className="col-12 mb-2 md:col-2 md:mb-0">
                    Mô tả
                </label>
                <div className="col-12 md:col-10">
                    <InputTextarea id="description" value={newCategory.description} onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })} />
                </div>
            </div>
        </Dialog>
    );
};

export default CreateDialog;

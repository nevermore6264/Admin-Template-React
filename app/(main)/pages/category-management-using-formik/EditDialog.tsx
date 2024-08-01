import React from 'react';
import { Dialog } from 'primereact/dialog';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';

interface EditDialogProps {
    visible: boolean;
    onHide: () => void;
    onSave: (updatedCategory: Category) => void;
    category: Category | null;
}

interface Category {
    id: string;
    name: string;
    description: string;
}

const EditDialog: React.FC<EditDialogProps> = ({ visible, onHide, onSave, category }) => {
    const validationSchema = Yup.object({
        name: Yup.string().required('Tên loại sản phẩm là bắt buộc'),
        description: Yup.string().required('Mô tả là bắt buộc'),
    });

    return (
        <Dialog visible={visible} style={{ width: '450px' }} header="Chỉnh sửa loại sản phẩm" modal onHide={onHide}>
            <Formik
                enableReinitialize
                initialValues={{ id: category?.id || '', name: category?.name || '', description: category?.description || '' }}
                validationSchema={validationSchema}
                onSubmit={(values, { setSubmitting }) => {
                    onSave(values);
                    setSubmitting(false);
                }}
            >
                {({ isSubmitting }) => (
                    <Form id="editForm">
                        <div className="field">
                            <label htmlFor="name">Tên loại sản phẩm</label>
                            <Field id="name" name="name" as={InputText} />
                            <ErrorMessage name="name" component="div" className="p-error" />
                        </div>
                        <div className="field">
                            <label htmlFor="description">Mô tả</label>
                            <Field id="description" name="description" as={InputText} />
                            <ErrorMessage name="description" component="div" className="p-error" />
                        </div>
                        <div className="p-dialog-footer">
                            <Button label="Hủy" icon="pi pi-times" className="p-button-text" onClick={onHide} />
                            <Button label="Lưu" icon="pi pi-check" className="p-button-success" type="submit" />
                        </div>
                    </Form>
                )}
            </Formik>
        </Dialog>
    );
};

export default EditDialog;
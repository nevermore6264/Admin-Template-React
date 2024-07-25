'use client';

import { CategoryService } from '@/demo/service/CategoryService';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Tag } from 'primereact/tag';
import React, { useEffect, useState } from 'react';

interface Category {
    id: string;
    name: string;
    description: string;
}

const CategoryManagement = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<any | null>(null);
    const [newCategory, setNewCategory] = useState<Category>({ id: '', name: '', description: '' });
    const [isCreateDialogVisible, setIsCreateDialogVisible] = useState(false);
    const [isEditDialogVisible, setIsEditDialogVisible] = useState(false);
    const [isDeleteDialogVisible, setIsDeleteDialogVisible] = useState(false);
    const service = new CategoryService();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = (await service.findAll()) as any;
                setCategories(res.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const descriptionTemplate = (category: Category) => {
        return <Tag value={category.description} severity="success"></Tag>;
    };

    const header = (
        <div className="flex flex-wrap align-items-center justify-content-between gap-2">
            <span className="text-xl text-900 font-bold">Danh sách loại sản phẩm</span>
            <Button label="Thêm mới" icon="pi pi-plus" className="p-button-success" onClick={() => onCategoryCreate()} />
        </div>
    );

    const footer = `Tổng: ${categories ? categories.length : 0} loại sản phẩm.`;

    const handleCreateCategory: () => Promise<void> = async () => {
        try {
            await service.insert(newCategory);
            const res = (await service.findAll()) as any;
            setCategories(res.data);
            setIsCreateDialogVisible(false);
        } catch (error) {
            console.error('Error creating category:', error);
        }
    };

    const handleEditCategory: () => Promise<void> = async () => {
        try {
            if (selectedCategory) {
                await service.update(selectedCategory.id, selectedCategory);
                const res = (await service.findAll()) as any;
                setCategories(res.data);
                setIsEditDialogVisible(false);
            }
        } catch (error) {
            console.error('Error updating category:', error);
        }
    };

    const handleDeleteCategory = async () => {
        try {
            if (selectedCategory) {
                await service.delete(selectedCategory.id);
                const res = (await service.findAll()) as any;
                setCategories(res.data);
                setIsDeleteDialogVisible(false);
            }
        } catch (error) {
            console.error('Error deleting category:', error);
        }
    };

    const onCategorySelect = (category: Category) => {
        setSelectedCategory(category);
    };

    const onCategoryCreate = () => {
        setNewCategory({ id: '', name: '', description: '' });
        setIsCreateDialogVisible(true);
    };

    const onCategoryEdit = (category: Category) => {
        setSelectedCategory(category);
        setIsEditDialogVisible(true);
    };

    const onCategoryDelete = (category: Category) => {
        setSelectedCategory(category);
        setIsDeleteDialogVisible(true);
    };

    const createDialogFooter = (
        <div>
            <Button label="Hủy" icon="pi pi-times" className="p-button-default" onClick={() => setIsCreateDialogVisible(false)} />
            <Button label="Lưu" icon="pi pi-check" className="p-button-success" onClick={handleCreateCategory} />
        </div>
    );

    const editDialogFooter = (
        <div>
            <Button label="Hủy" icon="pi pi-times" className="p-button-default" onClick={() => setIsEditDialogVisible(false)} />
            <Button label="Lưu" icon="pi pi-check" className="p-button-success" onClick={handleEditCategory} />
        </div>
    );

    const deleteDialogFooter = (
        <div>
            <Button label="Hủy" icon="pi pi-times" className="p-button-default" onClick={() => setIsDeleteDialogVisible(false)} />
            <Button label="Xóa" icon="pi pi-check" className="p-button-danger" onClick={handleDeleteCategory} />
        </div>
    );

    return (
        <div className="card">
            <DataTable value={categories} header={header} footer={footer} tableStyle={{ minWidth: '60rem' }} onRowClick={(e: any) => onCategorySelect(e.data)}>
                <Column field="name" header="Name"></Column>
                <Column field="description" header="Description" body={descriptionTemplate}></Column>
                <Column
                    header="Actions"
                    bodyClassName="flex align-items-center justify-content-end"
                    body={(category) => (
                        <div className="flex gap-2">
                            <Button icon="pi pi-pencil" className="p-button-rounded p-button-success" onClick={() => onCategoryEdit(category)} />
                            <Button icon="pi pi-trash" className="p-button-rounded p-button-danger" onClick={() => onCategoryDelete(category)} />
                        </div>
                    )}
                />
            </DataTable>

            <Dialog visible={isCreateDialogVisible} style={{ width: '450px' }} header="Thêm mới loại sản phẩm" modal footer={createDialogFooter} onHide={() => setIsCreateDialogVisible(false)}>
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

            <Dialog visible={isEditDialogVisible} style={{ width: '450px' }} header="Chỉnh sửa loại sản phẩm" modal footer={editDialogFooter} onHide={() => setIsEditDialogVisible(false)}>
                <div className="field">
                    <label htmlFor="name">Tên loại sản phẩm</label>
                    <InputText id="name" value={selectedCategory?.name || ''} onChange={(e) => setSelectedCategory({ ...selectedCategory, name: e.target.value })} />
                </div>
                <div className="field">
                    <label htmlFor="description">Mô tả</label>
                    <InputText id="description" value={selectedCategory?.description || ''} onChange={(e) => setSelectedCategory({ ...selectedCategory, description: e.target.value })} />
                </div>
            </Dialog>

            <Dialog visible={isDeleteDialogVisible} style={{ width: '450px' }} header="Xóa loại sản phẩm" modal footer={deleteDialogFooter} onHide={() => setIsDeleteDialogVisible(false)}>
                <p>Bạn có chắc chắn muốn xóa loại sản phẩm "{selectedCategory?.name}"?</p>
            </Dialog>
        </div>
    );
};

export default CategoryManagement;

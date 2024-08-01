'use client';

import { CategoryService } from '@/demo/service/CategoryService';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Tag } from 'primereact/tag';
import React, { useEffect, useState } from 'react';
import CreateDialog from './CreateDialog'; // Adjust the import path as needed
import DeleteDialog from './DeleteDialog'; // Adjust the import path as needed
import EditDialog from './EditDialog'; // Adjust the import path as needed

interface Category {
    id: string;
    name: string;
    description: string;
}

const CategoryManagement = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
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
            <Button label="Thêm mới" icon="pi pi-plus" className="p-button-success" onClick={() => setIsCreateDialogVisible(true)} />
        </div>
    );

    const footer = `Tổng: ${categories ? categories.length : 0} loại sản phẩm.`;

    const handleCreateCategory = async (newCategory: Category) => {
        try {
            await service.insert(newCategory);
            const res = (await service.findAll()) as any;
            setCategories(res.data);
            setIsCreateDialogVisible(false);
        } catch (error) {
            console.error('Error creating category:', error);
        }
    };

    const handleEditCategory = async (updatedCategory: Category) => {
        try {
            if (selectedCategory) {
                await service.update(updatedCategory.id, updatedCategory);
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

    return (
        <div className="card">
            <DataTable value={categories} header={header} footer={footer} tableStyle={{ minWidth: '60rem' }}>
                <Column field="name" header="Name"></Column>
                <Column field="description" header="Description" body={descriptionTemplate}></Column>
                <Column
                    header="Actions"
                    bodyClassName="flex align-items-center justify-content-end"
                    body={(category) => (
                        <div className="flex gap-2">
                            <Button icon="pi pi-pencil" className="p-button-rounded p-button-success" onClick={() => { setSelectedCategory(category); setIsEditDialogVisible(true); }} />
                            <Button icon="pi pi-trash" className="p-button-rounded p-button-danger" onClick={() => { setSelectedCategory(category); setIsDeleteDialogVisible(true); }} />
                        </div>
                    )}
                />
            </DataTable>

            <CreateDialog
                visible={isCreateDialogVisible}
                onHide={() => setIsCreateDialogVisible(false)}
                onSave={handleCreateCategory}
            />

            <EditDialog
                visible={isEditDialogVisible}
                onHide={() => setIsEditDialogVisible(false)}
                onSave={handleEditCategory}
                category={selectedCategory}
            />

            <DeleteDialog
                visible={isDeleteDialogVisible}
                onHide={() => setIsDeleteDialogVisible(false)}
                onDelete={handleDeleteCategory}
                categoryName={selectedCategory?.name || ''}
            />
        </div>
    );
};

export default CategoryManagement;

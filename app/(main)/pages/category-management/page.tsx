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

            <CreateDialog
                visible={isCreateDialogVisible}
                onHide={() => setIsCreateDialogVisible(false)}
                onSave={handleCreateCategory}
                newCategory={newCategory}
                setNewCategory={setNewCategory}
            />

            <EditDialog
                visible={isEditDialogVisible}
                onHide={() => setIsEditDialogVisible(false)}
                onSave={handleEditCategory}
                category={selectedCategory}
                setCategory={setSelectedCategory}
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

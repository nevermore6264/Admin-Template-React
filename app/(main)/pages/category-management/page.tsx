'use client';

import { CategoryService } from '@/demo/service/CategoryService';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Tag } from 'primereact/tag';
import React, { useEffect, useState } from 'react';

interface Category {
    id: string;
    name: string;
    description: string;
}

const CategoryManagement = () => {

    const [categories, setCategories] = useState<Category[]>([]);
    const service = new CategoryService();

    useEffect(() => {
        // Define and call an async function inside useEffect
        const fetchData = async () => {
            try {
                const res = await service.findAll() as any;
                setCategories(res.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const descriptionTemplate = (category: Category) => {
        return <Tag value={category.description} severity='success'></Tag>;
    };

    const header = (
        <div className="flex flex-wrap align-items-center justify-content-between gap-2">
            <span className="text-xl text-900 font-bold">Danh sách loại sản phẩm</span>
        </div>
    );

    const footer = `Tổng: ${categories ? categories.length : 0} loại sản phẩm.`;

    return (
        <div className="card">
            <DataTable value={categories} header={header} footer={footer} tableStyle={{ minWidth: '60rem' }}>
                <Column field="name" header="Name"></Column>
                <Column field="category" header="Category"></Column>
                <Column field="description" header="Price" body={descriptionTemplate}></Column>
            </DataTable>
        </div>
    );
};

export default CategoryManagement;

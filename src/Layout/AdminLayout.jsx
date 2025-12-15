import React from 'react';
import HeaderAdmin from '../admin/components/HeaderAdmin'; // O header do seu admin
import { Outlet } from 'react-router-dom';

export default function AdminLayout() {
    return (
        <div className="mt-36">
            <HeaderAdmin /> {/* Header exclusivo do Backoffice */}
            <div>
                {/* O Outlet renderiza o DashboardAdmin ou qualquer outra rota filha */}
                <Outlet /> 
            </div>
        </div>
    );
}
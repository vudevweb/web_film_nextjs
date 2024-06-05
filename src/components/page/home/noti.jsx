"use client"

import React, { useState } from 'react';
import { Button, Modal } from 'antd';

const Noti = () => {
    const [isModalOpen, setIsModalOpen] = useState(true);
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    return (
        <>
            {/* <Button type="primary" onClick={showModal}>
                Open Modal
            </Button> */}
            <Modal title="Thông báo" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <p className='text-center'>
                    Mình sẽ chuyển tên miền về <br />
                    <a href="https://vudo.id.vn/" target='_blank'>https://vudo.id.vn</a>
                </p>
            </Modal>
        </>
    );
};
export default Noti;
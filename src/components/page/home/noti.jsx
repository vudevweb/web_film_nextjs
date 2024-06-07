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
                <div className='text-center'>
                    {/* <p> Mình sẽ chuyển tên miền về </p>
                    <a href="https://vudo.id.vn/" target='_blank'>https://vudo.id.vn</a> */}
                    <div className='w-100'>
                        <img src="https://i.imgur.com/xDmIK8H.jpeg" alt="banner - vudevweb.com" className='rounded' width="200"/>
                    </div>
                    <p className='mt-2'>
                        👉 Liên hệ telegram &nbsp; 
                        <a href="https://t.me/vudevwebChannel" target='_blank'>VUDEVWEB</a>
                        &nbsp; để yêu cầu phim!
                    </p>
                </div>
            </Modal>
        </>
    );
};
export default Noti;
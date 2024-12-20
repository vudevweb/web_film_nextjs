"use client";

import React, { useState } from "react";
import { Button, Modal } from "antd";
import Image from "next/image";
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
      <Modal
        title="Thông báo"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <div className="text-center">
          <div className="w-100 d-flex justify-content-center">
            <div className="img__noti">
              <Image
                src="/img/PAY.png"
                alt="banner - vudevweb.com"
                className="rounded img__noti--img"
                fill
                style={{ objectFit: "cover" }}
              />
            </div>
          </div>
          <p className="mt-2">
            👉 Ủng hộ mình kinh phí để duy trì website nhé!
          </p>
          <p className="mt-2">
            👉 Liên hệ telegram &nbsp;
            <a href="https://t.me/vudevwebChannel" target="_blank">
              VUDEVWEB
            </a>
            &nbsp; để yêu cầu phim!
          </p>
        </div>
      </Modal>
    </>
  );
};
export default Noti;

import React from 'react';
import { WhatsAppOutlined } from '@ant-design/icons';
import '../../style/ScrollToTopButton/WhatsAppButton.scss'; 

const WhatsAppButton = ({ phoneNumber }) => {
  const handleWhatsAppClick = () => {
    window.open(`https://wa.me/${phoneNumber}`, '_blank');
  };

  return (
    <div className="whatsapp-button" onClick={handleWhatsAppClick}>
      <WhatsAppOutlined />
    </div>
  );
};

export default WhatsAppButton;

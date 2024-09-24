import React from "react";

interface PhoneLinkProps {
  phoneNumber: string | undefined;
  className?: string;
}

const PhoneLink: React.FC<PhoneLinkProps> = ({ phoneNumber, className }) => {
  return (
    <button
      className={`text-blue-500 hover:underline ${className}`}
      onClick={() => (window.location.href = `tel:${phoneNumber}`)}
    >
      {phoneNumber}
    </button>
  );
};

export default PhoneLink;

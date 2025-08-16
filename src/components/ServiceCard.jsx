import React from 'react';
import './ServiceCard.css';

const ServiceCard = ({
  icon,
  title,
  description,
  titleAnimation = 'fade-up',
  titleDelay = 0,
  descAnimation = 'fade-up',
  descDelay = 100,
  iconAnimation = 'fade-up',
  iconDelay = 0,
}) => {
  return (
    <li className="service-card">
      <div
        className="service-icon"
        data-aos={iconAnimation}
        data-aos-delay={iconDelay}
      >
        {icon}
      </div>

      <div data-aos={titleAnimation} data-aos-delay={titleDelay}>
        <h3>{title}</h3>
      </div>

      <div data-aos={descAnimation} data-aos-delay={descDelay}>
        <p>{description}</p>
      </div>
    </li>
  );
};

export default ServiceCard;

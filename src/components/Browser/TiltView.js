import React, {
  useCallback, useEffect, useRef, useState,
} from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  transition: all 1500ms cubic-bezier(.03,.98,.52,.99);
  will-change: transform;
  transform-style: preserve-3d;
`;

const getElementCoords = (element) => {
  const { left, top } = element.getBoundingClientRect();
  const { offsetWidth, offsetHeight } = element;

  return {
    left,
    top,
    offsetHeight,
    offsetWidth,
  };
};

const timeout = (t) => new Promise((resolve) => setTimeout(() => resolve(), t));
const clamp = (val, min, max) => Math.min(Math.max(val, min), max);

const calculateTilt = (xPercentage, yPercentage, maxTiltAngeX, maxTiltAngeY) => ({
  tiltAngleX: (clamp(xPercentage, -100, 100) * maxTiltAngeX) / 100,
  tiltAngleY: -((clamp(yPercentage, -100, 100) * maxTiltAngeY) / 100),
});

const TiltView = ({
  children,
  className,
  tiltX = 0,
  tiltY = 0,
  maxTiltAngeX = 30,
  maxTiltAngeY = 30,
}) => {
  const wrapperRef = useRef(null);
  const updateAnimationId = useRef(null);

  const [{ tiltAngleX, tiltAngleY }, setTilt] = useState({
    tiltAngleX: tiltX,
    tiltAngleY: tiltY,
  });

  const animateTo = (titl) => {
    if (updateAnimationId.current) {
      cancelAnimationFrame(updateAnimationId.current);
    }

    updateAnimationId.current = requestAnimationFrame(() => {
      if (!wrapperRef.current) {
        return;
      }

      setTilt(titl);
    });
  };

  const handleDeviceOrientationChange = (event) => {
    if (!event.gamma || !event.beta) {
      return;
    }

    // calcylate x% from x (beta)
    const xPercentage = (event.beta / maxTiltAngeX) * 100;
    // calcylate y% from y (gamma)
    const yPercentage = (event.gamma / maxTiltAngeY) * 100;

    const tilt = calculateTilt(xPercentage, yPercentage, maxTiltAngeX, maxTiltAngeY);
    animateTo(tilt);
  };
  const onDeviceOrientationChange = useCallback(
    handleDeviceOrientationChange, [maxTiltAngeX, maxTiltAngeY],
  );

  // TODO debounce events
  const handleUserInteraction = (clientX, clientY) => {
    const elCoords = getElementCoords(wrapperRef.current);

    // Find out cursor position relative to wrapper
    const yPosition = clientY - elCoords.top;
    const xPosition = clientX - elCoords.left;

    // calculate x% from position y
    // +-----+-------+
    // |     | x%    |
    // +-----+-------+
    // | 0   | -100% |
    // | h/2 | 0%    |
    // | h   | 100%  |
    // +-----+-------+
    const xPercentage = ((yPosition / elCoords.offsetHeight) * 200) - 100;
    // calculate y% from position x
    // +-----+-------+
    // |     | y%    |
    // +-----+-------+
    // | 0   | -100% |
    // | w/2 | 0%    |
    // | w   | 100%  |
    // +-----+-------+
    const yPercentage = ((xPosition / elCoords.offsetWidth) * 200) - 100;

    const tilt = calculateTilt(xPercentage, yPercentage, maxTiltAngeX, maxTiltAngeY);
    animateTo(tilt);
  };

  const handleTouchMove = (event) => {
    const { clientX, clientY } = event.touches[0];
    handleUserInteraction(clientX, clientY);
  };
  const onTouchMove = useCallback(handleTouchMove, [maxTiltAngeX, maxTiltAngeY]);

  const handleMouseMove = (event) => {
    const { clientX, clientY } = event;
    handleUserInteraction(clientX, clientY);
  };
  const onMouseMove = useCallback(handleMouseMove, []);

  const handleLeave = async () => {
    // A small timeout to help `onTouchEnd` in completing gracefully
    await timeout(100);

    const tilt = {
      tiltAngleX: tiltX,
      tiltAngleY: tiltY,
    };
    animateTo(tilt);
  };
  const onLeave = useCallback(handleLeave, [tiltX, tiltY]);

  useEffect(() => {
    window.addEventListener('deviceorientation', onDeviceOrientationChange);

    return () => {
      window.removeEventListener('deviceorientation', onDeviceOrientationChange);

      if (updateAnimationId.current) {
        cancelAnimationFrame(updateAnimationId.current);
      }
    };
  }, [onDeviceOrientationChange]);

  useEffect(() => {
    const tilt = {
      tiltAngleX: tiltX,
      tiltAngleY: tiltY,
    };
    animateTo(tilt);
  }, [tiltX, tiltY]);

  return (
    <Wrapper
      ref={wrapperRef}
      className={className}
      style={{
        transform: `perspective(1000px) scale3d(1,1,1) rotateX(${tiltAngleX}deg) rotateY(${tiltAngleY}deg)`,
      }}
      onMouseMove={onMouseMove}
      onMouseLeave={onLeave}
      onTouchStart={onTouchMove}
      onTouchMove={onTouchMove}
      onTouchEnd={onLeave}
    >
      {children}
    </Wrapper>
  );
};

export default TiltView;

import React, { useState } from 'react';
import { useTrail, a } from '@react-spring/web';
import { Link } from 'react-router-dom';

import {
  TrailsText,
  Container,
  SplashTextBox,
  ButtonContainer,
  Button,
  
} from './style';

const Trail = ({ open, children }) => {
  const items = React.Children.toArray(children);
  const trail = useTrail(items.length, {
    config: { mass: 5, tension: 2000, friction: 200 },
    opacity: open ? 1 : 0,
    x: open ? 0 : 20,
    height: open ? 110 : 0,
    from: { opacity: 0, x: 20, height: 0 },
  });
  return (
    <div>
      {trail.map(({ height, ...style }, index) => (
        <a.div key={index} style={style}>
          <TrailsText>
            <TrailsText style={{ height }}>{items[index]}</TrailsText>
          </TrailsText>
        </a.div>
      ))}
    </div>
  );
};

export default function App() {
  const [open, setOpen] = useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <Container>
      <SplashTextBox onClick={handleClick}>
        <Trail open={open}>
          <span>Welcome</span>
          <span>to</span>
          <span>the</span>
          <span>No-stupid</span>
        </Trail>
      </SplashTextBox>
     
      
      {open && (
        <Link to="/login">
          <ButtonContainer>
            <Button > 시작하기</Button>
          </ButtonContainer>
        </Link>
      )}
      </Container>
  );
}

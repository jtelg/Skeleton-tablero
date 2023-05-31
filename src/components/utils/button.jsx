import { useEffect, useState } from 'react';

const Button = (props) => {
  const [width, setWidth] = useState('');
  const [height, setHeight] = useState('');
  const [bRadius, setbRadius] = useState('');
  const [paddingY, setPaddingY] = useState('');
  const [paddingX, setpaddingX] = useState();
  useEffect(() => {
    setWidth(props.width ? props.width : '100%');
    setHeight(props.height ? props.height : '35px');
    setbRadius(props.bRadius ? props.bRadius : '5px');
    setPaddingY(props.paddingY ? props.paddingY : '0');
    setpaddingX(props.paddingX ? props.paddingX : '0');
  }, [
    props.bRadius,
    props.height,
    props.paddingX,
    props.paddingY,
    props.width
  ]);

  return (
    <>
      <div className="boton">
        <button onClick={props.onClick} type={props.type}>
          {props.children}
        </button>
      </div>

      <style jsx>{`
        .boton button {
          width: ${width};
          height: ${height};
          border-radius: ${bRadius};
          min-height: 35px;
          cursor: pointer;
          color: white;
          padding: ${paddingY} ${paddingX};
          background: linear-gradient(
            145.52deg,
            #000000 -32.74%,
            var(--${props.color}) 220.81%
          );
          box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.25);
          border: none;
          transition: all var(--transition-time);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .boton button:hover {
          background-position: 0 ${height};
        }
      `}</style>
    </>
  );
};

export default Button;

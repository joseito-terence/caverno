import Svg, { Defs, RadialGradient, Stop, Circle as SvgCircle } from 'react-native-svg';

interface CircleProps {
  size: number;
  colors: string[];
}

const Circle = ({ colors, size }: CircleProps) => {
  // Extract colors and offsets from the colors array
  const parsedColors = colors.map(color => {
    const [colorCode, offset] = color.split(' ');
    return { colorCode, offset };
  });

  return (
    <Svg height={size} width={size}>
      <Defs>
        <RadialGradient
          id="grad"
          cx="50%"
          cy="50%"
          r="50%"
          fx="50%"
          fy="50%"
          gradientUnits="userSpaceOnUse"
        >
          {parsedColors.map((color, index) => (
            <Stop
              key={index}
              offset={color.offset}
              stopColor={color.colorCode}
              stopOpacity="1"
            />
          ))}
        </RadialGradient>
      </Defs>
      <SvgCircle cx={size / 2} cy={size / 2} r={size / 2} fill="url(#grad)" />
    </Svg>
  );
};

export default Circle;

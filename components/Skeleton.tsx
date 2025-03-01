import { Animated } from "react-native";
import React, { useEffect, useRef } from "react";

interface SkeletonProps {
  width?: number | "auto" | `${number}%`;
  height?: number | "auto" | `${number}%`;
  borderRadius?: number;
  className?: string;
}

const Skeleton = ({
  width = "100%",
  height = 50,
  borderRadius = 10,
  className = "",
}: SkeletonProps) => {
  const opacity = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 0.7,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0.3,
          duration: 500,
          useNativeDriver: true,
        }),
      ])
    );

    animation.start();

    return () => animation.stop();
  }, [opacity]);

  return (
    <Animated.View
      className={`bg-gray-300 ${className}`}
      style={[
        {
          width,
          height,
          opacity,
          borderRadius,
        },
      ]}
    />
  );
};

export default Skeleton;

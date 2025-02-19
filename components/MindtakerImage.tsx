import { useWindowDimensions, Image, ImageSourcePropType } from "react-native";
import React, { FC } from "react";

type MindtakerImageProps = {
  source: ImageSourcePropType;
  size?: number;
};

const MindtakerImage: FC<MindtakerImageProps> = ({ source, size }) => {
  const { width } = useWindowDimensions();

  const imageSize = size ?? Math.min(width / 1.5, 400);

  return (
    <Image
      source={source}
      style={{ width: imageSize, height: imageSize, borderRadius: 6 }}
    />
  );
};

export default MindtakerImage;

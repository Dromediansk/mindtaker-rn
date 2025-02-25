import { View } from "react-native";
import React from "react";
import Skeleton from "./Skeleton";

const ListSkeleton = () => {
  return (
    <>
      <View className="gap-2 p-2 m-2">
        <Skeleton width={150} height={30} />
        <Skeleton />
        <Skeleton />
        <Skeleton />
      </View>
      <View className="gap-2 p-2 m-2">
        <Skeleton width={150} height={30} />
        <Skeleton />
      </View>
      <View className="gap-2 p-2 m-2">
        <Skeleton width={150} height={30} />
        <Skeleton />
        <Skeleton />
      </View>
    </>
  );
};

export default ListSkeleton;

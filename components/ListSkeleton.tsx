import { View } from "react-native";
import React from "react";
import Skeleton from "./Skeleton";

const ListSkeleton = () => {
  return (
    <View className="pt-4 pb-8">
      <View className="gap-2 p-2 m-2">
        <Skeleton width={200} height={30} />
        <Skeleton />
        <Skeleton />
        <Skeleton />
      </View>
      <View className="gap-2 p-2 m-2">
        <Skeleton width={200} height={30} />
        <Skeleton />
      </View>
      <View className="gap-2 p-2 m-2">
        <Skeleton width={200} height={30} />
        <Skeleton />
        <Skeleton />
      </View>
    </View>
  );
};

export default ListSkeleton;

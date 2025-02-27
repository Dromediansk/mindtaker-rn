import { View } from "react-native";
import React from "react";
import Skeleton from "./Skeleton";

const CategorySkeleton = () => {
  return (
    <View className="flex-row justify-between items-center">
      <Skeleton width={200} height={35} />
      <Skeleton width={100} height={35} />
    </View>
  );
};

const ListSkeleton = () => {
  return (
    <View className="pb-8">
      <View className="gap-2 p-2 m-2">
        <CategorySkeleton />
        <Skeleton />
        <Skeleton />
        <Skeleton />
      </View>
      <View className="gap-2 p-2 m-2">
        <CategorySkeleton />
        <Skeleton />
      </View>
      <View className="gap-2 p-2 m-2">
        <CategorySkeleton />
        <Skeleton />
        <Skeleton />
      </View>
    </View>
  );
};

export default ListSkeleton;

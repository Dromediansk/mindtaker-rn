import { View, Alert } from "react-native";
import React, { ReactNode, useState } from "react";
import StyledTextInput from "@/components/StyledTextInput";
import { StyledButton } from "@/components/StyledButton";
import { router } from "expo-router";
import { Picker } from "@react-native-picker/picker";
import { useCategoryStore } from "@/store/category.store";
import { cssInterop } from "nativewind";
import { createIdeaToDb } from "@/utils/queries";

cssInterop(Picker, {
  className: {
    target: "style",
  },
});

const NewScreen = () => {
  const { categoryMap, emptyCategory, setIdeasToCategory, getIdeasByCategory } =
    useCategoryStore();

  const [content, setContent] = useState("");
  const [categoryId, setCategoryId] = useState(emptyCategory.id);

  const [isLoading, setIsLoading] = useState(false);

  const handleCreate = async () => {
    if (!content.trim()) {
      Alert.alert("Missing data", "Please fill in your idea");
      return;
    }

    setIsLoading(true);
    try {
      const oldIdeas = getIdeasByCategory(categoryId);
      const newIdea = await createIdeaToDb({ content, categoryId });
      setIdeasToCategory([...oldIdeas, newIdea]);
      router.back();
    } catch (error) {
      console.error(error);
      const message =
        error instanceof Error && error.message === "Not authenticated"
          ? "Please sign in to create an idea"
          : "Failed to create idea";
      Alert.alert("Error", message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View className="flex-1 bg-white">
      <View className="px-4 pt-2 pb-2 flex-1">
        <StyledTextInput
          value={content}
          onChangeText={setContent}
          placeholder="Describe it in detail..."
          className="h-full"
          multiline
          autoFocus
          textAlignVertical="top"
        />
      </View>
      <View className="px-4 pt-2 pb-2">
        <Picker
          className="bg-gray-100 text-xl p-2 rounded-lg border-2 border-white focus:border-main-dark"
          selectedValue={categoryId}
          onValueChange={setCategoryId}
          prompt="Select a category"
        >
          <Picker.Item label={emptyCategory.name} value={emptyCategory.id} />
          {Object.values(categoryMap).reduce<ReactNode[]>((items, category) => {
            if (category.id !== emptyCategory.id) {
              items.push(
                <Picker.Item
                  key={category.id}
                  label={category.name}
                  value={category.id}
                />
              );
            }
            return items;
          }, [])}
        </Picker>
      </View>
      <View className="mb-10 flex items-center">
        <StyledButton
          text="Create"
          onPress={handleCreate}
          isLoading={isLoading}
          className="w-2/3"
        />
      </View>
    </View>
  );
};

export default NewScreen;

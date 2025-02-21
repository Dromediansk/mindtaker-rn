import { Pressable, View, Alert } from "react-native";
import React, { useState } from "react";
import { StyledText } from "@/components/StyledText";
import StyledTextInput from "@/components/StyledTextInput";
import { createIdea } from "@/utils/supabase";
import { router } from "expo-router";

const NewScreen = () => {
  const [titleContent, setTitleContent] = useState("");
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleCreate = async () => {
    if (!titleContent.trim() && !description.trim()) {
      Alert.alert("Missing data", "Please fill in title or description");
      return;
    }

    setIsLoading(true);
    try {
      await createIdea(titleContent, description);
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
      <View className="px-4 pt-2 pb-2">
        <StyledTextInput
          value={titleContent}
          onChangeText={setTitleContent}
          placeholder="Title"
        />
      </View>
      <View className="px-4 pt-2 pb-2 flex-1">
        <StyledTextInput
          value={description}
          onChangeText={setDescription}
          placeholder="Describe it in detail..."
          className="h-full"
          multiline
          textAlignVertical="top"
        />
      </View>
      <View className="mb-10 flex items-center">
        <Pressable
          className={`w-2/3 h-14 rounded-lg items-center justify-center ${
            isLoading ? "bg-gray-300" : "bg-main"
          }`}
          onPress={handleCreate}
          disabled={isLoading}
        >
          <StyledText className="text-white text-xl uppercase">
            {isLoading ? "Creating..." : "Create"}
          </StyledText>
        </Pressable>
      </View>
    </View>
  );
};

export default NewScreen;

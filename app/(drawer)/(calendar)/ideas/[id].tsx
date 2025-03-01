import { StyledText } from "@/components/StyledText";
import StyledTextInput from "@/components/StyledTextInput";
import { StyledButton } from "@/components/StyledButton";
import { useCategoryStore } from "@/store/category.store";
import { updateIdeaInDb } from "@/utils/queries/idea.query";
import { useLocalSearchParams, useNavigation } from "expo-router";
import React, { useState } from "react";
import { ScrollView, View, Pressable, Alert } from "react-native";

const DetailScreen = () => {
  const { id, categoryId } = useLocalSearchParams<{
    id: string;
    categoryId: string;
  }>();
  const { getIdeasByCategory, setIdeasToCategory } = useCategoryStore();
  const navigation = useNavigation();

  const ideas = getIdeasByCategory(categoryId);
  const idea = ideas.find((idea) => idea.id === id);

  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(idea?.content || "");
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!idea) return null;

  const handleSubmitEdit = async () => {
    if (editedContent.trim() === idea.content.trim()) {
      setIsEditing(false);
      navigation.goBack();
      return;
    }

    if (!editedContent.trim()) {
      Alert.alert("Missing data", "Please fill in your idea");
      return;
    }

    try {
      setIsSubmitting(true);
      const updatedIdeas = await updateIdeaInDb({
        ideaId: idea.id,
        content: editedContent,
      });

      setIdeasToCategory(updatedIdeas);
      navigation.goBack();
    } catch (error) {
      console.error("Failed to update idea:", error);
    } finally {
      setIsSubmitting(false);
      setIsEditing(false);
    }
  };

  return (
    <View className="flex-1 bg-white">
      {isEditing ? (
        <View className="flex-1 flex-col m-2">
          <View className="flex-1">
            <StyledTextInput
              className="flex-1"
              multiline
              value={editedContent}
              onChangeText={setEditedContent}
              autoFocus
              textAlignVertical="top"
              editable={!isSubmitting}
            />
          </View>

          <View className="p-4 bg-white border-t border-gray-200 flex items-center">
            <StyledButton
              text="Save"
              onPress={handleSubmitEdit}
              isLoading={isSubmitting}
              className="w-2/3"
            />
          </View>
        </View>
      ) : (
        <ScrollView className="flex-1 border-2 border-white rounded-lg m-2">
          <Pressable onPress={() => setIsEditing(true)} className="p-5">
            <StyledText className="text-2xl">{idea.content}</StyledText>
          </Pressable>
        </ScrollView>
      )}
    </View>
  );
};

export default DetailScreen;

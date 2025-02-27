import { StyledText } from "@/components/StyledText";
import StyledTextInput from "@/components/StyledTextInput";
import { useCategoryStore } from "@/store/category.store";
import { updateIdeaInDb } from "@/utils/queries/idea.query";
import { useLocalSearchParams, useNavigation } from "expo-router";
import React, { useState } from "react";
import {
  ScrollView,
  View,
  TouchableOpacity,
  Pressable,
  ActivityIndicator,
} from "react-native";

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

  const handleSubmit = async () => {
    if (!idea) return;

    try {
      setIsSubmitting(true);
      const updatedIdeas = await updateIdeaInDb({
        ideaId: idea.id,
        content: editedContent,
      });

      if (updatedIdeas) {
        setIdeasToCategory(updatedIdeas);
      }
      navigation.goBack();
    } catch (error) {
      console.error("Failed to update idea:", error);
    } finally {
      setIsSubmitting(false);
      setIsEditing(false);
    }
  };

  if (!idea) return null;

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
              style={{ textAlignVertical: "top" }}
              editable={!isSubmitting}
            />
          </View>

          <View className="p-4 bg-white border-t border-gray-200">
            <TouchableOpacity
              className={`${isSubmitting ? "bg-blue-400" : "bg-blue-500"} py-3 rounded-lg`}
              onPress={handleSubmit}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <ActivityIndicator color="white" />
              ) : (
                <StyledText className="text-white text-center font-medium text-lg">
                  Save Changes
                </StyledText>
              )}
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        // View mode: Scrollable text content
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

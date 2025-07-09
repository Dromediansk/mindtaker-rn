import { StyledText } from "@/components/StyledText";
import StyledTextInput from "@/components/StyledTextInput";
import { StyledButton } from "@/components/StyledButton";
import { useCategoryStore } from "@/store/category.store";
import { updateIdeaInDb } from "@/utils/queries/idea.query";
import { useLocalSearchParams, useNavigation } from "expo-router";
import React, { useState } from "react";
import { ScrollView, View, Pressable, Alert } from "react-native";
import AiContent from "@/components/AiContent";
import AiAvatar from "@/components/AiAvatar";
import { API_URL } from "@/utils/constants";
import { AiIdeaAction } from "@/utils/types";
import { FontAwesome } from "@expo/vector-icons";
import { cssInterop } from "nativewind";
import { useAuthStore } from "@/store/auth.store";

cssInterop(FontAwesome, {
  className: {
    target: "style",
    nativeStyleToProp: { color: true, fontSize: "size" },
  },
});

const DetailScreen = () => {
  const { id, categoryId } = useLocalSearchParams<{
    id: string;
    categoryId: string;
  }>();
  const { getIdeasByCategory, setIdeasToCategory } = useCategoryStore();
  const { session } = useAuthStore();
  const navigation = useNavigation();

  const ideas = getIdeasByCategory(categoryId);
  const idea = ideas.find((idea) => idea.id === id);

  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(idea?.content || "");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [aiLoading, setAiLoading] = useState(false);
  const [aiResponse, setAiResponse] = useState("");

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

  const handlePressOption = async (action: AiIdeaAction) => {
    try {
      setAiLoading(true);
      const url = `${API_URL}/ideas/action`;

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.access_token}`,
        },
        body: JSON.stringify({
          idea_text: idea.content,
          action,
        }),
      });

      const data = await response.json();
      setAiResponse(data.result);
    } catch (error) {
      console.error("Error expanding idea:", error);
    } finally {
      setAiLoading(false);
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
        </View>
      ) : (
        <ScrollView className="flex-1 border-2 border-white rounded-lg m-2">
          <Pressable onPress={() => setIsEditing(true)} className="p-4">
            <StyledText className="text-2xl">{idea.content}</StyledText>
          </Pressable>
        </ScrollView>
      )}
      <AiContent aiResponse={aiResponse} />

      <View className="p-4 flex flex-row items-center justify-between">
        <View className="w-16" />
        <StyledButton
          text="Save"
          onPress={handleSubmitEdit}
          isLoading={isSubmitting}
          disabled={!isEditing}
          className="w-1/4"
          icon={<FontAwesome name="save" className="text-white text-2xl" />}
        />
        <AiAvatar onPressOption={handlePressOption} isLoading={aiLoading} />
      </View>
    </View>
  );
};

export default DetailScreen;

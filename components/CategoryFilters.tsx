import { BottomSheetFlatList } from "@gorhom/bottom-sheet";
import { Text, View } from "react-native";
import { useStore } from "@/store/useStore";
import { Pressable } from "react-native-gesture-handler";

export default function CategoryFilters({
  selectedCategory,
  setSelectedCategory,
}: {
  selectedCategory: string | null;
  setSelectedCategory: (categoryId: string | null) => void;
}) {
  const categories = useStore((state) => state.categories);

  const toggleCategory = (categoryId: string) => {
    setSelectedCategory(selectedCategory === categoryId ? null : categoryId);
  };

  return (
    <BottomSheetFlatList
      data={categories}
      keyExtractor={(item: any) => item.id}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{
        paddingHorizontal: 16,
        marginLeft: 12,
        height: 60,
        gap: 8,
      }}
      renderItem={({ item }: { item: any }) => (
        <Pressable
          onPress={() => {
            toggleCategory(item.id);
          }}
        >
          <View
            className={`flex-row items-center justify-center rounded-full px-4 py-2 ${
              selectedCategory === item.id ? "bg-gray-700" : "bg-gray-800"
            }`}
          >
            <Text
              className={`text-sm font-medium ${
                selectedCategory === item.id ? "text-white" : "text-gray-400"
              }`}
            >
              {item.name}
            </Text>
          </View>
        </Pressable>
      )}
    />
  );
}

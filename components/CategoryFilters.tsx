import { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { useStore } from "@/store/useStore";
import { Host, ToggleButton, Text } from "@expo/ui/jetpack-compose";

export default function CategoryFilters({
  selectedCategory,
  setSelectedCategory,
}: {
  selectedCategory: string | null;
  setSelectedCategory: (categoryId: string | null) => void;
}) {
  const categories = useStore((state) => state.categories);

  return (
    <BottomSheetScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingHorizontal: 30, paddingVertical: 12, gap: 8 }}
    >
      {categories.map((item) => (
        <Host key={item.id} matchContents>
          <ToggleButton
            checked={selectedCategory === item.id}
            onCheckedChange={(checked) =>
              setSelectedCategory(checked ? item.id : null)
            }
            colors={{
              containerColor: "#1f2937",
              checkedContainerColor: "#374151",
              contentColor: "#9CA3AF",
              checkedContentColor: "#FFFFFF",
            }}
          >
            <Text>{item.name}</Text>
          </ToggleButton>
        </Host>
      ))}
    </BottomSheetScrollView>
  );
}

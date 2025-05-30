import React from "react";
import { styles } from "./style";
import { ScrollView } from "react-native-gesture-handler";
import { categories } from "../../utils/categories";
import { Category } from "../Category";

type Props = {
  categorySelected: string,
  setCategory:(categoryId: string) => void,
  hasCheckBox?: boolean
};
export function CategorySelect({ categorySelected, setCategory, hasCheckBox = false}: Props) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{
        paddingRight: 40,
      }}
      style={styles.container}
    >
      {categories.map((category) => (
        <Category
          hasCheckBox={hasCheckBox}
          key={category.id}
          icon={category.icon}
          title={category.title}
          checked={category.id+'' == categorySelected}
          onPress={() => setCategory(category.id+'')}
        />
      ))}
    </ScrollView>
  );
}
